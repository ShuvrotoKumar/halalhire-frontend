'use client';
import React from 'react';
import styles from './ResourcesHero.module.css';
import { useTranslation, Trans } from 'react-i18next'

const ResourcesHero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge}><Trans i18nKey="spanClassnamestylesbadgedotspanInstitutionalPortal"><span className={styles.badgeDot}></span>
            INSTITUTIONAL PORTAL</Trans></div>
          
          <h1 className={styles.title}>
            {t('resourcesKnowledgeBase', 'Resources & Knowledge Base')}
          </h1>
          
          <p className={styles.subtitle}>
            {t('upholdingTheHighestEthicalStandardsInTheGlobalHalalJobMarketThroughExcellenceTransparencyAndShariaCompliance', 'Upholding the highest ethical standards in the global Halal job market\n            through excellence, transparency, and Sharia compliance.')}
          </p>

          <div className={styles.badgesWrapper}>
            <div className={styles.statusBadge}>
              <div className={styles.statusIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              {t('halalVerified', 'Halal Verified')}
            </div>
            <div className={styles.statusBadge}>
              <div className={styles.statusIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"></path><polyline points="10 13 12 15 16 11"></polyline></svg>
              </div>
              {t('trustedEmployer', 'Trusted Employer')}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className={styles.bgDecoration}>
        <div className={styles.glowLeft}></div>
        <div className={styles.glowRight}></div>
      </div>
    </section>
  );
};

export default ResourcesHero;
