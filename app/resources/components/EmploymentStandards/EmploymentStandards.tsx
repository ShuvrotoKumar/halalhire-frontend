'use client';
import React from 'react';
import styles from './EmploymentStandards.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'

const EmploymentStandards = () => {
  const { t } = useTranslation()
  const standards = [
    {
      title: t('ethicalIntegrityAudits', 'Ethical Integrity Audits'),
      desc: t('biannualReviewOfCompanyLaborPracticesAndEthics', 'Bi-annual review of company labor practices and ethics.')
    },
    {
      title: t('fairWageGuarantee', 'Fair Wage Guarantee'),
      desc: t('strictComplianceWithLocalMinimumWageAndTransparencyRules', 'Strict compliance with local minimum wage and transparency rules.')
    },
    {
      title: t('prayerSpaceProvision', 'Prayer Space Provision'),
      desc: t('commitmentToProvidingPrayerfriendlySpacesAndTimings', 'Commitment to providing prayer-friendly spaces and timings.')
    }
  ];

  return (
    <section className={styles.standardsSection}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.imageColumn}>
            <Image
              src="/r1.png"
              alt={t('professionalWorkspace', 'Professional Workspace')}
              fill
              style={{ objectFit: 'cover' }}
              className={styles.image}
            />
          </div>

          <div className={styles.contentColumn}>
            <div className={styles.header}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 className={styles.title}>{t('employmentStandards', 'Employment Standards')}</h2>
            </div>

            <p className={styles.description}>
              {t('ourVettingProcessEnsuresEveryListingMeetsStrictEthicalAndShariacompliantWorkplaceStandardsWeAuditEmployerTransparencyFairWagePoliciesAndPrayerfriendlyEnvironments', 'Our vetting process ensures every listing meets strict ethical and Sharia-compliant\n              workplace standards. We audit employer transparency, fair wage policies, and\n              prayer-friendly environments.')}
            </p>

            <div className={styles.standardsList}>
              {standards.map((item, index) => (
                <div key={index} className={styles.standardItem}>
                  <div className={styles.checkIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.downloadBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              {t('downloadFullStandardsPdf', 'Download Full Standards (PDF)')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmploymentStandards;
