'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useRegistrationFiles } from '@/app/context/RegistrationContext';
import { useRegisterUserMutation } from '@/redux/api/authApi';
import { resetRegistration } from '@/redux/Slice/registrationSlice';
import { setUser as reduxSetUser } from '@/redux/Slice/authSlice';
import styles from './PhotosFinalize.module.css';

const PhotosFinalizePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const registration = useSelector((state: any) => state.registration);
    const {
        photo: portrait, setPhoto: setPortrait,
        nationalId, internationalPassport,
        document: resumeFile, professionalCertificates,
        clearFiles
    } = useRegistrationFiles();

    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
    const [finalError, setFinalError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPortrait(file);
        }
    };

    const handleFinish = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            if (!portrait || !nationalId || !internationalPassport || !resumeFile) {
                setFinalError('Some required documents are missing. Please ensure all files are uploaded in the previous steps.');
                return;
            }

            const formData = new FormData();

            // Create a copy of registration to ensure document placeholder is present
            const registrationData = {
                ...registration,
                professionalProfile: {
                    ...registration.professionalProfile,
                    document: 'resume' // Satisfies backend Zod schema
                }
            };

            // Append JSON data as requested by the API
            formData.append('data', JSON.stringify(registrationData));

            // Append files from context
            formData.append('photo', portrait);
            formData.append('nationalId', nationalId);
            formData.append('internationalPassport', internationalPassport);
            formData.append('document', resumeFile);

            // Append certificates
            professionalCertificates.forEach((cert) => {
                formData.append('professionalCertificates', cert);
            });

            console.log('Submitting registration data:', registrationData);
            const result = await registerUser(formData).unwrap();

            // Standardize the user object for UI purposes
            const userData = result.data?.user || result.user || {};
            const standardUser = {
                name: userData.name || userData.fullName || registration.name || 'User',
                email: userData.email || registration.email,
                role: userData.role || registration.role || 'user',
                avatar: portrait ? URL.createObjectURL(portrait) : (userData.avatar || userData.profileImage || userData.photo)
            };

            const token = result.data?.accessToken || result.data?.token || result.accessToken || result.token || 'temp-token';

            console.log('Registration success. Standardized user:', standardUser);

            // Clear local and global state (optional, can be done after verification if preferred)
            // dispatch(resetRegistration());
            // clearFiles();

            router.push(`/create_user_verify?email=${registration.email}`);
        } catch (err: any) {
            console.error('Registration failed:', err);
            const errorMessage = err.data?.message || err.message || 'Registration failed. Please try again.';
            setFinalError(errorMessage);
        }
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
                    <div className={styles.stepBadge}>Step 5 of 5</div>
                    <h1 className={styles.title}>Complete Your Professional Presence</h1>
                    <p className={styles.subtitle}>
                        A professional photo helps build trust and dignity within the HalalHire global community.
                    </p>
                </header>

                <div className={styles.formCard}>
                    {/* Upload Section */}
                    <div className={styles.uploadSection}>
                        <label className={styles.uploadArea}>
                            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                            <div className={styles.uploadIcon}>
                                {portrait ? (
                                    <Image
                                        src={URL.createObjectURL(portrait)}
                                        alt="Preview"
                                        width={64}
                                        height={64}
                                        style={{ borderRadius: '12px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                        <line x1="12" y1="13" x2="12" y2="13.01" />
                                        <line x1="21" y1="9" x2="21" y2="9.01" />
                                    </svg>
                                )}
                            </div>
                            <h2 className={styles.uploadTitle}>{portrait ? portrait.name : 'Upload Your Portrait'}</h2>
                            <p className={styles.uploadSub}>{portrait ? 'Click to change photo' : 'Drag and drop or click to browse files'}</p>
                            <div className={styles.uploadBadges}>
                                <div className={styles.badge}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    JPG, PNG
                                </div>
                                <div className={styles.badge}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    Max 5MB
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Moderation Box */}
                    <div className={styles.moderationBox}>
                        <div className={styles.infoIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <polyline points="9 12 11 14 15 10" />
                            </svg>
                        </div>
                        <div className={styles.infoText}>
                            <h3 className={styles.infoTitle}>Ethical Photo Moderation</h3>
                            <p className={styles.infoDesc}>
                                To maintain our professional standards, your photo will be reviewed before becoming visible to others. Please ensure a clear, professional portrait.
                            </p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className={styles.actionBar}>
                        <div className={styles.socialProof}>
                            <div className={styles.avatars}>
                                <div className={styles.avatarMini} style={{ backgroundColor: '#e5e7eb' }}></div>
                                <div className={styles.avatarMini} style={{ backgroundColor: '#d1d5db' }}></div>
                                <div className={styles.avatarMini} style={{ backgroundColor: '#9ca3af' }}></div>
                                <div className={styles.countBadge}>+10k</div>
                            </div>
                            <span className={styles.socialText}>Join thousands of professionals already on HalalHire</span>
                        </div>
                        {finalError && (
                            <div className={styles.errorBanner}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {finalError.includes('duplicate key') ? 'This email is already registered. Please use a different email.' : finalError}
                            </div>
                        )}
                        <div className={styles.actions}>
                            <button onClick={handleFinish} className={styles.skipBtn}>Skip for now</button>
                            <button
                                onClick={handleFinish}
                                className={styles.finishBtn}
                                disabled={isRegistering}
                            >
                                {isRegistering ? 'Registering...' : 'Finish Profile'}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <footer className={styles.pageFooter}>
                    <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                    <Link href="/standards" className={styles.footerLink}>Community Standards</Link>
                    <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
                </footer>
            </main>
        </div>
    );
};

export default PhotosFinalizePage;
