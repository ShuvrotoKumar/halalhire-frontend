'use client';
import React from 'react';
import styles from './GlobalVision.module.css';
import { useTranslation } from 'react-i18next'

const GlobalVision = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.globalSection}>
      <div className="container">

        {/* Intro */}
        <div className={styles.introWrapper}>
          <h2 className={styles.introTitle}>{t('aGlobalVision', 'A Global Vision')}</h2>
          <p className={styles.introDescription}>
            {t('ourReachIsGlobalButOurValuesRemainLocalToTheHumanHeartWeAreConnectingEthicalEmployersWithGlobalTalentInOver40Countries', 'Our reach is global, but our values remain local to the human heart.\n            We are connecting ethical employers with global talent in over 40 countries.')}
          </p>
        </div>

        {/* Floating Stats Card */}
        <div className={styles.statsCard}>
          <div className={styles.iconWrapper}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>

          <h3 className={styles.cardTitle}>{t('standardizingDignityWorldwide', 'Standardizing Dignity Worldwide')}</h3>

          <p className={styles.cardDescription}>
            {t('fromLondonToDubaiKualaLumpurToNewYorkOurInstitutionalNetworkEnsuresThatHighqualityWorkIsAlwaysMatchedWithHighintegrityEnvironments', 'From London to Dubai, Kuala Lumpur to New York, our institutional\n            network ensures that high-quality work is always matched with\n            high-integrity environments.')}
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <h4 className={styles.statNumber}>{t('42', '42+')}</h4>
              <p className={styles.statLabel}>{t('nationsJoined', 'NATIONS JOINED')}</p>
            </div>

            <div className={styles.statItem}>
              <h4 className={styles.statNumber}>{t('15k', '15k+')}</h4>
              <p className={styles.statLabel}>{t('vettedInstitutions', 'VETTED INSTITUTIONS')}</p>
            </div>

            <div className={styles.statItem}>
              <h4 className={styles.statNumber}>{t('85k', '85k+')}</h4>
              <p className={styles.statLabel}>{t('ethicalCareers', 'ETHICAL CAREERS')}</p>
            </div>
          </div>

          {/* Decorative Badge from mockup */}
          {/* <div className={styles.badgeYK}>
            <div className={styles.circleY}>Y</div>
            <div className={styles.circleK}>K</div>
          </div> */}
        </div>

      </div>
    </section>
  );
};

export default GlobalVision;
