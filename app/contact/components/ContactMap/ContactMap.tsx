'use client';
import React from 'react';
import styles from './ContactMap.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'

const ContactMap = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.mapCard}>
      <div className={styles.imageWrapper}>
        <Image 
          src="/map-placeholder.png" 
          alt={t('halalhireHeadquartersLocation', 'HalalHire Headquarters location')} 
          fill
          style={{ objectFit: 'cover' }}
          className={styles.mapImage}
        />
        <div className={styles.overlay}></div>
        <div className={styles.hqBadge}>
          <div className={styles.hqIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <span>{t('ourHq', 'Our HQ')}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
