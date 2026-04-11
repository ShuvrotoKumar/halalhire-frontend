'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './IdentityDoc.module.css';

const IdentityVerification = () => {
    const [nationalID, setNationalID] = useState<File | null>(null);
    const [passport, setPassport] = useState<File | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string>('/b1.png');

    const handleNationalIDUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setNationalID(file);
    };

    const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPassport(file);
    };

    const handlePhotoChange = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
            const file = e.target.files?.[0];
            if (file) {
                setProfilePhoto(URL.createObjectURL(file));
            }
        };
        input.click();
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
                <div className={styles.header}>
                    <div className={styles.stepInfo}>
                        <span>STEP 3.2: IDENTITY VERIFICATION</span>
                        <span>40% Complete</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>

                    <h1 className={styles.title}>Verify Your Identity</h1>
                    <p className={styles.subtitle}>
                        To maintain the integrity of our ethical Ummah network, please
                        provide a valid government ID for verification.
                    </p>
                </div>

                {/* Upload Cards Grid */}
                <div className={styles.uploadGrid}>
                    <label className={styles.uploadContainer}>
                        <input type="file" style={{ display: 'none' }} onChange={handleNationalIDUpload} />
                        <span className={styles.cardLabel}>National ID (Front & Back)</span>
                        <div className={styles.uploadCard}>
                            <div className={styles.iconCircle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                    <circle cx="9" cy="10" r="2" />
                                    <line x1="15" y1="8" x2="19" y2="8" />
                                    <line x1="15" y1="12" x2="19" y2="12" />
                                    <line x1="7" y1="16" x2="17" y2="16" />
                                </svg>
                            </div>
                            <h3 className={styles.uploadTitle}>{nationalID ? nationalID.name : 'Upload National ID'}</h3>
                            <p className={styles.uploadSub}>{nationalID ? 'Click to change' : 'Drag and drop or click to upload'}</p>
                            <span className={styles.badge}>JPG, PNG or PDF (Max 5MB)</span>
                        </div>
                    </label>

                    <label className={styles.uploadContainer}>
                        <input type="file" style={{ display: 'none' }} onChange={handlePassportUpload} />
                        <span className={styles.cardLabel}>International Passport</span>
                        <div className={styles.uploadCard}>
                            <div className={styles.iconCircle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    <circle cx="12" cy="10" r="3" />
                                    <line x1="12" y1="16" x2="12" y2="16" />
                                </svg>
                            </div>
                            <h3 className={styles.uploadTitle}>{passport ? passport.name : 'Upload Passport'}</h3>
                            <p className={styles.uploadSub}>{passport ? 'Click to change' : 'Scan and upload your data page'}</p>
                            <span className={styles.badge}>High resolution required</span>
                        </div>
                    </label>
                </div>

                {/* Auto-extracted Profile Photo Section */}
                <div className={styles.photoSection}>
                    <div className={styles.photoWrapper}>
                        <Image
                            src={profilePhoto}
                            alt="Extracted Profile"
                            className={styles.photoImage}
                            width={100}
                            height={100}
                        />
                        <div className={styles.checkMark}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.photoInfo}>
                        <h3 className={styles.photoTitle}>Auto-extracted Profile Photo</h3>
                        <p className={styles.photoSub}>
                            Profile photo detected automatically from your document. This will be your public
                            profile image unless changed.
                        </p>
                        <div className={styles.photoActions}>
                            <button className={styles.changeBtn} onClick={handlePhotoChange}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                                Change Photo
                            </button>
                            <button className={styles.useOther} onClick={() => { setNationalID(null); setPassport(null); }}>Use Different Document</button>
                        </div>
                    </div>
                </div>

                {/* Shariah-Compliant Security Notice */}
                <div className={styles.securityBox}>
                    <div className={styles.securityIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22S8 4 8 10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <div className={styles.securityContent}>
                        <h4 className={styles.securityTitle}>Shariah-Compliant Security</h4>
                        <p className={styles.securityText}>
                            Your documents are encrypted and stored in an isolated secure environment. In alignment with our ethical principles, we never sell or share
                            your private data with third parties. Your privacy is a sacred trust (Amanah).
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className={styles.navigation}>
                    <Link href="/personal_info" className={styles.backLink}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to previous step
                    </Link>
                    <Link href="/professional_info" className={styles.continueBtn}>
                        Save & Continue
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                © 2026 HalalHire. The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default IdentityVerification;
