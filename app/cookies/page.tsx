'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './CookiePage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  ShieldCheck,
  Calendar,
  Mail,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useGetCookiesQuery } from '@/redux/api/privacyApi';

const CookiePage = () => {
  const { t } = useTranslation();
  const { data: cookieResponse, isLoading, error } = useGetCookiesQuery({});
  
  // Extract policy taking into account potential API double-wrapping
  const cookieHtml = cookieResponse?.data?.data?.cookiePolicy || cookieResponse?.data?.cookiePolicy || '';
  
  // Handle error state
  if (error) {
    console.error('Error fetching cookie policy:', error);
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <main className={styles.mainContent}>
        {/* Header Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <nav className={styles.breadcrumbs}>
              <Link href="/">{t('home', 'Home')}</Link>
              <ChevronRight size={14} className={styles.separator} />
              <span className={styles.current}>{t('cookiePolicy', 'Cookie Policy')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('cookiePolicy', 'Cookie Policy')}</h1>
            <p className={styles.subtitle}>
              {t('thisPolicyExplainsHowHalalhireUsesCookiesAndSimilarTechnologiesToProvideCustomizeEvaluateAndImproveOurEthicalServices', 'This policy explains how HalalHire uses cookies and similar technologies \n              to provide, customize, evaluate, and improve our ethical services.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <ShieldCheck size={16} />
                <span>{t('respectingYourDigitalPresence', 'Respecting Your Digital Presence')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container">
          <div className={styles.contentArea}>
            
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0', color: 'var(--bg-primary)' }}>
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : cookieHtml ? (
              <div 
                className={styles.apiContent}
                dangerouslySetInnerHTML={{ __html: cookieHtml }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                {t('noCookiePolicyFound', 'No cookie policy found.')}
              </div>
            )}

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('needMoreInfo', 'Need more info?')}</h2>
              <p className={styles.contactText}>
                {t('ifYouHaveAnyQuestionsAboutOurUseOfCookiesOrOtherTechnologiesPleaseEmailOurTechnicalSupportTeam', 'If you have any questions about our use of cookies or other technologies, \n                please email our technical support team.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactSupport', 'Contact Support')}
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePage;