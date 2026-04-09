'use client';
import React from 'react';
import styles from './CompanyDetailsHero.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

interface CompanyDetailsHeroProps {
  company: {
    name: string;
    location: string;
    industry: string;
    employees: string;
    founded: string;
    logo: string;
    banner: string;
  };
}

const CompanyDetailsHero: React.FC<CompanyDetailsHeroProps> = ({ company }) => {
  const { t } = useTranslation()
  return (
    <div className="container">
      <div className={styles.breadcrumb}>
        <Link href="/">{t('home', 'Home')}</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <Link href="/companies">{t('companies', 'Companies')}</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>{company.name}</span>
      </div>

      <div className={styles.hero}>
        <Image
          src="/cd1.png"
          alt={company.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className={styles.heroContent}>
          <div className={styles.companyInfoWrapper}>
            <div className={styles.infoLeft}>
              <div className={styles.logoBox}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#193f35" strokeWidth="1.5">
                  <path d="M12 7V3m0 0l4 2m-4-2L8 5m4 2l4-2m-4 2L8 5m4 12v4m0 0l4-2m-4 2l-4-2m4 2l4 2m-4-2l-4 2M3 12h18M6 12l1-4h10l1 4M5 12l2 8h10l2-8"></path>
                </svg>
              </div>
              <div className={styles.details}>
                <h1 className={styles.title}>{company.name}</h1>
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22m5-18H8.5a3.5 3.5 0 0 0 0 7h7a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    {company.industry}
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {company.location}
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    {company.employees}
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>{t('foundedFounded', 'Founded {{founded}}', { founded: company.founded })}</div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/jobs" className={styles.viewJobsBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                {t('viewOpenJobs', 'View Open Jobs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsHero;
