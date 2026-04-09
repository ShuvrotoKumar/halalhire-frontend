"use client";

import React from 'react';
import styles from './JobDetailsHeader.module.css';
import { useTranslation } from 'react-i18next'

const JobDetailsHeader = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.headerCard}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0L12.9389 2.06107L16.4894 1.58359L17.9389 4.81641L21 6.54508L20.4894 10L21 13.4549L17.9389 15.1836L16.4894 18.4164L12.9389 17.9389L10 20L7.06107 17.9389L3.51056 18.4164L2.06107 15.1836L-1 13.4549L-0.489435 10L-1 6.54508L2.06107 4.81641L3.51056 1.58359L7.06107 2.06107L10 0Z" fill="#FEEE96"/>
            <path d="M14 7L8.5 12.5L6 10" stroke="#193f35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles.badgeText}>{t('halalVerified2', 'HALAL VERIFIED')}</span>
        </div>
        
        <h1 className={styles.title}>{t('seniorIslamicFinanceAnalyst', 'Senior Islamic Finance Analyst')}</h1>
        
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            {t('ethicalWealthManagement', 'Ethical Wealth Management')}
          </div>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {t('mayfairLondonHybrid', 'Mayfair, London (Hybrid)')}
          </div>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
            {t('85000110000', '£85,000 - £110,000')}
          </div>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {t('fulltime', 'Full-time')}
          </div>
        </div>
      </div>
      
      <div className={styles.logoContainer}>
        <div className={styles.companyLogo}>
          {/* Logo mockup based on design */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4 C12 15 8 22 8 28 C8 34.627 13.373 40 20 40 C26.627 40 32 34.627 32 28 C32 22 28 15 20 4 Z" stroke="#E49E21" strokeWidth="1.5" fill="none"/>
            <path d="M20 12 C16 18 14 23 14 28 C14 31.3 16.7 34 20 34 C23.3 34 26 31.3 26 28 C26 23 24 18 20 12 Z" stroke="#E49E21" strokeWidth="1.5" fill="none"/>
            <circle cx="20" cy="28" r="2" fill="#E49E21"/>
          </svg>
          <span className={styles.logoText}>{t('company2', 'COMPANY')}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsHeader;
