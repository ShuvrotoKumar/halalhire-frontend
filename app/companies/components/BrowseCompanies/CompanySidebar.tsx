'use client';
import React, { useMemo } from 'react';
import styles from './CompanySidebar.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const CompanySidebar = () => {
  const { t } = useTranslation()

  const industries = useMemo(() => [
    { name: t('islamicFinance', 'Islamic Finance'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22m5-18H8.5a3.5 3.5 0 0 0 0 7h7a3.5 3.5 0 0 1 0 7H6"></path></svg> },
    { name: t('halalFoodBev', 'Halal Food & Bev'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg> },
    { name: t('technology', 'Technology'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
    { name: t('healthcare', 'Healthcare'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> },
    { name: t('education', 'Education'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg> },
    { name: t('logistics', 'Logistics'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg> },
    { name: t('manufacturing', 'Manufacturing'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
    { name: t('ngos', 'NGOs'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
  ], [t]);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.ctaBox}>
        <div className={styles.ctaIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h3 className={styles.ctaTitle}>{t('lookingForJobs', 'Looking for Jobs?')}</h3>
        <p className={styles.ctaText}>
          {t('findHalalVerifiedCareerOpportunitiesWorldwideThatAlignWithYourValues', 'Find halal verified career opportunities worldwide that align with your values.')}
        </p>
        <Link href="/jobs" className={styles.ctaBtn}>
          {t('browseJobs', 'Browse Jobs')}
        </Link>
      </div>

      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
          </svg>
          <span className={styles.filterTitle}>{t('industryFilters', 'Industry Filters')}</span>
        </div>
        <div className={styles.filterList}>
          {industries.map((industry) => (
            <Link key={industry.name} href={`/companies?industry=${industry.name}`} className={styles.filterItem}>
              <span className={styles.filterIcon}>
                {industry.icon}
              </span>
              {industry.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CompanySidebar;
