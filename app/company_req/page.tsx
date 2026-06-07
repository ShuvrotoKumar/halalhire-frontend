'use client';

import React, { useMemo, useState } from 'react';
import styles from './CompanyReq.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'
import { useGetRequestQuery } from '@/redux/api/jobApi';
import { useGetCompanyQuery } from '@/redux/api/companyApi';
import { imageUrl } from '@/Utils/server';
import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';
import {
  CheckCircle,
  MapPin,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Bell,
  X,
  Globe
} from 'lucide-react';

const CompanyReq = () => {
  const { t } = useTranslation();
  const { openProfileEditModal, openAcceptModal, openRejectModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Get current subscriber ID
  const getStoredId = () => {
    if (typeof window === 'undefined') return null;
    let id = localStorage.getItem('subscriberId') || localStorage.getItem('subscriptionId'); 
    if (id) id = id.replace(/^"|"$/g, '');
    return (id === 'null' || id === 'undefined' || id === undefined) ? null : id;
  };

  const finalId = "6a1e0c91a2520b44b543f561"; // Hardcoded to match Postman request

  // Fetch requests data
  const { data: requestRes, isLoading: isRequestsLoading, isError, error } = useGetRequestQuery(
    { id: finalId, accepted: false, page: currentPage, limit: 10 },
    { skip: !finalId }
  );

  console.log("requestRes:", requestRes, "error:", error);
  
  const { data: notificationData } = useGetAllNotificationQuery(undefined);
    const notifications = notificationData?.data?.all_notification?.map((n: any) => ({
        id: n._id || Math.random().toString(),
        title: n.title || 'Notification',
        description: n.message || n.description || '',
        time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recently'
    })) || [];
  
  const jobRequests = useMemo(() => {
    // Safely extract requests directly from data property
    let apiRequests: any[] = [];
    if (Array.isArray(requestRes)) {
      apiRequests = requestRes;
    } else if (requestRes?.data?.data?.all_my_jobs && Array.isArray(requestRes.data.data.all_my_jobs)) {
      apiRequests = requestRes.data.data.all_my_jobs;
    } else if (requestRes?.data?.all_my_jobs && Array.isArray(requestRes.data.all_my_jobs)) {
      apiRequests = requestRes.data.all_my_jobs;
    } else if (requestRes?.all_my_jobs && Array.isArray(requestRes.all_my_jobs)) {
      apiRequests = requestRes.all_my_jobs;
    } else if (requestRes?.data && Array.isArray(requestRes.data)) {
      apiRequests = requestRes.data;
    } else if (requestRes?.data?.data && Array.isArray(requestRes.data.data)) {
      apiRequests = requestRes.data.data;
    } else if (requestRes?.data?.appliedCandidates && Array.isArray(requestRes.data.appliedCandidates)) {
      apiRequests = requestRes.data.appliedCandidates;
    } else if (requestRes?.appliedCandidates && Array.isArray(requestRes.appliedCandidates)) {
      apiRequests = requestRes.appliedCandidates;
    }

    return apiRequests.map((req: any) => ({
      id: req._id,
      name: req.candidate?.name || req.name || 'Unknown Candidate',
      email: req.candidate?.email || req.email || 'No email provided',
      avatar: req.candidate?.photo ? imageUrl(req.candidate.photo) : (req.photo ? imageUrl(req.photo) : '/b1.png'),
      position: req.job?.jobTitle || 'Unknown Position',
      department: req.job?.department || 'N/A',
      type: req.job?.employmentType || 'N/A',
      appliedDate: req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Unknown Date',
      yearsOfExperience: req.candidate?.professionalProfile?.yearsOfExperience || 0,
      originalData: req
    }));
  }, [requestRes]);

  // Extract meta for pagination
  const meta = requestRes?.data?.meta || requestRes?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };

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
            <Link href="/compnay_jobs" className={styles.tab}><Trans i18nKey="jobsSpanClassnamestylesbadgecount12span">Jobs <span className={styles.badgeCount}>12</span></Trans></Link>
            <Link href="/company_team" className={styles.tab}>{t('team', 'Team')}</Link>
            <Link href="/company_req" className={`${styles.tab} ${styles.activeTab}`}>{t('requests', 'Requests')}</Link>
          </div>
        </div>
      </div>

      <main className={styles.contentArea}>
        <div className={styles.contentHeader}>
          <div className={styles.headerTitleRow}>
            <div>
              <h2>{t('jobRequests', 'Job Requests')}</h2>
              <p className={styles.subtitle}>{t('reviewAndManageCandidatesApplyingThroughHalalhire', 'Review and manage candidates applying through HalalHire.')}</p>
            </div>
          </div>
        </div>

        <div className={styles.requestsGrid}>
          {isError ? (
            <div className={styles.noResults} style={{ color: 'red' }}>Error loading requests: {JSON.stringify(error)}</div>
          ) : isRequestsLoading ? (
            <div className={styles.noResults}>Loading...</div>
          ) : jobRequests.length > 0 ? (
            jobRequests.map((req: any) => (
            <div key={req.id} className={styles.requestCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  <Image src={req.avatar} alt={req.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.applicantInfo}>
                  <h3 className={styles.applicantName}>{req.name}</h3>
                  <span className={styles.applicantEmail}>{req.email}</span>
                </div>
                <Link href={`/company_req/${req.id}`} className={styles.detailsBtn}>{t('details', 'Details')}</Link>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoGroup}>
                  <span className={styles.infoLabel}>{t('appliedPosition', 'Applied Position')}</span>
                  <div className={styles.infoValue}>{req.position}</div>
                  <div className={styles.infoValueSub}>{t('departmentType', '{{department}} / {{type}}', { department: req.department, type: req.type })}</div>
                </div>
                <div className={styles.infoGroup}>
                  <span className={styles.infoLabel}>{t('appliedDate', 'Applied Date')}</span>
                  <div className={styles.infoValue}>{req.appliedDate}</div>
                </div>
              </div>

              <div className={styles.actionRow}>
                <button className={styles.acceptBtn} onClick={() => openAcceptModal(req)}>{t('accept', 'Accept')}</button>
                <button className={styles.rejectBtn} onClick={() => openRejectModal(req)}>{t('reject', 'Reject')}</button>
              </div>
            </div>
          ))
          ) : (
            <div className={styles.noResults}>
              {t('noApplicationsMatchYourSearch', 'No applications match your search.')}
            </div>
          )}
        </div>

        {meta.totalPage > 1 && (
          <div className={styles.pagination}>
            <span className={styles.paginationText}>
              {t('showingPageOfTotal', `Showing page ${meta.page} of ${meta.totalPage} (${meta.total} applications)`)}
            </span>
            <div className={styles.pageActions}>
              <div 
                className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabledBtn : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                <ChevronLeft size={18} />
              </div>
              <div 
                className={`${styles.pageBtn} ${currentPage === meta.totalPage ? styles.disabledBtn : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ cursor: currentPage === meta.totalPage ? 'not-allowed' : 'pointer', opacity: currentPage === meta.totalPage ? 0.5 : 1 }}
              >
                <ChevronRight size={18} />
              </div>
            </div>
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

export default CompanyReq;