'use client';

import React from 'react';
import styles from '../DecisionModal/DecisionModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next'

const RejectModal = () => {
  const { t } = useTranslation()
  const { isRejectModalOpen, closeRejectModal, activeApplicant } = useModal();
  const router = useRouter();

  if (!isRejectModalOpen) return null;

  const handleConfirm = () => {
    // In a real app, you'd call an API here
    closeRejectModal();
    router.push('/company_req');
  };

  return (
    <div className={styles.overlay} onClick={closeRejectModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.iconBox} ${styles.iconBoxReject}`}>
          <XCircle size={40} />
        </div>
        
        <h2 className={styles.title}>{t('rejectApplication', 'Reject Application?')}</h2>
        <p className={styles.description}>
          {t('areYouSureYouWantToReject', 'Are you sure you want to reject')} <span className={styles.applicantHighlight}>{activeApplicant?.name}</span>{t('apossApplicationThisActionWillNotifyTheCandidateAndCannotBeUndone', '&apos;s application? This action will notify the candidate and cannot be undone.')}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={closeRejectModal}>{t('goBack', 'Go Back')}</button>
          <button className={`${styles.confirmBtn} ${styles.confirmBtnReject}`} onClick={handleConfirm}>
            {t('confirmRejection', 'Confirm Rejection')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
