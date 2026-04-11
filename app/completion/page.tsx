'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Completion.module.css';
import {
    Check, 
    CheckCircle, 
    Briefcase, 
    Award, 
    Users, 
    HelpCircle,
    Star,
    Layout
} from 'lucide-react';

const CompletionPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt="HalalHire Logo" width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <main className={styles.mainContent}>
                <div className={styles.successCard}>
                    <div className={styles.heroIconContainer}>
                        <div className={styles.mainIcon}>
                            <Check size={50} strokeWidth={4} />
                        </div>
                        <div className={styles.badgeIcon}>
                            <CheckCircle size={16} strokeWidth={3} />
                        </div>
                    </div>

                    <h1 className={styles.title}>Welcome to the HalalHire Family!</h1>
                    <p className={styles.subtitle}>
                        Your organization is now part of the world&apos;s leading ethical and halal professional network.
                    </p>

                    <div className={styles.infoBox}>
                        Your profile is being reviewed by our team and will be live shortly. In the meantime, you can start exploring the platform and setting up your workspace.
                    </div>

                    <Link href="/">
                        <button className={styles.homeBtn}>
                            <Layout size={20} /> Go to Home
                        </button>
                    </Link>

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
