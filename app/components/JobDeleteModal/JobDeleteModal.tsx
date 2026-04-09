'use client';

import React from 'react';
import styles from './JobDeleteModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { Trash2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next'

const JobDeleteModal = () => {
  const { t } = useTranslation()
  const { isJobDeleteModalOpen, closeJobDeleteModal, activeJob } = useModal();

  if (!isJobDeleteModalOpen) return null;

  const handleClose = () => {
    closeJobDeleteModal();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconBox}>
          <AlertCircle size={32} />
        </div>
        
        <div className={styles.title}>{t('areYouSure', 'Are you sure?')}</div>
        
        <p className={styles.description}>
          {t('youAreAboutToDeleteTheJobPostingFor', 'You are about to delete the job posting for **')}{activeJob?.title}{t('thisActionCannotBeUndone', '**. This action cannot be undone.')}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleClose}>{t('cancel', 'Cancel')}</button>
          <button className={styles.deleteBtn} onClick={handleClose}>{t('deleteListing', 'Delete Listing')}</button>
        </div>
      </div>
    </div>
  );
};

export default JobDeleteModal;
