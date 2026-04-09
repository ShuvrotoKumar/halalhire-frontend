'use client';

import React, { useState } from 'react';
import styles from './ApplyModal.module.css';
import Image from 'next/image';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation, Trans } from 'react-i18next'
import {
  CheckCircle, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Check, 
  ArrowRight,
  X
} from 'lucide-react';

const ApplyModal = () => {
  const { t } = useTranslation()
  const { isApplyModalOpen, activeJob, closeApplyModal } = useModal();
  const [step, setStep] = useState<'summary' | 'success'>('summary');

  if (!isApplyModalOpen) return null;

  // Use activeJob data or fallback to mock if null (for development safety)
  const job = activeJob || {
    title: t('seniorSoftwareEngineer', 'Senior Software Engineer'),
    company: t('techCorpSolutions', 'Tech Corp Solutions'),
    location: t('londonUkHybrid', 'London, UK (Hybrid)'),
    salary: t('85000110000Yr', '£85,000 - £110,000 /yr'),
    logo: '/logo.png'
  };

  const handleConfirm = () => {
    // In a real app, this is where the API call happens
    setStep('success');
  };

  const handleClose = () => {
    setStep('summary');
    closeApplyModal();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {step === 'summary' ? (
          <>
            <div className={styles.header}>
              <h2>{t('applicationSummary', 'Application Summary')}</h2>
              <p>{t('pleaseReviewYourDetailsBeforeFinalSubmission', 'Please review your details before final submission')}</p>
            </div>

            <div className={styles.body}>
              {/* Job Info */}
              <div className={styles.jobInfo}>
                <div className={styles.companyLogo}>
                  <Image src={job.logo || '/logo.png'} alt={job.company} width={48} height={48} objectFit="contain" />
                </div>
                <div className={styles.jobMeta}>
                  <h3>{job.title}</h3>
                  <span className={styles.companyName}>{job.company}</span>
                  <div className={styles.badges}>
                    <div className={styles.badge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {job.location}
                    </div>
                    <div className={styles.badge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.sectionTitle}>{t('yourApplicationAssets', 'Your Application Assets')}</div>
              <div className={styles.assetsGrid}>
                <div className={styles.assetCard}>
                  <div className={styles.assetIcon}>
                    <ShieldCheck size={20} />
                  </div>
                  <span className={styles.assetLabel}>{t('verifiedProfile', 'Verified Profile')}</span>
                </div>
                <div className={styles.assetCard}>
                  <div className={styles.assetIcon} style={{ background: '#f5f7f9', color: '#6b7280' }}>
                    <FileText size={20} />
                  </div>
                  <span className={styles.assetLabel}>{t('currentCv', 'Current CV')}</span>
                </div>
              </div>

              <div className={styles.alignmentBox}>
                <div className={styles.alignmentHeader}>
                  <CheckCircle size={18} color="#193f35" />
                  {t('halalWorkplaceAlignment', 'Halal Workplace Alignment')}
                </div>
                <div className={styles.alignmentGrid}>
                  <div className={styles.alignmentItem}><Trans i18nKey="divClassnamestylesdotDedicatedPrayerRoom"><div className={styles.dot} /> Dedicated Prayer Room</Trans></div>
                  <div className={styles.alignmentItem}><Trans i18nKey="divClassnamestylesdotHalalCateringOptions"><div className={styles.dot} /> Halal Catering Options</Trans></div>
                  <div className={styles.alignmentItem}><Trans i18nKey="divClassnamestylesdotInterestfreePensionPlan"><div className={styles.dot} /> Interest-free Pension Plan</Trans></div>
                  <div className={styles.alignmentItem}><Trans i18nKey="divClassnamestylesdotJummahPrayerBreak"><div className={styles.dot} /> Jummah Prayer Break</Trans></div>
                </div>
              </div>

              <div className={styles.disclaimer}>
                <Lock size={14} style={{ marginTop: '2px', flexShrink: 0 }} />{t('yourDocumentsAreEncryptedAndSecurelySharedOnlyWithTheHiringManagerAtCompany', 'Your documents are encrypted and securely shared only with the hiring manager at {{company}}.', { company: job.company })}</div>

              <div className={styles.footerActions}>
                <button className={styles.submitBtn} onClick={handleConfirm}>
                  {t('confirmSubmitApplication', 'Confirm & Submit Application')}
                </button>
                <button className={styles.cancelBtn} onClick={handleClose}>
                  {t('cancelAndReturnToJobListing', 'Cancel and return to job listing')}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.successBody}>
            <div className={styles.successIcon}>
              <Check size={40} />
            </div>
            <h2 className={styles.successTitle}>{t('applicationSubmitted', 'Application Submitted!')}</h2>
            <p className={styles.successText}><Trans i18nKey="bismillahYourApplicationForTitleJobtitleAtCompanyJobcompanyHasBeenSuccessfullyTransmittedBrBrTheHiringTeamWillReviewYourProfileShortlyYouWillReceiveAnEmailConfirmationWithNextSteps">Bismillah! Your application for **{{ title: job.title }}** at **{{ company: job.company }}** has been successfully transmitted. <br /><br />
              The hiring team will review your profile shortly. You will receive an email confirmation with next steps.</Trans></p>
            <button className={styles.submitBtn} onClick={handleClose}>
              {t('backToJobSearch', 'Back to Job Search')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
