'use client';

import React, { useMemo, useState } from 'react';
import styles from '../user_profile/UserProfile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import {
  Bell,
  CheckCircle,
  Globe,
  MapPin,
  Send,
  X
} from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';
import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';
import { useTranslation } from 'react-i18next';

const AppliedJobs = () => {
  const { t } = useTranslation();
  const { openProfileEditModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const appliedJobs = useMemo(() => [
    {
      id: 1,
      title: t('productSecurityManager', 'Product Security Manager'),
      company: t('amanaCloud', 'Amana Cloud'),
      location: t('jeddahSaudiArabia', 'Jeddah, Saudi Arabia'),
      status: t('applicationUnderReview', 'Under Review'),
      appliedOn: t('appliedThreeDaysAgo', 'Applied 3 days ago')
    },
    {
      id: 2,
      title: t('seniorFrontendEngineer', 'Senior Frontend Engineer'),
      company: t('barakahDigital', 'Barakah Digital'),
      location: t('remoteMena', 'Remote, MENA'),
      status: t('interviewScheduled', 'Interview Scheduled'),
      appliedOn: t('appliedLastWeek', 'Applied last week')
    }
  ], [t]);

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
            <Link href="/user_saved_jobs" className={styles.tab}>{t('savedJobs', 'Saved jobs')}</Link>
            <Link href="/user_applied_jobs" className={`${styles.tab} ${styles.activeTab}`}>{t('appliedJobs', 'Applied Jobs')}</Link>
          </div>
        </div>
      </header>

      <main className={styles.contentContainer}>
        <section className={styles.card}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Send size={20} color="#e2ab4c" />
              {t('appliedJobs', 'Applied Jobs')}
            </div>
            <div className={styles.matchBadge}>
              {t('totalApplied', 'Total Applied')}
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '60%' }}></div>
              </div>
              {appliedJobs.length}
            </div>
          </div>
          <p className={styles.summaryText}>
            {t('trackYourSubmittedApplications', 'Track jobs you have already applied to and follow the latest status updates from employers.')}
          </p>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionTitle} style={{ marginBottom: '32px' }}>
            <CheckCircle size={20} color="#e2ab4c" />
            {t('yourAppliedPositions', 'Your Applied Positions')}
          </div>

          <div className={styles.timeline}>
            {appliedJobs.map((job) => (
              <div key={job.id} className={styles.timelineItem}>
                <div className={styles.dotContainer}>
                  <div className={styles.dot}></div>
                </div>
                <div className={styles.workDetails}>
                  <div className={styles.workHeader}>
                    <h3 className={styles.roleTitle}>{job.title}</h3>
                    <span className={styles.workDate}>{job.appliedOn}</span>
                  </div>
                  <div className={styles.companyName}>{job.company}</div>
                  <p className={styles.roleDesc}>
                    <MapPin size={14} /> {job.location}
                  </p>
                  <div className={styles.appliedMetaRow}>
                    <span className={styles.appliedStatus}>{job.status}</span>
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

export default AppliedJobs;
