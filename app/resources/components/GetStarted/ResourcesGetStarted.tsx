'use client';
import React from 'react';
import styles from './ResourcesGetStarted.module.css';
import { useTranslation } from 'react-i18next'

const ResourcesGetStarted = () => {
  const { t } = useTranslation()
  const steps = [
    {
      num: '1',
      title: t('profileExcellence', 'Profile Excellence'),
      desc: t('buildAComprehensiveProfileHighlightingYourSkillsAndCommitmentToEthicalExcellence', 'Build a comprehensive profile highlighting your skills and commitment to ethical excellence.')
    },
    {
      num: '2',
      title: t('ethicalVerification', 'Ethical Verification'),
      desc: t('completeOurIdentityAndCredentialVerificationToReceiveTheHalalVerifiedBadge', 'Complete our identity and credential verification to receive the "Halal Verified" badge.')
    },
    {
      num: '3',
      title: t('strategicApplication', 'Strategic Application'),
      desc: t('directlyApplyToPremiumEmployersWhoMatchYourValuesAndProfessionalAspirations', 'Directly apply to premium employers who match your values and professional aspirations.')
    }
  ];

  return (
    <section className={styles.getStartedSection}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className={styles.title}>{t('howToGetStarted', 'How to Get Started')}</h2>
          <p className={styles.subtitle}>
            {t('followOurVerifiedPathwayToSecureEthicalEmploymentWithinOurPremiumNetwork', 'Follow our verified pathway to secure ethical employment within our premium network.')}
          </p>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.connectorLine}></div>
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={index} className={styles.stepItem}>
                <div className={styles.numberCircle}>
                  <div className={styles.numInner}>{step.num}</div>
                  <div className={styles.numGlow}></div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResourcesGetStarted;
