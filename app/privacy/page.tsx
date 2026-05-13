'use client';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './PrivacyPage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  Shield, 
  Info, 
  Hand, 
  Lock, 
  Scale, 
  Calendar, 
  CheckCircle,
  Mail,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useGetPrivacyQuery } from '@/redux/api/privacyApi';

const PrivacyPage = () => {
  const { t } = useTranslation();
  const { data: privacyResponse, isLoading } = useGetPrivacyQuery({});
  
  const privacyHtml = privacyResponse?.data?.PrivacyPolicy || '';

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
              <span className={styles.current}>{t('privacyPolicy', 'Privacy Policy')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('privacyPolicyDataDignity', 'Privacy Policy & Data Dignity')}</h1>
            <p className={styles.subtitle}>
              {t('atHalalhireWeTreatYourPersonalInformationWithTheSameRespectAndIntegrityAsOurShariacompliantCareerMatchingYourDataIsAnExtensionOfYourPersonhood', 'At HalalHire, we treat your personal information with the same respect and \n              integrity as our Sharia-compliant career matching. Your data is an \n              extension of your personhood.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <Shield size={16} />
                <span>{t('compliantWithGlobalPrivacyStandards', 'Compliant with Global Privacy Standards')}</span>
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
            ) : privacyHtml ? (
              <div 
                className={styles.apiContent}
                dangerouslySetInnerHTML={{ __html: privacyHtml }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                {t('noPrivacyPolicyFound', 'No privacy policy found.')}
              </div>
            )}

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('questionsOrConcerns', 'Questions or Concerns?')}</h2>
              <p className={styles.contactText}>
                {t('ourDataProtectionOfficerIsAvailableToDiscussAnyConcernsRegardingYourPrivacyOrOurShariacompliantDataPractices', 'Our Data Protection Officer is available to discuss any concerns regarding your \n                privacy or our Sharia-compliant data practices.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactUs', 'Contact Us')}
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;