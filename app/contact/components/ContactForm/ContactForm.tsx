'use client';

import React from 'react';
import styles from './ContactForm.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

const ContactForm = () => {
  const { t } = useTranslation()
  const { openContactConfirmModal } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openContactConfirmModal();
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <h2 className={styles.title}>{t('sendAMessage', 'Send a Message')}</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>{t('fullName', 'Full Name')}</label>
            <input type="text" className={styles.input} placeholder={t('abdullahRahman', 'Abdullah Rahman')} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>{t('emailAddress', 'Email Address')}</label>
            <input type="email" className={styles.input} placeholder="contact@example.com" />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>{t('subjectInquiryType', 'Subject / Inquiry Type')}</label>
          <div className={styles.selectWrapper}>
            <select className={styles.select}>
              <option>{t('jobSeekerSupport', 'Job Seeker Support')}</option>
              <option>{t('employerSupport', 'Employer Support')}</option>
              <option>{t('ethicalAudits', 'Ethical Audits')}</option>
              <option>{t('otherGeneralInquiry', 'Other / General Inquiry')}</option>
            </select>
            <div className={styles.selectIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>{t('message', 'Message')}</label>
          <textarea className={styles.textarea} placeholder={t('howCanWeAssistYouToday', 'How can we assist you today?')}></textarea>
        </div>

        <div className={styles.privacyNote}>
          <div className={styles.shieldIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
          </div>
          <p>{t('yourDataIsHandledAccordingToEthicalPrivacyStandardsAndNeverSold', 'Your data is handled according to ethical privacy standards and never sold.')}</p>
        </div>

        <button type="submit" className={styles.submitBtn}>
          {t('sendMessage', 'Send Message')}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
