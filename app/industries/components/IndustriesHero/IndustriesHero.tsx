'use client';
import React from 'react';
import styles from './IndustriesHero.module.css';
import { useTranslation, Trans } from 'react-i18next'

const IndustriesHero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge}>
            {t('professionalNetwork', 'PROFESSIONAL NETWORK')}
          </div>
          
          <h1 className={styles.title}><Trans i18nKey="exploreHalalfriendlybrSpanClassnamestyleshighlightindustriesspan">Explore Halal-Friendly<br/>
            <span className={styles.highlight}>Industries</span></Trans></h1>
          
          <p className={styles.subtitle}>
            {t('connectingProfessionalsWithEthicallyvettedWorkplacesThatPrioritizeShariacompliantStandardsSpiritualWellbeingAndProfessionalExcellence', 'Connecting professionals with ethically-vetted workplaces that\n            prioritize Sharia-compliant standards, spiritual well-being, and\n            professional excellence.')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesHero;
