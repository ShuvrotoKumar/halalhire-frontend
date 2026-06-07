'use client';

import React, { useMemo, useState } from 'react';
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
    Clock,
    Bell,
    X,
    MessageSquare
} from 'lucide-react';
import { useGetCompanyQuery } from '@/redux/api/companyApi';
import { imageUrl } from '@/Utils/server';
import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';
import ChatModal from '../components/ChatModal/ChatModal';

const CompanyProfile = () => {
    const { t } = useTranslation()
    const { openProfileEditModal } = useModal();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    // Fetch company data
    const { data: companyRes } = useGetCompanyQuery(undefined);
    const companyData = companyRes?.data || {};
    const orgDetails = companyData.organizationDetails || {};
    
    const companyName = companyData.companyName || t('ethicalWealthManagement', 'Ethical Wealth Management');
    const industry = orgDetails.industry || t('shariacompliantFinancialServices', 'Sharia-Compliant Financial Services');
    const location = orgDetails.headquartersLocation || (companyData.workplace && companyData.workplace[0]) || t('londonUk', 'London, UK');
    const websiteUrl = orgDetails.websiteUrl || 'https://halalhire.com';
    const description = orgDetails.companyDescription || t('ethicalWealthManagementIsALeadingFinancialServicesFirm...', 'Ethical Wealth Management is a leading financial services firm dedicated to Shariah-compliant investment strategies and sustainable growth.');
    
    const bannerImg = orgDetails.bannerImage ? (orgDetails.bannerImage.startsWith('http') ? orgDetails.bannerImage : `https://beer-managers-uses-doctor.trycloudflare.com/${orgDetails.bannerImage.replace(/^\/+/, '')}`) : "/about1.png";
    const logoImg = orgDetails.companyLogo ? (orgDetails.companyLogo.startsWith('http') ? orgDetails.companyLogo : `https://beer-managers-uses-doctor.trycloudflare.com/${orgDetails.companyLogo.replace(/^\/+/, '')}`) : (companyData.photo ? (companyData.photo.startsWith('http') ? companyData.photo : `https://beer-managers-uses-doctor.trycloudflare.com/${companyData.photo.replace(/^\/+/, '')}`) : null);

    const { data: notificationData } = useGetAllNotificationQuery(undefined);
    const notifications = notificationData?.data?.all_notification?.map((n: any) => ({
        id: n._id || Math.random().toString(),
        title: n.title || 'Notification',
        description: n.message || n.description || '',
        time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recently'
    })) || [];

    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            {/* Banner */}
            <div className={styles.banner}> 
                <Image
                    src={bannerImg}
                    alt={t('companyBanner', 'Company Banner')}
                    fill
                    className={styles.bannerImage}
                />
            </div>

            <div className={styles.headerContainer}>
                <div className={styles.headerCard}>
                    <div className={styles.topSection}>
                        <div className={styles.logoContainer} style={{ overflow: 'hidden', position: 'relative' }}>
                            {logoImg ? (
                                <Image src={logoImg} alt={companyName} fill style={{ objectFit: 'cover' }} />
                            ) : (
                                <Briefcase size={48} color="white" />
                            )}
                        </div>

                        <div className={styles.infoContent}>
                            <h1 className={styles.companyName}>{companyName}</h1>
                            <div className={styles.tagline}>
                                <CheckCircle size={16} className={styles.verifiedIcon} />
                                {industry}
                            </div>
                            <div className={styles.metaRow}>
                                <div className={styles.metaItem}>
                                    <MapPin size={14} /> {location}
                                </div>
                                <div className={styles.metaItem}>
                                    <Globe size={14} /> 
                                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {websiteUrl.replace(/^https?:\/\//, '')}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            {/* <button
                                className={styles.notificationBtn}
                                onClick={() => setIsChatOpen(true)}
                                aria-label={t('openChat', 'Open chat')}
                                type="button"
                            >
                                <MessageSquare size={18} />
                            </button> */}
                            <button
                                className={styles.notificationBtn}
                                onClick={() => setIsNotificationOpen(true)}
                                aria-label={t('openNotifications', 'Open notifications')}
                                type="button"
                            >
                                <Bell size={18} />
                                <span className={styles.notificationDot}></span>
                            </button>
                            <button className={styles.editBtn} onClick={() => openProfileEditModal()}>{t('editProfile', 'Edit Profile')}</button>
                        </div>
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
                            <Edit3 size={18} className={styles.editIcon} onClick={() => openProfileEditModal()} style={{cursor: 'pointer'}} />
                        </div>
                        <p className={styles.description}>
                            {description}
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
                        <h4 className={styles.locTitle}>{t('mainHqKualaLumpur', 'Main HQ')}</h4>
                        <p className={styles.locAddr}>
                            {location}
                        </p>
                    </section>
                </div>
            </main>

            {isNotificationOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsNotificationOpen(false)}>
                    <div
                        className={styles.notificationModal}
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('notifications', 'Notifications')}
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <h2 className={styles.modalTitle}>{t('notifications', 'Notifications')}</h2>
                                <p className={styles.modalSubtitle}>{t('notificationSubtext', 'Stay updated with profile and application activity.')}</p>
                            </div>
                            <button
                                className={styles.modalCloseBtn}
                                onClick={() => setIsNotificationOpen(false)}
                                aria-label={t('closeNotifications', 'Close notifications')}
                                type="button"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className={styles.notificationList}>
                            {notifications.map((notification: any) => (
                                <div key={notification.id} className={styles.notificationItem}>
                                    <div className={styles.notificationIcon}>
                                        <Bell size={16} />
                                    </div>
                                    <div className={styles.notificationContent}>
                                        <div className={styles.notificationItemHeader}>
                                            <h3>{notification.title}</h3>
                                            <span>{notification.time}</span>
                                        </div>
                                        <p>{notification.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            <Footer />
        </div>
    );
};

export default CompanyProfile;
