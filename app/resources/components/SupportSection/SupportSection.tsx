'use client';
import styles from './SupportSection.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const SupportSection = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.supportSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('contactOurSupport', 'Contact Our Support')}</h2>
          <p className={styles.subtitle}>
            {t('globalAssistanceForYourProfessionalCareerJourney', 'Global assistance for your professional career journey')}
          </p>
        </div>

        <div className={styles.grid}>
          {/* Official Email */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{t('officialEmail', 'Official Email')}</h3>
            <p className={styles.cardDesc}>
              {t('directLineToOurExecutiveSupportTeamForComplexInquiries', 'Direct line to our executive support team for complex inquiries.')}
            </p>
            <p className={styles.contactInfo}>support@halalhire.com</p>
          </div>

          {/* Global Support Center */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{t('globalSupportCenter', 'Global Support Center')}</h3>
            <p className={styles.cardDesc}>
              {t('accessOurWorldwideNetworkOfRegionalSupportCoordinators', 'Access our worldwide network of regional support coordinators.')}
            </p>
            <p className={styles.contactInfo}>{t('247DigitalAssistance', '24/7 Digital Assistance')}</p>
          </div>

          {/* Message Support */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>{t('messageSupport', 'Message Support')}</h3>
            <p className={styles.cardDesc}>{t('sendUsMessages', 'Send us messages')}</p>
            <Link href="/contact" className={styles.contactBtn}>{t('contactUs', 'Contact Us')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
