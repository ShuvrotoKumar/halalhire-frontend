'use client';
import React from 'react';
import styles from './IndustryCTA.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const IndustryCTA = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2 className={styles.title}>{t('cantFindYourIndustry', 'Can\'t find your industry?')}</h2>
            <p className={styles.description}>
              {t('ourNetworkIsGrowingEveryDayBrowseOurCompleteCatalogOfOver1200JobOpeningsFromVettedEmployersGlobally', 'Our network is growing every day. Browse our complete catalog of\n              over 1,200 job openings from vetted employers globally.')}
            </p>
            
            <div className={styles.btnGroup}>
              <Link href="/jobs" className={styles.btnBrowse}>
                {t('browseAllJobs', 'Browse All Jobs')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
              <Link href="/contact" className={styles.btnContact}>{t('contactSupport', 'Contact Support')}</Link>
            </div>
          </div>
          
          {/* Decorative stamp/seal as seen in the mockup design */}
          <div className={styles.stampDeco}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" opacity="0.1">
               <path d="M50 5 L60 15 L74 15 L78 28 L90 35 L85 48 L90 62 L78 68 L74 81 L60 81 L50 91 L40 81 L26 81 L22 68 L10 62 L15 48 L10 35 L22 28 L26 15 L40 15 Z" stroke="#193f35" strokeWidth="3" strokeLinejoin="round"/>
               <circle cx="50" cy="48" r="15" stroke="#193f35" strokeWidth="3"/>
               <path d="M44 48 L48 52 L56 44" stroke="#193f35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryCTA;
