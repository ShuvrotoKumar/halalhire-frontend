'use client';

import React from 'react';
import styles from './CompanyJobs.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next';
import { useGetJobQuery } from '@/redux/api/jobApi';
import { useGetCompanyQuery } from '@/redux/api/companyApi';
import { imageUrl } from '@/Utils/server';
import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';
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
  const { t } = useTranslation();
  const { openJobEditModal, openJobDeleteModal, openProfileEditModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Fetch company data for the banner
  const { data: companyRes } = useGetCompanyQuery(undefined);
  const companyData = companyRes?.data?.data || companyRes?.data || {};
  const orgDetails = companyData.organizationDetails || {};
  const companyName = companyData.companyName || t('ethicalWealthManagement', 'Ethical Wealth Management');
  const industry = orgDetails.industry || t('shariacompliantFinancialServices', 'Sharia-Compliant Financial Services');
  const location = orgDetails.headquartersLocation || (companyData.workplace && companyData.workplace[0]) || t('londonUk', 'London, UK');
  const bannerImg = orgDetails.bannerImage ? (orgDetails.bannerImage.startsWith('http') ? orgDetails.bannerImage : `https://beer-managers-uses-doctor.trycloudflare.com/${orgDetails.bannerImage.replace(/^\/+/, '')}`) : "/about1.png";
  const logoImg = orgDetails.companyLogo ? (orgDetails.companyLogo.startsWith('http') ? orgDetails.companyLogo : `https://beer-managers-uses-doctor.trycloudflare.com/${orgDetails.companyLogo.replace(/^\/+/, '')}`) : (companyData.photo ? (companyData.photo.startsWith('http') ? companyData.photo : `https://beer-managers-uses-doctor.trycloudflare.com/${companyData.photo.replace(/^\/+/, '')}`) : null);
  const websiteUrl = orgDetails.websiteUrl || '';

  // Use company ID directly from the company API response if possible,
  // otherwise fallback to localStorage
  const getStoredId = () => {
    if (typeof window === 'undefined') return null;
    let id = localStorage.getItem('subscriberId'); // Must use subscriberId specifically as per backend requirement
    if (id) id = id.replace(/^"|"$/g, '');
    return (id === 'null' || id === 'undefined' || id === undefined) ? null : id;
  };

  // The backend specifically requires the subscriber ID to fetch the jobs
  const finalId = getStoredId() || "6a1e0c91a2520b44b543f561";

  // Fetch jobs data
  const { data: jobRes, isLoading: isJobsLoading, isError, error } = useGetJobQuery(
    { id: finalId, page: currentPage, limit: 5 },
    { skip: !finalId }
  );

  console.log("jobRes in CompanyJobs:", jobRes, "error:", error);

  // Handle potential nested data structures from different environments/interceptors
  let jobsData = jobRes?.data?.data?.allMyJobs || jobRes?.data?.allMyJobs || jobRes?.allMyJobs || [];
  let meta = jobRes?.data?.data?.meta || jobRes?.data?.meta || jobRes?.meta || { page: 1, limit: 5, total: 0, totalPage: 1 };
  
  // Combine API jobs with provided dummy data so previous demo jobs always show
  if (!isJobsLoading) {
      const dummyJobs = [
          {
              "_id": "69dd07ab223181a86f21b435",
              "jobTitle": "Full Stack Developer",
              "department": "IT",
              "employmentType": "Full-time",
              "country": "Bangladesh",
              "city": "Barishal",
              "minimum": 0,
              "maximum": 0,
              "amount": "negotiable",
              "workplace": ["Office Room"],
              "applicationDeadline": "2026-05-22T00:00:00.000Z",
              "experienceLevel": "senior"
          },
          {
              "_id": "69da9c29aa6ecd3818732586",
              "jobTitle": "Backen Engineer",
              "department": "IT",
              "employmentType": "Full-time",
              "country": "Bangladesh",
              "city": "Barishal",
              "minimum": 0,
              "maximum": 0,
              "amount": "negotiable",
              "workplace": ["Office Room"],
              "applicationDeadline": "2026-05-22T00:00:00.000Z",
              "experienceLevel": "mid"
          },
          {
              "_id": "69da8aae32d5d0748f79bcf9",
              "jobTitle": "Technical Support Engineer",
              "department": "Support",
              "employmentType": "Full-time",
              "country": "Bangladesh",
              "city": "Barishal",
              "minimum": 15000,
              "maximum": 40000,
              "workplace": ["Office Room"],
              "applicationDeadline": "2026-05-22T00:00:00.000Z",
              "experienceLevel": "junior"
          },
          {
              "_id": "69da8aa032d5d0748f79bcf7",
              "jobTitle": "Cyber Security Specialist",
              "department": "Security",
              "employmentType": "Full-time",
              "country": "Bangladesh",
              "city": "Dhaka",
              "minimum": 45000,
              "maximum": 110000,
              "workplace": ["On-site"],
              "applicationDeadline": "2026-06-12T00:00:00.000Z",
              "experienceLevel": "fresher"
          },
          {
              "_id": "69da8a8832d5d0748f79bcf5",
              "jobTitle": "Software Engineer",
              "department": "Data",
              "employmentType": "Part-time",
              "country": "Bangladesh",
              "city": "Dhaka",
              "minimum": 25000,
              "maximum": 70000,
              "workplace": ["Remote"],
              "applicationDeadline": "2026-06-05T00:00:00.000Z",
              "experienceLevel": "senior"
          }
      ];
      
      const apiJobIds = new Set(jobsData.map((j: any) => j._id));
      const missingDummyJobs = dummyJobs.filter(j => !apiJobIds.has(j._id));
      
      jobsData = [...jobsData, ...missingDummyJobs];
      meta = { 
          page: meta.page || 1, 
          limit: meta.limit || 5, 
          total: (meta.total || 0) + missingDummyJobs.length, 
          totalPage: Math.max(meta.totalPage || 1, Math.ceil(((meta.total || 0) + missingDummyJobs.length) / 5)) 
      };
  }
  const { data: notificationData } = useGetAllNotificationQuery(undefined);
    const notifications = notificationData?.data?.all_notification?.map((n: any) => ({
        id: n._id || Math.random().toString(),
        title: n.title || 'Notification',
        description: n.message || n.description || '',
        time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recently'
    })) || [];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      {/* Shared Header Section */}
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
            <Link href="/compnay_jobs" className={`${styles.tab} ${styles.activeTab}`}><Trans i18nKey="jobsSpanClassnamestylesbadgecount12span">Jobs <span className={styles.badgeCount}>{meta.total}</span></Trans></Link>
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
          {isJobsLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading jobs...</div>
          ) : isError ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error loading jobs: {JSON.stringify(error)}</div>
          ) : jobsData.length > 0 ? (
            jobsData.map((job: any) => (
              <div key={job._id} className={styles.jobCard}>
                <div className={styles.jobMainInfo}>
                  <h3 className={styles.jobTitle}>{job.jobTitle}</h3>
                  <div className={styles.companyRow}>{companyName}</div>
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <Globe size={14} /> {job.city ? `${job.city}, ${job.country}` : job.country || 'Remote'}
                    </div>
                    <div className={styles.metaItem}>
                      <CircleDollarSign size={14} /> {job.amount === 'negotiable' || (!job.minimum && !job.maximum) ? 'Negotiable' : `$${job.minimum} - $${job.maximum}`}
                    </div>
                    <div className={styles.metaItem}>
                      <Briefcase size={14} /> {job.employmentType}
                    </div>
                    {job.applicationDeadline && (
                      <div className={styles.metaItem}>
                        <Clock size={14} /> {new Date(job.applicationDeadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className={styles.halalBadges}>
                    {job.department && (
                      <div className={styles.halalBadge}>
                        {job.department}
                      </div>
                    )}
                    {job.workplace && job.workplace.map((wp: string, idx: number) => (
                      <div key={idx} className={styles.halalBadge}>
                        {wp}
                      </div>
                    ))}
                    {job.experienceLevel && (
                      <div className={styles.halalBadge} style={{ textTransform: 'capitalize' }}>
                        {job.experienceLevel}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <button className={styles.editJobBtn} onClick={() => openJobEditModal(job)}>{t('editJob', 'Edit Job')}</button>
                  <button className={styles.deleteJobBtn} onClick={() => openJobDeleteModal(job)}>{t('deleteJob', 'Delete Job')}</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No job postings found.</div>
          )}
        </div>

        {meta.totalPage > 1 && (
          <div className={styles.pagination}>
            <button 
              disabled={currentPage === 1} 
              onClick={() => handlePageChange(currentPage - 1)}
              className={styles.pageBtn}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {meta.page} of {meta.totalPage}
            </span>
            <button 
              disabled={currentPage === meta.totalPage} 
              onClick={() => handlePageChange(currentPage + 1)}
              className={styles.pageBtn}
            >
              Next
            </button>
          </div>
        )}
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

export default CompanyJobs;