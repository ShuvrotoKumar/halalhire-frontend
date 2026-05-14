'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterCompanyMutation } from '@/redux/api/authApi';
import { useRegistrationFiles } from '@/app/context/RegistrationContext';
import { resetRegistration } from '@/redux/Slice/registrationSlice';
import styles from './Completion.module.css';
import {
    Check, 
    CheckCircle, 
    Users, 
    HelpCircle,
    Star,
    Layout,
    Loader2,
    AlertCircle
} from 'lucide-react';

const CompletionPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const registration = useSelector((state: any) => state.registration);
    const { 
        companyLogo, bannerImage, 
        businessRegistrationCertificate, halalCertification,
        clearFiles 
    } = useRegistrationFiles();

    const [registerCompany, { isLoading, error }] = useRegisterCompanyMutation();
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFinalSubmit = async () => {
        setLocalError(null);
        
        try {
            const formData = new FormData();
            
            // Construct the JSON data matching the requested structure
            const companyData = {
                companyName: registration.name,
                email: registration.email,
                password: registration.password,
                role: 'company',
                organizationDetails: registration.organizationDetails,
                companyVerificationSchema: registration.companyVerificationSchema,
                workplace: registration.workplace
            };

            formData.append('data', JSON.stringify(companyData));

            // Append files
            if (companyLogo) formData.append('companyLogo', companyLogo);
            if (bannerImage) formData.append('bannerImage', bannerImage);
            if (businessRegistrationCertificate) formData.append('businessRegistrationCertificate', businessRegistrationCertificate);
            if (halalCertification) formData.append('halalCertification', halalCertification);

            console.log('Registering company with data:', companyData);
            await registerCompany(formData).unwrap();
            
            setIsSuccess(true);
            
            // Clear state after short delay
            setTimeout(() => {
                // dispatch(resetRegistration());
                // clearFiles();
                router.push(`/create_user_verify?email=${registration.email}`);
            }, 1500);

        } catch (err: any) {
            console.error('Company registration failed:', err);
            setLocalError(err.data?.message || err.message || 'Registration failed. Please check your details.');
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt="HalalHire Logo" width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <main className={styles.mainContent}>
                <div className={styles.successCard}>
                    {isSuccess ? (
                        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                            <div className={styles.heroIconContainer}>
                                <div className={styles.mainIcon} style={{ backgroundColor: '#10b981' }}>
                                    <Check size={50} strokeWidth={4} color="white" />
                                </div>
                            </div>
                            <h1 className={styles.title}>Registration Successful!</h1>
                            <p className={styles.subtitle}>Redirecting to verification page...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.heroIconContainer}>
                                <div className={styles.mainIcon}>
                                    <CheckCircle size={50} strokeWidth={2} />
                                </div>
                                <div className={styles.badgeIcon}>
                                    <Star size={16} strokeWidth={3} />
                                </div>
                            </div>

                            <h1 className={styles.title}>Finalize Your Registration</h1>
                            <p className={styles.subtitle}>
                                Review your details and complete the process to join the world&apos;s leading ethical and halal professional network.
                            </p>

                            {localError && (
                                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertCircle size={18} />
                                    {localError}
                                </div>
                            )}

                            <div className={styles.infoBox}>
                                By clicking the button below, you confirm that the information provided is accurate and complies with HalalHire&apos;s ethical standards.
                            </div>

                            <button 
                                onClick={handleFinalSubmit} 
                                className={styles.homeBtn}
                                disabled={isLoading}
                                style={{ width: '100%', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> Finalizing...
                                    </>
                                ) : (
                                    <>
                                        <Check size={20} /> Complete & Finish
                                    </>
                                )}
                            </button>
                        </>
                    )}

                    <div className={styles.divider}></div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <Star size={24} />
                            </div>
                            <span className={styles.featureTitle}>Verified Status</span>
                            <p className={styles.featureDesc}>
                                Once approved, you&apos;ll receive the Halal Verified badge to build trust with candidates.
                            </p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <Users size={24} />
                            </div>
                            <span className={styles.featureTitle}>Talent Pool</span>
                            <p className={styles.featureDesc}>
                                Instantly access a specialized pool of over 500k+ global professional candidates.
                            </p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <HelpCircle size={24} />
                            </div>
                            <span className={styles.featureTitle}>24/7 Support</span>
                            <p className={styles.featureDesc}>
                                Need help? Our employer concierge team is available via the Employer Help Center.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                © 2026 HalalHire, The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default CompletionPage;
