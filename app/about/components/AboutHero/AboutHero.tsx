'use client';
import React from 'react';
import styles from './AboutHero.module.css';
import { useTranslation, Trans } from 'react-i18next'

const AboutHero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge}><Trans i18nKey="spanClassnamestylesbadgedotspanInstitutionalExcellence"><span className={styles.badgeDot}></span>
            INSTITUTIONAL EXCELLENCE</Trans></div>
          
          <h1 className={styles.title}><Trans i18nKey="redefiningGlobalHiringbrThroughSpanClassnamestyleshighlightethicalStandardsspan">Redefining Global Hiring<br />
            Through <span className={styles.highlight}>Ethical Standards</span></Trans></h1>
          
          <p className={styles.subtitle}>
            {t('anEcosystemBuiltOnThePrinciplesOfTransparencyDignityAndMutualRespectWeBridgeTheGapBetweenWorldclassTalentAndHighintegrityInstitutions', 'An ecosystem built on the principles of transparency, dignity, and\n            mutual respect. We bridge the gap between world-class talent and\n            high-integrity institutions.')}
          </p>
        </div>
      </div>
      
      {/* Decorative vertical lines in background as seen in mockup */}
      <div className={styles.bgLines}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </section>
  );
};

export default AboutHero;
