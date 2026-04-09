'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './TermsPage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  FileText, 
  Scale, 
  UserCheck, 
  AlertCircle,
  Calendar, 
  Mail,
  ChevronRight
} from 'lucide-react';

const TermsPage = () => {
  const { t } = useTranslation()
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
              <span className={styles.current}>{t('termsOfService', 'Terms of Service')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('termsOfService', 'Terms of Service')}</h1>
            <p className={styles.subtitle}>
              {t('bismillahByUsingHalalhireYouAgreeToAbideByOurEthicalFrameworkAndProfessionalStandardsDesignedToServeTheGlobalUmmahWithIntegrityAndExcellence', 'Bismillah. By using HalalHire, you agree to abide by our ethical framework \n              and professional standards designed to serve the global Ummah with \n              integrity and excellence.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <FileText size={16} />
                <span>{t('professionalEthicalStandards', 'Professional & Ethical Standards')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container">
          <div className={styles.contentArea}>
            
            {/* 1. Acceptance */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <UserCheck size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('1AcceptanceOfTerms', '1. Acceptance of Terms')}</h2>
                <p className={styles.sectionText}>
                  {t('byAccessingOrUsingTheHalalhirePlatformYouAcknowledgeThatYouHaveReadUnderstoodAndAgreeToBeBoundByTheseTermsOfServiceAndOurPrivacyPolicyIfYouDoNotAgreePleaseRefrainFromUsingOurServices', 'By accessing or using the HalalHire platform, you acknowledge that you have \n                  read, understood, and agree to be bound by these Terms of Service and our \n                  Privacy Policy. If you do not agree, please refrain from using our services.')}
                </p>
              </div>
            </div>

            {/* 2. Ethical Conduct */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Scale size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('2EthicalConductShariaAlignment', '2. Ethical Conduct & Sharia Alignment')}</h2>
                <p className={styles.sectionText}>
                  {t('halalhireIsBuiltOnIslamicPrinciplesOfHonestyTransparencyAndFairnessUsersAreExpectedTo', 'HalalHire is built on Islamic principles of honesty, transparency, and fairness. \n                  Users are expected to:')}
                </p>
                <div className={styles.termsList}>
                  <div className={styles.termsItem}>
                    <span className={styles.termsLabel}>{t('honesty', 'Honesty:')}</span>
                    <span className={styles.termsDesc}>{t('provideAccurateInformationInProfilesAndJobListings', 'Provide accurate information in profiles and job listings.')}</span>
                  </div>
                  <div className={styles.termsItem}>
                    <span className={styles.termsLabel}>{t('respect', 'Respect:')}</span>
                    <span className={styles.termsDesc}>{t('treatAllMembersOfTheCommunityWithDignityAndProfessionalism', 'Treat all members of the community with dignity and professionalism.')}</span>
                  </div>
                  <div className={styles.termsItem}>
                    <span className={styles.termsLabel}>{t('compliance', 'Compliance:')}</span>
                    <span className={styles.termsDesc}>{t('ensureAllJobOpportunitiesAndEmploymentPracticesAreShariacompliant', 'Ensure all job opportunities and employment practices are Sharia-compliant.')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. User Accounts */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <AlertCircle size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('3UserAccountsSecurity', '3. User Accounts & Security')}</h2>
                <p className={styles.sectionText}>
                  {t('youAreResponsibleForMaintainingTheConfidentialityOfYourAccountCredentialsAnyActivityOccurringUnderYourAccountIsYourResponsibilityNotifyUsImmediatelyOfAnyUnauthorizedUse', 'You are responsible for maintaining the confidentiality of your account \n                  credentials. Any activity occurring under your account is your responsibility. \n                  Notify us immediately of any unauthorized use.')}
                </p>
              </div>
            </div>

            {/* 4. Limitation of Liability */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Scale size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('4LimitationOfLiability', '4. Limitation of Liability')}</h2>
                <p className={styles.sectionText}>
                  {t('halalhireProvidesAPlatformForConnectingEmployersAndCandidatesWhileWeVetPartnersForEthicalAlignmentWeAreNotLiableForTheFinalEmploymentAgreementsOrAnyDisputesArisingTherefrom', 'HalalHire provides a platform for connecting employers and candidates. \n                  While we vet partners for ethical alignment, we are not liable for the \n                  final employment agreements or any disputes arising therefrom.')}
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('needClarification', 'Need Clarification?')}</h2>
              <p className={styles.contactText}>
                {t('ifYouHaveAnyQuestionsRegardingOurTermsOfServiceOrHowTheyApplyToYourSpecificSituationPleaseReachOutToOurLegalTeam', 'If you have any questions regarding our Terms of Service or how they \n                apply to your specific situation, please reach out to our legal team.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactLegalTeam', 'Contact Legal Team')}
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;