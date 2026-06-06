'use client';

import React, { useState, useEffect } from 'react';
import styles from './TeamMemberModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { X, Camera } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'
import { useCreateTeamMutation } from '@/redux/api/teamApi';

const TeamMemberModal = () => {
  const { t } = useTranslation()
  const { isTeamMemberModalOpen, closeTeamMemberModal, activeMember } = useModal();
  const [imagePreview, setImagePreview] = useState<string | null>(activeMember?.image || null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [createTeam, { isLoading }] = useCreateTeamMutation();

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
    setPhotoFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const designation = (form.elements.namedItem('designation') as HTMLInputElement).value;

    if (!name || !designation) {
        alert("Please fill in both name and role.");
        return;
    }

    const formData = new FormData();
    const dataObj = {
        name,
        designation
    };
    
    // According to Postman screenshot: key "data" contains stringified JSON object
    formData.append("data", JSON.stringify(dataObj));
    
    // Add file if uploaded
    if (photoFile) {
        formData.append("photo", photoFile);
    }

    try {
        if (!activeMember) {
            await createTeam(formData).unwrap();
            console.log("Team member created successfully");
        } else {
            // Update logic here if needed
        }
        handleClose();
    } catch (error) {
        console.error("Failed to save team member:", error);
        alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <form className={styles.modal} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
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
            <label className={styles.uploadLabel} style={{ cursor: 'pointer' }}>
                {t('uploadProfilePhoto', 'Upload Profile Photo')}
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('fullName', 'Full Name')}</label>
            <input 
              type="text" 
              name="name"
              placeholder={t('egAhmedAlsayed', 'e.g. Ahmed Al-Sayed')} 
              className={styles.input} 
              defaultValue={activeMember?.name || ''}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('rolePosition', 'Role / Position')}</label>
            <input 
              type="text" 
              name="designation"
              placeholder={t('egChiefExecutiveOfficer', 'e.g. Chief Executive Officer')} 
              className={styles.input} 
              defaultValue={activeMember?.role || ''}
              required
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={handleClose} disabled={isLoading}>{t('cancel', 'Cancel')}</button>
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Saving...' : (activeMember ? t('saveChanges', 'Save Changes') : t('addMember', 'Add Member'))}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamMemberModal;
