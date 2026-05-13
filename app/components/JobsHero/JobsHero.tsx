"use client";

import React from 'react';
import styles from './JobsHero.module.css';
import JobSearchBar from '@/app/components/JobSearchBar/JobSearchBar';
import { useTranslation, Trans } from 'react-i18next'

const JobsHero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.title}><Trans i18nKey="browseSpanhalalJobsspan">Browse <span>Halal Jobs</span></Trans></h1>
        <p className={styles.subtitle}>
          {t('findEthicalCareerOpportunitiesAlignedWithYourValues', 'Find ethical career opportunities aligned with your values')}
        </p>
      </div>
      <div className={styles.searchContainer}>
        <JobSearchBar />
      </div>
    </section>
  );
};

export default JobsHero;
