'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CompanyOnboarding.module.css';
import { useTranslation } from 'react-i18next'
import {
    CheckCircle2,
    Image as ImageIcon,
    Plus,
    MapPin,
    Globe,
    Building2,
    ChevronRight,
    Award
} from 'lucide-react';

const CompanyOnboarding = () => {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        location: '',
        website: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt={t('halalhireLogo', 'HalalHire Logo')} width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <header className={styles.header}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{t('step1CompanyProfileSetup', 'Step 1: Company Profile Setup')}</h1>
                    <span className={styles.nextStep}>{t('nextVerification', 'Next: Verification')}</span>
                </div>
                <div className={styles.progressInfo}>{t('33Completed', '33% Completed')}</div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '33%' }}></div>
                </div>

                <div className={styles.steps}>
                    <div className={`${styles.step} ${styles.activeStep}`}>
                        <div className={styles.stepNumber}>1</div>
                        <span>{t('basicInfo', 'Basic Info')}</span>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <span>{t('verification', 'Verification')}</span>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <span>{t('workplacePerks', 'Workplace Perks')}</span>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>{t('organizationDetails', 'Organization Details')}</h2>
                    <p className={styles.formSubtitle}>{t('provideTheFundamentalInformationAboutYourCompanyToAttractTheRightCandidates', 'Provide the fundamental information about your company to attract the right candidates.')}</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.uploadRow}>
                            <div className={styles.uploadGroup}>
                                <label>{t('companyLogo', 'Company Logo')}</label>
                                <div className={`${styles.uploadBox} ${styles.logoUpload}`}>
                                    <Plus size={24} />
                                    <span>{t('uploadLogo', 'Upload Logo')}</span>
                                </div>
                            </div>
                            <div className={styles.uploadGroup}>
                                <label>{t('bannerImage', 'Banner Image')}</label>
                                <div className={styles.uploadBox}>
                                    <ImageIcon size={24} />
                                    <span>{t('uploadBannerRecommended1200400', 'Upload Banner (Recommended 1200×400)')}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t('companyName', 'Company Name')}</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder={t('egHalalSolutionsInc', 'e.g. Halal Solutions Inc.')}
                                    className={styles.input}
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t('industry', 'Industry')}</label>
                                <select
                                    name="industry"
                                    className={styles.select}
                                    value={formData.industry}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('selectIndustry', 'Select Industry')}</option>
                                    <option value="tech">{t('technology', 'Technology')}</option>
                                    <option value="finance">{t('finance', 'Finance')}</option>
                                    <option value="healthcare">{t('healthcare', 'Healthcare')}</option>
                                    <option value="education">{t('education', 'Education')}</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('headquartersLocation', 'Headquarters Location')}</label>
                            <div className={styles.inputWrapper}>
                                <MapPin size={18} className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder={t('londonUnitedKingdom', 'London, United Kingdom')}
                                    className={`${styles.input} ${styles.inputWithIcon}`}
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('websiteUrl', 'Website URL')}</label>
                            <div className={styles.inputWrapper}>
                                <Globe size={18} className={styles.inputIcon} />
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://www.company.com"
                                    className={`${styles.input} ${styles.inputWithIcon}`}
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('companyDescription', 'Company Description')}</label>
                            <textarea
                                name="description"
                                placeholder={t('brieflyDescribeYourCompanysMissionValuesAndWhatMakesYouAGreatPlaceToWork', 'Briefly describe your company\'s mission, values, and what makes you a great place to work...')}
                                className={styles.textarea}
                                maxLength={500}
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                            <span className={styles.charCount}>{t('max500Characters', 'Max 500 characters')}</span>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/company_ver" className={styles.submitBtn}>
                                {t('saveAndContinue', 'Save and Continue')} <ChevronRight size={20} />
                            </Link>
                        </div>
                    </form>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.benefitCard}>
                        <div className={styles.benefitHeader}>
                            <div className={styles.benefitIcon}>
                                <Award size={20} />
                            </div>
                            <h3>{t('whyVerify', 'Why verify?')}</h3>
                        </div>
                        <div className={styles.benefitList}>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>{t('instantlyBuildTrustWithOver500kActiveHalalJobSeekers', 'Instantly build trust with over 500k active Halal job seekers.')}</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>{t('get2xMoreVisibilityInOrganicSearchResults', 'Get 2x more visibility in organic search results.')}</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>{t('receiveTheHalalVerifiedBadgeOnAllYourJobListings', 'Receive the \'Halal Verified\' badge on all your job listings.')}</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>{t('unlockAdvancedCompanyPageCustomization', 'Unlock advanced company page customization.')}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <footer className={styles.footer}>
                {t('2026HalalhireTheEthicalProfessionalNetworkForTheUmmah', '© 2026 HalalHire, The Ethical Professional Network for the Ummah.')}
            </footer>
        </div>
    );
};

export default CompanyOnboarding;