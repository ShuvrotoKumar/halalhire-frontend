'use client';
import React from 'react';
import styles from './BrowsePagination.module.css';
import { useTranslation } from 'react-i18next'

const BrowsePagination = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.pagination}>
      <button className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button className={`${styles.page} ${styles.active}`}>1</button>
      <button className={styles.page}>2</button>
      <button className={styles.page}>3</button>
      
      <span className={styles.dots}>{t('key2', '...')}</span>
      
      <button className={styles.page}>12</button>
      
      <button className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default BrowsePagination;
