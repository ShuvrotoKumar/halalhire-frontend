import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkplace } from '@/redux/Slice/registrationSlice';
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
    ShieldCheck,
    Plus,
    X
} from 'lucide-react';

const WorkplacePreview = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const registration = useSelector((state: any) => state.registration);

    const [selectedPerks, setSelectedPerks] = useState<string[]>(['prayerRoom']);
    const [locations, setLocations] = useState<string[]>(['Dhaka', 'Chattogram']);
    const [locationInput, setLocationInput] = useState('');

    useEffect(() => {
        if (registration && registration.workplace && registration.workplace.length > 0) {
            setLocations(registration.workplace);
        }
    }, [registration]);

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

    const addLocation = (e: React.FormEvent) => {
        e.preventDefault();
        if (locationInput.trim() && !locations.includes(locationInput.trim())) {
            setLocations([...locations, locationInput.trim()]);
            setLocationInput('');
        }
    };

    const removeLocation = (loc: string) => {
        setLocations(locations.filter(l => l !== loc));
    };

    const handleComplete = () => {
        if (locations.length === 0) {
            alert('Please add at least one workplace location.');
            return;
        }

        dispatch(setWorkplace(locations));
        router.push('/completion');
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
                    <h1 className={styles.title}>Workplace Details</h1>
                    <span className={styles.completion}>100% Complete</span>
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '100%' }}></div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.formSection}>
                    <section style={{ marginBottom: '40px' }}>
                        <h2 className={styles.sectionTitle}>Workplace Locations</h2>
                        <p className={styles.sectionSubtitle}>Add the cities or regions where your company operates.</p>
                        
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <input 
                                type="text"
                                placeholder="e.g. Dhaka, London"
                                className={styles.input}
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e0e6e2' }}
                            />
                            <button 
                                onClick={addLocation}
                                style={{ backgroundColor: '#193f35', color: 'white', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <Plus size={18} /> Add
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {locations.map(loc => (
                                <div key={loc} style={{ backgroundColor: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e5e7eb' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{loc}</span>
                                    <X size={14} style={{ cursor: 'pointer', color: '#6b7280' }} onClick={() => removeLocation(loc)} />
                                </div>
                            ))}
                        </div>
                    </section>

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
                <button onClick={handleComplete} className={styles.completeBtn}>
                    Complete Profile
                </button>
            </div>

            <footer className={styles.footer}>
                © 2026 HalalHire, The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default WorkplacePreview;
