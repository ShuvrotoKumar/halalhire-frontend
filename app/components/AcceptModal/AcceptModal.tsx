'use client';

import React from 'react';
import styles from '../DecisionModal/DecisionModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next'

const AcceptModal = () => {
  const { t } = useTranslation()
  const { isAcceptModalOpen, closeAcceptModal, activeApplicant } = useModal();
  const router = useRouter();

  if (!isAcceptModalOpen) return null;

  const handleConfirm = () => {
    // In a real app, you'd call an API here
    closeAcceptModal();
    router.push('/company_req');
  };

  return (
    <div className={styles.overlay} onClick={closeAcceptModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.iconBox} ${styles.iconBoxAccept}`}>
          <CheckCircle size={40} />
        </div>
        
        <h2 className={styles.title}>{t('acceptApplicant', 'Accept Applicant?')}</h2>
        <p className={styles.description}>
          {t('youAreAboutToAccept', 'You are about to accept')} <span className={styles.applicantHighlight}>{activeApplicant?.name}</span> {t('forThe', 'for the')} <span className={styles.applicantHighlight}>{activeApplicant?.position}</span> {t('roleAnOfficialNotificationWillBeSentToTheCandidate', 'role. An official notification will be sent to the candidate.')}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={closeAcceptModal}>{t('cancel', 'Cancel')}</button>
          <button className={`${styles.confirmBtn} ${styles.confirmBtnAccept}`} onClick={handleConfirm}>
            {t('confirmAcceptance', 'Confirm Acceptance')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptModal;
