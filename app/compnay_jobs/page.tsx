'use client';

import React from 'react';
import styles from './CompanyJobs.module.css';
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
  Plus,
  Map,
  Compass,
  UtensilsCrossed,
  Baby,
  Clock,
  ArrowRight,
  Globe,
  CircleDollarSign,
  Bell,
  X
} from 'lucide-react';

const CompanyJobs = () => {
  const { t } = useTranslation()
  const { openJobEditModal, openJobDeleteModal, openProfileEditModal } = useModal();
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
  const managedJobs = [
    {
      id: 1,
      title: t('leadBackendDeveloper', 'Lead Backend Developer'),
      company: t('ethicaDigitalSolutions', 'Ethica Digital Solutions'),
      location: t('remoteDubaiUaeBase', 'Remote (Dubai, UAE Base)'),
      salary: t('90000110000', '$90,000 - $110,000'),
      badges: ['Prayer Room', 'Halal Food', 'Nursery Room']
    },
    {
      id: 2,
      title: t('leadBackendDeveloper', 'Lead Backend Developer'),
      company: t('ethicaDigitalSolutions', 'Ethica Digital Solutions'),
      location: t('remoteDubaiUaeBase', 'Remote (Dubai, UAE Base)'),
      salary: t('90000110000', '$90,000 - $110,000'),
      badges: ['Halal Food', t('motherFriendlyHours', 'Mother Friendly Hours')]
    },
    {
      id: 3,
      title: t('operationsManager', 'Operations Manager'),
      company: t('crescentHealthSystems', 'Crescent Health Systems'),
      location: 'Manchester, UK',
      salary: t('4500055000', '£45,000 - £55,000'),
      badges: ['Prayer Room', 'Halal Food', 'Nursery Room']
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
            <Link href="/compnay_jobs" className={`${styles.tab} ${styles.activeTab}`}><Trans i18nKey="jobsSpanClassnamestylesbadgecount12span">Jobs <span className={styles.badgeCount}>12</span></Trans></Link>
            <Link href="/company_team" className={styles.tab}>{t('team', 'Team')}</Link>
            <Link href="/company_req" className={styles.tab}>{t('requests', 'Requests')}</Link>
          </div>
        </div>
      </div>

      <main className={styles.contentArea}>
        <div className={styles.contentHeader}>
          <div className={styles.titleGroup}>
            <h2>{t('jobPostings', 'Job Postings')}</h2>
            <p className={styles.subtitle}>{t('manageYourActiveAndPastHiringCampaigns', 'Manage your active and past hiring campaigns')}</p>
          </div>
          <button className={styles.postJobBtn} onClick={() => openJobEditModal()}>
            <Plus size={18} />
            {t('postANewJob', 'Post a New Job')}
          </button>
        </div>

        <div className={styles.jobsList}>
          {managedJobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobMainInfo}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <div className={styles.companyRow}>{job.company}</div>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Globe size={14} /> {job.location}
                  </div>
                  <div className={styles.metaItem}>
                    <CircleDollarSign size={14} /> {job.salary}
                  </div>
                </div>
                <div className={styles.halalBadges}>
                  {job.badges.map((badge, idx) => (
                    <div key={idx} className={styles.halalBadge}>
                      {badge === 'Prayer Room' && <Compass size={12} />}
                      {badge === 'Halal Food' && <UtensilsCrossed size={12} />}
                      {badge === 'Nursery Room' && <Baby size={12} />}
                      {badge === t('motherFriendlyHours', 'Mother Friendly Hours') && <Clock size={12} />}
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.cardActions}>
                <button className={styles.editJobBtn} onClick={() => openJobEditModal(job)}>{t('editJob', 'Edit Job')}</button>
                <button className={styles.deleteJobBtn} onClick={() => openJobDeleteModal(job)}>{t('deleteJob', 'Delete Job')}</button>
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

export default CompanyJobs;