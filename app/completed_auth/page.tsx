'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CompletedAuth.module.css';
const CompletedAuthPage = () => {
    return (
        <div className={styles.pageWrapper}>
            {/* Top Bar */}
            <header className={styles.topBar}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="HalalHire Logo" width={120} height={40} style={{ objectFit: 'contain' }} />
                </div>
                {/* <div className={styles.avatarCircle}>Y</div> */}
            </header>

            <main className={styles.mainContent}>
                {/* Floating Badges on the right */}
                {/* <div className={styles.floatingGroup}>
                    <div className={`${styles.floatingBadge} ${styles.yBadge}`}>Y</div>
                    <div className={`${styles.floatingBadge} ${styles.kBadge}`}>K</div>
                </div> */}

                <div className={styles.successCard}>
                    <div className={styles.iconWrapper}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                        </svg>
                    </div>

                    <h1 className={styles.title}>Profile Successfully Verified</h1>
                    <p className={styles.subtitle}>Your professional profile is now live. Our AI matching system is currently analyzing the <span className={styles.highlight}>Ummah&apos;s top halal opportunities</span> specifically curated for your career growth.</p>

                    <div className={styles.badge}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="7" />
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                        Ethical Commitment Badge Awarded
                    </div>

                    <Link href="/" className={styles.homeBtn}>
                        Go to Home
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </main>

            <div className={styles.pageFooter}>
                <div className={styles.footerLinks}>
                    <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                    <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
                    <Link href="/ethical-charter" className={styles.footerLink}>Ethical Charter</Link>
                </div>
                <p className={styles.copyright}>
                    © 2026 HalalHire. Committed to Dignity and Islamic Financial Ethics.
                </p>
            </div>
        </div>
    );
};

export default CompletedAuthPage;