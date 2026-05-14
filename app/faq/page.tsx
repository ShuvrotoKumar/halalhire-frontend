'use client';

import React from 'react';
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
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useGetAllFaqQuery } from '@/redux/api/faqApi';

const FAQPage = () => {
  const { t } = useTranslation();
  const { data: faqResponse, isLoading } = useGetAllFaqQuery({});
  
  const faqsData = faqResponse?.data?.data || [];
  
  const icons = [
    <User size={24} key="user" />,
    <Briefcase size={24} key="briefcase" />,
    <Shield size={24} key="shield" />,
    <MessageCircle size={24} key="message" />,
    <HelpCircle size={24} key="help" />
  ];

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
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '40px 0', color: 'var(--bg-primary)' }}>
                  <Loader2 size={32} className="animate-spin" />
                </div>
              ) : faqsData.length > 0 ? (
                faqsData.map((faq: any, index: number) => (
                  <div key={faq._id || index} className={styles.section}>
                    <div className={styles.iconWrapper}>
                      {icons[index % icons.length]}
                    </div>
                    <div className={styles.sectionBody}>
                      <h2 className={styles.question}>{faq.question}</h2>
                      <p className={styles.answer}>{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                  {t('noFaqsFound', 'No FAQs found.')}
                </div>
              )}
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