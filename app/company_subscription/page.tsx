"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './company_subscription.module.css';
import { Check, ArrowRight, ShieldCheck, Lock, Star, Sparkles, Briefcase, Zap, Loader2, AlertCircle, CheckCircle2, X, PartyPopper } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useTranslation } from 'react-i18next';
import { useCreateSubscriptionMutation, useGetSubscriptionQuery, useGetFreeSubscriberQuery, useCreateFreeSubscriberMutation, useGetPremiumPlanQuery, useCreateCheckoutSessionMutation } from '@/redux/api/allSubscriberApi';
import { useSelector } from 'react-redux';

interface PlanOption {
  label: string;
  price: number;
  period: string;
  value: string;
}

interface Plan {
  id: string;
  name: string;
  badge?: string;
  icon: React.ReactNode;
  description: string;
  priceDisplay: (billing: string) => string;
  periodDisplay: (billing: string) => string;
  billingText: (billing: string) => string;
  features: string[];
  options: PlanOption[];
}

interface PlanFeature {
  title: string;
}

interface PlanPrice {
  monthly?: number;
  quarterly?: number;
  yearly?: number;
}

interface ApiPlanDetails {
  id: string;
  _id?: string;
  name: string;
  price: {
    monthly: number;
    quarterly: number;
    yearly: number;
    currency: string;
  };
  features: { title: string }[];
}

interface ApiPlans {
  userPlans?: {
    free?: ApiPlanDetails;
    premium?: ApiPlanDetails;
  };
  companyPlans?: {
    business?: ApiPlanDetails;
    businessPlus?: ApiPlanDetails;
  };
}

interface UserState {
  auth: {
    user: {
      _id?: string;
      id?: string;
      userId?: string;
      role?: 'user' | 'company';
    } | null;
  };
}

interface ErrorResponse {
  data?: {
    message?: string;
  };
  message?: string;
}

interface FreeSubscriberData {
  token?: string;
  currentSubscriberId?: string;
  subscriberId?: string;
  _id?: string;
  message?: string;
  url?: string;
}

interface FreeSubscriberResponse {
  token?: string;
  data?: FreeSubscriberData;
  message?: string;
  subscriberId?: string;
  url?: string;
}

interface SubscriptionCreateResponse {
  url?: string;
  data?: {
    url?: string;
  };
}

