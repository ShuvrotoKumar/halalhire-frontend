'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setOrganizationDetails, setBasicInfo } from '@/redux/Slice/registrationSlice';
import { useRegistrationFiles } from '@/app/context/RegistrationContext';
import styles from './CompanyOnboarding.module.css';
import {
    CheckCircle2,
    Image as ImageIcon,
    Plus,
    MapPin,
    Globe,
    ChevronRight,
    Award
} from 'lucide-react';

const CompanyOnboarding = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const registration = useSelector((state: any) => state.registration);
    const { companyLogo, setCompanyLogo, bannerImage, setBannerImage } = useRegistrationFiles();

    const [formData, setFormData] = useState({
        companyName: registration?.name || '',
        industry: registration?.organizationDetails?.industry || '',
        location: registration?.organizationDetails?.headquartersLocation || '',
        website: registration?.organizationDetails?.websiteUrl || '',
        description: registration?.organizationDetails?.companyDescription || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'logo') setCompanyLogo(file);
            else setBannerImage(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Update basic info for company name
        dispatch(setBasicInfo({ 
            name: formData.companyName, 
            email: registration.email, 
            password: registration.password, 
            role: 'company' 
        }));

        // Update organization details
        dispatch(setOrganizationDetails({
            industry: formData.industry,
            headquartersLocation: formData.location,
            websiteUrl: formData.website,
            companyDescription: formData.description
        }));

        router.push('/company_ver');
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt="HalalHire Logo" width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <header className={styles.header}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>Step 1: Company Profile Setup</h1>
                    <span className={styles.nextStep}>Next: Verification</span>
                </div>
                <div className={styles.progressInfo}>33% Completed</div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '33%' }}></div>
                </div>

                <div className={styles.steps}>
                    <div className={`${styles.step} ${styles.activeStep}`}>
                        <div className={styles.stepNumber}>1</div>
                        <span>Basic Info</span>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <span>Verification</span>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <span>Workplace Perks</span>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>Organization Details</h2>
                    <p className={styles.formSubtitle}>Provide the fundamental information about your company to attract the right candidates.</p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.uploadRow}>
                            <div className={styles.uploadGroup}>
                                <label>Company Logo</label>
                                <label className={`${styles.uploadBox} ${styles.logoUpload}`}>
                                    <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
                                    {companyLogo ? (
                                        <Image src={URL.createObjectURL(companyLogo)} alt="Logo" width={48} height={48} style={{ borderRadius: '8px', objectFit: 'cover' }} />
                                    ) : (
                                        <>
                                            <Plus size={24} />
                                            <span>Upload Logo</span>
                                        </>
                                    )}
                                </label>
                            </div>
                            <div className={styles.uploadGroup}>
                                <label>Banner Image</label>
                                <label className={styles.uploadBox}>
                                    <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'banner')} accept="image/*" />
                                    {bannerImage ? (
                                        <span style={{ fontSize: '12px' }}>{bannerImage.name}</span>
                                    ) : (
                                        <>
                                            <ImageIcon size={24} />
                                            <span>Upload Banner (Recommended 1200×400)</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="e.g. Halal Solutions Inc."
                                    className={styles.input}
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Industry</label>
                                <select
                                    name="industry"
                                    className={styles.select}
                                    value={formData.industry}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Industry</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance & Islamic Finance">Finance & Islamic Finance</option>
                                    <option value="Food & Beverage">Food & Beverage</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Headquarters Location</label>
                            <div className={styles.inputWrapper}>
                                <MapPin size={18} className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="London, United Kingdom"
                                    className={`${styles.input} ${styles.inputWithIcon}`}
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Website URL</label>
                            <div className={styles.inputWrapper}>
                                <Globe size={18} className={styles.inputIcon} />
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://www.company.com"
                                    className={`${styles.input} ${styles.inputWithIcon}`}
                                    value={formData.website}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Company Description</label>
                            <textarea
                                name="description"
                                placeholder="Briefly describe your company's mission, values, and what makes you a great place to work..."
                                className={styles.textarea}
                                maxLength={500}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <span className={styles.charCount}>Max 500 characters</span>
                        </div>

                        <div className={styles.actions}>
                            <button type="submit" className={styles.submitBtn}>
                                Save and Continue <ChevronRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.benefitCard}>
                        <div className={styles.benefitHeader}>
                            <div className={styles.benefitIcon}>
                                <Award size={20} />
                            </div>
                            <h3>Why verify?</h3>
                        </div>
                        <div className={styles.benefitList}>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>Instantly build trust with over 500k active Halal job seekers.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>Get 2x more visibility in organic search results.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>Receive the 'Halal Verified' badge on all your job listings.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <p>Unlock advanced company page customization.</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <footer className={styles.footer}>
                © 2026 HalalHire, The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default CompanyOnboarding;
