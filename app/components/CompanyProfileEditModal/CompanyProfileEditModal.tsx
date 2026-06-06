'use client';

import React, { useState, useEffect } from 'react';
import styles from './CompanyProfileEditModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'
import { useGetCompanyQuery, useUpdateCompanyMutation } from '@/redux/api/companyApi';
import { useAuth } from '@/app/context/AuthContext';
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
  const { user } = useAuth();
  const [selectedPerks, setSelectedPerks] = useState<string[]>(['Prayer Room', 'Halal Food', 'Jumu\'ah Flex']);
  
  const { data: companyRes } = useGetCompanyQuery(undefined, { skip: !isProfileEditModalOpen });
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const companyData = companyRes?.data || {};
  const orgDetails = companyData.organizationDetails || {};

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    websiteUrl: '',
    headquartersLocation: '',
    companyDescription: '',
    email: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  useEffect(() => {
    if (companyData) {
      setFormData({
        companyName: companyData.companyName || '',
        industry: orgDetails.industry || '',
        websiteUrl: orgDetails.websiteUrl || '',
        headquartersLocation: orgDetails.headquartersLocation || (companyData.workplace && companyData.workplace[0]) || '',
        companyDescription: orgDetails.companyDescription || '',
        email: companyData.email || '',
      });
    }
  }, [companyData, orgDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        companyName: formData.companyName,
        email: formData.email,
        role: user?.role || companyData.role || 'company',
        organizationDetails: {
          ...orgDetails,
          industry: formData.industry,
          websiteUrl: formData.websiteUrl,
          headquartersLocation: formData.headquartersLocation,
          companyDescription: formData.companyDescription,
        },
        companyVerificationSchema: companyData.companyVerificationSchema || {},
        workplace: companyData.workplace || []
      };

      const submitData = new FormData();
      // The backend expects the role inside the JSON data string
      submitData.append('data', JSON.stringify(payload));
      
      if (logoFile) submitData.append('companyLogo', logoFile);
      if (bannerFile) submitData.append('bannerImage', bannerFile);

      await updateCompany(submitData).unwrap();
      
      alert('Company profile updated successfully!');
      closeProfileEditModal();
    } catch (error: any) {
      console.error('Failed to update company:', error);
      alert(error?.data?.message || 'Failed to update company profile');
    }
  };

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
                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tagline/Motto</label>
                <input type="text" placeholder={t('egBuildingEthicalTechForTheUmmah', 'e.g. Building ethical tech for the Ummah')} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('industry', 'Industry')}</label>
                <select name="industry" value={formData.industry} onChange={handleInputChange} className={styles.select}>
                  <option value="Technology & IT">{t('technologyIt', 'Technology & IT')}</option>
                  <option value="Finance">{t('finance', 'Finance')}</option>
                  <option value="Healthcare">{t('healthcare', 'Healthcare')}</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value={formData.industry}>{formData.industry}</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('websiteUrl', 'Website URL')}</label>
                <input type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className={styles.input} />
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
              <div className={styles.logoPreview} style={{ overflow: 'hidden' }}>
                {logoFile ? (
                  <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (orgDetails.companyLogo || companyData.photo) ? (
                  <img src={(orgDetails.companyLogo || companyData.photo).startsWith('http') ? (orgDetails.companyLogo || companyData.photo) : `https://beer-managers-uses-doctor.trycloudflare.com${orgDetails.companyLogo || companyData.photo}`} alt="Current Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={32} />
                )}
              </div>
              <div>
                <label className={styles.uploadBtn} style={{ cursor: 'pointer', display: 'inline-block' }}>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) setLogoFile(e.target.files[0]) }} />
                  {t('uploadNewLogo', 'Upload New Logo')}
                </label>
                <p className={styles.uploadInfo}>{t('recommendedSize650x650pxJpgOrPng', 'Recommended size: 650x650px. JPG or PNG.')}</p>
              </div>
            </div>
            
            <div className={styles.bannerUpload}>
              <label className={styles.label}>{t('bannerImage', 'Banner Image')}</label>
              <label className={styles.bannerDropzone} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) setBannerFile(e.target.files[0]) }} />
                
                {bannerFile ? (
                  <img src={URL.createObjectURL(bannerFile)} alt="Banner Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                ) : orgDetails.bannerImage ? (
                  <img src={orgDetails.bannerImage.startsWith('http') ? orgDetails.bannerImage : `https://beer-managers-uses-doctor.trycloudflare.com${orgDetails.bannerImage}`} alt="Current Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                ) : null}
                
                <div style={{ position: 'relative', zIndex: 1, backgroundColor: (bannerFile || orgDetails.bannerImage) ? 'rgba(255,255,255,0.8)' : 'transparent', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ImageIcon size={32} color="#94a3b8" />
                  <p className={styles.dropzoneText}><Trans i18nKey="dragAndDropBannerOrSpanbrowsespan">Drag and drop banner or <span style={{ textDecoration: 'underline' }}>browse</span></Trans></p>
                  <p className={styles.uploadInfo}>{t('recommendedSize1200x400px', 'Recommended size: 1200x400px.')}</p>
                </div>
              </label>
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
                <textarea 
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  placeholder={t('tellCandidatesAboutYourCompanyapossMissionCultureAndWhatItapossLikeToWorkWithYou', 'Tell candidates about your company\'s mission, culture, and what it\'s like to work with you...')}
                  className={styles.input}
                  style={{ minHeight: '150px', resize: 'vertical', width: '100%', padding: '16px', border: 'none', outline: 'none' }}
                />
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
                <input type="text" name="headquartersLocation" value={formData.headquartersLocation} onChange={handleInputChange} className={styles.input} />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{t('contactEmail', 'Contact Email')}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} />
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
          <button className={styles.discardBtn} onClick={closeProfileEditModal} disabled={isLoading}>{t('cancel', 'Cancel')}</button>
          <button className={styles.saveBtn} onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : t('saveChanges', 'Save Changes')}
          </button>
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
