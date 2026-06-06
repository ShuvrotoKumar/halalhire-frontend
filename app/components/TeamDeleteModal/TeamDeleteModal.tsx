'use client';

import React from 'react';
import styles from './TeamDeleteModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next'
import { useDeleteTeamMutation } from '@/redux/api/teamApi';

const TeamDeleteModal = () => {
  const { t } = useTranslation()
  const { isTeamDeleteModalOpen, closeTeamDeleteModal, activeMember } = useModal();
  const [deleteTeam, { isLoading }] = useDeleteTeamMutation();

  if (!isTeamDeleteModalOpen) return null;

  const handleClose = () => {
    closeTeamDeleteModal();
  };

  const handleDelete = async () => {
    if (activeMember && activeMember.id) {
      try {
        await deleteTeam({ id: activeMember.id }).unwrap();
        closeTeamDeleteModal();
      } catch (error) {
        console.error("Failed to delete team member:", error);
        alert("Failed to delete the team member. Please try again.");
      }
    } else {
        closeTeamDeleteModal();
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
          {t('youAreAboutToDeleteTheTeamMemberFor', 'You are about to delete the team member **')}{activeMember?.name}{t('thisActionCannotBeUndone', '**. This action cannot be undone.')}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleClose} disabled={isLoading}>{t('cancel', 'Cancel')}</button>
          <button className={styles.deleteBtn} onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : t('deleteMember', 'Delete Member')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDeleteModal;
