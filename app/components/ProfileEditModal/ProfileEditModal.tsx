'use client';

import React, { useState } from 'react';
import styles from './ProfileEditModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useAuth } from '@/app/context/AuthContext';
import CompanyProfileEditModal from '../CompanyProfileEditModal/CompanyProfileEditModal';
import { useTranslation, Trans } from 'react-i18next'
import {
  X, 
  UploadCloud, 
  Trash2, 
  FileText,
  Check
} from 'lucide-react';

const ProfileEditModal = () => {
  const { t } = useTranslation()
  const { isProfileEditModalOpen, closeProfileEditModal } = useModal();
  const { user } = useAuth();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [skills, setSkills] = useState(['Islamic Finance', 'Risk Management', 'Audit']);
  const [skillInput, setSkillInput] = useState('');

  if (!isProfileEditModalOpen) return null;

  // If user is a company, show the corporate edit modal
  if (user?.role === 'company') {
    return <CompanyProfileEditModal />;
  }

  // Otherwise, show the individual profile edit modal (the code below)
  const handleSave = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    closeProfileEditModal();
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {step === 'form' ? (
          <>
            <div className={styles.header}>
              <h2>{t('profileManagement', 'Profile Management')}</h2>
              <p>{t('updateYourDetailsToEnsureYourProfessionalIdentityRemainsCurrent', 'Update your details to ensure your professional identity remains current.')}</p>
            </div>

            <div className={styles.body}>
              {/* 1. Personal Information */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('1PersonalInformation', '1. Personal Information')}</h3>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('fullName', 'Full Name')}</label>
                    <input type="text" defaultValue="Ahmed Al-Farsi" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('dateOfBirth', 'Date of Birth')}</label>
                    <input type="text" defaultValue="05/14/1992" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('email', 'Email')}</label>
                    <input type="email" defaultValue="john@email.com" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('phone', 'Phone')}</label>
                    <input type="text" defaultValue="+880021566514" className={styles.input} />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>{t('countryOfOrigin', 'Country of Origin')}</label>
                    <select className={styles.select}>
                      <option>{t('unitedArabEmirates', 'United Arab Emirates')}</option>
                      <option>{t('saudiArabia', 'Saudi Arabia')}</option>
                      <option>{t('qatar', 'Qatar')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Identity Documents */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('2IdentityDocuments', '2. Identity Documents')}</h3>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('nationalIdIqamaNumber', 'National ID / IQAMA Number')}</label>
                    <input type="text" placeholder={t('enterIdNumber', 'Enter ID Number')} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('passportExpiryDate', 'Passport Expiry Date')}</label>
                    <input type="text" placeholder="mm/dd/yyyy" className={styles.input} />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>{t('passportCopyIdUpload', 'Passport Copy / ID Upload')}</label>
                    <div className={styles.uploadArea}>
                      <UploadCloud size={32} className={styles.uploadIcon} />
                      <div className={styles.uploadText}>{t('clickOrDragFileToUploadPdfJpgPng', 'Click or drag file to upload (PDF, JPG, PNG)')}</div>
                      <div className={styles.selectFile}>{t('selectFile', 'SELECT FILE')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Professional Info */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('3ProfessionalInfo', '3. Professional Info')}</h3>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('currentJobTitle', 'Current Job Title')}</label>
                    <input type="text" defaultValue="Senior Financial Analyst" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('yearsOfExperience', 'Years of Experience')}</label>
                    <input type="text" defaultValue="8" className={styles.input} />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>{t('skillsTags', 'Skills Tags')}</label>
                    <div className={styles.skillsContainer}>
                      {skills.map((skill, index) => (
                        <div key={index} className={styles.skillTag}>
                          {skill}
                          <X size={14} className={styles.removeSkill} onClick={() => removeSkill(index)} />
                        </div>
                      ))}
                      <input 
                        type="text" 
                        placeholder={t('addSkill', 'Add skill...')} 
                        className={styles.skillInput}
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={addSkill}
                      />
                    </div>
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>{t('cvCertificatesUpload', 'CV / Certificates Upload')}</label>
                    <div className={styles.fileList}>
                      <div className={styles.fileCard}>
                        <FileText size={24} color="#c4a66a" />
                        <div className={styles.fileInfo}>
                          <div className={styles.fileName}>Ahmed_AlFarsi_CV_2023.pdf</div>
                          <div className={styles.fileMeta}>{t('uploadedOnOct122023', 'Uploaded on Oct 12, 2023')}</div>
                        </div>
                        <div className={styles.deleteFile}>
                          <Trash2 size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Work Preferences */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('4WorkPreferences', '4. Work Preferences')}</h3>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('expectedSalaryRangeMonthly', 'Expected Salary Range (Monthly)')}</label>
                    <select className={styles.select}>
                      <option>{t('aed1500020000', 'AED 15,000 - 20,000')}</option>
                      <option>{t('aed2000025000', 'AED 20,000 - 25,000')}</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('availability', 'Availability')}</label>
                    <select className={styles.select}>
                      <option>{t('immediate', 'Immediate')}</option>
                      <option>{t('1Month', '1 Month')}</option>
                      <option>{t('2Months', '2 Months')}</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('employmentType', 'Employment Type')}</label>
                    <div className={styles.radioGrid}>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNameemploymenttypeHiddenDefaultcheckedDivClassnamestylesradioFulltime"><input type="radio" name="employmentType" hidden defaultChecked />
                        <div className={styles.radio} />
                        Full-time</Trans></label>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNameemploymenttypeHiddenDivClassnamestylesradioContract"><input type="radio" name="employmentType" hidden />
                        <div className={styles.radio} />
                        Contract</Trans></label>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{t('workSetting', 'Work Setting')}</label>
                    <div className={styles.radioGrid}>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNameworksettingHiddenDefaultcheckedDivClassnamestylesradioOnsite"><input type="radio" name="workSetting" hidden defaultChecked />
                        <div className={styles.radio} />
                        On-site</Trans></label>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNameworksettingHiddenDivClassnamestylesradioHybrid"><input type="radio" name="workSetting" hidden />
                        <div className={styles.radio} />
                        Hybrid</Trans></label>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNameworksettingHiddenDivClassnamestylesradioRemote"><input type="radio" name="workSetting" hidden />
                        <div className={styles.radio} />
                        Remote</Trans></label>
                    </div>
                  </div>

                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>{t('openToTravel', 'Open to Travel')}</label>
                    <div className={styles.radioGrid}>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNametravelHiddenDefaultcheckedDivClassnamestylesradioYesUpTo25"><input type="radio" name="travel" hidden defaultChecked />
                        <div className={styles.radio} />
                        Yes, Up to 25%</Trans></label>
                      <label className={styles.radioItem}><Trans i18nKey="inputTyperadioNametravelHiddenDivClassnamestylesradioNoTravel"><input type="radio" name="travel" hidden />
                        <div className={styles.radio} />
                        No Travel</Trans></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.discardBtn} onClick={handleClose}>{t('discardAll', 'Discard All')}</button>
              <button className={styles.saveBtn} onClick={handleSave}>{t('saveAllChanges', 'Save All Changes')}</button>
            </div>
          </>
        ) : (
          <div className={styles.successModal}>
            <div className={styles.successIcon}>
              <Check size={40} />
            </div>
            <h2 className={styles.successTitle}>{t('profileUpdatedSuccessfully', 'Profile Updated Successfully!')}</h2>
            <p className={styles.successText}>
              {t('bismillahYourProfessionalDetailsHaveBeenUpdatedYourProfileIsNowCurrentAndReadyForNewOpportunities', 'Bismillah! Your professional details have been updated. Your profile is now current and ready for new opportunities.')}
            </p>
            <button className={styles.saveBtn} onClick={handleClose}>
              {t('returnToProfile', 'Return to Profile')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditModal;
