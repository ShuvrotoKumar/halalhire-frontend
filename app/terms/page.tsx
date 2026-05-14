'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './TermsPage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  FileText,
  Calendar,
  Mail,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useGetTermsAndConditionsQuery } from '@/redux/api/termsApi';

const TermsPage = () => {
  const { t } = useTranslation();
  const { data: termsResponse, isLoading } = useGetTermsAndConditionsQuery({});
  
  const termsHtml = termsResponse?.data?.TermsConditions || '';

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
              <span className={styles.current}>{t('termsOfService', 'Terms of Service')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('termsOfService', 'Terms of Service')}</h1>
            <p className={styles.subtitle}>
              {t('bismillahByUsingHalalhireYouAgreeToAbideByOurEthicalFrameworkAndProfessionalStandardsDesignedToServeTheGlobalUmmahWithIntegrityAndExcellence', 'Bismillah. By using HalalHire, you agree to abide by our ethical framework \n              and professional standards designed to serve the global Ummah with \n              integrity and excellence.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <FileText size={16} />
                <span>{t('professionalEthicalStandards', 'Professional & Ethical Standards')}</span>
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
            ) : termsHtml ? (
              <div 
                className={styles.apiContent}
                dangerouslySetInnerHTML={{ __html: termsHtml }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                {t('noTermsFound', 'No terms and conditions found.')}
              </div>
            )}

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('needClarification', 'Need Clarification?')}</h2>
              <p className={styles.contactText}>
                {t('ifYouHaveAnyQuestionsRegardingOurTermsOfServiceOrHowTheyApplyToYourSpecificSituationPleaseReachOutToOurLegalTeam', 'If you have any questions regarding our Terms of Service or how they \n                apply to your specific situation, please reach out to our legal team.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactLegalTeam', 'Contact Legal Team')}
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;