'use client';

import React from 'react';
import styles from '../ApplicantDetails.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Users,
  Mail, 
  Phone, 
  Linkedin,
  Download,
  ShieldCheck,
  Calendar,
  Clock,
  Globe
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'

const ApplicantDetails = () => {
  const { t } = useTranslation()
  const params = useParams();
  const { openAcceptModal, openRejectModal } = useModal();
  
  // Hardcoded data for "Fatima Zahra" as per design
  const applicant = {
    name: t('fatimaZahra', 'Fatima Zahra'),
    role: t('seniorSoftwareEngineer', 'Senior Software Engineer'),
    location: 'London, UK',
    avatar: '/b1.png',
    joinedDate: t('joinedOct2023', 'Joined Oct 2023'),
    languages: t('fluentInEnglishArabic', 'Fluent in English, Arabic'),
    position: t('seniorSoftwareEngineer', 'Senior Software Engineer'),
    appliedDate: t('october242023', 'October 24, 2023'),
    status: 'Under Review',
    applicationId: '#HH-4820-11',
    summary: t('dedicatedSeniorSoftwareEngineerWithOver8YearsOfExperienceBuildingScalableDistributedSystemsAndHighperformanceWebApplicationsIAmPassionateAboutEthicalTechnologyAndAlignMyProfessionalWorkWithIslamicPrinciplesISpecializeInBackendArchitectureWithAFocusOnPythonAndCloudInfrastructureThroughoutMyCareerIvePrioritizedFosteringInclusiveEnvironmentsAndMentoringJuniorDevelopersWhileMaintainingACommitmentToExcellenceAndHalalWorkplaceValues', 'Dedicated Senior Software Engineer with over 8 years of experience building scalable distributed systems and high-performance web applications. I am passionate about ethical technology and align my professional work with Islamic principles. I specialize in backend architecture with a focus on Python and Cloud Infrastructure. Throughout my career, I\'ve prioritized fostering inclusive environments and mentoring junior developers while maintaining a commitment to excellence and halal workplace values.'),
    experience: [
      {
        id: 1,
        title: t('seniorSoftwareEngineer', 'Senior Software Engineer'),
        company: 'TechNova Solutions',
        location: 'London, UK',
        period: t('2020Present2', '2020 - Present'),
        current: true,
        highlights: [
          t('architectedAndMigratedLegacyMonolithToMicroservicesUsingFastapiAndAws', 'Architected and migrated legacy monolith to microservices using FastAPI and AWS.'),
          t('ledATeamOf6EngineersToDeliverAHightrafficFintechApiProcessing10mDaily', 'Led a team of 6 engineers to deliver a high-traffic fintech API processing $10M+ daily.'),
          t('reducedInfrastructureCostsBy35ThroughContainerOrchestrationAndServerlessAdoption', 'Reduced infrastructure costs by 35% through container orchestration and serverless adoption.')
        ]
      },
      {
        id: 2,
        title: t('fullStackDeveloper', 'Full Stack Developer'),
        company: 'GreenSphere Interactive',
        location: 'Dubai, UAE',
        period: t('20172020', '2017 - 2020'),
        current: false,
        highlights: [
          t('developedResponsiveUserInterfacesUsingReactjsAndIntegratedComplexRestfulApis', 'Developed responsive user interfaces using React.js and integrated complex RESTful APIs.'),
          t('optimizedDatabaseQueriesInPostgresqlImprovingApplicationPerformanceBy40', 'Optimized database queries in PostgreSQL, improving application performance by 40%.')
        ]
      }
    ],
    education: [
      {
        degree: t('mscInComputerScience', 'M.Sc. in Computer Science'),
        school: t('imperialCollegeLondon', 'Imperial College London'),
        year: '2017',
        specialization: t('specializationInDistributedSystems', 'Specialization in Distributed Systems')
      }
    ],
    skills: [
      { name: t('pythonExpert', 'Python (Expert)'), highlighted: true },
      { name: 'AWS', highlighted: true },
      { name: t('fastapi', 'FastAPI'), highlighted: false },
      { name: t('postgresql', 'PostgreSQL'), highlighted: false },
      { name: t('redis', 'Redis'), highlighted: false },
      { name: t('docker', 'Docker'), highlighted: false },
      { name: t('leadership', 'Leadership'), highlighted: true },
      { name: t('halalWorkplaceEthics', 'Halal Workplace Ethics'), highlighted: true }
    ],
    contact: {
      email: 'fatima.zahra@example.com',
      phone: t('447700900xxx', '+44 7700 900XXX'),
      linkedin: 'linkedin.com/in/fzahra'
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <div className={styles.maxContainer}>
        {/* Profile Header */}
        <section className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <Image src={applicant.avatar} alt={applicant.name} fill style={{ objectFit: 'cover' }} />
            <div className={styles.verifiedBadge}>
              <ShieldCheck size={18} fill="#e2ab4c" color="white" />
            </div>
          </div>
          <div className={styles.headerInfo}>
            <h1>{applicant.name}</h1>
            <div className={styles.roleLocation}>{t('roleLocation', '{{role}} • {{location}}', { role: applicant.role, location: applicant.location })}</div>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Clock size={14} /> {applicant.joinedDate}
              </div>
              <div className={styles.metaItem}>
                <Globe size={14} /> {applicant.languages}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t('appliedPosition', 'Applied Position')}</span>
            <span className={styles.statValue}>{applicant.position}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t('applicationDate', 'Application Date')}</span>
            <span className={styles.statValue}>{applicant.appliedDate}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t('currentStatus', 'Current Status')}</span>
            <span className={styles.statValue}>
              <span className={styles.statusIndicator}></span>
              {applicant.status}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t('applicationId', 'Application ID')}</span>
            <span className={styles.statValue}>{applicant.applicationId}</span>
          </div>
        </section>

        {/* Main Grid */}
        <div className={styles.mainLayout}>
          {/* Main Content */}
          <div className={styles.contentCol}>
            {/* Professional Summary */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <Users size={20} className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>{t('professionalSummary', 'Professional Summary')}</h2>
              </div>
              <p className={styles.summaryText}>{applicant.summary}</p>
            </div>

            {/* Work Experience */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <Briefcase size={20} className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>{t('workExperience', 'Work Experience')}</h2>
              </div>
              
              <div className={styles.timeline}>
                {applicant.experience.map((exp, idx) => (
                  <div key={exp.id} className={styles.timelineItem}>
                    <div className={styles.timelineLine}></div>
                    <div className={`${styles.timelineDot} ${!exp.current ? styles.timelineDotInactive : ''}`}></div>
                    <div className={styles.expContent}>
                      <div className={styles.expHeader}>
                        <h3 className={styles.expTitle}>{exp.title}</h3>
                        <span className={styles.expDate}>{exp.period}</span>
                      </div>
                      <div className={styles.expSubtitle}>{t('companyLocation', '{{company}} • {{location}}', { company: exp.company, location: exp.location })}</div>
                      <ul className={styles.expList}>
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className={styles.card}>
              <div className={styles.sectionHeader}>
                <GraduationCap size={20} className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>{t('education', 'Education')}</h2>
              </div>
              
              {applicant.education.map((edu, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.expContent}>
                    <div className={styles.expHeader}>
                      <h3 className={styles.expTitle}>{edu.degree}</h3>
                      <span className={styles.expDate}>{edu.year}</span>
                    </div>
                    <div className={styles.expSubtitle}>{edu.school}</div>
                    <p className={styles.summaryText} style={{ fontSize: '12px' }}>{edu.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebarCol}>
            {/* Contact Information */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>{t('contactInformation', 'Contact Information')}</h3>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><Mail size={16} /></div>
                  <div>
                    <span className={styles.contactLabel}>{t('email', 'Email')}</span>
                    <span className={styles.contactValue}>{applicant.contact.email}</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><Phone size={16} /></div>
                  <div>
                    <span className={styles.contactLabel}>{t('phone', 'Phone')}</span>
                    <span className={styles.contactValue}>{applicant.contact.phone}</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><Linkedin size={16} /></div>
                  <div>
                    <span className={styles.contactLabel}>{t('linkedin', 'LinkedIn')}</span>
                    <span className={styles.contactValue}>{applicant.contact.linkedin}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>{t('keySkills', 'Key Skills')}</h3>
              <div className={styles.skillsGrid}>
                {applicant.skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.skillBadge} ${skill.highlighted ? styles.skillBadgeHighlighted : ''}`}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>{t('attachedDocuments', 'Attached Documents')}</h3>
              <div className={styles.docList}>
                <div className={styles.docItem}>
                  <div className={styles.docInfo}>
                    <FileText size={18} className={styles.docIcon} />
                    <span>Resume_Fatima.pdf</span>
                  </div>
                  <Download size={16} className={styles.downloadIcon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className={styles.footerActions}>
        <div className={styles.footerInner}>
          <span className={styles.footerText}>{t('currentlyViewingNameapossApplication', 'Currently viewing {{name}}&apos;s application', { name: applicant.name })}</span>
          <div className={styles.actionBtns}>
            <button className={styles.rejectPageBtn} onClick={() => openRejectModal(applicant)}>{t('rejectApplication2', 'Reject Application')}</button>
            <button className={styles.acceptPageBtn} onClick={() => openAcceptModal(applicant)}>{t('acceptApplication', 'Accept Application')}</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};


export default ApplicantDetails;
