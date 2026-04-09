'use client';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './PrivacyPage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  Shield, 
  Info, 
  Hand, 
  Lock, 
  Scale, 
  Calendar, 
  CheckCircle,
  Mail,
  ChevronRight
} from 'lucide-react';

const PrivacyPage = () => {
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
              <span className={styles.current}>{t('privacyPolicy', 'Privacy Policy')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('privacyPolicyDataDignity', 'Privacy Policy & Data Dignity')}</h1>
            <p className={styles.subtitle}>
              {t('atHalalhireWeTreatYourPersonalInformationWithTheSameRespectAndIntegrityAsOurShariacompliantCareerMatchingYourDataIsAnExtensionOfYourPersonhood', 'At HalalHire, we treat your personal information with the same respect and \n              integrity as our Sharia-compliant career matching. Your data is an \n              extension of your personhood.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <Shield size={16} />
                <span>{t('compliantWithGlobalPrivacyStandards', 'Compliant with Global Privacy Standards')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container">
          <div className={styles.contentArea}>
            
            {/* 1. Commitment */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Shield size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('1OurCommitmentToDataDignity', '1. Our Commitment to Data Dignity')}</h2>
                <p className={styles.sectionText}>
                  {t('inAlignmentWithOurEthicalFrameworkWeBelieveInTheConceptOfDataDignityYourPersonalInformationIsNotACommodityToBeTradedButATrustAmanahPlacedInOurHandsWePledgeToProtectThisInformationWithTheHighestStandardsOfCybersecurityAndEthicalTransparency', 'In alignment with our ethical framework, we believe in the concept of "Data Dignity." \n                  Your personal information is not a commodity to be traded, but a trust (Amanah) \n                  placed in our hands. We pledge to protect this information with the highest \n                  standards of cybersecurity and ethical transparency.')}
                </p>
              </div>
            </div>

            {/* 2. Collection */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Info size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('2InformationWeCollect', '2. Information We Collect')}</h2>
                <p className={styles.sectionText}>
                  {t('toProvideOurServicesEffectivelyWeCollectTheFollowingTypesOfInformation', 'To provide our services effectively, we collect the following types of information:')}
                </p>
                <div className={styles.dataList}>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('identityData', 'Identity Data:')}</span>
                    <span className={styles.dataDesc}>{t('nameProfessionalTitlesAndDemographicInformationRelevantToShariacompliantRecruitment', 'Name, professional titles, and demographic information relevant to Sharia-compliant recruitment.')}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('contactData', 'Contact Data:')}</span>
                    <span className={styles.dataDesc}>{t('emailAddressPhoneNumberAndProfessionalSocialMediaProfiles', 'Email address, phone number, and professional social media profiles.')}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('professionalData', 'Professional Data:')}</span>
                    <span className={styles.dataDesc}>{t('cvsWorkHistoryEducationalCertificatesAndSkillAssessments', 'CVs, work history, educational certificates, and skill assessments.')}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('usageData', 'Usage Data:')}</span>
                    <span className={styles.dataDesc}>{t('informationAboutHowYouUseOurPlatformToImproveYourJobseekingExperience', 'Information about how you use our platform to improve your job-seeking experience.')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Usage */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Hand size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('3HowWeUseYourData', '3. How We Use Your Data')}</h2>
                <p className={styles.sectionText}>
                  {t('weUseYourDataStrictlyForThePurposesOfFacilitatingEthicalEmployment', 'We use your data strictly for the purposes of facilitating ethical employment:')}
                </p>
                <div className={styles.checkList}>
                  <div className={styles.checkItem}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{t('matchingYourProfileWithEmployersWhoAdhereToShariacompliantBusinessPractices', 'Matching your profile with employers who adhere to Sharia-compliant business practices.')}</span>
                  </div>
                  <div className={styles.checkItem}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{t('providingTailoredCareerAdviceAndProfessionalDevelopmentResources', 'Providing tailored career advice and professional development resources.')}</span>
                  </div>
                  <div className={styles.checkItem}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{t('maintainingTheSecurityAndIntegrityOfTheHalalhireEcosystem', 'Maintaining the security and integrity of the HalalHire ecosystem.')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Security */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Lock size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('4DataStorageSecurity', '4. Data Storage & Security')}</h2>
                <p className={styles.sectionText}>
                  {t('yourDataIsEncryptedBothInTransitAndAtRestUsingIndustryleadingProtocolsWeHostOurServersInSecureFacilitiesWith247MonitoringWeDoNotSellYourDataToThirdpartyAdvertisersOrDataBrokersUnderAnyCircumstances', 'Your data is encrypted both in transit and at rest using industry-leading protocols. \n                  We host our servers in secure facilities with 24/7 monitoring. We do not sell \n                  your data to third-party advertisers or data brokers under any circumstances.')}
                </p>
              </div>
            </div>

            {/* 5. Rights */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Scale size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('5YourLegalEthicalRights', '5. Your Legal & Ethical Rights')}</h2>
                <p className={styles.sectionText}>
                  {t('asAUserOfHalalhireYouHaveFullSovereigntyOverYourInformation', 'As a user of HalalHire, you have full sovereignty over your information:')}
                </p>
                <div className={styles.dataList}>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('rightToAccess', 'Right to Access:')}</span>
                    <span className={styles.dataDesc}>{t('youMayRequestACopyOfAllDataWeHoldAboutYouAtAnyTime', 'You may request a copy of all data we hold about you at any time.')}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('rightToRectification', 'Right to Rectification:')}</span>
                    <span className={styles.dataDesc}>{t('youCanCorrectAnyInaccurateOrIncompleteInformation', 'You can correct any inaccurate or incomplete information.')}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('rightToErasure', 'Right to Erasure:')}</span>
                    <span className={styles.dataDesc}>{t('youHaveTheRightToBeForgottenWeWillDeleteYourDataUponRequestSubjectToLegalObligations', 'You have the "Right to be Forgotten" — we will delete your data upon request, subject to legal obligations.')}</span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>{t('rightToPortability', 'Right to Portability:')}</span>
                    <span className={styles.dataDesc}>{t('youCanExportYourDataInAStructuredMachinereadableFormat', 'You can export your data in a structured, machine-readable format.')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('questionsOrConcerns', 'Questions or Concerns?')}</h2>
              <p className={styles.contactText}>
                {t('ourDataProtectionOfficerIsAvailableToDiscussAnyConcernsRegardingYourPrivacyOrOurShariacompliantDataPractices', 'Our Data Protection Officer is available to discuss any concerns regarding your \n                privacy or our Sharia-compliant data practices.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactUs', 'Contact Us')}
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;