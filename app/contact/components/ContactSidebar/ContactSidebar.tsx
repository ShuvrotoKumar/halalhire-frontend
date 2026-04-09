'use client';
import React from 'react';
import styles from './ContactSidebar.module.css';
import { useTranslation, Trans } from 'react-i18next'

const ContactSidebar = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.sidebar}>
      {/* Ethical Support Card */}
      <div className={styles.supportCard}>
        <div className={styles.header}>
          <div className={styles.badgeIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
          </div>
          <h2 className={styles.title}>{t('ethicalSupport', 'Ethical Support')}</h2>
        </div>

        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <div className={styles.iconBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <h3 className={styles.infoLabel}>{t('globalHeadquarters', 'Global Headquarters')}</h3>
              <p className={styles.infoText}><Trans i18nKey="124EthicalPlazaLevel4brFinancialDistrictLondonbrUnitedKingdomEc2v5bt">124 Ethical Plaza, Level 4<br />
                Financial District, London<br />
                United Kingdom, EC2V 5BT</Trans></p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.iconBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <h3 className={styles.infoLabel}>{t('responseTime', 'Response Time')}</h3>
              <p className={styles.infoText}>
                {t('ourDedicatedTeamTypicallyRespondsToAllInquiriesWithin24BusinessHours', 'Our dedicated team typically responds to all inquiries within 24 business hours.')}
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.iconBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3 className={styles.infoLabel}>{t('directEmail', 'Direct Email')}</h3>
              <p className={styles.infoText}>support@halalhire.com</p>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.promise}>
          <h3 className={styles.promiseTitle}>{t('ourEthicalPromise', 'Our Ethical Promise')}</h3>
          <p className={styles.promiseText}>
            {t('treatingEveryApplicantAndEmployerWithTheDignityMandatedByOurFaithAndUniversalProfessionalExcellence', '"Treating every applicant and employer with the dignity mandated by our faith \n            and universal professional excellence."')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;