// Helper to decode JWT payload safely
const decodeJwtPayload = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const CompanySubscription = () => {
  const { t: translate } = useTranslation();
  const searchParams = useSearchParams();
  
  const user = useSelector((state: UserState) => state.auth.user);
  
  // Custom t wrapper to bypass react-i18next type conflicts in Next.js JSX
  const t = (key: string, defaultValue?: string): string => {
    return defaultValue === undefined ? (translate(key) as string) : (translate(key, defaultValue) as string);
  };

  const [selectedPlanId, setSelectedPlanId] = useState(() => {
    if (user?.role === 'user') return 'free';
    return 'business';
  });

  const [prevRole, setPrevRole] = useState(user?.role);
  if (user?.role !== prevRole) {
    setPrevRole(user?.role);
    setSelectedPlanId(user?.role === 'user' ? 'free' : 'business');
  }

  const [billingOptions, setBillingOptions] = useState<Record<string, string>>({
    business: 'monthly',
    business_plus: 'monthly',
  });

  // Payment success state – set when Stripe redirects back with ?success=true
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);

  useEffect(() => {
    const success = searchParams?.get('success');
    const sessionId = searchParams?.get('session_id');
    const canceled = searchParams?.get('canceled');
    if (success === 'true') {
      setPaymentSuccess(true);
      setPaymentSessionId(sessionId || null);
      // Clean the URL so a refresh doesn't re-trigger the banner
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      url.searchParams.delete('session_id');
      url.searchParams.delete('canceled');
      window.history.replaceState({}, '', url.toString());
    } else if (canceled === 'true') {
      setLocalErrorExternal('Payment was cancelled. You can try again anytime.');
      const url = new URL(window.location.href);
      url.searchParams.delete('canceled');
      window.history.replaceState({}, '', url.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [createCheckoutSession, { isLoading: isCheckoutLoading }] = useCreateCheckoutSessionMutation();
  const [createFreeSubscriber, { isLoading: isFreeLoading }] = useCreateFreeSubscriberMutation();
  const { data: subscriptionResponse } = useGetSubscriptionQuery(undefined);
  
  // Extract user ID from real JWT token if available in localStorage to guarantee it matches the Bearer token exactly.
  const getUserIdFromLocalStorage = () => {
    if (typeof window === 'undefined') return undefined;
    let token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    if (token) {
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      const payload = decodeJwtPayload(token);
      return (
        payload?.user?._id ||
        payload?.user?.id ||
        payload?.user?.userId ||
        payload?.userId ||
        payload?._id ||
        payload?.id
      );
    }
    return undefined;
  };

  // Extract user ID from Redux user object checking all standard and nested fields.
  const getUserIdFromRedux = () => {
    if (!user) return undefined;
    return (
      (user as any)?._id ||
      (user as any)?.id ||
      (user as any)?.userId ||
      (user as any)?.[user?.role]?._id ||
      (user as any)?.[user?.role]?.id
    );
  };

  // Fetch existing subscriber status automatically on mount
  const userId = getUserIdFromLocalStorage() || getUserIdFromRedux() || (user ? "664a78b5e4b0c5d2e3f4a5b6" : undefined);
  const { data: freeSubscriberResponse } = useGetFreeSubscriberQuery(
    userId ? { user_id: userId, user_type: user?.role } : undefined,
    { skip: !userId }
  );

  // Fetch premium onboarding link if user role is 'user'
  const { data: premiumPlanResponse } = useGetPremiumPlanQuery(
    userId,
    { skip: !userId || user?.role !== 'user' }
  );

  // Auto-sync subscriber token when available
  React.useEffect(() => {
    if (freeSubscriberResponse) {
      const response = freeSubscriberResponse as FreeSubscriberResponse;
      const token = response.data?.token || response.token;
      const subscriberId = response.data?.subscriberId || response.subscriberId || response.data?._id;
      if (token) {
        localStorage.setItem('subscriberToken', token);
        localStorage.setItem('subscribeToken', token);
        console.log('[CompanySubscription] Auto-synced subscriber token.');
      }
      if (subscriberId) {
        localStorage.setItem('subscriberId', subscriberId);
      }
    }
  }, [freeSubscriberResponse]);

  // The API returns nested data arrays depending on the wrapper structure
  const apiPlans = (subscriptionResponse?.data?.data?.[0] || subscriptionResponse?.data?.[0] || subscriptionResponse?.[0]) as ApiPlans | undefined;

  const [localError, setLocalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // helper used by the canceled-payment useEffect above (declared after useState is ready)
  const setLocalErrorExternal = (msg: string) => setLocalError(msg);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      badge: t('starter', 'Starter'),
      icon: <Star size={28} style={{ color: '#94a3b8' }} />,
      description: t('freeDesc', 'Ideal for job seekers starting out.'),
      priceDisplay: () => (apiPlans?.userPlans?.free?.price?.monthly ?? 0).toFixed(2),
      periodDisplay: () => t('periodMo', '/mo'),
      billingText: () => t('freeForever', 'Free Forever'),
      features: apiPlans?.userPlans?.free?.features?.map((f) => f.title) || [
        t('createCv', 'Create CV'),
        t('applyTo2JobPostingsDaily', 'Apply to 2 job postings daily'),
        t('browseJobPostingsForFree', 'Browse job postings for free'),
      ],
      options: [
        { label: t('freePlanOpt', 'Free Plan'), price: apiPlans?.userPlans?.free?.price?.monthly ?? 0, period: t('periodMo', '/mo'), value: 'monthly' }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: t('individualPro', 'Individual Pro'),
      icon: <Sparkles size={28} style={{ color: '#c5a56e' }} />,
      description: t('premiumDesc', 'For job seekers wanting max visibility.'),
      priceDisplay: () => (apiPlans?.userPlans?.premium?.price?.monthly ?? 1.99).toFixed(2),
      periodDisplay: () => t('periodMo', '/mo'),
      billingText: () => `$${apiPlans?.userPlans?.premium?.price?.monthly ?? 1.99} billed monthly`,
      features: apiPlans?.userPlans?.premium?.features?.map((f) => f.title) || [
        t('createCv', 'Create CV'),
        t('applyTo10JobsPostingsDaily', 'Apply to 10 jobs postings daily'),
        t('browseJobPostingsForFree', 'Browse job postings for free'),
        t('receiveJobNotificationsBasedOnSaved', 'Receive job notifications based on saved or previously applied jobs'),
        t('featuredProfileBadgeForIncreased', 'Featured profile badge for increased employer visibility'),
        t('seeWhichCompaniesViewedYourProfile', 'See which companies viewed your profile'),
      ],
      options: [
        { label: t('monthlyPremiumOpt', `Monthly – $${apiPlans?.userPlans?.premium?.price?.monthly ?? 1.99}`), price: apiPlans?.userPlans?.premium?.price?.monthly ?? 1.99, period: t('periodMo', '/mo'), value: 'monthly' }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      badge: t('mostPopular', 'Most Popular'),
      icon: <Briefcase size={28} style={{ color: '#0d9488' }} />,
      description: t('businessDesc', 'Standard plan for growing companies.'),
      priceDisplay: (billing: string) => {
        if (billing === 'quarterly') return (apiPlans?.companyPlans?.business?.price?.quarterly ?? 79.99).toFixed(2);
        if (billing === 'annual') return (apiPlans?.companyPlans?.business?.price?.yearly ?? 279.99).toFixed(2);
        return (apiPlans?.companyPlans?.business?.price?.monthly ?? 29.99).toFixed(2);
      },
      periodDisplay: (billing: string) => {
        if (billing === 'quarterly') return t('period3Mos', '/3 mos');
        if (billing === 'annual') return t('periodYr', '/yr');
        return t('periodMo', '/mo');
      },
      billingText: (billing: string) => {
        if (billing === 'quarterly') return `Billed $${apiPlans?.companyPlans?.business?.price?.quarterly ?? 79.99} every 3 months`;
        if (billing === 'annual') return `Billed $${apiPlans?.companyPlans?.business?.price?.yearly ?? 279.99} annually`;
        return `Billed $${apiPlans?.companyPlans?.business?.price?.monthly ?? 29.99} monthly`;
      },
      features: apiPlans?.companyPlans?.business?.features?.map((f) => f.title) || [
        t('postUpTo5JobsListingsMonthly', 'Post up to 5 jobs listings monthly'),
        t('viewUpTo30Cvs', 'View up to 30 CVs'),
        t('basicCandidateFiltering', 'Basic candidate filtering'),
        t('highlight2JobPostings3Days', 'Highlight 2 job postings (3 days)'),
      ],
      options: [
        { label: t('monthlyBusinessOpt', `Monthly – $${apiPlans?.companyPlans?.business?.price?.monthly ?? 29.99} / Mo`), price: apiPlans?.companyPlans?.business?.price?.monthly ?? 29.99, period: t('periodMo', '/mo'), value: 'monthly' },
        { label: t('threeMonthsBusinessOpt', `3 Months – $${apiPlans?.companyPlans?.business?.price?.quarterly ?? 79.99} / 3 Mos`), price: apiPlans?.companyPlans?.business?.price?.quarterly ?? 79.99, period: t('period3Mos', '/3 mos'), value: 'quarterly' },
        { label: t('annualBusinessOpt', `Annual Plan – $${apiPlans?.companyPlans?.business?.price?.yearly ?? 279.99} / Yr`), price: apiPlans?.companyPlans?.business?.price?.yearly ?? 279.99, period: t('periodYr', '/yr'), value: 'annual' },
      ]
    },
    {
      id: 'business_plus',
      name: 'Business+',
      badge: t('bestValue', 'Best Value'),
      icon: <Zap size={28} style={{ color: '#ea580c' }} />,
      description: t('businessPlusDesc', 'Advanced features for scaling operations.'),
      priceDisplay: (billing: string) => {
        if (billing === 'quarterly') return (apiPlans?.companyPlans?.businessPlus?.price?.quarterly ?? 99.99).toFixed(2);
        if (billing === 'annual') return (apiPlans?.companyPlans?.businessPlus?.price?.yearly ?? 359.99).toFixed(2);
        return (apiPlans?.companyPlans?.businessPlus?.price?.monthly ?? 39.99).toFixed(2);
      },
      periodDisplay: (billing: string) => {
        if (billing === 'quarterly') return t('period3Mos', '/3 mos');
        if (billing === 'annual') return t('periodYr', '/yr');
        return t('periodMo', '/mo');
      },
      billingText: (billing: string) => {
        if (billing === 'quarterly') return `Billed $${apiPlans?.companyPlans?.businessPlus?.price?.quarterly ?? 99.99} every 3 months`;
        if (billing === 'annual') return `Billed $${apiPlans?.companyPlans?.businessPlus?.price?.yearly ?? 359.99} annually`;
        return `Billed $${apiPlans?.companyPlans?.businessPlus?.price?.monthly ?? 39.99} monthly`;
      },
      features: apiPlans?.companyPlans?.businessPlus?.features?.map((f) => f.title) || [
        t('postUpTo10JobsListingsMonthly', 'Post up to 10 jobs listings monthly'),
        t('viewUpTo50Cvs', 'View up to 50 CVs'),
        t('advancedCandidateFiltering', 'Advanced candidate filtering'),
        t('dashboardManagement', 'Dashboard management'),
        t('highlightUpTo5JobsPostings3Days', 'Highlight up to 5 jobs postings (3 days)'),
      ],
      options: [
        { label: t('monthlyBusinessPlusOpt', `Monthly – $${apiPlans?.companyPlans?.businessPlus?.price?.monthly ?? 39.99} / Mo`), price: apiPlans?.companyPlans?.businessPlus?.price?.monthly ?? 39.99, period: t('periodMo', '/mo'), value: 'monthly' },
        { label: t('threeMonthsBusinessPlusOpt', `3 Months – $${apiPlans?.companyPlans?.businessPlus?.price?.quarterly ?? 99.99} / 3 Mos`), price: apiPlans?.companyPlans?.businessPlus?.price?.quarterly ?? 99.99, period: t('period3Mos', '/3 mos'), value: 'quarterly' },
        { label: t('annualBusinessPlusOpt', `Annual Plan – $${apiPlans?.companyPlans?.businessPlus?.price?.yearly ?? 359.99} / Yr`), price: apiPlans?.companyPlans?.businessPlus?.price?.yearly ?? 359.99, period: t('periodYr', '/yr'), value: 'annual' },
      ]
    }
  ];

  const filteredPlans = plans.filter((plan) => {
    if (!user || !user.role) return true; // show all when not logged in
    if (user.role === 'user') {
      return plan.id === 'free' || plan.id === 'premium';
    }
    if (user.role === 'company') {
      return plan.id === 'business' || plan.id === 'business_plus';
    }
    return true;
  });

  const currentPlan = filteredPlans.find(p => p.id === selectedPlanId) || filteredPlans[0] || plans[2];
  const activeBilling = billingOptions[currentPlan.id] || 'monthly';

  // Calculate pricing values for summary card
  const itemPrice = currentPlan.id === 'free' ? (apiPlans?.userPlans?.free?.price?.monthly ?? 0) :
    currentPlan.id === 'premium' ? (apiPlans?.userPlans?.premium?.price?.monthly ?? 1.99) :
    currentPlan.id === 'business' ? (activeBilling === 'quarterly' ? (apiPlans?.companyPlans?.business?.price?.quarterly ?? 79.99) : activeBilling === 'annual' ? (apiPlans?.companyPlans?.business?.price?.yearly ?? 279.99) : (apiPlans?.companyPlans?.business?.price?.monthly ?? 29.99)) :
    (activeBilling === 'quarterly' ? (apiPlans?.companyPlans?.businessPlus?.price?.quarterly ?? 99.99) : activeBilling === 'annual' ? (apiPlans?.companyPlans?.businessPlus?.price?.yearly ?? 359.99) : (apiPlans?.companyPlans?.businessPlus?.price?.monthly ?? 39.99));

  const billingLabel: string = currentPlan.id === 'free' ? t('freeForever', 'Free Forever') :
    currentPlan.id === 'premium' ? t('monthlyLabel', 'Monthly') :
    activeBilling === 'quarterly' ? t('threeMonthsLabel', '3 Months') :
    activeBilling === 'annual' ? t('annualPlanLabel', 'Annual Plan') : t('monthlyLabel', 'Monthly');

  const handleCheckout = async () => {
    setLocalError(null);
    setIsSuccess(false);

    // Diagnostic logger to help developers see their session token instantly
    const activeToken = typeof window !== 'undefined' ? (localStorage.getItem('token') || localStorage.getItem('accessToken')) : null;
    console.log('[Subscription Diagnostic] Attempting checkout...');
    console.log('[Subscription Diagnostic] Logged-in User:', user);
    console.log('[Subscription Diagnostic] Active Token in LocalStorage:', activeToken);

    try {
      if (currentPlan.id === 'free') {
        const subscriptionId = apiPlans?.userPlans?.free?._id || "6a1dd49e4726acc5db960be0";
        console.log('Creating free subscriber with subscriptionId:', subscriptionId);
        
        const result = await createFreeSubscriber({
          subscriptionId: subscriptionId,
          user_id: getUserIdFromLocalStorage() || getUserIdFromRedux()
        });
        
        const response = result?.data as FreeSubscriberResponse | undefined;
        console.log('Free Subscriber POST response:', response);

        if (result?.error) {
          const errorData = result.error as ErrorResponse;
          let errMsg = errorData.data?.message || errorData.message || 'Failed to activate free account. Please try again.';
          
          const currentToken = typeof window !== 'undefined' ? (localStorage.getItem('token') || localStorage.getItem('accessToken')) : null;
          const is401 = (result.error as { status?: number })?.status === 401 || errMsg.toLowerCase().includes('unauthorized');
          
          if (is401) {
            if (currentToken && currentToken.startsWith('mock-')) {
              errMsg = 'Mock login is active. Please log in with a real registered account on the login page to subscribe.';
            } else {
              errMsg = errorData.data?.message || errorData.message || 'Unauthorized. Please make sure you are logged in with a real registered account on the login page.';
            }
          }
          
          setLocalError(errMsg);
          return;
        }

        // Extract token and subscriber ID from response
        const newToken = response?.data?.token || response?.token;
        const subscriberId =
          response?.data?.currentSubscriberId ||
          response?.data?.subscriberId ||
          response?.data?._id ||
          response?.subscriberId;

        if (newToken) {
          localStorage.setItem('subscriberToken', newToken);
          localStorage.setItem('subscribeToken', newToken);
          console.log('Free subscriber token saved.');
        }
        if (subscriberId) {
          localStorage.setItem('subscriberId', subscriberId);
        }

        // Show success or informational message
        const msg = response?.data?.message || response?.message || '';
        if (msg && msg.toLowerCase().includes('already')) {
          setLocalError(msg); // show "already has subscription" as info
        } else {
          setIsSuccess(true);
        }

        const redirectUrl = response?.url || response?.data?.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        const subscriptionId = currentPlan.id === 'premium' ? (apiPlans?.userPlans?.premium?._id || "6a1dd49e4726acc5db960be1") :
                              currentPlan.id === 'business' ? (apiPlans?.companyPlans?.business?._id || "6a1dd49e4726acc5db960be2") :
                              (apiPlans?.companyPlans?.businessPlus?._id || "6a1dd49e4726acc5db960be3");

        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const payload = {
          subscriptionId: subscriptionId,
          price: itemPrice,
          description: `${currentPlan.name} Plan - ${billingLabel} Subscription`,
          success_url: `${baseUrl}/success?sessionId={CHECKOUT_SESSION_ID}&amount=${itemPrice}&plan=${encodeURIComponent(currentPlan.name)}&billing=${encodeURIComponent(billingLabel)}`,
          cancel_url: `${baseUrl}/cancel`,
        };

        console.log('Creating checkout session with payload:', payload);
        const result = await createCheckoutSession(payload).unwrap();
        console.log('Checkout session response:', result);

        const redirectUrl = result?.data?.checkoutUrl || result?.checkoutUrl || result?.data;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          setIsSuccess(true);
        }
      }
    } catch (err: unknown) {
      console.error('Subscription creation failed:', err);
      const errorObj = err as { data?: { message?: string }; message?: string };
      setLocalError(errorObj?.data?.message || errorObj?.message || 'Subscription processing failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      {/* ✅ Payment Success Banner */}
      {paymentSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            borderRadius: '24px',
            padding: '48px 40px',
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 80px rgba(52,211,153,0.15)',
            position: 'relative',
          }}>
            {/* Close button */}
            <button
              onClick={() => setPaymentSuccess(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#94a3b8',
              }}
            >
              <X size={16} />
            </button>

            {/* Success Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #059669, #34d399)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 30px rgba(52, 211, 153, 0.5)',
            }}>
              <CheckCircle2 size={40} color="#fff" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <PartyPopper size={22} color="#fbbf24" />
              <h2 style={{ color: '#34d399', fontSize: '26px', fontWeight: 700, margin: 0 }}>
                Payment Successful!
              </h2>
              <PartyPopper size={22} color="#fbbf24" />
            </div>

            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              Your subscription has been activated. You now have access to all premium features. Welcome aboard!
            </p>

            {paymentSessionId && (
              <p style={{ color: '#475569', fontSize: '12px', marginBottom: '24px', fontFamily: 'monospace' }}>
                Session: {paymentSessionId.slice(0, 32)}...
              </p>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setPaymentSuccess(false)}
                style={{
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 28px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(52, 211, 153, 0.4)',
                }}
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      )}

      <section className={styles.section}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('chooseYourRecruitingPlan', 'Choose Your Recruiting Plan')}</h1>
            <p className={styles.subtitle}>
              {t('chooseYourRecruitingPlanSubtitle', 'Support ethical hiring and high-quality talent matchmaking. Choose the right level of access, candidate filtering, and job posting options.')}
            </p>
          </header>

          <div className={styles.mainContainer}>
            <div className={`${styles.pricingGrid} ${filteredPlans.length === 2 ? styles.twoCardsGrid : ''}`}>
              {filteredPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const billing = billingOptions[plan.id] || 'monthly';
                const hasOptions = plan.options.length > 1;

                return (
                  <div
                    key={plan.id}
                    className={`${styles.card} ${isSelected ? styles.highlightedCard : ''}`}
                  >
                    {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
                    
                    <div className={styles.cardHeader}>
                      <span className={styles.planIconWrapper}>{plan.icon}</span>
                      <h3 className={styles.planType}>{plan.name}</h3>
                    </div>
                    
                    <p className={styles.planDescription}>{plan.description}</p>
                    
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>$</span>
                      <span className={styles.price}>{plan.priceDisplay(billing)}</span>
                      <span className={styles.period}>{plan.periodDisplay(billing)}</span>
                    </div>

                    {hasOptions && (
                      <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel}>{t('billingPlanLabel', 'Billing Plan')}</label>
                        <select
                          className={styles.selectDropdown}
                          value={billing}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setBillingOptions({
                              ...billingOptions,
                              [plan.id]: e.target.value
                            });
                            // Automatically select the plan when billing is changed
                            setSelectedPlanId(plan.id);
                          }}
                        >
                          {plan.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <ul className={styles.featuresList}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          <Check className={styles.featureIcon} size={18} />
                          <span className={styles.featureText}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isSelected ? (
                      <button className={styles.currentBtn}>{t('selectedPlanLabel', 'Selected Plan')}</button>
                    ) : (
                      <button
                        className={styles.selectBtn}
                        onClick={() => setSelectedPlanId(plan.id)}
                      >
                        {t('choosePlan', 'Choose Plan')}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <h3 className={styles.summaryTitle}>{t('orderSummary', 'Order Summary')}</h3>
              </div>
              <div className={styles.summaryBody}>
                {localError && (
                  <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <AlertCircle size={18} />
                    <span>{localError}</span>
                  </div>
                )}
                
                {isSuccess && (
                  <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #34d399', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <Check size={18} />
                    <span>{t('subscriptionSuccess', 'Subscription initialized successfully!')}</span>
                  </div>
                )}

                <div className={styles.summaryItem}>
                  <span className={styles.summaryItemLabel}>{t('selectedPlanLabelText', 'Selected Plan')}</span>
                  <span className={styles.summaryItemValue}>{currentPlan.name} ({billingLabel})</span>
                </div>
                
                {currentPlan.id !== 'free' && (
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryItemLabel}>{t('basePrice', 'Base Price')}</span>
                    <span className={styles.summaryItemValue}>${itemPrice.toFixed(2)}</span>
                  </div>
                )}
                
                <div className={styles.summaryItem}>
                  <span className={styles.summaryItemLabel}>{t('halalVerification', 'Halal Verification')}</span>
                  <span className={styles.summaryItemValue}>{t('included', 'Included')}</span>
                </div>
                
                <div className={styles.summaryItem}>
                  <span className={styles.summaryItemLabel}>{t('platformFee', 'Platform Fee')}</span>
                  <span className={styles.summaryItemValue}>$0.00</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.summaryItem}>
                  <span className={styles.totalLabel}>{t('totalPayable', 'Total Payable')}</span>
                  <span className={styles.totalValue}>${itemPrice.toFixed(2)}</span>
                </div>

                <button 
                  className={styles.checkoutBtn} 
                  onClick={handleCheckout} 
                  disabled={isCheckoutLoading || isFreeLoading}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: (isCheckoutLoading || isFreeLoading) ? 'not-allowed' : 'pointer' }}
                >
                  {(isCheckoutLoading || isFreeLoading) ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> {t('processing', 'Processing...')}
                    </>
                  ) : (
                    <>
                      {currentPlan.id === 'free' ? t('startFreeAccount', 'Start Free Account') : t('continueToPayment', 'Continue to Payment')} <ArrowRight size={20} />
                    </>
                  )}
                </button>
                
                <p className={styles.secureText}>{t('safeSecureCheckout', 'SAFE & SECURE CHECKOUT PROCESSING')}</p>
              </div>
            </div>
          </div>

          <div className={styles.bottomGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className={styles.infoTitle}>{t('ethicallyVetted', 'Ethically Vetted')}</h4>
                <p className={styles.infoDesc}>
                  {t('ethicallyVettedDesc', 'Every candidate and job post is verified for skill, integrity, and alignment with ethical standards.')}
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Lock size={24} />
              </div>
              <div>
                <h4 className={styles.infoTitle}>{t('noHiddenFees', 'No Hidden Fees')}</h4>
                <p className={styles.infoDesc}>
                  {t('noHiddenFeesDesc', 'Transparent pricing structure with no recruitment success fees. Cancel or change plan anytime.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const CompanySubscriptionPage = () => (
  <React.Suspense fallback={null}>
    <CompanySubscription />
  </React.Suspense>
);

export default CompanySubscriptionPage;