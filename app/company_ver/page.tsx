'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyVerification } from '@/redux/Slice/registrationSlice';
import { useRegistrationFiles } from '@/app/context/RegistrationContext';
import styles from './CompanyVerification.module.css';
import {
    FileText, 
    Award, 
    ShieldCheck, 
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

const CompanyVerification = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const registration = useSelector((state: any) => state.registration);
    const { 
        businessRegistrationCertificate, setBusinessRegistrationCertificate,
        halalCertification, setHalalCertification 
    } = useRegistrationFiles();

    const [taxId, setTaxId] = useState('');

    useEffect(() => {
        if (registration && registration.companyVerificationSchema) {
            setTaxId(registration.companyVerificationSchema.companyTaxId || '');
        }
    }, [registration]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'business' | 'halal') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'business') setBusinessRegistrationCertificate(file);
            else setHalalCertification(file);
        }
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!businessRegistrationCertificate) {
            alert('Please upload your Business Registration Certificate.');
            return;
        }

        dispatch(setCompanyVerification({
            companyTaxId: taxId
        }));

        router.push('/workplace_pre');
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt="HalalHire Logo" width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <header className={styles.header}>
                <span className={styles.stepLabel}>Step 2 of 3</span>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>Verification</h1>
                    <span className={styles.completion}>66% Complete</span>
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '66%' }}></div>
                </div>
                <p className={styles.subtitle}>Verify your business identity to start posting jobs.</p>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.formCard}>
                    <form onSubmit={handleContinue}>
                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <FileText className={styles.sectionIcon} size={20} />
                                <h2 className={styles.sectionTitle}>Official Documents</h2>
                            </div>

                            <div className={`${styles.uploadRow} ${businessRegistrationCertificate ? styles.uploadRowActive : ''}`}>
                                <div className={styles.docIcon}>
                                    <FileText size={24} />
                                </div>
                                <div className={styles.docInfo}>
                                    <div className={styles.docName}>
                                        Business Registration Certificate
                                    </div>
                                    <p className={styles.docDesc}>
                                        {businessRegistrationCertificate ? businessRegistrationCertificate.name : 'PDF, JPG or PNG (Max 5MB). Ensure all corners are visible.'}
                                    </p>
                                </div>
                                <label className={styles.uploadBtn}>
                                    {businessRegistrationCertificate ? 'Change' : 'Upload'}
                                    <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'business')} />
                                </label>
                            </div>

                            <div className={`${styles.uploadRow} ${halalCertification ? styles.uploadRowActive : ''}`}>
                                <div className={`${styles.docIcon} ${styles.docIconSecondary}`} style={{ background: halalCertification ? '#d4bc7e' : '#e2e8f0', color: halalCertification ? 'white' : '#64748b' }}>
                                    <Award size={24} />
                                </div>
                                <div className={styles.docInfo}>
                                    <div className={styles.docName}>Halal Certification <span className={styles.optionalBadge}>Optional</span></div>
                                    <p className={styles.docDesc}>
                                        {halalCertification ? halalCertification.name : 'Provide your Halal compliance certificate if available.'}
                                    </p>
                                </div>
                                <label className={`${styles.uploadBtn} ${styles.uploadBtnSecondary}`}>
                                    {halalCertification ? 'Change' : 'Upload'}
                                    <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'halal')} />
                                </label>
                            </div>
                        </section>

                        <section className={styles.section} style={{ marginBottom: 0 }}>
                            <div className={styles.sectionHeader}>
                                <FileText className={styles.sectionIcon} size={20} />
                                <h2 className={styles.sectionTitle}>Tax Identification</h2>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Company Tax ID (TRN / VAT Number)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 100-200-300-400" 
                                    className={styles.input}
                                    value={taxId}
                                    onChange={(e) => setTaxId(e.target.value)}
                                    required
                                />
                            </div>
                            <p className={styles.infoNote}>This information is used for billing and identity verification only.</p>
                        </section>

                        <div className={styles.navigation} style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
                            <Link href="/company_on" className={styles.backBtn} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                                <ArrowLeft size={18} /> Back
                            </Link>
                            <button type="submit" className={styles.continueBtn} style={{ flex: 1, backgroundColor: '#0c3126', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                                Continue to Final Step
                            </button>
                        </div>
                    </form>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.benefitCard}>
                        <div className={styles.benefitHeader}>
                            <div className={styles.benefitIcon}>
                                <ShieldCheck size={20} />
                            </div>
                            <h3>Why verify?</h3>
                        </div>
                        <div className={styles.benefitList}>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.benefitCheck} />
                                <div>
                                    <span className={styles.benefitItemTitle}>Build Trust</span>
                                    <p className={styles.benefitItemDesc}>Verified businesses get 3x more applications from high-quality candidates.</p>
                                </div>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.benefitCheck} />
                                <div>
                                    <span className={styles.benefitItemTitle}>Better Visibility</span>
                                    <p className={styles.benefitItemDesc}>Your job postings appear higher in search results across the platform.</p>
                                </div>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.benefitCheck} />
                                <div>
                                    <span className={styles.benefitItemTitle}>Verified Badge</span>
                                    <p className={styles.benefitItemDesc}>Display a gold verification badge on your company profile and job ads.</p>
                                </div>
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

export default CompanyVerification;

            <footer className={styles.footer}>
                © 2026 HalalHire, The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default CompanyVerification;
