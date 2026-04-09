'use client';
import React from 'react';
import styles from './CompanyListCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

interface CompanyListCardProps {
  company: {
    id: string | number;
    logo: string;
    name: string;
    industry: string;
    badges: string[];
    description: string;
    features: {
      prayerRoom: boolean;
      halalFood: boolean;
      nurseryRoom: boolean;
      motherFriendly: boolean;
    };
    openRoles: string | number;
    staffCount: string;
  };
}

const CompanyListCard: React.FC<CompanyListCardProps> = ({ company }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <Image src={company.logo} alt={company.name} width={40} height={40} objectFit="contain" />
        </div>
        <div className={styles.infoContent}>
          <h3>{company.name}</h3>
          <span className={styles.industry}>{company.industry}</span>
        </div>
      </div>

      <div className={styles.badgeRemote}>{t('remoteFriendly', 'REMOTE FRIENDLY')}</div>

      <p className={styles.description}>{company.description}</p>

      <div className={styles.tags}>
        <div className={`${styles.tag} ${company.features.prayerRoom ? styles.tagActive : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          {t('prayerRoom2', 'PRAYER ROOM')}
        </div>
        <div className={`${styles.tag} ${company.features.halalFood ? styles.tagHighlight : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
          {t('halalFood2', 'HALAL FOOD')}
        </div>
        <div className={`${styles.tag} ${company.features.nurseryRoom ? styles.tagActive : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          {t('nurseryRoom2', 'NURSERY ROOM')}
        </div>
        <div className={`${styles.tag} ${company.features.motherFriendly ? styles.tagHighlight : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {t('motherFriendly2', 'MOTHER FRIENDLY')}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.statsRow}>
        <span className={styles.statLabel}>{t('openrolesOpenRoles', '{{openRoles}} OPEN ROLES', { openRoles: company.openRoles })}</span>
        <span className={styles.statLabel}>{t('staffcountStaff', '{{staffCount}} STAFF', { staffCount: company.staffCount })}</span>
      </div>

      <div className={styles.actions}>
        <Link href={`/companies/${company.id}`} className={styles.viewProfile}>
          {t('viewProfile', 'View Profile')}
        </Link>
        <Link href={`/jobs?company=${company.id}`} className={styles.seeJobs}>
          {t('seeJobs', 'See Jobs')}
        </Link>
      </div>
    </div>
  );
};

export default CompanyListCard;
