'use client';
import React from 'react';
import styles from './FeaturedCompanyCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

interface FeaturedCompanyCardProps {
  company: {
    id: string | number;
    logo: string;
    name: string;
    industry: string;
    location: string;
    description: string;
    jobs: string;
    team: string;
    est: string;
  };
}

const FeaturedCompanyCard: React.FC<FeaturedCompanyCardProps> = ({ company }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.card}>
      <div className={styles.badge}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        {t('halalVerified2', 'HALAL VERIFIED')}
      </div>

      <div className={styles.logoWrapper}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src='/cd1.png' alt={company.name} fill style={{ objectFit: 'contain' }} />
        </div>
      </div>

      <h3 className={styles.companyName}>{company.name}</h3>
      <div className={styles.industry}>{company.industry}</div>
      <div className={styles.location}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        {company.location}
      </div>

      <p className={styles.description}>{company.description}</p>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{company.jobs}</span>
          <span className={styles.statLabel}>{t('jobs2', 'JOBS')}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{company.team}</span>
          <span className={styles.statLabel}>{t('team2', 'TEAM')}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{company.est}</span>
          <span className={styles.statLabel}>{t('est', 'EST.')}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href={`/companies/${company.id}`} className={styles.viewCompany}>
          {t('viewCompany', 'View Company')}
        </Link>
        <Link href={`/jobs?company=${company.id}`} className={styles.viewJobs}>
          {t('viewJobs2', 'View Jobs')}
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCompanyCard;
