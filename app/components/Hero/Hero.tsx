"use client";

import React from 'react';
import styles from './Hero.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src="/hero.png"
          alt={t('heroImage', 'Hero Image')}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: -1 }}
        />
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={`container ${styles.heroContent}`}>
        <h1 className={`${styles.title} animate-fade-in delay-1`}><Trans i18nKey="findYourBrSpanClassnamestylesgoldtexthalalCareerspanBrWithConfidence">Find Your <br />
          <span className={styles.goldText}>Halal Career</span> <br />
          with Confidence</Trans></h1>

        <div className={`${styles.badgeWrapper} animate-fade-in delay-2`}>
          <div className={styles.trustBadge}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.trustIcon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{t('theUmmahsTrustedJobNetwork', 'The Ummah\'s Trusted Job Network.')}</span>
          </div>
        </div>

        <div className={`${styles.features} animate-fade-in delay-3`}>
          <div className={styles.featureItem}><Trans i18nKey="spanClassnamestylescheckiconspanHalalverifiedJobs"><span className={styles.checkIcon}>✓</span> Halal-Verified Jobs</Trans></div>
          <div className={styles.featureItem}><Trans i18nKey="spanClassnamestylescheckiconspanPrayerOpportunities"><span className={styles.checkIcon}>✓</span> Prayer Opportunities</Trans></div>
          <div className={styles.featureItem}><Trans i18nKey="spanClassnamestylescheckiconspanIslamicEthicBasedStandards"><span className={styles.checkIcon}>✓</span> Islamic Ethic Based Standards</Trans></div>
          <div className={styles.featureItem}><Trans i18nKey="spanClassnamestylescheckiconspanGlobalOpportunities"><span className={styles.checkIcon}>✓</span> Global Opportunities</Trans></div>
        </div>

        <div className={`${styles.searchBox} animate-fade-in delay-3`}>
          <div className={styles.searchInput}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder={t('jobTitleKeywords', 'Job title, keywords...')} />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.searchInput}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input type="text" placeholder={t('cityOrCountry', 'City or country')} />
          </div>
          <Link href="/jobs" className={styles.searchBtn}>
            {t('findJobs', 'Find Jobs')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
