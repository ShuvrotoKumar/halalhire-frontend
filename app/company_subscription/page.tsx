"use client";

import React, { useState } from 'react';
import styles from './company_subscription.module.css';
import { Check, ArrowRight, ShieldCheck, Lock, Star, Sparkles, Briefcase, Zap } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useTranslation } from 'react-i18next';

const CompanySubscription = () => {
  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState('business');
  const [billingOptions, setBillingOptions] = useState<Record<string, string>>({
    business: 'monthly',
    business_plus: 'monthly',
  });

  const plans = [
    {
      id: 'free',
      name: 'Free',
      badge: t('starter', 'Starter'),
      icon: <Star size={28} style={{ color: '#94a3b8' }} />,
      description: t('freeDesc', 'Ideal for job seekers starting out.'),
      priceDisplay: () => '0.00',
      periodDisplay: () => t('periodMo', '/mo'),
      billingText: t('freeForever', 'Free Forever'),
      features: [
        t('createCv', 'Create CV'),
        t('applyTo2JobPostingsDaily', 'Apply to 2 job postings daily'),
        t('browseJobPostingsForFree', 'Browse job postings for free'),
      ],
      options: [
        { label: t('freePlanOpt', 'Free Plan'), price: 0, period: t('periodMo', '/mo'), value: 'monthly' }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: t('individualPro', 'Individual Pro'),
      icon: <Sparkles size={28} style={{ color: '#c5a56e' }} />,
      description: t('premiumDesc', 'For job seekers wanting max visibility.'),
      priceDisplay: () => '1.99',
      periodDisplay: () => t('periodMo', '/mo'),
      billingText: '$1.99 billed monthly',
      features: [
        t('createCv', 'Create CV'),
        t('applyTo10JobsPostingsDaily', 'Apply to 10 jobs postings daily'),
        t('browseJobPostingsForFree', 'Browse job postings for free'),
        t('receiveJobNotificationsBasedOnSaved', 'Receive job notifications based on saved or previously applied jobs'),
        t('featuredProfileBadgeForIncreased', 'Featured profile badge for increased employer visibility'),
        t('seeWhichCompaniesViewedYourProfile', 'See which companies viewed your profile'),
      ],
      options: [
        { label: t('monthlyPremiumOpt', 'Monthly – $1.99'), price: 1.99, period: t('periodMo', '/mo'), value: 'monthly' }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      badge: t('mostPopular', 'Most Popular'),
      icon: <Briefcase size={28} style={{ color: '#0d9488' }} />,
      description: t('businessDesc', 'Standard plan for growing companies.'),
      priceDisplay: (billing: string) => {
        if (billing === 'quarterly') return '79.99';
        if (billing === 'annual') return '279.99';
        return '29.99';
      },
      periodDisplay: (billing: string) => {
        if (billing === 'quarterly') return t('period3Mos', '/3 mos');
        if (billing === 'annual') return t('periodYr', '/yr');
        return t('periodMo', '/mo');
      },
      billingText: (billing: string) => {
        if (billing === 'quarterly') return 'Billed $79.99 every 3 months';
        if (billing === 'annual') return 'Billed $279.99 annually';
        return 'Billed $29.99 monthly';
      },
      features: [
        t('postUpTo5JobsListingsMonthly', 'Post up to 5 jobs listings monthly'),
        t('viewUpTo30Cvs', 'View up to 30 CVs'),
        t('basicCandidateFiltering', 'Basic candidate filtering'),
        t('highlight2JobPostings3Days', 'Highlight 2 job postings (3 days)'),
      ],
      options: [
        { label: t('monthlyBusinessOpt', 'Monthly – $29.99 / Mo'), price: 29.99, period: t('periodMo', '/mo'), value: 'monthly' },
        { label: t('threeMonthsBusinessOpt', '3 Months – $79.99 / 3 Mos'), price: 79.99, period: t('period3Mos', '/3 mos'), value: 'quarterly' },
        { label: t('annualBusinessOpt', 'Annual Plan – $279.99 / Yr'), price: 279.99, period: t('periodYr', '/yr'), value: 'annual' },
      ]
    },
    {
      id: 'business_plus',
      name: 'Business+',
      badge: t('bestValue', 'Best Value'),
      icon: <Zap size={28} style={{ color: '#ea580c' }} />,
      description: t('businessPlusDesc', 'Advanced features for scaling operations.'),
      priceDisplay: (billing: string) => {
        if (billing === 'quarterly') return '99.99';
        if (billing === 'annual') return '359.99';
        return '39.99';
      },
      periodDisplay: (billing: string) => {
        if (billing === 'quarterly') return t('period3Mos', '/3 mos');
        if (billing === 'annual') return t('periodYr', '/yr');
        return t('periodMo', '/mo');
      },
      billingText: (billing: string) => {
        if (billing === 'quarterly') return 'Billed $99.99 every 3 months';
        if (billing === 'annual') return 'Billed $359.99 annually';
        return 'Billed $39.99 monthly';
      },
      features: [
        t('postUpTo10JobsListingsMonthly', 'Post up to 10 jobs listings monthly'),
        t('viewUpTo50Cvs', 'View up to 50 CVs'),
        t('advancedCandidateFiltering', 'Advanced candidate filtering'),
        t('dashboardManagement', 'Dashboard management'),
        t('highlightUpTo5JobsPostings3Days', 'Highlight up to 5 jobs postings (3 days)'),
      ],
      options: [
        { label: t('monthlyBusinessPlusOpt', 'Monthly – $39.99 / Mo'), price: 39.99, period: t('periodMo', '/mo'), value: 'monthly' },
        { label: t('threeMonthsBusinessPlusOpt', '3 Months – $99.99 / 3 Mos'), price: 99.99, period: t('period3Mos', '/3 mos'), value: 'quarterly' },
        { label: t('annualBusinessPlusOpt', 'Annual Plan – $359.99 / Yr'), price: 359.99, period: t('periodYr', '/yr'), value: 'annual' },
      ]
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlanId) || plans[2];
  const activeBilling = billingOptions[currentPlan.id] || 'monthly';

  // Calculate pricing values for summary card
  const itemPrice = currentPlan.id === 'free' ? 0 :
    currentPlan.id === 'premium' ? 1.99 :
    currentPlan.id === 'business' ? (activeBilling === 'quarterly' ? 79.99 : activeBilling === 'annual' ? 279.99 : 29.99) :
    (activeBilling === 'quarterly' ? 99.99 : activeBilling === 'annual' ? 359.99 : 39.99);

  const billingLabel = currentPlan.id === 'free' ? t('freeForever', 'Free Forever') :
    currentPlan.id === 'premium' ? t('monthlyLabel', 'Monthly') :
    activeBilling === 'quarterly' ? t('threeMonthsLabel', '3 Months') :
    activeBilling === 'annual' ? t('annualPlanLabel', 'Annual Plan') : t('monthlyLabel', 'Monthly');

  return (
    <>
      <Navbar />
      <section className={styles.section}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('chooseYourRecruitingPlan', 'Choose Your Recruiting Plan')}</h1>
            <p className={styles.subtitle}>
              {t('chooseYourRecruitingPlanSubtitle', 'Support ethical hiring and high-quality talent matchmaking. Choose the right level of access, candidate filtering, and job posting options.')}
            </p>
          </header>

          <div className={styles.mainContainer}>
            <div className={styles.pricingGrid}>
              {plans.map((plan) => {
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
                          onChange={(e) => {
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

                <button className={styles.checkoutBtn}>
                  {currentPlan.id === 'free' ? t('startFreeAccount', 'Start Free Account') : t('continueToPayment', 'Continue to Payment')} <ArrowRight size={20} />
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

export default CompanySubscription;
