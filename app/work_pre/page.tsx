'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setWorkPreferences } from '@/redux/Slice/registrationSlice';
import styles from './WorkPre.module.css';

const WorkPreferencesPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const registration = useSelector((state: any) => state.registration);

    const [salaryMin, setSalaryMin] = useState(85000);
    const [salaryMax, setSalaryMax] = useState(140000);
    const [employmentType, setEmploymentType] = useState('Full-time');
    const [availableDate, setAvailableDate] = useState('06/01/2024');
    const [flexibility, setFlexibility] = useState({
        remote: true,
        relocate: false,
        travel: true
    });

    useEffect(() => {
        if (registration && registration.WorkPreferences) {
            setEmploymentType(registration.WorkPreferences.employmentType || 'Full-time');
            setAvailableDate(registration.WorkPreferences.availableFrom || '06/01/2024');
        }
    }, []);

    const toggleFlex = (key: keyof typeof flexibility) => {
        setFlexibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setWorkPreferences({
            salaryExpectations: `${salaryMin} - ${salaryMax} USD`,
            employmentType: employmentType,
            availableFrom: availableDate
        }));
        router.push('/photos_finalize');
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Top Bar */}
            <header className={styles.topBar}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="HalalHire Logo" width={120} height={40} style={{ objectFit: 'contain' }} />
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* Progress Header */}
                <header className={styles.header}>
                    <div className={styles.stepInfo}>
                        <span>Step 3 of 5</span>
                        <span className={styles.percentage}>80% Complete</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>
                    <p className={styles.stepMessage}>Almost there! We&apos;re tailoring your career path with ethical opportunities.</p>

                    <h1 className={styles.title}>Work Preferences</h1>
                    <p className={styles.subtitle}>
                        Tell us about your ideal working conditions and logistical requirements to help
                        us find the perfect match.
                    </p>
                </header>

                <div className={styles.formCard}>
                    {/* Salary Expectations */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <svg className={styles.iconCircle} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="2" y="6" width="20" height="12" rx="2" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M6 12h.01M18 12h.01" />
                            </svg>
                            Salary Expectations
                        </div>
                        
                        <div className={styles.salaryLabelRow}>
                            <div className={styles.label}>Desired Annual Salary (USD)</div>
                            <div className={styles.priceBadge}>${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}+</div>
                        </div>

                        <div className={styles.sliderContainer}>
                            <div className={styles.sliderTrack}>
                                <div className={styles.sliderProgress}></div>
                                <div className={`${styles.sliderHandle} ${styles.sliderHandleLeft}`}></div>
                                <div className={`${styles.sliderHandle} ${styles.sliderHandleRight}`}></div>
                                {/* Functional transparent inputs for mock slider */}
                                <input 
                                    type="range" 
                                    min="40000" 
                                    max="100000" 
                                    step="5000" 
                                    value={salaryMin} 
                                    onChange={(e) => setSalaryMin(parseInt(e.target.value))}
                                    style={{ position: 'absolute', opacity: 0, width: '100%', cursor: 'pointer' }}
                                />
                                <input 
                                    type="range" 
                                    min="105000" 
                                    max="250000" 
                                    step="5000" 
                                    value={salaryMax} 
                                    onChange={(e) => setSalaryMax(parseInt(e.target.value))}
                                    style={{ position: 'absolute', opacity: 0, width: '100%', cursor: 'pointer' }}
                                />
                            </div>
                            <div className={styles.sliderTicks}>
                                <span className={styles.tick}>$40k</span>
                                <span className={styles.tick}>$100k</span>
                                <span className={styles.tick}>$150k</span>
                                <span className={styles.tick}>$200k</span>
                                <span className={styles.tick}>$250k+</span>
                            </div>
                        </div>
                    </section>

                    {/* Employment & Availability */}
                    <div className={styles.rowGrid}>
                        <div className={styles.controlGroup}>
                            <div className={styles.controlLabel}>
                                <svg className={styles.iconCircle} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                Employment Type
                            </div>
                            <div className={styles.selectorRow}>
                                {['Full-time', 'Contract', 'Part-time'].map((type) => (
                                    <div 
                                        key={type}
                                        className={`${styles.selectorItem} ${employmentType === type ? styles.selectorActive : ''}`}
                                        onClick={() => setEmploymentType(type)}
                                    >
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.controlGroup}>
                            <div className={styles.controlLabel}>
                                <svg className={styles.iconCircle} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Available From
                            </div>
                            <input 
                                type="text" 
                                className={styles.dateInput} 
                                value={availableDate} 
                                onChange={(e) => setAvailableDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Flexibility */}
                    <section className={styles.section} style={{ marginTop: '48px' }}>
                        <div className={styles.sectionHeader}>
                            <svg className={styles.iconCircle} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            Flexibility
                        </div>
                        <div className={styles.flexGrid}>
                            <div className={styles.flexItem}>
                                <div className={styles.flexInfo}>
                                    <div className={styles.flexTitle}>Remote Acceptable?</div>
                                    <div className={styles.flexSub}>I am open to fully remote or hybrid roles.</div>
                                </div>
                                <div 
                                    className={`${styles.toggle} ${flexibility.remote ? styles.toggleActive : ''}`}
                                    onClick={() => toggleFlex('remote')}
                                >
                                    <div className={styles.toggleHandle}></div>
                                </div>
                            </div>

                            <div className={styles.flexItem}>
                                <div className={styles.flexInfo}>
                                    <div className={styles.flexTitle}>Willing to relocate?</div>
                                    <div className={styles.flexSub}>I am open to moving for the right opportunity.</div>
                                </div>
                                <div 
                                    className={`${styles.toggle} ${flexibility.relocate ? styles.toggleActive : ''}`}
                                    onClick={() => toggleFlex('relocate')}
                                >
                                    <div className={styles.toggleHandle}></div>
                                </div>
                            </div>

                            <div className={styles.flexItem}>
                                <div className={styles.flexInfo}>
                                    <div className={styles.flexTitle}>Willing to travel?</div>
                                    <div className={styles.flexSub}>Includes occasional business trips or client visits.</div>
                                </div>
                                <div 
                                    className={`${styles.toggle} ${flexibility.travel ? styles.toggleActive : ''}`}
                                    onClick={() => toggleFlex('travel')}
                                >
                                    <div className={styles.toggleHandle}></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Navigation */}
                <div className={styles.navigation}>
                    <Link href="/professional_info" className={styles.backBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                    </Link>
                    <button onClick={handleContinue} className={styles.continueBtn}>
                        Save & Continue
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>

                <div className={styles.securityNote}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Your data is stored securely and handled with ethical integrity.
                </div>
            </main>
        </div>
    );
};

export default WorkPreferencesPage;
