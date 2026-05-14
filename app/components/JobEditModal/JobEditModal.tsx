'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './JobEditModal.module.css';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
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

const JOB_TITLES = [
  // Technology
  { id: 1, name: 'Frontend Developer' },
  { id: 2, name: 'Backend Developer' },
  { id: 3, name: 'Full Stack Developer' },
  { id: 4, name: 'Software Engineer' },
  { id: 5, name: 'UI/UX Designer' },
  { id: 6, name: 'Mobile App Developer' },
  { id: 7, name: 'Data Scientist' },
  { id: 8, name: 'DevOps Engineer' },
  { id: 9, name: 'QA Engineer' },
  { id: 10, name: 'Cyber Security Analyst' },
  { id: 11, name: 'Cloud Architect' },
  // Finance & Islamic Finance
  { id: 12, name: 'Islamic Finance Analyst' },
  { id: 13, name: 'Sharia Auditor' },
  { id: 14, name: 'Senior Compliance Officer' },
  { id: 15, name: 'Financial Consultant' },
  { id: 16, name: 'Investment Banker' },
  { id: 17, name: 'Risk Manager' },
  { id: 18, name: 'Accountant' },
  { id: 19, name: 'Portfolio Manager' },
  // Healthcare
  { id: 20, name: 'Clinical Lead' },
  { id: 21, name: 'Registered Nurse' },
  { id: 22, name: 'Pharmacist' },
  { id: 23, name: 'General Practitioner' },
  { id: 24, name: 'Healthcare Administrator' },
  // Education
  { id: 25, name: 'Educational Consultant' },
  { id: 26, name: 'Online Tutor' },
  { id: 27, name: 'Arabic Language Teacher' },
  { id: 28, name: 'Islamic Studies Instructor' },
  { id: 29, name: 'Curriculum Developer' },
  // Marketing & Sales
  { id: 30, name: 'Marketing Manager' },
  { id: 31, name: 'Content Strategist' },
  { id: 32, name: 'SEO Specialist' },
  { id: 33, name: 'Sales Representative' },
  { id: 34, name: 'Digital Marketing Manager' },
  { id: 35, name: 'Business Development Manager' },
  // Operations & Logistics
  { id: 36, name: 'Operations Manager' },
  { id: 37, name: 'Logistics Manager' },
  { id: 38, name: 'Supply Chain Coordinator' },
  { id: 39, name: 'Procurement Officer' },
  { id: 40, name: 'Project Manager' },
  // HR & Administration
  { id: 41, name: 'HR Manager' },
  { id: 42, name: 'Recruiter' },
  { id: 43, name: 'Legal Advisor' },
  { id: 44, name: 'Office Administrator' },
  // Creative
  { id: 45, name: 'Graphic Designer' },
  { id: 46, name: 'Product Designer' },
  { id: 47, name: 'Creative Director' },
  { id: 48, name: 'Video Editor' },
];

const JobEditModal = () => {
  const { t } = useTranslation()
  const { isJobEditModalOpen, closeJobEditModal, activeJob } = useModal();
  
  // Initialize state from activeJob data
  const [perks, setPerks] = useState<string[]>(activeJob?.badges || []);
  const [minSalary, setMinSalary] = useState(() => {
    if (activeJob?.salary) {
      const parts = activeJob.salary.split('-');
      return parts[0]?.replace(/[^0-9]/g, '') || '';
    }
    return '';
  });
  const [maxSalary, setMaxSalary] = useState(() => {
    if (activeJob?.salary) {
      const parts = activeJob.salary.split('-');
      return parts[1]?.replace(/[^0-9]/g, '') || '';
    }
    return '';
  });
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (activeJob?.location) {
      const parts = activeJob.location.split(',');
      if (parts.length >= 2) {
        return parts[1].trim();
      }
      return parts[0].trim();
    }
    return '';
  });
  const [selectedCity, setSelectedCity] = useState(() => {
    if (activeJob?.location) {
      const parts = activeJob.location.split(',');
      if (parts.length >= 2) {
        return parts[0].trim();
      }
      return '';
    }
    return '';
  });
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [experience, setExperience] = useState(activeJob?.experience || 'Mid');
  const [jobTitle, setJobTitle] = useState(activeJob?.title || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredTitles, setFilteredTitles] = useState(JOB_TITLES);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const user = useSelector((state: any) => state.auth?.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeJob) {
      // Logic for posting a new job
      // Check if user has a subscription (adjust condition based on actual user object structure)
      const hasSubscription = user?.subscription || user?.isSubscribed || user?.plan; 
      
      if (!hasSubscription) {
        // If no subscription, navigate to subscription page
        closeJobEditModal();
        router.push('/company_subscription');
      } else {
        // If has subscription, post directly
        console.log("User has subscription, directly posting job...");
        // TODO: Add actual API call to post job here
        closeJobEditModal();
      }
    } else {
      // Logic for updating an existing job
      console.log("Updating existing job...");
      // TODO: Add actual API call to update job here
      closeJobEditModal();
    }
  };


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
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleJobTitleChange = (value: string) => {
    setJobTitle(value);
    if (value.trim()) {
      const filtered = JOB_TITLES.filter(title =>
        title.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTitles(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredTitles(JOB_TITLES);
      setIsDropdownOpen(true);
    }
  };

  const selectTitle = (title: string) => {
    setJobTitle(title);
    setIsDropdownOpen(false);
  };

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
      <form className={styles.modal} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
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
              <div className={`${styles.inputGroup} ${styles.fullWidth}`} style={{ position: 'relative' }} ref={dropdownRef}>
                <label className={styles.label}>{t('jobTitle', 'Job Title')}</label>
                <input 
                  type="text" 
                  placeholder={t('egSeniorSoftwareEngineer', 'e.g. Senior Software Engineer')} 
                  className={styles.input}
                  value={jobTitle}
                  onChange={(e) => handleJobTitleChange(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {filteredTitles.length > 0 ? (
                      filteredTitles.map((title) => (
                        <div 
                          key={title.id} 
                          className={styles.dropdownItem}
                          onClick={() => selectTitle(title.name)}
                        >
                          {title.name}
                        </div>
                      ))
                    ) : (
                      <div className={styles.noResults}>No matches found</div>
                    )}
                  </div>
                )}
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
                <label className={styles.label}>{t('experienceLevel', 'Experience Level')}</label>
                <select 
                  className={styles.select}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="Fresher">{t('fresher', 'Fresher')}</option>
                  <option value="Junior">{t('junior', 'Junior')}</option>
                  <option value="Mid">{t('mid', 'Mid')}</option>
                  <option value="Senior">{t('senior', 'Senior')}</option>
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
                  required={!!maxSalary}
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
                  required={!!minSalary}
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
