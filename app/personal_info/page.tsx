'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './PersonalInfo.module.css';
import { useTranslation } from 'react-i18next'

const PersonalInfoPage = () => {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        dob: '',
        country: t('selectYourCountry', 'Select your country'),
        maritalStatus: t('selectStatus', 'Select status'),
        childrenCount: '',
        prayerFacility: t('preferenceForPrayerFacilitiesHalalFood', 'Preference for prayer facilities / Halal food?')
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Steps & Progress */}
            <header className={styles.header}>
                <div className={styles.stepInfo}>{t('step1Of5', 'Step 1 of 5')}</div>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{t('personalInformation', 'Personal Information')}</h1>
                    <div className={styles.percentageBadge}>{t('20Complete', '20% Complete')}</div>
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '20%' }}></div>
                </div>
            </header>

            {/* Form Card */}
            <main className={styles.formCard}>
                <div className={styles.infoBox}>
                    <p className={styles.infoText}>
                        {t('helpUsUnderstandYourBackgroundToProvideATailoredExperienceYourDataIsStoredEthicallyAndWithFullDignity', 'Help us understand your background to provide a tailored experience. Your data is stored ethically and with full dignity.')}
                    </p>
                </div>

                <form className={styles.formBody} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGrid}>
                        {/* Date of Birth */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('dateOfBirth', 'Date of Birth')}</label>
                            <input 
                                type="text" 
                                name="dob"
                                placeholder="mm/dd/yyyy" 
                                className={styles.input} 
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Country of Origin */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('countryOfOrigin', 'Country of Origin')}</label>
                            <div className={styles.selectWrapper}>
                                <select 
                                    className={styles.select}
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option>{t('selectYourCountry', 'Select your country')}</option>
                                    <option>{t('unitedKingdom', 'United Kingdom')}</option>
                                    <option>{t('unitedStates', 'United States')}</option>
                                    <option>{t('canada', 'Canada')}</option>
                                    <option>{t('saudiArabia', 'Saudi Arabia')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Marital Status */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('maritalStatus', 'Marital Status')}</label>
                            <div className={styles.selectWrapper}>
                                <select 
                                    className={styles.select}
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                >
                                    <option>{t('selectStatus', 'Select status')}</option>
                                    <option>{t('single', 'Single')}</option>
                                    <option>{t('married', 'Married')}</option>
                                    <option>{t('divorced', 'Divorced')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Number of Children */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('numberOfChildren', 'Number of Children')}</label>
                            <input 
                                type="number" 
                                name="childrenCount"
                                placeholder="0" 
                                className={styles.input} 
                                value={formData.childrenCount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Religious Practice Section */}
                    <div className={styles.religiousSection}>
                        <div className={styles.religiousHeader}>
                            <div className={styles.religiousTitle}>
                                <svg className={styles.shieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L4 5V11C4 16.19 7.41 21.05 12 22.5C16.59 21.05 20 16.19 20 11V5L12 2Z" />
                                </svg>
                                {t('religiousPracticeOptional', 'Religious Practice (Optional)')}
                            </div>
                            <div className={styles.visibilityBadge}>
                                <span className={styles.visibilityLabel}>{t('profileVisibility', 'Profile Visibility')}</span>
                                <div className={styles.visibilityStatus}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                    {t('private', 'Private')}
                                </div>
                            </div>
                        </div>

                        <div className={styles.selectWrapper}>
                            <select 
                                className={`${styles.select} ${styles.religionSelect}`}
                                name="prayerFacility"
                                value={formData.prayerFacility}
                                onChange={handleChange}
                            >
                                <option>{t('preferenceForPrayerFacilitiesHalalFood', 'Preference for prayer facilities / Halal food?')}</option>
                                <option>{t('yesIRequirePrayerFacilities', 'Yes, I require prayer facilities')}</option>
                                <option>{t('yesIRequireHalalFoodOptions', 'Yes, I require Halal food options')}</option>
                                <option>{t('bothAreImportantToMe', 'Both are important to me')}</option>
                            </select>
                        </div>

                        <p className={styles.privacyNote}>
                            {t('yourReligiousDetailsAreUsedOnlyForMatchingWithFaithalignedEmployersAndAreHiddenFromThePublicProfileUnlessYouChooseOtherwiseDataIsEncryptedForYourDignityAndPrivacy', 'Your religious details are used only for matching with faith-aligned employers and are hidden from the public profile unless you choose otherwise. Data is encrypted for your dignity and privacy.')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className={styles.navigation}>
                        <Link href="/login" className={styles.backBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            {t('backToLogin', 'Back to Login')}
                        </Link>
                        <Link href="/identity_doc" className={styles.continueBtn}>
                            {t('saveContinue', 'Save & Continue')}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>
                </form>
            </main>

            {/* Footer Certificates */}
            <div className={styles.certBadges}>
                <div className={styles.certItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {t('iso27001Certified', 'ISO 27001 Certified')}
                </div>
                <div className={styles.certItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2L4 5V11C4 16.19 7.41 21.05 12 22.5C16.59 21.05 20 16.19 20 11V5L12 2Z"></path>
                        <line x1="12" y1="9" x2="12" y2="15"></line>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                    {t('shariaCompliantProcess', 'Sharia Compliant Process')}
                </div>
                <div className={styles.certItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                    {t('ethicalDataUsage', 'Ethical Data Usage')}
                </div>
            </div>

            <footer className={styles.copyright}>
                {t('2026HalalhireBuildingTheGlobalUmmahThroughEthicalWork', '© 2026 HalalHire. Building the Global Ummah through Ethical Work.')}
            </footer>
        </div>
    );
};

export default PersonalInfoPage;