'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './ImprintPage.module.css';
import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next'
import {
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Scale,
  Calendar,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useGetImprintQuery } from '@/redux/api/privacyApi';

const ImprintPage = () => {
  const { t } = useTranslation();
  const { data: imprintResponse, isLoading, error } = useGetImprintQuery({});
  
  // Extract imprint content taking into account potential API double-wrapping
  const imprintHtml = imprintResponse?.data?.data?.imprint || imprintResponse?.data?.imprint || '';
  
  // Handle error state
  if (error) {
    console.error('Error fetching imprint policy:', error);
  }
  
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <main className={styles.mainContent}>
        {/* Header Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <nav className={styles.breadcrumbs}>
              <Link href="/">{t('home', 'Home')}</Link>
              <ChevronRight size={14} className={styles.separator} />
              <span className={styles.current}>{t('imprint', 'Imprint')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('imprintLegalDisclosure', 'Imprint (Legal Disclosure)')}</h1>
            <p className={styles.subtitle}>
              {t('accordingToStatutoryRequirementsThisPageProvidesLegalAndContactInformationForTheOperatorsBehindTheHalalhirePlatform', 'According to statutory requirements, this page provides legal and contact \n              information for the operators behind the HalalHire platform.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <Building2 size={16} />
                <span>{t('halalTechSolutionsGlobalLtd', 'Halal Tech Solutions Global Ltd.')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container">
          <div className={styles.contentArea}>
            
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0', color: 'var(--bg-primary)' }}>
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : imprintHtml ? (
              <div 
                className={styles.apiContent}
                dangerouslySetInnerHTML={{ __html: imprintHtml }}
              />
            ) : (
              <div className={styles.imprintGrid}>
              {/* 1. Company Information */}
              <div className={styles.section}>
                <div className={styles.iconWrapper}>
                  <Building2 size={24} />
                </div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{t('companyInformation', 'Company Information')}</h2>
                  <div className={styles.infoLine}><Trans i18nKey="spanClassnamestylesinfolabelnamespanHalalTechSolutionsGlobalLtd"><span className={styles.infoLabel}>Name:</span> Halal Tech Solutions Global Ltd.</Trans></div>
                  <div className={styles.infoLine}><Trans i18nKey="spanClassnamestylesinfolabelregNospan12345678abcd"><span className={styles.infoLabel}>Reg No:</span> 12345678-ABCD</Trans></div>
                  <div className={styles.infoLine}><Trans i18nKey="spanClassnamestylesinfolabeldirectorsspanYahyaKhanAbdullahRahman"><span className={styles.infoLabel}>Directors:</span> Yahya Khan, Abdullah Rahman</Trans></div>
                </div>
              </div>

              {/* 2. Registered Office */}
              <div className={styles.section}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} />
                </div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{t('registeredOffice', 'Registered Office')}</h2>
                  <p className={styles.infoLine}><Trans i18nKey="123EthicalWayTechDistrictbrLondonEc1a1bbbrUnitedKingdom">123 Ethical Way, Tech District<br />
                    London, EC1A 1BB<br />
                    United Kingdom</Trans></p>
                </div>
              </div>

              {/* 3. Contact Details */}
              <div className={styles.section}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{t('contactDetails', 'Contact Details')}</h2>
                  <div className={styles.infoLine}><Trans i18nKey="spanClassnamestylesinfolabelphonespan4402012345678"><span className={styles.infoLabel}>Phone:</span> +44 (0) 20 1234 5678</Trans></div>
                  <div className={styles.infoLine}><Trans i18nKey="spanClassnamestylesinfolabelemailspanLegalhalalhirecom"><span className={styles.infoLabel}>Email:</span> legal@halalhire.com</Trans></div>
                  <div className={styles.infoLine}><Trans i18nKey="spanClassnamestylesinfolabelwebspanWwwhalalhirecom"><span className={styles.infoLabel}>Web:</span> www.halalhire.com</Trans></div>
                </div>
              </div>

              {/* 4. Regulatory Body */}
              <div className={styles.section}>
                <div className={styles.iconWrapper}>
                  <Scale size={24} />
                </div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{t('regulatoryBody', 'Regulatory Body')}</h2>
                  <p className={styles.infoLine}><Trans i18nKey="globalEthicalBusinessAllianceGebabrLicenceNoHalal789ethic">Global Ethical Business Alliance (GEBA)<br />
                    Licence No: HALAL-789-ETHIC</Trans></p>
                </div>
              </div>
            </div>
            )}

            {/* Disclaimer Section */}
            <div className={styles.disclaimerSection}>
              <h2 className={styles.disclaimerTitle}>{t('legalDisclaimer', 'Legal Disclaimer')}</h2>
              <p className={styles.disclaimerText}>
                {t('theInformationProvidedOnThisPlatformIsForGeneralInformationalPurposesOnlyWhileWeStriveForAccuracyHalalTechSolutionsGlobalLtdMakesNoRepresentationsOrWarrantiesOfAnyKindExpressOrImpliedAboutTheCompletenessOrReliabilityOfTheInformation', 'The information provided on this platform is for general informational purposes only. \n                While we strive for accuracy, Halal Tech Solutions Global Ltd. makes no \n                representations or warranties of any kind, express or implied, about the \n                completeness or reliability of the information.')}
              </p>
              <p className={styles.disclaimerText}>
                {t('halalhireIsAnInstitutionalNetworkFinalRecruitmentDecisionsAndEmploymentContractsAreTheSoleResponsibilityOfTheRespectiveEmployersAndCandidates', 'HalalHire is an institutional network; final recruitment decisions and \n                employment contracts are the sole responsibility of the respective \n                employers and candidates.')}
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImprintPage;
