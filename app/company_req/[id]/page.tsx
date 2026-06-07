'use client';

import React from 'react';
import styles from '../ApplicantDetails.module.css';
import Image from 'next/image';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  Mail, 
  ShieldCheck,
  Calendar,
  Globe
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'
import { useGetJobDetailsQuery } from '@/redux/api/jobApi';
import { imageUrl } from '@/Utils/server';

const ApplicantDetails = () => {
  const { t } = useTranslation()
  const params = useParams();
  const { openAcceptModal, openRejectModal } = useModal();
  
  const { data: jobRes, isLoading } = useGetJobDetailsQuery({ id: params.id });

  const resData = jobRes?.data || {};
  const userData = resData.userId || {};
  const profData = userData.professionalProfile || {};
  const workPref = userData.WorkPreferences || {};
  const verify = userData.verifyIdentity || {};

  const applicant = {
    name: userData.name || 'N/A',
    email: userData.email || 'N/A',
    avatar: userData.photo ? imageUrl(userData.photo) : '/b1.png',
    maritalStatus: userData.maritalStatus || 'N/A',
    dateOfBirth: userData.dateOfBirth || 'N/A',
    countryOrigin: userData.countryOrigin || 'N/A',
    numberOfChildren: userData.numberOfChildren ?? 0,
    religiousPractice: userData.religiousPractice || 'N/A',
    isVerified: verify.isVerified || false,
    isVerify: userData.isVerify || false,
    nationalId: verify.nationalId || '',
    internationalPassport: verify.internationalPassport || '',
    userId: userData._id || userData.id || '',
    isDeleted: userData.isDeleted || false,
    workplace: userData.workplace || [],
    currentJobTitle: profData.currentJobTitle || 'N/A',
    yearsOfExperience: profData.yearsOfExperience ?? 0,
    skills: profData.skills || [],
    primaryLanguage: profData.primaryLanguage || 'N/A',
    otherLanguages: profData.otherLanguages || [],
    document: profData.document || '',
    professionalCertificates: profData.professionalCertificates || [],
    salaryExpectations: workPref.salaryExpectations || 'N/A',
    employmentType: workPref.employmentType || 'N/A',
    availableFrom: workPref.availableFrom || '',
    remoteAcceptable: workPref.remoteAcceptable ?? false,
    willingToRelocate: workPref.willingToRelocate ?? false,
    willingToTravel: workPref.willingToTravel ?? false,
    applicationId: resData._id || 'N/A',
    accepted: resData.accepted ?? false,
    isApply: resData.isApply ?? false,
    applicationCreatedAt: resData.createdAt || '',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <div className={styles.maxContainer}>
        {isLoading ? (
          <div style={{ padding: '100px 0', textAlign: 'center' }}>Loading details...</div>
        ) : !jobRes?.data ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <ShieldCheck size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>No Data Found</h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Application ID: <strong>{params.id}</strong>
            </p>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <section className={styles.profileHeader}>
              <div className={styles.avatarWrapper}>
                <Image src={applicant.avatar} alt={applicant.name} fill style={{ objectFit: 'cover' }} />
                {applicant.isVerified && (
                  <div className={styles.verifiedBadge}>
                    <ShieldCheck size={18} fill="#e2ab4c" color="white" />
                  </div>
                )}
              </div>
              <div className={styles.headerInfo}>
                <h1>{applicant.name}</h1>
                <div className={styles.roleLocation}>{applicant.currentJobTitle} • {applicant.countryOrigin}</div>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Globe size={14} /> {applicant.primaryLanguage}
                    {applicant.otherLanguages.length > 0 && `, ${applicant.otherLanguages.join(', ')}`}
                  </div>
                  <div className={styles.metaItem}>
                    <Briefcase size={14} /> {applicant.yearsOfExperience} years experience
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <section className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Application ID</span>
                <span className={styles.statValue}>{applicant.applicationId}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Country of Origin</span>
                <span className={styles.statValue}>{applicant.countryOrigin}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Religious Practice</span>
                <span className={styles.statValue}>{applicant.religiousPractice}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Marital Status</span>
                <span className={styles.statValue}>{applicant.maritalStatus}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Date of Birth</span>
                <span className={styles.statValue}>{applicant.dateOfBirth}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Children</span>
                <span className={styles.statValue}>{applicant.numberOfChildren}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Verified</span>
                <span className={styles.statValue}>{applicant.isVerify ? 'Yes' : 'No'}</span>
              </div>
            </section>

            {/* Main Grid */}
            <div className={styles.mainLayout}>
              {/* Main Content */}
              <div className={styles.contentCol}>
                {/* Skills */}
                {applicant.skills.length > 0 && (
                  <div className={styles.card}>
                    <div className={styles.sectionHeader}>
                      <Briefcase size={20} className={styles.sectionIcon} />
                      <h2 className={styles.sectionTitle}>Skills</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {applicant.skills.map((skill: string, i: number) => (
                        <span key={i} style={{ padding: '6px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', fontSize: '14px', color: '#166534' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Preferences */}
                <div className={styles.card}>
                  <div className={styles.sectionHeader}>
                    <Briefcase size={20} className={styles.sectionIcon} />
                    <h2 className={styles.sectionTitle}>Work Preferences</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      ['Salary Expectations', applicant.salaryExpectations],
                      ['Employment Type', applicant.employmentType],
                      ['Available From', applicant.availableFrom ? new Date(applicant.availableFrom).toLocaleDateString() : 'N/A'],
                      ['Remote Acceptable', applicant.remoteAcceptable ? 'Yes' : 'No'],
                      ['Willing to Relocate', applicant.willingToRelocate ? 'Yes' : 'No'],
                      ['Willing to Travel', applicant.willingToTravel ? 'Yes' : 'No'],
                    ].map(([label, value], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#475569' }}>{label}</span>
                        <span style={{ color: '#334155' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workplace */}
                {applicant.workplace.length > 0 && (
                  <div className={styles.card}>
                    <div className={styles.sectionHeader}>
                      <Globe size={20} className={styles.sectionIcon} />
                      <h2 className={styles.sectionTitle}>Workplace</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {applicant.workplace.map((w: string, i: number) => (
                        <span key={i} style={{ padding: '6px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '20px', fontSize: '14px', color: '#1e40af' }}>
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Professional Certificates */}
                {applicant.professionalCertificates.length > 0 && (
                  <div className={styles.card}>
                    <div className={styles.sectionHeader}>
                      <CheckCircle size={20} className={styles.sectionIcon} />
                      <h2 className={styles.sectionTitle}>Professional Certificates</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {applicant.professionalCertificates.map((cert: string, i: number) => (
                        <div key={i} style={{ padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#334155', wordBreak: 'break-all' }}>
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents */}
                {applicant.document && (
                  <div className={styles.card}>
                    <div className={styles.sectionHeader}>
                      <CheckCircle size={20} className={styles.sectionIcon} />
                      <h2 className={styles.sectionTitle}>Documents</h2>
                    </div>
                    <div style={{ padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#334155', wordBreak: 'break-all' }}>
                      {applicant.document}
                    </div>
                  </div>
                )}

                {/* Identity Verification */}
                <div className={styles.card}>
                  <div className={styles.sectionHeader}>
                    <ShieldCheck size={20} className={styles.sectionIcon} />
                    <h2 className={styles.sectionTitle}>Identity Verification</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <span style={{ fontWeight: 500, color: '#475569' }}>National ID</span>
                      <span style={{ color: '#334155', wordBreak: 'break-all', maxWidth: '60%', textAlign: 'right' }}>{applicant.nationalId || 'Not uploaded'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <span style={{ fontWeight: 500, color: '#475569' }}>International Passport</span>
                      <span style={{ color: '#334155', wordBreak: 'break-all', maxWidth: '60%', textAlign: 'right' }}>{applicant.internationalPassport || 'Not uploaded'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <span style={{ fontWeight: 500, color: '#475569' }}>Verified Status</span>
                      <span style={{ color: applicant.isVerified ? '#16a34a' : '#dc2626', fontWeight: 600 }}>{applicant.isVerified ? 'Verified' : 'Not Verified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className={styles.sidebarCol}>
                {/* Contact Information */}
                <div className={styles.sideCard}>
                  <h3 className={styles.sideTitle}>Contact Information</h3>
                  <div className={styles.contactList}>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}><Mail size={16} /></div>
                      <div>
                        <span className={styles.contactLabel}>Email</span>
                        <span className={styles.contactValue}>{applicant.email}</span>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}><MapPin size={16} /></div>
                      <div>
                        <span className={styles.contactLabel}>Origin</span>
                        <span className={styles.contactValue}>{applicant.countryOrigin}</span>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}><Calendar size={16} /></div>
                      <div>
                        <span className={styles.contactLabel}>Date of Birth</span>
                        <span className={styles.contactValue}>{applicant.dateOfBirth}</span>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}><Globe size={16} /></div>
                      <div>
                        <span className={styles.contactLabel}>Primary Language</span>
                        <span className={styles.contactValue}>{applicant.primaryLanguage}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className={styles.sideCard}>
                  <h3 className={styles.sideTitle}>User Details</h3>
                  <div className={styles.contactList}>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}><Briefcase size={16} /></div>
                      <div>
                        <span className={styles.contactLabel}>User ID</span>
                        <span className={styles.contactValue} style={{ fontSize: '12px', wordBreak: 'break-all' }}>{applicant.userId}</span>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}><CheckCircle size={16} /></div>
                      <div>
                        <span className={styles.contactLabel}>Account Status</span>
                        <span className={styles.contactValue}>{applicant.isDeleted ? 'Deleted' : 'Active'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className={styles.footerActions}>
              <div className={styles.footerInner}>
                <span className={styles.footerText}>Currently viewing {applicant.name}&apos;s application</span>
                <div className={styles.actionBtns}>
                  <button className={styles.rejectPageBtn} onClick={() => openRejectModal(applicant)}>Reject Application</button>
                  <button className={styles.acceptPageBtn} onClick={() => openAcceptModal(applicant)}>Accept Application</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ApplicantDetails;