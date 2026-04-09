"use client";

import React from 'react';
import styles from './Ethics.module.css';
import Image from 'next/image';
import { useTranslation, Trans } from 'react-i18next'

const Ethics = () => {
  const { t } = useTranslation()
  return (
    <section className={`section ${styles.ethicsSection}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Content Left Side */}
          <div className={styles.content}>
            <h2 className={styles.title}><Trans i18nKey="guidedByEthicsbrDrivenByExcellence">Guided by Ethics,<br />
              Driven by Excellence</Trans></h2>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3>{t('ethicalWorkStandards', 'Ethical Work Standards')}</h3>
                  <p>{t('weAuditEveryEmployerToEnsureTheirBusinessPracticesAlignWithShariahPrinciplesAndEthicalGovernance', 'We audit every employer to ensure their business practices align with Shariah principles and ethical governance.')}</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3>{t('fairWagesAmpTransparency', 'Fair Wages &amp; Transparency')}</h3>
                  <p>{t('noHiddenFeesNoPredatoryContractsWeAdvocateForTheDignityOfLaborAndEquitableCompensation', 'No hidden fees, no predatory contracts. We advocate for the dignity of labor and equitable compensation.')}</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3>{t('religiousAccommodations', 'Religious Accommodations')}</h3>
                  <p>{t('employersOnOurNetworkAreCommittedToProvidingPrayerTimeJummahAccessibilityAndInclusiveEnvironments', 'Employers on our network are committed to providing prayer time, Jummah accessibility, and inclusive environments.')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Right Side */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/g1.png"
                alt={t('guidedByEthics', 'Guided by Ethics')}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quoteText}>
                {t('findingARoleWhereMyFaithAndCareerArentAtOddsWasMyPriorityHalalhireMadeItSeamless', '"Finding a role where my faith and career aren\'t at odds was my priority. HalalHire made it seamless."')}
              </p>
              <div className={styles.author}>
                {t('drSarahAhmed', '— Dr. Sarah Ahmed')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ethics;
