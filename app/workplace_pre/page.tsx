'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WorkplacePreview.module.css';
import {
    CheckCircle, 
    Palmtree, 
    Utensils, 
    Baby, 
    Clock, 
    Droplets, 
    Calendar, 
    Moon, 
    GraduationCap, 
    Activity,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';

const WorkplacePreview = () => {
    const [selectedPerks, setSelectedPerks] = useState<string[]>(['prayerRoom']);

    const perks = [
        { id: 'prayerRoom', icon: <Palmtree size={22} />, label: 'Prayer Room' },
        { id: 'halalFood', icon: <Utensils size={22} />, label: 'Halal Food' },
        { id: 'nurseryRoom', icon: <Baby size={22} />, label: 'Nursery Room' },
        { id: 'motherFriendlyHours', icon: <Clock size={22} />, label: 'Mother Friendly Hours' },
        { id: 'wuduStations', icon: <Droplets size={22} />, label: 'Wudu Stations' },
        { id: 'jumuahFlexibility', icon: <Calendar size={22} />, label: "Jumu'ah Flexibility" },
        { id: 'islamicHolidays', icon: <Moon size={22} />, label: 'Islamic Holidays' },
        { id: 'professionalDev', icon: <GraduationCap size={22} />, label: 'Professional Dev' },
        { id: 'healthInsurance', icon: <Activity size={22} />, label: 'Health Insurance' },
    ];

    const togglePerk = (id: string) => {
        setSelectedPerks(prev => 
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt="HalalHire Logo" width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <header className={styles.header}>
                <span className={styles.stepLabel}>Step 3 of 3</span>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>Workplace Perks</h1>
                    <span className={styles.completion}>100% Complete</span>
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '100%' }}></div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Select Workplace Perks</h2>
                    <p className={styles.sectionSubtitle}>Choose the benefits your company provides to employees to help them succeed.</p>

                    <div className={styles.perksGrid}>
                        {perks.map(perk => (
                            <div 
                                key={perk.id}
                                className={`${styles.perkCard} ${selectedPerks.includes(perk.id) ? styles.perkCardActive : ''}`}
                                onClick={() => togglePerk(perk.id)}
                            >
                                <div className={styles.perkIcon}>
                                    {perk.icon}
                                </div>
                                <span className={styles.perkLabel}>{perk.label}</span>
                                <CheckCircle size={20} className={styles.checkCircle} />
                            </div>
                        ))}
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.tipCard}>
                        <div className={styles.tipImageContainer}>
                            <Image 
                                src="/g1.png" 
                                alt="Professionals working" 
                                fill
                                className={styles.tipImage}
                            />
                        </div>
                        <div className={styles.tipContent}>
                            <div className={styles.tipHeader}>
                                <ShieldCheck className={styles.tipIcon} size={18} />
                                <span className={styles.tipTitle}>Top Talent Tip</span>
                            </div>
                            <h3 className={styles.tipMainTitle}>Perks attract talent</h3>
                            <p className={styles.tipDesc}>
                                These badges appear on your company profile and job listings to help candidates find the right fit. Companies with 3+ perks see 40% more applications from qualified Muslim talent.
                            </p>
                        </div>
                    </div>
                </aside>
            </main>

            <div className={styles.navigation}>
                <Link href="/company_ver">
                    <button className={styles.backBtn}>Back</button>
                </Link>
                <Link href="/completion">
                    <button className={styles.completeBtn}>
                        Complete Profile
                    </button>
                </Link>
            </div>

            <footer className={styles.footer}>
                © 2026 HalalHire, The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default WorkplacePreview;
