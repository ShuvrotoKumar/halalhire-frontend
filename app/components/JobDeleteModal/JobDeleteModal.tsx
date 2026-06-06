'use client';

import React from 'react';
import styles from './JobDeleteModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next'
import { useDeleteJobPostMutation } from '@/redux/api/jobApi';

const JobDeleteModal = () => {
  const { t } = useTranslation()
  const { isJobDeleteModalOpen, closeJobDeleteModal, activeJob } = useModal();
  const [deleteJobPost, { isLoading }] = useDeleteJobPostMutation();

  if (!isJobDeleteModalOpen) return null;

  const handleClose = () => {
    closeJobDeleteModal();
  };

  const handleDelete = async () => {
    if (activeJob && activeJob._id) {
      try {
        await deleteJobPost({ id: activeJob._id }).unwrap();
        closeJobDeleteModal();
      } catch (error) {
        console.error("Failed to delete job:", error);
        alert("Failed to delete the job. Please try again.");
      }
    } else {
        closeJobDeleteModal();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconBox}>
          <AlertCircle size={32} />
        </div>
        
        <div className={styles.title}>{t('areYouSure', 'Are you sure?')}</div>
        
        <p className={styles.description}>
          {t('youAreAboutToDeleteTheJobPostingFor', 'You are about to delete the job posting for **')}{activeJob?.jobTitle || activeJob?.title}{t('thisActionCannotBeUndone', '**. This action cannot be undone.')}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleClose} disabled={isLoading}>{t('cancel', 'Cancel')}</button>
          <button className={styles.deleteBtn} onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : t('deleteListing', 'Delete Listing')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDeleteModal;
