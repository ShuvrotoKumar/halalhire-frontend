'use client';

import React from 'react';
import styles from './JobCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

interface JobCardProps {
  job: {
    id: string | number;
    title: string;
    company: string;
    location: string;
    salary: string;
    posted: string;
    tags: string[];
    logo: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { t } = useTranslation()
  const { openApplyModal } = useModal();

  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <Image src={job.logo} alt={job.company} width={64} height={64} objectFit="contain" />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{job.title}</h3>
            <span className={styles.company}>{job.company}</span>
          </div>
          <div className={styles.bookmark}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {job.location}
          </div>
          <div className={styles.metaItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            {job.salary}
          </div>
          <div className={styles.metaItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {job.posted}
          </div>
        </div>

        <div className={styles.tags}>
          <span className={`${styles.tag} ${styles.tagHours}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {t('prayerRoom', 'Prayer Room')}
          </span>
          <span className={`${styles.tag} ${styles.tagVerified}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {t('halalFood', 'Halal Food')}
          </span>
          {job.title.includes('Compliance') && (
            <span className={`${styles.tag} ${styles.tagNursery}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
              {t('nurseryRoom', 'Nursery Room')}
            </span>
          )}
          <span className={`${styles.tag} ${styles.tagReligion}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            {t('motherFriendlyHours', 'Mother Friendly Hours')}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => openApplyModal(job)}
          className={styles.btnApply}
        >
          {t('applyNow', 'Apply Now')}
        </button>
        <Link href={`/jobs/${job.id}`} className={styles.btnDetails}>{t('viewDetails', 'View Details')}</Link>
      </div>
    </div>
  );
};

export default JobCard;
