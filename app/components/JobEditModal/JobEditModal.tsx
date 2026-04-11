'use client';

import React, { useState, useEffect } from 'react';
import styles from './JobEditModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'
import {
  X, 
  Briefcase, 
  FileText, 
  Heart, 
  MapPin, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon,
  Compass,
  UtensilsCrossed,
  Baby,
  Clock,
  Check,
  ChevronDown,
  Map
} from 'lucide-react';

const JobEditModal = () => {
  const { t } = useTranslation()
  const { isJobEditModalOpen, closeJobEditModal, activeJob } = useModal();
  const [perks, setPerks] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setCountriesData(data.data);
        }
      })
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountry && countriesData.length > 0) {
      const countryObj = countriesData.find(c => c.country === selectedCountry);
      if (countryObj) {
        setAvailableCities(countryObj.cities);
      } else {
        setAvailableCities([]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry, countriesData]);
  
  useEffect(() => {
    if (activeJob && activeJob.badges) {
      setPerks(activeJob.badges);
    } else {
      setPerks([]);
    }

    if (activeJob && activeJob.salary) {
      const parts = activeJob.salary.split('-');
      setMinSalary(parts[0]?.replace(/[^0-9]/g, '') || '');
      setMaxSalary(parts[1]?.replace(/[^0-9]/g, '') || '');
    } else {
      setMinSalary('');
      setMaxSalary('');
    }

    if (activeJob?.location) {
      const parts = activeJob.location.split(',');
      if (parts.length >= 2) {
        setSelectedCity(parts[0].trim());
        setSelectedCountry(parts[1].trim());
      } else {
        setSelectedCountry(parts[0].trim());
        setSelectedCity('');
      }
    } else {
      setSelectedCountry('');
      setSelectedCity('');
    }
  }, [activeJob, isJobEditModalOpen]);

  if (!isJobEditModalOpen) return null;

  const togglePerk = (perk: string) => {
    setPerks(prev => 
      prev.includes(perk) 
        ? prev.filter(p => p !== perk) 
        : [...prev, perk]
    );
  };

  const handleClose = () => {
    closeJobEditModal();
  };

  const perkOptions = [
    { label: t('prayerRoom', 'Prayer Room'), icon: <Compass size={18} /> },
    { label: t('halalFood', 'Halal Food'), icon: <UtensilsCrossed size={18} /> },
    { label: t('nurseryRoom', 'Nursery Room'), icon: <Baby size={18} /> },
    { label: t('motherFriendlyHours', 'Mother Friendly Hours'), icon: <Clock size={18} /> },
    { label: t('flexibleHours', 'Flexible Hours'), icon: <Clock size={18} /> },
    { label: t('earlyFridayFinish', 'Early Friday Finish'), icon: <Briefcase size={18} /> }
  ];

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <form className={styles.modal} onSubmit={(e) => { e.preventDefault(); handleClose(); }} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{activeJob ? t('editJobPosting', 'Edit Job Posting') : t('postANewJob', 'Post a New Job')}</h2>
          <p>{t('createAProfessionalJobListingToAttractTopTalentInTheHalalconsciousCommunity', 'Create a professional job listing to attract top talent in the halal-conscious community.')}</p>
        </div>

        <div className={styles.body}>
          {/* 1. Job Details */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <div className={styles.iconBox}>
                <Briefcase size={18} />
              </div>
              {t('1JobDetails', '1. Job Details')}
            </div>
            
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{t('jobTitle', 'Job Title')}</label>
                <input 
                  type="text" 
                  placeholder={t('egSeniorSoftwareEngineer', 'e.g. Senior Software Engineer')} 
                  className={styles.input}
                  defaultValue={activeJob?.title || ''}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('department', 'Department')}</label>
                <select className={styles.select}>
                  <option>{t('engineering', 'Engineering')}</option>
                  <option>{t('marketing', 'Marketing')}</option>
                  <option>{t('finance', 'Finance')}</option>
                  <option>{t('humanResources', 'Human Resources')}</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('employmentType', 'Employment Type')}</label>
                <select className={styles.select}>
                  <option>{t('fulltime', 'Full-time')}</option>
                  <option>{t('contract', 'Contract')}</option>
                  <option>{t('parttime', 'Part-time')}</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('country', 'Country')}</label>
                <select 
                  className={styles.select}
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedCity('');
                  }}
                  required
                >
                  <option value="" disabled>{t('selectCountry', 'Select Country')}</option>
                  {countriesData.map((c, idx) => (
                    <option key={idx} value={c.country}>{c.country}</option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('city', 'City Name')}</label>
                <select 
                  className={styles.select}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedCountry || availableCities.length === 0}
                  required
                >
                  <option value="" disabled>{t('selectCity', 'Select City')}</option>
                  {availableCities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>{t('fullAddress', 'Full Address')}</label>
                <div className={styles.locationInputWrapper}>
                  <Map size={18} className={styles.locationIcon} />
                  <input 
                    type="text" 
                    placeholder={t('fullAddressPlaceholder', 'e.g. 123 Main St, Suite 100')} 
                    className={`${styles.input} ${styles.locationInput}`}
                    defaultValue={activeJob?.fullAddress || ''}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('minSalary', 'Min Salary (Annual)')}</label>
                <input 
                  type="number" 
                  min="0"
                  max="10000000"
                  placeholder={t('eg80000', 'e.g. 80000')} 
                  className={styles.input}
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('maxSalary', 'Max Salary (Annual)')}</label>
                <input 
                  type="number" 
                  min={minSalary || "0"}
                  max="10000000"
                  placeholder={t('eg120000', 'e.g. 120000')} 
                  className={styles.input}
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* 2. Role Description */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <div className={styles.iconBox}>
                <FileText size={18} />
              </div>
              {t('2RoleDescription', '2. Role Description')}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>{t('jobDescriptionRequirements', 'Job Description & Requirements')}</label>
              <div style={{ position: 'relative' }}>
                <div className={styles.richTextControls}>
                  <Bold size={16} className={styles.controlBtn} />
                  <Italic size={16} className={styles.controlBtn} />
                  <List size={16} className={styles.controlBtn} />
                  <LinkIcon size={16} className={styles.controlBtn} />
                </div>
                <textarea 
                  placeholder={t('describeTheRoleResponsibilitiesAndKeyRequirements', 'Describe the role, responsibilities, and key requirements...')} 
                  className={styles.textarea}
                  style={{ borderRadius: '0 0 12px 12px' }}
                />
              </div>
            </div>
          </section>

          {/* 3. Workplace Perks */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <div className={styles.iconBox}>
                <Heart size={18} />
              </div>
              {t('3WorkplacePerks', '3. Workplace Perks')}
            </div>
            
            <p className={styles.label} style={{ marginBottom: '-8px' }}>
              {t('selectTheBenefitsAndFacilitiesAvailableAtYourWorkplace', 'Select the benefits and facilities available at your workplace.')}
            </p>

            <div className={styles.perksGrid}>
              {perkOptions.map((option) => (
                <div 
                  key={option.label}
                  className={`${styles.perkItem} ${perks.includes(option.label) ? styles.perkItemActive : ''}`}
                  onClick={() => togglePerk(option.label)}
                >
                  <div className={`${styles.checkbox} ${perks.includes(option.label) ? styles.checkboxActive : ''}`}>
                    {perks.includes(option.label) && <Check size={12} color="white" />}
                  </div>
                  <div style={{ color: perks.includes(option.label) ? '#c4a66a' : '#193f35' }}>
                    {option.icon}
                  </div>
                  <span className={styles.perkLabel}>{option.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={handleClose}>{t('cancel', 'Cancel')}</button>
          <button type="submit" className={styles.submitBtn}>
            {activeJob ? t('updatePosting', 'Update Posting') : t('postJob', 'Post Job')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobEditModal;
