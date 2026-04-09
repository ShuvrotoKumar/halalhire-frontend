'use client';

import React from 'react';
import styles from './CompanyProfile.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'
import {
    CheckCircle,
    MapPin,
    Users,
    Briefcase,
    Mail,
    Globe,
    Edit3,
    ArrowRight,
    Zap,
    Map,
    Compass,
    UtensilsCrossed,
    Baby,
    Clock
} from 'lucide-react';

const CompanyProfile = () => {
    const { t } = useTranslation()
    const { openProfileEditModal } = useModal();
    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            {/* Banner */}
            <div className={styles.banner}>
                <Image
                    src="/about1.png"
                    alt={t('companyBanner', 'Company Banner')}
                    fill
                    className={styles.bannerImage}
                />
            </div>

            <div className={styles.headerContainer}>
                <div className={styles.headerCard}>
                    <div className={styles.topSection}>
                        <div className={styles.logoContainer}>
                            <Briefcase size={48} color="white" />
                        </div>

                        <div className={styles.infoContent}>
                            <h1 className={styles.companyName}>{t('ethicalWealthManagement', 'Ethical Wealth Management')}</h1>
                            <div className={styles.tagline}>
                                <CheckCircle size={16} className={styles.verifiedIcon} />
                                {t('shariacompliantFinancialServices', 'Sharia-Compliant Financial Services')}
                            </div>
                            <div className={styles.metaRow}>
                                <div className={styles.metaItem}>
                                    <MapPin size={14} /> {t('londonUk', 'London, UK')}
                                </div>
                                <div className={styles.metaItem}>
                                    <Users size={14} /> {t('50200Employees', '50-200 Employees')}
                                </div>
                            </div>
                        </div>

                        <button className={styles.editBtn} onClick={() => openProfileEditModal()}>{t('editProfile', 'Edit Profile')}</button>
                    </div>

                    <div className={styles.tabs}>
            <Link href="/company_profile" className={`${styles.tab} ${styles.activeTab}`}>{t('overview', 'Overview')}</Link>
            <Link href="/compnay_jobs" className={styles.tab}><Trans i18nKey="jobsSpanClassnamestylesbadgecount12span">Jobs <span className={styles.badgeCount}>12</span></Trans></Link>
            <Link href="/company_team" className={styles.tab}>{t('team', 'Team')}</Link>
            <Link href="/company_req" className={styles.tab}>{t('requests', 'Requests')}</Link>
          </div>
        </div>
      </div>

            <main className={styles.mainGrid}>
                <div className={styles.contentColumn}>
                    {/* About Section */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>{t('aboutTheCompany', 'About the Company')}</h2>
                            <Edit3 size={18} className={styles.editIcon} />
                        </div>
                        <p className={styles.description}>
                            {t('ethicalWealthManagementIsALeadingFinancialServicesFirmDedicatedToShariahcompliantInvestmentStrategiesAndSustainableGrowthFoundedIn2015WeBridgeTheGapBetweenTraditionalWealthManagementAndIslamicPrinciplesEnsuringOurClientsPortfoliosReflectTheirValues', 'Ethical Wealth Management is a leading financial services firm dedicated to Shariah-compliant investment strategies and sustainable growth. Founded in 2015, we bridge the gap between traditional wealth management and Islamic principles, ensuring our clients\' portfolios reflect their values.')}
                        </p>
                    </section>

                    {/* Halal Workplace Section */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>{t('halalWorkplaceEnvironment', 'Halal Workplace Environment')}</h2>
                            <span className={styles.manageLink}>{t('manageBadges', 'Manage Badges')}</span>
                        </div>
                        <div className={styles.badgesGrid}>
                            <div className={styles.badgeCard}>
                                <div className={styles.badgeIcon}><Compass size={24} /></div>
                                <div className={styles.badgeInfo}>
                                    <span className={styles.badgeName}>{t('prayerRoom', 'Prayer Room')}</span>
                                    <span className={styles.badgeDesc}>{t('dedicatedPrayerSpaceWithWudhuFacilities', 'Dedicated prayer space with wudhu facilities')}</span>
                                </div>
                            </div>
                            <div className={styles.badgeCard}>
                                <div className={styles.badgeIcon}><UtensilsCrossed size={24} /></div>
                                <div className={styles.badgeInfo}>
                                    <span className={styles.badgeName}>{t('halalFood', 'Halal Food')}</span>
                                    <span className={styles.badgeDesc}>{t('100HalalCertifiedPantryAndCafeteria', '100% Halal certified pantry and cafeteria')}</span>
                                </div>
                            </div>
                            <div className={styles.badgeCard}>
                                <div className={styles.badgeIcon}><Baby size={24} /></div>
                                <div className={styles.badgeInfo}>
                                    <span className={styles.badgeName}>{t('nurseryRoom', 'Nursery Room')}</span>
                                    <span className={styles.badgeDesc}>{t('safeSpacesForNursingAndChildcare', 'Safe spaces for nursing and childcare')}</span>
                                </div>
                            </div>
                            <div className={styles.badgeCard}>
                                <div className={styles.badgeIcon}><Clock size={24} /></div>
                                <div className={styles.badgeInfo}>
                                    <span className={styles.badgeName}>{t('motherFriendlyHours', 'Mother Friendly Hours')}</span>
                                    <span className={styles.badgeDesc}>{t('flexibleWorkingArrangementsForParents', 'Flexible working arrangements for parents')}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className={styles.sidebarColumn}>
                    {/* Quick Actions */}
                    <section className={`${styles.card} ${styles.quickActionsCard}`}>
                        <div className={styles.qaHeader}>
                            <Zap size={20} />
                            <h3 className={styles.qaTitle}>{t('quickActions', 'Quick Actions')}</h3>
                        </div>
                        <div className={styles.qaList}>
                            <div className={styles.qaItem}>
                                <span className={styles.qaLabel}>{t('postANewJob', 'Post a New Job')}</span>
                                <ArrowRight size={16} className={styles.chevron} />
                            </div>
                            <Link href="/company_team" className={styles.qaItem}>
                                <span className={styles.qaLabel}>{t('manageTeam', 'Manage Team')}</span>
                                <ArrowRight size={16} className={styles.chevron} />
                            </Link>
                        </div>
                    </section>

                    {/* Locations */}
                    <section className={`${styles.card} ${styles.locationCard}`}>
                        <h3 className={styles.cardTitle} style={{ marginBottom: '24px' }}>{t('ourLocations', 'Our Locations')}</h3>
                        <div className={styles.mapPlaceholder}>
                            <Image
                                src="/map-placeholder.png"
                                alt={t('mapLocation', 'Map Location')}
                                fill
                                style={{ objectFit: 'cover', opacity: 0.5 }}
                            />
                            <MapPin size={32} className={styles.pin} fill="#fe6b2e" />
                        </div>
                        <h4 className={styles.locTitle}>{t('mainHqKualaLumpur', 'Main HQ - Kuala Lumpur')}</h4>
                        <p className={styles.locAddr}>
                            {t('level24PetronasTower3PersiaranKlcc50088KualaLumpur', 'Level 24, Petronas Tower 3, Persiaran KLCC, 50088 Kuala Lumpur')}
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CompanyProfile;