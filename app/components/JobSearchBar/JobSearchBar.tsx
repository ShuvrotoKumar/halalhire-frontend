"use client";

import React from 'react';
import styles from './JobSearchBar.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const JobSearchBar = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.searchBar}>
      <div className={styles.inputGroup}>
        <span className={styles.icon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input 
          type="text" 
          placeholder={t('jobTitleKeywordsOrCompany', 'Job title, keywords, or company')} 
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.icon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </span>
        <input 
          type="text" 
          placeholder={t('cityStateOrRemote', 'City, state, or remote')} 
          className={styles.input}
        />
      </div>
      <Link href="/jobs" className={styles.findButton}>
        {t('findJobs', 'Find Jobs')}
      </Link>
    </div>
  );
};

export default JobSearchBar;
