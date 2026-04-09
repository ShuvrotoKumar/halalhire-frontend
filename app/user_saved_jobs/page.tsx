'use client';

import React, { useMemo } from 'react';
import styles from './SavedJobs.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { 
  CheckCircle, 
  MapPin, 
  Globe, 
  MoreHorizontal, 
  Bookmark,
  Compass,
  Shield,
  CreditCard
} from 'lucide-react';

import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

const SavedJobs = () => {
  const { t } = useTranslation()
  const { openApplyModal, openProfileEditModal } = useModal();
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
              <button className={styles.editBtn} onClick={openProfileEditModal}>{t('editProfile', 'Edit Profile')}</button>
              {/* <div className={styles.moreBtn}>
                <MoreHorizontal size={20} />
              </div> */}
            </div>
          </div>
          
          <div className={styles.tabs}>
            <Link href="/user_profile" className={styles.tab}>{t('overview', 'Overview')}</Link>
            <Link href="/user_saved_jobs" className={`${styles.tab} ${styles.activeTab}`}>{t('savedJobs', 'Saved jobs')}</Link>
          </div>
        </div>
      </header>

      <main className={styles.contentContainer}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>{t('savedJobsLength', 'Saved Jobs ({{length}})', { length: savedJobs.length })}</h2>
          <span className={styles.contentSubtitle}>{t('manageYourBookmarkedOpportunities', 'Manage your bookmarked opportunities')}</span>
        </div>

        <div className={styles.jobsList}>
          {savedJobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.iconBox}>
                {job.icon}
              </div>
              <div className={styles.jobCardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{job.title}</h3>
                  <Bookmark size={20} className={styles.bookmarkIcon} fill="currentColor" />
                </div>
                <p className={styles.companyName}>{job.company}</p>
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}>
                    <MapPin size={14} /> {job.location}
                  </div>
                  <div className={styles.metaItem}>
                    <CreditCard size={14} /> {job.salary}
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.removeBtn}>{t('remove', 'Remove')}</button>
                  <button 
                    className={styles.applyBtn}
                    onClick={() => openApplyModal({ title: job.title, company: job.company, logo: '/logo.png' })}
                  >
                    {t('applyNow', 'Apply Now')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SavedJobs;