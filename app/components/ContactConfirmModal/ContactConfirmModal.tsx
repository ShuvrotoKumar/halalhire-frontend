'use client';

import React from 'react';
import styles from './ContactConfirmModal.module.css';
import { Check, X } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'

const ContactConfirmModal = () => {
  const { t } = useTranslation()
  const { isContactConfirmModalOpen, closeContactConfirmModal } = useModal();

  if (!isContactConfirmModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeContactConfirmModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeContactConfirmModal}>
          <X size={20} />
        </button>
        
        <div className={styles.successBody}>
          <div className={styles.successIcon}>
            <Check size={40} />
          </div>
          <h2 className={styles.successTitle}>{t('messageSentSuccessfully', 'Message Sent Successfully!')}</h2>
          <p className={styles.successText}><Trans i18nKey="bismillahYourInquiryHasBeenReceivedOurTeamWillReviewYourMessageAndGetBackToYouWithin2448HoursBrBrThankYouForReachingOutToHalalhire">Bismillah! Your inquiry has been received. Our team will review your message and get back to you within 24-48 hours. <br /><br />
            Thank you for reaching out to HalalHire.</Trans></p>
          <button className={styles.confirmBtn} onClick={closeContactConfirmModal}>
            {t('gotItThanks', 'Got it, thanks!')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactConfirmModal;
