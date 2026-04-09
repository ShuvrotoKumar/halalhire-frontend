'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './CookiePage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  Cookie, 
  Info, 
  Settings, 
  ShieldCheck,
  Calendar, 
  Mail,
  ChevronRight
} from 'lucide-react';

const CookiePage = () => {
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
              <span className={styles.current}>{t('cookiePolicy', 'Cookie Policy')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('cookiePolicy', 'Cookie Policy')}</h1>
            <p className={styles.subtitle}>
              {t('thisPolicyExplainsHowHalalhireUsesCookiesAndSimilarTechnologiesToProvideCustomizeEvaluateAndImproveOurEthicalServices', 'This policy explains how HalalHire uses cookies and similar technologies \n              to provide, customize, evaluate, and improve our ethical services.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastUpdatedOctober242023', 'Last updated: October 24, 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <ShieldCheck size={16} />
                <span>{t('respectingYourDigitalPresence', 'Respecting Your Digital Presence')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container">
          <div className={styles.contentArea}>
            
            {/* 1. What are cookies */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Cookie size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('1WhatAreCookies', '1. What Are Cookies?')}</h2>
                <p className={styles.sectionText}>
                  {t('cookiesAreSmallTextFilesThatArePlacedOnYourDeviceByWebsitesThatYouVisitTheyAreWidelyUsedToMakeWebsitesWorkMoreEfficientlyAsWellAsToProvideInformationToTheOwnersOfTheSite', 'Cookies are small text files that are placed on your device by websites \n                  that you visit. They are widely used to make websites work more \n                  efficiently, as well as to provide information to the owners of the site.')}
                </p>
              </div>
            </div>

            {/* 2. How we use them */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Info size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('2HowWeUseCookies', '2. How We Use Cookies')}</h2>
                <p className={styles.sectionText}>
                  {t('weUseCookiesForSeveralEthicalReasonsIncludingKeepingYouSignedInUnderstandingHowYouUseOurPlatformAndImprovingYourJobseekingExperience', 'We use cookies for several ethical reasons, including keeping you signed in, \n                  understanding how you use our platform, and improving your job-seeking \n                  experience.')}
                </p>
                
                <table className={styles.cookieTable}>
                  <thead>
                    <tr>
                      <th>{t('type', 'Type')}</th>
                      <th>{t('purpose', 'Purpose')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t('essential', 'Essential')}</td>
                      <td>{t('necessaryForThePlatformToFunctionSuchAsAuthenticationAndSecurity', 'Necessary for the platform to function, such as authentication and security.')}</td>
                    </tr>
                    <tr>
                      <td>{t('performance', 'Performance')}</td>
                      <td>{t('helpUsUnderstandHowVisitorsInteractWithTheSiteByCollectingAnonymousInformation', 'Help us understand how visitors interact with the site by collecting anonymous information.')}</td>
                    </tr>
                    <tr>
                      <td>{t('functional', 'Functional')}</td>
                      <td>{t('allowTheSiteToRememberChoicesYouMakeLikeYourLanguagePreference', 'Allow the site to remember choices you make, like your language preference.')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Your Choices */}
            <div className={styles.section}>
              <div className={styles.iconWrapper}>
                <Settings size={24} />
              </div>
              <div className={styles.sectionBody}>
                <h2 className={styles.sectionTitle}>{t('3YourChoices', '3. Your Choices')}</h2>
                <p className={styles.sectionText}>
                  {t('youHaveTheRightToDecideWhetherToAcceptOrRejectCookiesYouCanSetOrAmendYourWebBrowserControlsToAcceptOrRefuseCookiesIfYouChooseToRejectCookiesYouMayStillUseOurWebsiteThoughYourAccessToSomeFunctionalityAndAreasMayBeRestricted', 'You have the right to decide whether to accept or reject cookies. You can \n                  set or amend your web browser controls to accept or refuse cookies. If \n                  you choose to reject cookies, you may still use our website though your \n                  access to some functionality and areas may be restricted.')}
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('needMoreInfo', 'Need more info?')}</h2>
              <p className={styles.contactText}>
                {t('ifYouHaveAnyQuestionsAboutOurUseOfCookiesOrOtherTechnologiesPleaseEmailOurTechnicalSupportTeam', 'If you have any questions about our use of cookies or other technologies, \n                please email our technical support team.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactSupport', 'Contact Support')}
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePage;