'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CompanyVerification.module.css';
import { useTranslation, Trans } from 'react-i18next'
import {
    FileText, 
    Award, 
    ShieldCheck, 
    TrendingUp, 
    CheckCircle,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

const CompanyVerification = () => {
    const { t } = useTranslation()
    const [taxId, setTaxId] = useState('');

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src="/logo.png" alt={t('halalhireLogo', 'HalalHire Logo')} width={160} height={60} style={{ objectFit: 'contain' }} />
                </Link>
            </div>

            <header className={styles.header}>
                <span className={styles.stepLabel}>{t('step2Of3', 'Step 2 of 3')}</span>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{t('verification', 'Verification')}</h1>
                    <span className={styles.completion}>{t('66Complete', '66% Complete')}</span>
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill} style={{ width: '66%' }}></div>
                </div>
                <p className={styles.subtitle}>{t('verifyYourBusinessIdentityToStartPostingJobs', 'Verify your business identity to start posting jobs.')}</p>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.formCard}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FileText className={styles.sectionIcon} size={20} />
                            <h2 className={styles.sectionTitle}>{t('officialDocuments', 'Official Documents')}</h2>
                        </div>

                        <div className={`${styles.uploadRow} ${styles.uploadRowActive}`}>
                            <div className={styles.docIcon}>
                                <FileText size={24} />
                            </div>
                            <div className={styles.docInfo}>
                                <div className={styles.docName}>
                                    {t('businessRegistrationCertificate', 'Business Registration Certificate')}
                                </div>
                                <p className={styles.docDesc}>{t('pdfJpgOrPngMax5mbEnsureAllCornersAreVisible', 'PDF, JPG or PNG (Max 5MB). Ensure all corners are visible.')}</p>
                            </div>
                            <button className={styles.uploadBtn}>{t('upload', 'Upload')}</button>
                        </div>

                        <div className={styles.uploadRow}>
                            <div className={`${styles.docIcon} ${styles.docIconSecondary}`} style={{ background: '#e2e8f0', color: '#64748b' }}>
                                <Award size={24} />
                            </div>
                            <div className={styles.docInfo}>
                                <div className={styles.docName}><Trans i18nKey="halalCertificationSpanClassnamestylesoptionalbadgeoptionalspan">Halal Certification <span className={styles.optionalBadge}>Optional</span></Trans></div>
                                <p className={styles.docDesc}>{t('provideYourHalalComplianceCertificateIfAvailable', 'Provide your Halal compliance certificate if available.')}</p>
                            </div>
                            <button className={`${styles.uploadBtn} ${styles.uploadBtnSecondary}`}>{t('upload', 'Upload')}</button>
                        </div>
                    </section>

                    <section className={styles.section} style={{ marginBottom: 0 }}>
                        <div className={styles.sectionHeader}>
                            <FileText className={styles.sectionIcon} size={20} />
                            <h2 className={styles.sectionTitle}>{t('taxIdentification', 'Tax Identification')}</h2>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('companyTaxIdTrnVatNumber', 'Company Tax ID (TRN / VAT Number)')}</label>
                            <input 
                                type="text" 
                                placeholder={t('eg100200300400', 'e.g. 100-200-300-400')} 
                                className={styles.input}
                                value={taxId}
                                onChange={(e) => setTaxId(e.target.value)}
                            />
                        </div>
                        <p className={styles.infoNote}>{t('thisInformationIsUsedForBillingAndIdentityVerificationOnly', 'This information is used for billing and identity verification only.')}</p>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.benefitCard}>
                        <div className={styles.benefitHeader}>
                            <div className={styles.benefitIcon}>
                                <ShieldCheck size={20} />
                            </div>
                            <h3>{t('whyVerify', 'Why verify?')}</h3>
                        </div>
                        <div className={styles.benefitList}>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.benefitCheck} />
                                <div>
                                    <span className={styles.benefitItemTitle}>{t('buildTrust', 'Build Trust')}</span>
                                    <p className={styles.benefitItemDesc}>{t('verifiedBusinessesGet3xMoreApplicationsFromHighqualityCandidates', 'Verified businesses get 3x more applications from high-quality candidates.')}</p>
                                </div>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.benefitCheck} />
                                <div>
                                    <span className={styles.benefitItemTitle}>{t('betterVisibility', 'Better Visibility')}</span>
                                    <p className={styles.benefitItemDesc}>{t('yourJobPostingsAppearHigherInSearchResultsAcrossThePlatform', 'Your job postings appear higher in search results across the platform.')}</p>
                                </div>
                            </div>
                            <div className={styles.benefitItem}>
                                <CheckCircle2 size={18} className={styles.benefitCheck} />
                                <div>
                                    <span className={styles.benefitItemTitle}>{t('verifiedBadge', 'Verified Badge')}</span>
                                    <p className={styles.benefitItemDesc}>{t('displayAGoldVerificationBadgeOnYourCompanyProfileAndJobAds', 'Display a gold verification badge on your company profile and job ads.')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <div className={styles.navigation}>
                <Link href="/company_on" className={styles.backBtn}>
                    <ArrowLeft size={18} /> {t('back', 'Back')}
                </Link>
                <Link href="/workplace_pre" className={styles.continueBtn}>
                    {t('continueToFinalStep', 'Continue to Final Step')}
                </Link>
            </div>

            <footer className={styles.footer}>
                {t('2026HalalhireTheEthicalProfessionalNetworkForTheUmmah', '© 2026 HalalHire, The Ethical Professional Network for the Ummah.')}
            </footer>
        </div>
    );
};

export default CompanyVerification;