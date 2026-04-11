'use client';

import React, { useMemo } from 'react';
import styles from './CompanyReq.module.css';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const CompanyReq = () => {
  const { t } = useTranslation();
  const { openProfileEditModal, openAcceptModal, openRejectModal } = useModal();
  
  const jobRequests = useMemo(() => [
    {
      id: "fatima-zahra",
      name: t('fatimaZahra', 'Fatima Zahra'),
      email: 'fatima.z@example.com',
      avatar: '/b1.png',
      position: t('seniorSoftwareEngineer', 'Senior Software Engineer'),
      department: t('engineering', 'Engineering'),
      type: t('fulltime', 'Full-time'),
      appliedDate: t('oct242023', 'Oct 24, 2023')
    },
    {
      id: "omar-siddiqui",
      name: t('omarSiddiqui', 'Omar Siddiqui'),
      email: 'o.sid@work.com',
      avatar: '/b2.png',
      position: t('fullstackDeveloper', 'Full-stack Developer'),
      department: t('engineering', 'Engineering'),
      type: t('remote', 'Remote'),
      appliedDate: t('oct232023', 'Oct 23, 2023')
    },
    {
      id: "aisha-mahmood",
      name: t('aishaMahmood', 'Aisha Mahmood'),
      email: 'aisha.m@tech.io',
      avatar: '/b3.png',
      position: t('qaEngineer', 'QA Engineer'),
      department: t('engineering', 'Engineering'),
      type: t('onsite', 'On-site'),
      appliedDate: t('oct222023', 'Oct 22, 2023')
    },
    {
      id: "yusuf-khalil",
      name: t('yusufKhalil', 'Yusuf Khalil'),
      email: 'yusuf.k@startup.com',
      avatar: '/b1.png',
      position: t('devopsEngineer', 'DevOps Engineer'),
      department: t('engineering', 'Engineering'),
      type: t('hybrid', 'Hybrid'),
      appliedDate: t('oct202023', 'Oct 20, 2023')
    }
  ], [t]);

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
            
            <button className={styles.editBtn} onClick={openProfileEditModal}>{t('editProfile', 'Edit Profile')}</button>
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
          <h2>{t('jobRequests', 'Job Requests')}</h2>
          <p className={styles.subtitle}>{t('reviewAndManageCandidatesApplyingThroughHalalhire', 'Review and manage candidates applying through HalalHire.')}</p>
        </div>

        <div className={styles.requestsGrid}>
          {jobRequests.map((req) => (
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
          ))}
        </div>

        <div className={styles.pagination}>
          <span className={styles.paginationText}>{t('showing14Of24Applications', 'Showing 1-4 of 24 applications')}</span>
          <div className={styles.pageActions}>
            <div className={styles.pageBtn}><ChevronLeft size={18} /></div>
            <div className={styles.pageBtn}><ChevronRight size={18} /></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyReq;