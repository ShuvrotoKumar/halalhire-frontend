'use client';

import React, { useState, useEffect } from 'react';
import styles from './TeamMemberModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { X, Camera } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'

const TeamMemberModal = () => {
  const { t } = useTranslation()
  const { isTeamMemberModalOpen, closeTeamMemberModal, activeMember } = useModal();
  const [imagePreview, setImagePreview] = useState<string | null>(activeMember?.image || null);

  useEffect(() => {
    if (activeMember && activeMember.image) {
      setImagePreview(activeMember.image);
    } else {
      setImagePreview(null);
    }
  }, [activeMember]);

  if (!isTeamMemberModalOpen) return null;

  const handleClose = () => {
    closeTeamMemberModal();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{activeMember ? t('editTeamMember', 'Edit Team Member') : t('addTeamMember', 'Add Team Member')}</h2>
          <X size={20} className={styles.closeBtn} onClick={handleClose} />
        </div>

        <div className={styles.body}>
          <div className={styles.imageUploadSection}>
            <div className={styles.imagePreview}>
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover' }} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Camera size={24} className={styles.uploadIcon} />
                </div>
              )}
            </div>
            <label className={styles.uploadLabel}>{t('uploadProfilePhoto', 'Upload Profile Photo')}</label>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('fullName', 'Full Name')}</label>
            <input 
              type="text" 
              placeholder={t('egAhmedAlsayed', 'e.g. Ahmed Al-Sayed')} 
              className={styles.input} 
              defaultValue={activeMember?.name || ''}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('rolePosition', 'Role / Position')}</label>
            <input 
              type="text" 
              placeholder={t('egChiefExecutiveOfficer', 'e.g. Chief Executive Officer')} 
              className={styles.input} 
              defaultValue={activeMember?.role || ''}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={handleClose}>{t('cancel', 'Cancel')}</button>
          <button className={styles.submitBtn} onClick={handleClose}>
            {activeMember ? t('saveChanges', 'Save Changes') : t('addMember', 'Add Member')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
