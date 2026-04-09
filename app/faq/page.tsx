'use client';

import React, { useMemo } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './FAQPage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  HelpCircle, 
  MessageCircle, 
  User, 
  Briefcase, 
  Shield, 
  Calendar,
  Mail,
  ChevronRight
} from 'lucide-react';

const FAQPage = () => {
  const { t } = useTranslation()
  const faqs = useMemo(() => [
    {
      icon: <User size={24} />,
      question: t('howDoesHalalhireVerifyHalalJobs', 'How does HalalHire verify \'Halal\' jobs?'),
      answer: t('wePartnerWithEmployersWhoCommitToOurEthicalFrameworkWeManuallyReviewJobListingsAndCompanyProfilesToEnsureTheyAlignWithIslamicValuesProfessionalStandardsAndFairTreatmentOfWorkers', 'We partner with employers who commit to our ethical framework. We manually review job listings and company profiles to ensure they align with Islamic values, professional standards, and fair treatment of workers.')
    },
    {
      icon: <Briefcase size={24} />,
      question: t('isHalalhireOnlyForMuslims', 'Is HalalHire only for Muslims?'),
      answer: t('whileOurPlatformIsBuiltOnIslamicPrinciplesAndFocusesOnShariacompliantOpportunitiesItIsOpenToAnyoneWhoValuesEthicalEmploymentProfessionalIntegrityAndARespectfulWorkplaceEnvironment', 'While our platform is built on Islamic principles and focuses on Sharia-compliant opportunities, it is open to anyone who values ethical employment, professional integrity, and a respectful workplace environment.')
    },
    {
      icon: <Shield size={24} />,
      question: t('howIsMyDataProtected', 'How is my data protected?'),
      answer: t('weTreatYourDataWithTheUtmostDignityWeUseIndustrystandardEncryptionSecureHostingAndWeNeverSellYourPersonalInformationToThirdpartyAdvertisersYourPrivacyIsATrustAmanahWeHoldDearly', 'We treat your data with the utmost dignity. We use industry-standard encryption, secure hosting, and we NEVER sell your personal information to third-party advertisers. Your privacy is a trust (amanah) we hold dearly.')
    },
    {
      icon: <MessageCircle size={24} />,
      question: t('howCanIContactAnEmployer', 'How can I contact an employer?'),
      answer: t('onceYouApplyForAJobAndTheEmployerExpressesInterestInYourProfileOurPlatformProvidesSecureCommunicationChannelsToFacilitateInterviewsAndDiscussions', 'Once you apply for a job and the employer expresses interest in your profile, our platform provides secure communication channels to facilitate interviews and discussions.')
    }
  ], [t]);

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
              <span className={styles.current}>{t('frequentlyAskedQuestions', 'Frequently Asked Questions')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('howCanWeHelp', 'How Can We Help?')}</h1>
            <p className={styles.subtitle}>
              {t('findAnswersToCommonQuestionsAboutOurPlatformOurEthicalStandardsAndHowWeServeTheGlobalUmmahsProfessionalNeeds', 'Find answers to common questions about our platform, our ethical standards, \n              and how we serve the global Ummah\'s professional needs.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('knowledgeBaseUpdatedOct2023', 'Knowledge Base updated: Oct 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <HelpCircle size={16} />
                <span>{t('supportCommunity', 'Support Community')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container">
          <div className={styles.contentArea}>
            <div className={styles.faqGrid}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.section}>
                  <div className={styles.iconWrapper}>
                    {faq.icon}
                  </div>
                  <div className={styles.sectionBody}>
                    <h2 className={styles.question}>{faq.question}</h2>
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('stillHaveQuestions', 'Still have questions?')}</h2>
              <p className={styles.contactText}>
                {t('ourSupportTeamIsHereToHelpYouWithAnySpecificQueriesOrAssistanceYouMayNeedInYourProfessionalJourney', 'Our support team is here to help you with any specific queries or \n                assistance you may need in your professional journey.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('messageSupportTeam', 'Message Support Team')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;