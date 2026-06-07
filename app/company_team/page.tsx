'use client';

import React from 'react';
import styles from './CompanyTeam.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next';
import { useGetTeamQuery } from '@/redux/api/teamApi';
import { useGetCompanyQuery } from '@/redux/api/companyApi';
import { imageUrl } from '@/Utils/server';
import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';
import {
  CheckCircle, 
  MapPin, 
  Users, 
  Briefcase,
  Bell,
  X,
  Globe,
  Trash2
} from 'lucide-react';

const CompanyTeam = () => {
  const { t } = useTranslation();
  const { openProfileEditModal, openTeamMemberModal, openTeamDeleteModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  // Fetch company data for the banner
  const { data: companyRes } = useGetCompanyQuery(undefined);
  const companyData = companyRes?.data?.data || companyRes?.data || {};
  const orgDetails = companyData.organizationDetails || {};
  const companyName = companyData.companyName || t('ethicalWealthManagement', 'Ethical Wealth Management');
  const industry = orgDetails.industry || t('shariacompliantFinancialServices', 'Sharia-Compliant Financial Services');
  const location = orgDetails.headquartersLocation || (companyData.workplace && companyData.workplace[0]) || t('londonUk', 'London, UK');
  const bannerImg = (companyData.bannerImage && companyData.bannerImage.trim()) || (orgDetails.bannerImage && orgDetails.bannerImage.trim()) ? imageUrl(companyData.bannerImage || orgDetails.bannerImage) : "/about1.png";
  const logoImg = (companyData.companyLogo && companyData.companyLogo.trim()) || (orgDetails.companyLogo && orgDetails.companyLogo.trim()) ? imageUrl(companyData.companyLogo || orgDetails.companyLogo) : (companyData.photo && companyData.photo.trim() ? imageUrl(companyData.photo) : null);
  const websiteUrl = orgDetails.websiteUrl || '';

  // Fetch team based on the active subscription ID (subscriberId)
  // not the user ID, as per backend requirement.
  const getStoredId = () => {
    if (typeof window === 'undefined') return null;
    let id = localStorage.getItem('subscriberId') || localStorage.getItem('subscriptionId'); 
    if (id) id = id.replace(/^"|"$/g, '');
    return (id === 'null' || id === 'undefined' || id === undefined) ? null : id;
  };

  const finalId = getStoredId() || "6a2213bf2b0fe5be36101c5c";

  // Fetch team data
  const { data: teamRes, isLoading: isTeamLoading, isError, error } = useGetTeamQuery(
    { id: finalId },
    { skip: !finalId }
  );
  
  console.log("teamRes:", teamRes, "error:", error);

  // Safely extract myTeams directly from data property
  let apiTeamMembers = teamRes?.data?.data?.myTeams || teamRes?.data?.myTeams || teamRes?.myTeams || [];
  
  // Guard against unexpected object return types by validating it's an array
  if (!Array.isArray(apiTeamMembers)) {
      apiTeamMembers = [];
  }

  const { data: notificationData } = useGetAllNotificationQuery(undefined);
    const notifications = notificationData?.data?.all_notification?.map((n: any) => ({
        id: n._id || Math.random().toString(),
        title: n.title || 'Notification',
        description: n.message || n.description || '',
        time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recently'
    })) || [];
  
  let teamMembers = apiTeamMembers.map((member: any) => ({
    id: member._id,
    name: member.name,
    role: member.designation,
    image: member.photo ? imageUrl(member.photo) : '/b1.png'
  }));

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      {/* Shared Header Section */}
      <div className={styles.banner}>
        <Image 
          src={bannerImg} 
          alt={t('companyBanner', 'Company Banner')} 
          fill 
          unoptimized={true}
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
                {websiteUrl && (
                  <div className={styles.metaItem}>
                    <Globe size={14} /> 
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {websiteUrl.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.headerActions}>
              <button
                className={styles.notificationBtn}
                onClick={() => setIsNotificationOpen(true)}
                aria-label={t('openNotifications', 'Open notifications')}
                type="button"
              >
                <Bell size={18} />
                <span className={styles.notificationDot}></span>
              </button>
              <button className={styles.editBtn} onClick={openProfileEditModal}>{t('editProfile', 'Edit Profile')}</button>
            </div>
          </div>
          
          <div className={styles.tabs}>
            <Link href="/company_profile" className={styles.tab}>{t('overview', 'Overview')}</Link>
            <Link href="/compnay_jobs" className={styles.tab}><Trans i18nKey="jobsSpanClassnamestylesbadgecount12span">Jobs <span className={styles.badgeCount}>12</span></Trans></Link>
            <Link href="/company_team" className={`${styles.tab} ${styles.activeTab}`}>{t('team', 'Team')}</Link>
            <Link href="/company_req" className={styles.tab}>{t('requests', 'Requests')}</Link>
          </div>
        </div>
      </div>

      <main className={styles.contentArea}>
        <div className={styles.contentHeader}>
          <h2>{t('ourLeadershipTeam', 'Our Leadership Team')}</h2>
          <button className={styles.addTeamBtn} onClick={() => openTeamMemberModal()}>{t('addTeam', 'Add Team')}</button>
        </div>

        <div className={styles.teamGrid}>
          {isTeamLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>Loading team...</div>
          ) : teamMembers.length > 0 ? (
            teamMembers.map((member: any) => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <span className={styles.role}>{member.role}</span>
                  <div className={styles.cardActions}>
                    <button className={styles.deleteActionBtn} onClick={() => openTeamDeleteModal(member)} title={t('deleteMember', 'Delete Member')}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', gridColumn: '1 / -1' }}>No team members added yet.</div>
          )}
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
      <Footer />
    </div>
  );
};

export default CompanyTeam;