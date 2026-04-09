"use client";

import React from 'react';
import styles from './JobDetailsMatch.module.css';
import { useTranslation } from 'react-i18next'

const JobDetailsMatch = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.matchCard}>
      <div className={styles.ringContainer}>
        <svg viewBox="0 0 100 100" className={styles.progressRing}>
          <circle cx="50" cy="50" r="45" className={styles.ringBackground} />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            className={styles.ringProgress} 
            strokeDasharray="283" 
            strokeDashoffset="14" /* 95% of 283 */
          />
        </svg>
        <div className={styles.ringText}>
          <span className={styles.percentage}>{t('95', '95%')}</span>
          <span className={styles.label}>{t('match', 'MATCH')}</span>
        </div>
      </div>
      
      <div className={styles.textContent}>
        <h3 className={styles.title}>{t('exceptionalCareerAlignment', 'Exceptional Career Alignment')}</h3>
        <p className={styles.description}>
          {t('yourExtensiveExperienceInShariacompliantAuditingAndIslamicEquityMarketsMatches45OfTheCoreRequirementsForThisLeadershipRoleYourPreviousTenureAtAlbarakaGroupSpecificallyAlignsWithOurInstitutionalStandards', 'Your extensive experience in Sharia-compliant auditing and Islamic equity \n          markets matches 4/5 of the core requirements for this leadership role. Your \n          previous tenure at Al-Baraka Group specifically aligns with our institutional standards.')}
        </p>
      </div>
    </div>
  );
};

export default JobDetailsMatch;
