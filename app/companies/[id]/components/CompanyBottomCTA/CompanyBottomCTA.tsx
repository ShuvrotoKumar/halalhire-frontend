'use client';
import React from 'react';
import styles from './CompanyBottomCTA.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const CompanyBottomCTA = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.title}>{t('readyToBuildYourCareerWithEthicalEmployers', 'Ready to build your career with ethical employers?')}</h2>
          <p className={styles.subtitle}>{t('joinThousandsOfProfessionalsFindingShariacompliantWorkplacesToday', 'Join thousands of professionals finding Sharia-compliant workplaces today.')}</p>
          <div className={styles.actions}>
            <Link href="/jobs" className={styles.browseBtn}>
              {t('browseJobs', 'Browse Jobs')}
            </Link>
            <Link href="/signup" className={styles.createBtn}>
              {t('createProfile', 'Create Profile')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyBottomCTA;
