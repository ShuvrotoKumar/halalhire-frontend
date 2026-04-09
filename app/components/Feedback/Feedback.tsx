"use client";

import React from 'react';
import styles from './Feedback.module.css';
import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next'

const Feedback = () => {
  const { t } = useTranslation()
  return (
    <section className={`section ${styles.feedbackSection}`}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11H15" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 7H15" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="goldGradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FEEE96"/>
                  <stop offset="1" stopColor="#E49E21"/>
                </linearGradient>
              </defs>
            </svg>
            <div className={styles.pencilIcon}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#FEEE96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#FEEE96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
          
          <h2 className={styles.title}><Trans i18nKey="helpUsSpanClassnamestylesimproveimprovespan">Help Us <span className={styles.improve}>Improve</span></Trans></h2>
          
          <p className={styles.subtitle}><Trans i18nKey="yourProfessionalFeedbackHelpsUsRefineThePlatformForTheGlobalUmmahbrSuggestFeaturesOrShareYourExperienceWithOurTeam">Your professional feedback helps us refine the platform for the global Ummah.<br />
            Suggest features or share your experience with our team.</Trans></p>
          
          <Link href="/contact" className={styles.feedbackBtn}>
            {t('shareFeedback', 'Share Feedback')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
