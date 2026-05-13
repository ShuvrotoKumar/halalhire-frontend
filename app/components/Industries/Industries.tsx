"use client";

import React, { useMemo } from 'react';
import styles from './Industries.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const Industries = () => {
  const { t } = useTranslation();

  const industries = useMemo(() => [
    { id: 1, name: t('technology', 'Technology'), count: t('450Positions', '450+ Positions'), bgImage: '/i1.png' },
    { id: 2, name: t('finance', 'Finance'), count: t('120Positions', '120+ Positions'), bgImage: '/i2.png' },
    { id: 3, name: t('healthcare', 'Healthcare'), count: t('85Positions', '85+ Positions'), bgImage: '/i3.png' },
    { id: 4, name: t('education', 'Education'), count: t('60Positions', '60+ Positions'), bgImage: '/i4.png' },
    { id: 5, name: t('marketingDesign', 'Marketing & Design'), count: t('creativityWithPurpose', 'Creativity with purpose.'), bgImage: '/i5.png' },
  ], [t]);

  return (
    <section className={`section ${styles.industriesSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('industriesSectors', 'Industries & Sectors')}</h2>
          <p className={styles.subtitle}>
            {t('discoverOpportunitiesAcrossDiverseProfessionalFieldsCommittedToEthicalStandards', 'Discover opportunities across diverse professional fields committed to ethical standards.')}
          </p>
        </div>

        <div className={styles.grid}>
          {industries.map((ind) => (
            <Link
              key={ind.id}
              href={`/jobs?industry=${ind.name}`}
              className={styles.industryCard}
            >
              <Image
                src={ind.bgImage}
                alt={ind.name}
                fill
                className={styles.bgImage}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.overlay}></div>

              <div className={styles.cardContent}>
                <h3 className={styles.industryName}>{ind.name}</h3>
                <p className={styles.positionCount}>{ind.count}</p>
                <div className={styles.viewJobsWrapper}>
                  <span className={styles.viewJobsText}>{t('viewJobs', 'VIEW JOBS')}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.viewAllWrapper}>
          <Link href="/industries" className={styles.viewAllBtn}>{t('viewAllIndustries', 'View All Industries')}</Link>
        </div>
      </div>
    </section>
  );
};

export default Industries;
