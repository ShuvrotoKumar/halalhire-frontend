"use client";

import React from 'react';
import styles from './Process.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const Process = () => {
  const { t } = useTranslation()
  return (
    <section className={`section ${styles.processSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('institutionalHiringProcess', 'Institutional Hiring Process')}</h2>
          <p className={styles.subtitle}>
            {t('secureYourFutureInThreeProfessionalSteps', 'Secure your future in three professional steps.')}
          </p>
        </div>

        <div className={styles.timelineContainer}>
          <div className={styles.dashedLine}></div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className={styles.stepTitle}>{t('createYourProfile', 'Create Your Profile')}</h3>
              <p className={styles.stepDesc}>{t('buildAComprehensiveProfessionalDossierIncludingYourSkillsAndCulturalPreferences', 'Build a comprehensive professional dossier including your skills and cultural preferences.')}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className={styles.stepTitle}>{t('aiTalentMatching', 'AI Talent Matching')}</h3>
              <p className={styles.stepDesc}>{t('ourSpecializedAlgorithmPairsYourQualificationsWithEthicalEmployersWhoMeetOurStandards', 'Our specialized algorithm pairs your qualifications with ethical employers who meet our standards.')}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className={styles.stepTitle}>{t('applyInterview', 'Apply & Interview')}</h3>
              <p className={styles.stepDesc}>{t('submitYourApplicationThroughOurSecurePortalAndTrackYourProgressInRealtime', 'Submit your application through our secure portal and track your progress in real-time.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <Link href="/auth?mode=register" className={`btn btn-primary ${styles.createBtn}`}>
            {t('createYourProfile', 'Create Your Profile')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
