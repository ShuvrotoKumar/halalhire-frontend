'use client';

import React, { useMemo, useState } from 'react';
import styles from './UserProfile.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import { useModal } from '@/app/context/ModalContext';
import { 
  MapPin, 
  Globe, 
  FileText, 
  Briefcase, 
  Award, 
  CheckCircle,
  Bell,
  X,
  MessageSquare
} from 'lucide-react';
import ChatModal from '../components/ChatModal/ChatModal';
import Footer from '../components/Footer/Footer';
import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';
import { useTranslation } from 'react-i18next'

const UserProfile = () => {
  const { t } = useTranslation()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const skills = useMemo(() => [
    t('systemArchitecture', 'System Architecture'), t('ethicalAiFrameworks', 'Ethical AI Frameworks'), t('microservices', 'Microservices'), 
    t('fintechCompliance', 'FinTech Compliance'), t('teamLeadership', 'Team Leadership'), 
    t('go', 'Go'), t('react', 'React'), t('postgresql', 'PostgreSQL'), t('aws', 'AWS')
  ], [t]);

  const workHistory = useMemo(() => [
    {
      role: t('principalEngineer', 'Principal Engineer'),
      company: t('techSalatSolutions', 'TechSalat Solutions'),
      date: t('2020Present', '2020 - PRESENT'),
      description: t('leadingTheArchitecturalRedesignOfCorePaymentProcessingSystemsManagingATeamOf15EngineersAndImplementingEthicalAiFrameworksAcrossTheProductSuite', 'Leading the architectural redesign of core payment processing systems. Managing a team of 15 engineers and implementing ethical AI frameworks across the product suite.'),
      active: true
    },
    {
      role: t('seniorDeveloper', 'Senior Developer'),
      company: t('riyadhFintechHub', 'Riyadh FinTech Hub'),
      date: t('20172020', '2017 - 2020'),
      description: t('developedShariacompliantFinancialModulesForRegionalBankingPlatformsOptimizedDatabasePerformanceBy40AcrossDistributedSystems', 'Developed Sharia-compliant financial modules for regional banking platforms. Optimized database performance by 40% across distributed systems.'),
      active: false
    },
    {
      role: t('softwareEngineer', 'Software Engineer'),
      company: t('gulfSystemsInc', 'Gulf Systems Inc.'),
      date: t('20142017', '2014 - 2017'),
      description: t('fullstackDevelopmentUsingModernWebTechnologiesFocusedOnInternalEnterpriseToolsAndHrManagementSystemsForLargescaleGovernmentEntities', 'Full-stack development using modern web technologies. Focused on internal enterprise tools and HR management systems for large-scale government entities.'),
      active: false
    }
  ], [t]);

  const { openProfileEditModal } = useModal();
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
              <button className={styles.editBtn} onClick={openProfileEditModal}>{t('editProfile', 'Edit Profile')}</button>
            </div>
          </div>
          
          <div className={styles.tabs}>
            <Link href="/user_profile" className={`${styles.tab} ${styles.activeTab}`}>{t('overview', 'Overview')}</Link>
            <Link href="/user_saved_jobs" className={styles.tab}>{t('savedJobs2', 'Saved Jobs')}</Link>
            <Link href="/user_applied_jobs" className={styles.tab}>{t('appliedJobs', 'Applied Jobs')}</Link>
          </div>
        </div>
      </header>

      <main className={styles.contentContainer}>
        {/* Career Summary */}
        <section className={styles.card}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <FileText size={20} color="#e2ab4c" />
              {t('careerSummary', 'Career Summary')}
            </div>
            <div className={styles.matchBadge}>
              {t('aiMatchStrength', 'AI Match Strength')}
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '85%' }}></div>
              </div>
              {t('85', '85%')}
            </div>
          </div>
          <p className={styles.summaryText}>
            {t('highlyExperiencedPrincipalSoftwareEngineerWithOver9YearsOfExpertiseInBuildingScalableCloudnativeArchitecturesDedicatedToEthicalTechSolutionsAndSustainableEngineeringPracticesProvenTrackRecordOfLeadingMultidisciplinaryTeamsAcrossRiyadhapossGrowingFintechSectorDeliveringHighperformancePlatformsWhileMaintainingAdherenceToIslamicFinancePrinciplesAndEthicalGovernance', 'Highly experienced Principal Software Engineer with over 9 years of expertise in building \n            scalable cloud-native architectures. Dedicated to ethical tech solutions and sustainable \n            engineering practices. Proven track record of leading multidisciplinary teams across \n            Riyadh&apos;s growing fintech sector, delivering high-performance platforms while maintaining \n            adherence to Islamic finance principles and ethical governance.')}
          </p>
        </section>

        {/* Work History */}
        <section className={styles.card}>
          <div className={styles.sectionTitle} style={{ marginBottom: '32px' }}>
            <Briefcase size={20} color="#e2ab4c" />
            {t('workHistory', 'Work History')}
          </div>
          
          <div className={styles.timeline}>
            {workHistory.map((work, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.dotContainer}>
                  <div className={`${styles.dot} ${!work.active && styles.pastDot}`}></div>
                </div>
                <div className={styles.workDetails}>
                  <div className={styles.workHeader}>
                    <h3 className={styles.roleTitle}>{work.role}</h3>
                    <span className={styles.workDate}>{work.date}</span>
                  </div>
                  <div className={styles.companyName}>{work.company}</div>
                  <p className={styles.roleDesc}>{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className={styles.card}>
          <div className={styles.sectionTitle} style={{ marginBottom: '24px' }}>
            <Award size={20} color="#e2ab4c" />
            {t('skillsExpertise', 'Skills & Expertise')}
          </div>
          
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <span key={index} className={styles.skillTag}>{skill}</span>
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
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Footer />    
    </div>
  );
};

export default UserProfile;
