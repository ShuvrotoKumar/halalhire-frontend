'use client';

import React, { useMemo } from 'react';
import styles from './FeaturedJobs.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

const FeaturedJobs = () => {
  const { t } = useTranslation()
  const { openApplyModal } = useModal();

  const jobs = useMemo(() => [
    {
      id: 1,
      title: t('seniorSoftwareEngineer', 'Senior Software Engineer'),
      company: t('techHalalSolutions', 'TechHalal Solutions'),
      location: t('berlinGermany', 'Berlin, Germany'),
      salary: t('85k95k', '€85k - €95k'),
      image: '/f1.png',
    },
    {
      id: 2,
      title: t('clinicalLead', 'Clinical Lead'),
      company: t('mercyHealthcare', 'Mercy Healthcare'),
      location: t('londonUk', 'London, UK'),
      salary: t('35k45k', '€35k - €45k'),
      image: '/f2.png',
    },
    {
      id: 3,
      title: t('financialAnalyst', 'Financial Analyst'),
      company: t('islamicFinanceCorp', 'Islamic Finance Corp'),
      location: t('dubaiUae', 'Dubai, UAE'),
      salary: t('55k65k', '€55k - €65k'),
      image: '/f3.png',
    },
    {
      id: 4,
      title: t('financialAnalyst', 'Financial Analyst'),
      company: t('islamicFinanceCorp', 'Islamic Finance Corp'),
      location: t('dubaiUae', 'Dubai, UAE'),
      salary: t('55k65k', '€55k - €65k'),
      image: '/f4.png',
    },
    {
      id: 5,
      title: t('logisticsManager', 'Logistics Manager'),
      company: t('halalLogix Global', 'HalalLogix Global'),
      location: t('istanbulTr', 'Istanbul, TR'),
      salary: t('40k50k', '€40k - €50k'),
      image: '/f5.png',
    },
    {
      id: 6,
      title: t('seniorProjectManager', 'Senior Project Manager'),
      company: t('imanCreativeLab', 'Iman Creative Lab'),
      location: t('kualaLumpurMy', 'Kuala lumpur, MY'),
      salary: t('8k12k', '€8k - €12k'),
      image: '/f6.png',
    },
  ], [t]);

  return (
    <section className={`section ${styles.jobsSection}`}>

      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('featuredEthicalOpportunities', 'Featured Ethical Opportunities')}</h2>
          <p className={styles.subtitle}>
            {t('aCuratedSelectionOfVerifiedRolesAlignedWithOurStandards', 'A curated selection of verified roles aligned with our standards.')}
          </p>
        </div>

        <div className={styles.grid}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.cardHeader}>
                <div className={styles.logoCont}>
                  <Link href="/">
                    <Image src="/logo.png" alt={t('halalhireLogo', 'HalalHire Logo')} width={80} height={24} style={{ objectFit: 'contain' }} />
                  </Link>
                </div>
                <span className={styles.featuredBadge}>{t('featured', 'FEATURED')}</span>
              </div>

              <div className={styles.mainContent}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                
                <div className={styles.imageWrapper}>
                  <Image src={job.image} alt={job.title} fill style={{objectFit: 'cover'}} />
                </div>
                
                <h4 className={styles.companyName}>{job.company}</h4>
                
                <div className={styles.jobMeta}>
                  <div className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {job.location}
                  </div>
                  <div className={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    {job.salary}
                  </div>
                </div>
              </div>

              <div className={styles.cardActions}>
                <Link href={`/jobs/${job.id}`} className={styles.btnView}>{t('viewDetails', 'View Details')}</Link>
                <button 
                  onClick={() => openApplyModal({ ...job, logo: '/logo.png' })} 
                  className={styles.btnApply}
                >
                  {t('applyNow', 'Apply Now')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAllWrapper}>
          <Link href="/jobs" className={styles.btnViewAll}>{t('viewAllJobs', 'View All Jobs')}</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
