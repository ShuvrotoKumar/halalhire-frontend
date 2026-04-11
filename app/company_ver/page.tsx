'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CompanyVerification.module.css';
import {
    FileText, 
    Award, 
    ShieldCheck, 
    TrendingUp, 
    CheckCircle,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

const CompanyVerification = () => {
    const [taxId, setTaxId] = useState('');

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
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FileText className={styles.sectionIcon} size={20} />
                            <h2 className={styles.sectionTitle}>Official Documents</h2>
                        </div>

                        <div className={`${styles.uploadRow} ${styles.uploadRowActive}`}>
                            <div className={styles.docIcon}>
                                <FileText size={24} />
                            </div>
                            <div className={styles.docInfo}>
                                <div className={styles.docName}>
                                    Business Registration Certificate
                                </div>
                                <p className={styles.docDesc}>PDF, JPG or PNG (Max 5MB). Ensure all corners are visible.</p>
                            </div>
                            <button className={styles.uploadBtn}>Upload</button>
                        </div>

                        <div className={styles.uploadRow}>
                            <div className={`${styles.docIcon} ${styles.docIconSecondary}`} style={{ background: '#e2e8f0', color: '#64748b' }}>
                                <Award size={24} />
                            </div>
                            <div className={styles.docInfo}>
                                <div className={styles.docName}>Halal Certification <span className={styles.optionalBadge}>Optional</span></div>
                                <p className={styles.docDesc}>Provide your Halal compliance certificate if available.</p>
                            </div>
                            <button className={`${styles.uploadBtn} ${styles.uploadBtnSecondary}`}>Upload</button>
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
                            />
                        </div>
                        <p className={styles.infoNote}>This information is used for billing and identity verification only.</p>
                    </section>
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

            <div className={styles.navigation}>
                <Link href="/company_on" className={styles.backBtn}>
                    <ArrowLeft size={18} /> Back
                </Link>
                <Link href="/workplace_pre" className={styles.continueBtn}>
                    Continue to Final Step
                </Link>
            </div>

            <footer className={styles.footer}>
                © 2026 HalalHire, The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default CompanyVerification;
