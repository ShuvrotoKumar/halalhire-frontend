'use client';

import React, { useState } from 'react';
import styles from './CompanyProfileEditModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'
import {
  Info, 
  Palette, 
  MapPin, 
  Check, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon, 
  ImageIcon,
  Upload,
  Heart,
  Globe,
  Coffee,
  Calendar,
  Baby
} from 'lucide-react';

const CompanyProfileEditModal = () => {
  const { t } = useTranslation()
  const { isProfileEditModalOpen, closeProfileEditModal } = useModal();
  const [selectedPerks, setSelectedPerks] = useState<string[]>(['Prayer Room', 'Halal Food', 'Jumu\'ah Flex']);

  // We should ideally check the user role here to render the right content,
  // but since the user specifically asked for this modal to show when clicking 
  // "edit profile" on company pages, we'll assume the context is handled by a separate modal 
  // or a role-based check in the parent. 
  // For now, let's create this specifically as a Company modal.

  if (!isProfileEditModalOpen) return null;

  const togglePerk = (perk: string) => {
    setSelectedPerks(prev => 
      prev.includes(perk) ? prev.filter(p => p !== perk) : [...prev, perk]
    );
  };

  const perks = [
    { name: t('prayerRoom', 'Prayer Room'), icon: <Heart size={18} /> },
    { name: t('halalFood', 'Halal Food'), icon: <Coffee size={18} /> },
    { name: t('nurseryRoom', 'Nursery Room'), icon: <Baby size={18} /> },
    { name: t('motherFriendly', 'Mother Friendly'), icon: <Heart size={18} /> },
    { name: t('jumuahFlex', 'Jumu\'ah Flex'), icon: <Calendar size={18} /> },
    { name: t('islamicHolidays', 'Islamic Holidays'), icon: <Calendar size={18} /> },
  ];

  return (
    <div className={styles.overlay} onClick={closeProfileEditModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{t('editCompanyProfile', 'Edit Company Profile')}</h2>
          <p>{t('updateYourProfessionalPresenceOnTheWorldapossLeadingHalalCareerPlatform', 'Update your professional presence on the world&apos;s leading halal career platform.')}</p>
        </div>

        <div className={styles.body}>
          {/* Basic Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Info size={20} className={styles.sectionIcon} />
              {t('basicInformation', 'Basic Information')}
            </h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('companyName', 'Company Name')}</label>
                <input type="text" defaultValue="TechSalam Solutions" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tagline/Motto</label>
                <input type="text" placeholder={t('egBuildingEthicalTechForTheUmmah', 'e.g. Building ethical tech for the Ummah')} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('industry', 'Industry')}</label>
                <select className={styles.select}>
                  <option>{t('technologyIt', 'Technology & IT')}</option>
                  <option>{t('finance', 'Finance')}</option>
                  <option>{t('healthcare', 'Healthcare')}</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('websiteUrl', 'Website URL')}</label>
                <input type="text" defaultValue="https://techsalam.io" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('foundedYear', 'Founded Year')}</label>
                <input type="text" defaultValue="2018" className={styles.input} />
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Palette size={20} className={styles.sectionIcon} />
              {t('branding', 'Branding')}
            </h3>
            <div className={styles.logoUpload}>
              <div className={styles.logoPreview}>
                <ImageIcon size={32} />
              </div>
              <div>
                <button className={styles.uploadBtn}>{t('uploadNewLogo', 'Upload New Logo')}</button>
                <p className={styles.uploadInfo}>{t('recommendedSize650x650pxJpgOrPng', 'Recommended size: 650x650px. JPG or PNG.')}</p>
              </div>
            </div>
            
            <div className={styles.bannerUpload}>
              <label className={styles.label}>{t('bannerImage', 'Banner Image')}</label>
              <div className={styles.bannerDropzone}>
                <ImageIcon size={32} color="#94a3b8" />
                <p className={styles.dropzoneText}><Trans i18nKey="dragAndDropBannerOrSpanbrowsespan">Drag and drop banner or <span>browse</span></Trans></p>
                <p className={styles.uploadInfo}>{t('recommendedSize1200x400px', 'Recommended size: 1200x400px.')}</p>
              </div>
            </div>
          </div>

          {/* About the Company */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Globe size={20} className={styles.sectionIcon} />
              {t('aboutTheCompany', 'About the Company')}
            </h3>
            <div className={styles.richTextEditor}>
              <div className={styles.editorToolbar}>
                <div className={styles.toolbarBtn}><Bold size={18} /></div>
                <div className={styles.toolbarBtn}><Italic size={18} /></div>
                <div className={styles.toolbarBtn}><List size={18} /></div>
                <div className={styles.toolbarBtn}><LinkIcon size={18} /></div>
              </div>
              <div className={styles.editorField}>
                {t('tellCandidatesAboutYourCompanyapossMissionCultureAndWhatItapossLikeToWorkWithYou', 'Tell candidates about your company&apos;s mission, culture, and what it&apos;s like to work with you...')}
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <MapPin size={20} className={styles.sectionIcon} />
              {t('locationContact', 'Location & Contact')}
            </h3>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{t('headquarterAddress', 'Headquarter Address')}</label>
                <input type="text" defaultValue="123 Ethical Way, London, UK" className={styles.input} />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{t('contactEmail', 'Contact Email')}</label>
                <input type="email" defaultValue="careers@techsalam.io" className={styles.input} />
              </div>
            </div>
          </div>

          {/* Ethical Workplace Perks */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Shield size={20} className={styles.sectionIcon} />
              {t('ethicalWorkplacePerks', 'Ethical Workplace Perks')}
            </h3>
            <p className={styles.uploadInfo} style={{ marginBottom: '20px' }}>
              {t('selectThePerksAndPracticesThatMakeYourCompanyAnIdealWorkplaceForEthicalProfessionals', 'Select the perks and practices that make your company an ideal workplace for ethical professionals.')}
            </p>
            <div className={styles.perksGrid}>
              {perks.map((perk, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.perkItem} ${selectedPerks.includes(perk.name) ? styles.perkItemActive : ''}`}
                  onClick={() => togglePerk(perk.name)}
                >
                  <div className={styles.perkLabel}>
                    {perk.icon}
                    {perk.name}
                  </div>
                  <div className={styles.perkCheck}>
                    {selectedPerks.includes(perk.name) && <Check size={14} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.discardBtn} onClick={closeProfileEditModal}>{t('cancel', 'Cancel')}</button>
          <button className={styles.saveBtn} onClick={closeProfileEditModal}>{t('saveChanges', 'Save Changes')}</button>
        </div>
      </div>
    </div>
  );
};

// Missing icon
const Shield = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default CompanyProfileEditModal;
