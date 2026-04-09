'use client';

import React from 'react';
import styles from './JobDetailsSidebar.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

const JobDetailsSidebar = () => {
  const { t } = useTranslation()
  const { openApplyModal } = useModal();
  return (
    <aside className={styles.sidebar}>
      {/* Apply Action Card */}
      <div className={styles.card}>
        <div className={styles.stats}>
          <span className={styles.postedDays}>{t('posted2DaysAgo', 'Posted 2 days ago')}</span>
          <span className={styles.applicantCount}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            {t('45Applicants', '45 Applicants')}
          </span>
        </div>
        
        <button 
          className={styles.btnApply}
          onClick={() => openApplyModal({
            title: t('seniorIslamicFinanceAnalyst', 'Senior Islamic Finance Analyst'),
            company: t('ethicalWealthManagement', 'Ethical Wealth Management'),
            location: t('mayfairLondonHybrid', 'Mayfair, London (Hybrid)'),
            salary: t('85000110000', '£85,000 - £110,000'),
            logo: '/logo.png'
          })}
        >
          {t('applyNow', 'Apply Now')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="12" x2="22" y2="12"></line><polyline points="15 5 22 12 15 19"></polyline></svg>
        </button>
        
        <button className={styles.btnSave}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          {t('saveForLater', 'Save for Later')}
        </button>
        
        <p className={styles.agreementText}>
          {t('byApplyingYouAgreeToHalalhiresEthicalCodeOfConductAndPrivacyPolicy', 'By applying, you agree to HalalHire\'s ethical code of conduct and privacy policy.')}
        </p>
      </div>
 
       {/* Profile Incomplete Alert */}
       <div className={styles.alertCard}>
         <div className={styles.alertHeader}>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E49E21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
           <span className={styles.alertTitle}>{t('profileIncomplete', 'Profile Incomplete')}</span>
         </div>
         <p className={styles.alertDescription}>
           {t('candidatesWithCompletedProfilesAre3xMoreLikelyToBeInterviewedByIslamicFinanceFirms', 'Candidates with completed profiles are 3x more likely to be interviewed by Islamic finance firms.')}
         </p>
         <button className={styles.btnUpdate}>{t('updateProfile', 'Update Profile +')}</button>
       </div>

      {/* Similar Opportunities */}
      <div className={styles.card}>
        <h4 className={styles.similarTitle}>{t('similarOpportunities', 'SIMILAR OPPORTUNITIES')}</h4>
        
        <div className={styles.similarJobsList}>
          <div className={styles.similarJob}>
            <p className={styles.companyName}>{t('standardCharteredSaadiq', 'Standard Chartered Saadiq')}</p>
            <p className={styles.jobTitle}>{t('vpSukukCapitalMarkets', 'VP, Sukuk Capital Markets')}</p>
            <p className={styles.jobMeta}>{t('dubaiUaeBullOnsite', 'Dubai, UAE &bull; On-site')}</p>
          </div>
          
          <div className={styles.similarJob}>
            <p className={styles.companyName}>{t('wahedInvest', 'Wahed Invest')}</p>
            <p className={styles.jobTitle}>{t('headOfShariaGovernance', 'Head of Sharia Governance')}</p>
            <p className={styles.jobMeta}>{t('newYorkUsaBullHybrid', 'New York, USA &bull; Hybrid')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default JobDetailsSidebar;
