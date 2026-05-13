"use client";

import React from 'react';
import styles from './Features.module.css';
import { useTranslation, Trans } from 'react-i18next'

const Features = () => {
  const { t } = useTranslation()
  return (
    <section className={`section ${styles.featuresSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}><Trans i18nKey="whyChooseHalalspanClassnamestylesgoldtexthirespan">Why Choose Halal<span className={styles.goldText}>Hire</span>?</Trans></h2>
          <p className={styles.subtitle}><Trans i18nKey="weCombineGlobalProfessionalStandardsWithIslamicEthicalPrinciplesToBuildABrTrustedEmploymentEcosystemForTheUmmah">We combine global professional standards with Islamic ethical principles to build a <br />
            trusted employment ecosystem for the Ummah.</Trans></p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h3>{t('100EthicallyVerifiedJobs', '100% Ethically Verified Jobs')}</h3>
            <p>
              {t('everyEmployerIsCarefullyReviewedToEnsureAlignmentWithIslamicEthicalStandardsFairTreatmentAndTransparentPractices', 'Every employer is carefully reviewed to ensure alignment with Islamic ethical \n              standards, fair treatment, and transparent practices.')}
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3>{t('basedOnIslamicEtiquettes', 'Based on Islamic Etiquettes')}</h3>
            <p>
              {t('builtOnIslamicEthicalPrinciplesEnsuringHalalPracticesFairnessTransparencyAndACommitmentToAvoidingRibaAndDeception', 'Built on Islamic ethical principles, ensuring halal practices, fairness, \n              transparency, and a commitment to avoiding riba and deception.')}
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3>{t('prayerfriendlyFaithconsciousWorkplaces', 'Prayer-Friendly & Faith-Conscious Workplaces')}</h3>
            <p>
              {t('weMaintainStrictScreeningStandardsToAvoidRibabasedFinancialStructuresDeceptivePracticesAndUnjustLaborConditions', 'We maintain strict screening standards to avoid riba-based financial structures, \n              deceptive practices, and unjust labor conditions.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
