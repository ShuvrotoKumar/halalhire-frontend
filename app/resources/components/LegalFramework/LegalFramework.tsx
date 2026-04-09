'use client';
import React from 'react';
import styles from './LegalFramework.module.css';
import { useTranslation } from 'react-i18next'

const LegalFramework = () => {
  const { t } = useTranslation()
  const obligations = [
    {
      title: t('nondiscriminatoryHiring', 'Non-Discriminatory Hiring'),
      text: t('employersMustMaintainObjectiveCriteriaBasedOnSkillMeritAndEthicalAlignment', 'Employers must maintain objective criteria based on skill, merit, and ethical alignment.')
    },
    {
      title: t('operationalTransparency', 'Operational Transparency'),
      text: t('clearCommunicationRegardingJobRolesHoursAndShariacompliantBenefits', 'Clear communication regarding job roles, hours, and Sharia-compliant benefits.')
    },
    {
      title: t('worklifeBalance', 'Work-Life Balance'),
      text: t('commitmentToRespectingFamilyObligationsAndPersonalReligiousCommitments', 'Commitment to respecting family obligations and personal religious commitments.')
    }
  ];

  const rights = [
    {
      title: t('fairContractTerms', 'Fair Contract Terms'),
      text: t('rightToATransparentSignedContractThatAdheresToAllLegalAndEthicalGuidelines', 'Right to a transparent, signed contract that adheres to all legal and ethical guidelines.')
    },
    {
      title: t('healthWellness', 'Health & Wellness'),
      text: t('safeWorkingEnvironmentsThatPrioritizeThePhysicalAndMentalWellbeingOfTheIndividual', 'Safe working environments that prioritize the physical and mental well-being of the individual.')
    },
    {
      title: t('grievanceProtection', 'Grievance Protection'),
      text: t('accessToAConfidentialChannelForReportingEthicalOrWorkplaceViolations', 'Access to a confidential channel for reporting ethical or workplace violations.')
    }
  ];

  return (
    <section className={styles.legalSection}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Employer Obligations Card */}
          <div className={styles.legalCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <h2 className={styles.cardTitle}>{t('employerObligations', 'Employer Obligations')}</h2>
            </div>
            
            <div className={styles.itemList}>
              {obligations.map((item, index) => (
                <div key={index} className={styles.item}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Worker Rights Card */}
          <div className={styles.legalCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h2 className={styles.cardTitle}>{t('workerRights', 'Worker Rights')}</h2>
            </div>
            
            <div className={styles.itemList}>
              {rights.map((item, index) => (
                <div key={index} className={styles.item}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LegalFramework;
