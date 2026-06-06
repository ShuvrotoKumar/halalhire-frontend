'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useGetFreeSubscriberQuery } from '@/redux/api/allSubscriberApi';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './CompanyActiveSubscriptions.module.css';
import { Loader2, ArrowRight, CheckCircle2, Package, CalendarDays, Clock, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CompanyActiveSubscriptions() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  
  // Try to get userId
  let userId = undefined;
  if (typeof window !== 'undefined') {
      let token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (token) {
        if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            userId = payload.userId || payload._id || payload.id || undefined;
        } catch(e) {}
      }
  }

  // fallback for mock user or from redux
  if (!userId && user) {
    userId = (user as any)?._id || (user as any)?.id || (user as any)?.userId || "664a78b5e4b0c5d2e3f4a5b6"; 
  }

  const { data: freeSubscriberResponse, isLoading, isError } = useGetFreeSubscriberQuery(
    userId ? { user_id: userId, user_type: user?.role || 'company' } : undefined,
    { skip: !userId }
  );

  const [hasRedirected, setHasRedirected] = useState(false);

  // Extract subscriptions
  let subscriptions: any[] = [];
  if (freeSubscriberResponse) {
      if (Array.isArray(freeSubscriberResponse.data)) {
          subscriptions = freeSubscriberResponse.data;
      } else if (Array.isArray(freeSubscriberResponse.data?.data)) {
          subscriptions = freeSubscriberResponse.data.data;
      } else if (freeSubscriberResponse.data) {
          subscriptions = [freeSubscriberResponse.data];
      } else {
          subscriptions = [freeSubscriberResponse];
      }
  }

  // Filter valid ones
  const validSubscriptions = subscriptions.filter(sub => sub && (sub._id || sub.subscriberId || sub.token || sub.subscriptionPlanId || sub.planName || sub.plan));

  useEffect(() => {
    if (!isLoading && !hasRedirected) {
      if (!freeSubscriberResponse || validSubscriptions.length === 0 || isError) {
        alert("You don't have any active subscriptions. Please purchase a package first.");
        setHasRedirected(true);
        router.push('/company_subscription');
      }
    }
  }, [isLoading, freeSubscriberResponse, validSubscriptions, isError, hasRedirected, router]);

  const handleContinue = (sub: any) => {
    const token = sub.token || freeSubscriberResponse?.token || freeSubscriberResponse?.data?.token;
    const subscriberId = sub.subscriberId || sub._id || sub.id;
    
    if (token) {
      localStorage.setItem('subscriberToken', token);
      localStorage.setItem('subscribeToken', token);
    }
    if (subscriberId) {
      localStorage.setItem('subscriberId', subscriberId);
    }
    
    router.push('/company_profile');
  };

  if (isLoading || hasRedirected) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <div className={styles.loaderContainer}>
          <Loader2 className="animate-spin" size={48} />
          <p>Checking active subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Your Subscriptions</h1>
        <p className={styles.subtitle}>Select an active subscription to access your company profile.</p>

        <div className={styles.grid}>
            {validSubscriptions.map((sub, index) => {
              // Try to find a meaningful name
              let planName = sub.pricing?.data?.name || sub.planName || sub.subscriptionName || sub.plan || 'Premium Package';
              if (typeof planName === 'object' && planName.name) planName = planName.name;
              
              const isActive = sub.isActive !== false;

              return (
                <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                    <Package size={24} />
                    </div>
                    <div>
                    <h3 className={styles.planName}>{String(planName)}</h3>
                    <div className={styles.status} style={!isActive ? { backgroundColor: '#fef2f2', color: '#ef4444' } : {}}>
                        <CheckCircle2 size={14} /> {isActive ? 'Active' : 'Inactive'}
                    </div>
                    </div>
                </div>
                
                <div style={{ flex: 1 }}></div>

                <button 
                    className={styles.continueBtn}
                    onClick={() => handleContinue(sub)}
                >
                    Continue to Profile <ArrowRight size={18} />
                </button>
                </div>
              );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
