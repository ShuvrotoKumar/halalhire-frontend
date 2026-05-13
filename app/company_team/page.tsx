'use client';

import React from 'react';
import styles from './CompanyTeam.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'
import {
  CheckCircle, 
  MapPin, 
  Users, 
  Briefcase,
  Bell,
  X
} from 'lucide-react';

const CompanyTeam = () => {
  const { t } = useTranslation()
  const { openProfileEditModal, openTeamMemberModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const notifications = React.useMemo(() => [
        {
            id: 1,
            title: t('newCandidateAlert', 'New candidate alert'),
            description: t('newCandidateAlertDesc', 'Three new candidates matched your Senior Product Designer opening.'),
            time: t('notificationThirtyMinutesAgo', '30 minutes ago')
        },
        {
            id: 2,
            title: t('companyRequestReminder', 'Verification reminder'),
            description: t('companyRequestReminderDesc', 'Your company verification request needs one final supporting document.'),
            time: t('notificationToday', 'Today')
        }
    ], [t]);
  
  const teamMembers = [
    {
      id: 1,
      name: t('ahmedAlsayed', 'Ahmed Al-Sayed'),
      role: t('chiefExecutiveOfficer', 'Chief Executive Officer'),
      image: '/b1.png'
    },
    {
      id: 2,
      name: t('sarahJenkins', 'Sarah Jenkins'),
      role: t('headOfIslamicCompliance', 'Head of Islamic Compliance'),
      image: '/b2.png'
    },
    {
      id: 3,
      name: t('marcusThorne', 'Marcus Thorne'),
      role: t('investmentDirector', 'Investment Director'),
      image: '/b3.png'
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      {/* Shared Header Section */}
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
          {teamMembers.map((member) => (
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
              </div>
            </div>
          ))}
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
                            {notifications.map((notification) => (
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