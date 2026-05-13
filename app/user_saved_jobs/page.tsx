'use client';

import React, { useMemo, useState } from 'react';
import styles from './SavedJobs.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { 
  CheckCircle, 
  MapPin, 
  Globe, 
  Bookmark,
  Compass,
  Shield,
  Bell,
  X,
  Trash2,
  Send
} from 'lucide-react';

import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

const SavedJobs = () => {
  const { t } = useTranslation()
  const { openApplyModal, openProfileEditModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const savedJobs = useMemo(() => [
    {
      id: 1,
      title: t('principalUiuxDesigner', 'Principal UI/UX Designer'),
      company: t('neomDesignDivision', 'NEOM Design Division'),
      location: t('neomKsa', 'NEOM, KSA'),
      salary: t('sar4000055000', 'SAR 40,000 - 55,000'),
      icon: <Compass size={24} />,
    },
    {
      id: 2,
      title: t('cybersecurityLead', 'Cybersecurity Lead'),
      company: t('stcSolutions', 'STC Solutions'),
      location: t('riyadhKsa', 'Riyadh, KSA'),
      salary: t('sar3000042000', 'SAR 30,000 - 42,000'),
      icon: <Shield size={24} />,
    },
    {
      id: 3,
      title: t('cybersecurityLead', 'Cybersecurity Lead'),
      company: t('stcSolutions', 'STC Solutions'),
      location: t('riyadhKsa', 'Riyadh, KSA'),
      salary: t('sar3000042000', 'SAR 30,000 - 42,000'),
      icon: <Shield size={24} />,
    }
  ], [t]);
  const notifications = useMemo(() => [
    {
      id: 1,
      title: t('applicationStatusUpdated', 'Application status updated'),
      description: t('applicationStatusUpdatedDesc', 'Your application for Product Security Manager is now under review.'),
      time: t('notificationOneHourAgo', '1 hour ago')
    },
    {
      id: 2,
      title: t('savedJobReminder', 'Saved job reminder'),
      description: t('savedJobReminderDesc', 'One of your saved roles closes applications tomorrow.'),
      time: t('notificationToday', 'Today')
    }
  ], [t]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <div className={styles.profileInfo}>
            <div className={styles.avatarContainer}>
              <Image 
                src="/g1.png" 
                alt={t('ahmedAlfarsi', 'Ahmed Al-Farsi')} 
                width={120} 
                height={120} 
                className={styles.avatar} 
              />
              <div className={styles.verifiedBadge}>
                <CheckCircle size={20} color="#e2ab4c" fill="white" />
              </div>
            </div>
            
            <div className={styles.userDetails}>
              <div className={styles.nameRow}>
                <h1>{t('ahmedAlfarsi', 'Ahmed Al-Farsi')}</h1>
                <div className={styles.halalVerified}>
                  <CheckCircle size={14} />
                  {t('halalVerified', 'Halal Verified')}
                </div>
              </div>
              <p className={styles.jobTitle}>{t('seniorSoftwareEngineer', 'Senior Software Engineer')}</p>
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <MapPin size={16} /> {t('riyadhSaudiArabia', 'Riyadh, Saudi Arabia')}
                </div>
                <div className={styles.metaItem}>
                  <Globe size={16} /> {t('englishFluentArabicNative', 'English (Fluent), Arabic (Native)')}
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
            <Link href="/user_profile" className={styles.tab}>{t('overview', 'Overview')}</Link>
            <Link href="/user_saved_jobs" className={`${styles.tab} ${styles.activeTab}`}>{t('savedJobs', 'Saved jobs')}</Link>
            <Link href="/user_applied_jobs" className={styles.tab}>{t('appliedJobs', 'Applied Jobs')}</Link>
          </div>
        </div>
      </header>

      <main className={styles.contentContainer}>
        {/* Saved Jobs Section */}
        <section className={styles.card}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Bookmark size={20} color="#e2ab4c" />
              {t('savedJobs', 'Saved Jobs')}
            </div>
            <div className={styles.matchBadge}>
              {t('totalSaved', 'Total Saved')}
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '75%' }}></div>
              </div>
              {savedJobs.length}
            </div>
          </div>
          <p className={styles.summaryText}>
            {t('manageYourBookmarkedOpportunities', 'Manage your bookmarked opportunities and track your application progress for positions that align with your values and career goals.')}
          </p>
        </section>

        {/* Saved Jobs List */}
        <section className={styles.card}>
          <div className={styles.sectionTitle} style={{ marginBottom: '32px' }}>
            <CheckCircle size={20} color="#e2ab4c" />
            {t('yourSavedPositions', 'Your Saved Positions')}
          </div>
          
          <div className={styles.timeline}>
            {savedJobs.map((job) => (
              <div key={job.id} className={styles.timelineItem}>
                <div className={styles.dotContainer}>
                  <div className={styles.dot}></div>
                </div>
                <div className={styles.workDetails}>
                  <div className={styles.workHeader}>
                    <h3 className={styles.roleTitle}>{job.title}</h3>
                    <span className={styles.workDate}>{job.salary}</span>
                  </div>
                  <div className={styles.companyName}>{job.company}</div>
                  <p className={styles.roleDesc}>
                    <MapPin size={14} /> {job.location}
                  </p>
                  <div className={styles.cardActions} style={{ marginTop: '24px' }}>
                    <button className={styles.removeBtn}>
                      <Trash2 size={16} />
                      {t('remove', 'Remove')}
                    </button>
                    <button 
                      className={styles.applyBtn}
                      onClick={() => openApplyModal({ title: job.title, company: job.company, logo: '/logo.png' })}
                    >
                      {t('applyNow', 'Apply Now')}
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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

export default SavedJobs;
