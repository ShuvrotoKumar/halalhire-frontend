'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './AccessibilityPage.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'
import {
  Accessibility, 
  Eye, 
  Keyboard, 
  CheckCircle,
  Calendar,
  Mail,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useGetAccessibilityQuery } from '@/redux/api/privacyApi';

const AccessibilityPage = () => {
  const { t } = useTranslation();
  const { data: accessibilityResponse, isLoading, error } = useGetAccessibilityQuery({});
  
  // Extract accessibility content taking into account potential API double-wrapping
  const accessibilityHtml = accessibilityResponse?.data?.data?.accessibility || accessibilityResponse?.data?.accessibility || '';
  
  // Handle error state
  if (error) {
    console.error('Error fetching accessibility policy:', error);
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
              <span className={styles.current}>{t('accessibility', 'Accessibility')}</span>
            </nav>
            
            <h1 className={styles.title}>{t('accessibilityStatement', 'Accessibility Statement')}</h1>
            <p className={styles.subtitle}>
              {t('halalhireIsCommittedToProvidingADigitallyInclusivePlatformThatIsAccessibleToTheWidestPossibleAudienceRegardlessOfAbilityOrTechnology', 'HalalHire is committed to providing a digitally inclusive platform that is \n              accessible to the widest possible audience, regardless of ability or technology.')}
            </p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{t('lastReviewedOct2023', 'Last reviewed: Oct 2023')}</span>
              </div>
              <div className={styles.metaItem}>
                <Accessibility size={16} />
                <span>{t('inclusiveDigitalEnvironment', 'Inclusive Digital Environment')}</span>
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
            ) : accessibilityHtml ? (
              <div 
                className={styles.apiContent}
                dangerouslySetInnerHTML={{ __html: accessibilityHtml }}
              />
            ) : (
              <div className={styles.accessibilityGrid}>
                {/* Fallback content if no API data */}
                <div className={styles.section}>
                  <div className={styles.iconWrapper}>
                    <Accessibility size={24} />
                  </div>
                  <div className={styles.sectionBody}>
                    <h2 className={styles.sectionTitle}>{t('1OurCommitment', '1. Our Commitment')}</h2>
                    <p className={styles.sectionText}>
                      {t('weBelieveThatAllMembersOfOurCommunityShouldBeAbleToAccessProfessionalOpportunitiesWithoutBarriersWeAimToConformToTheWebContentAccessibilityGuidelinesWcag21LevelAaStandards', 'We believe that all members of our community should be able to access \n                      professional opportunities without barriers. We aim to conform to \n                      the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards.')}
                    </p>
                  </div>
                </div>

                <div className={styles.section}>
                  <div className={styles.iconWrapper}>
                    <Eye size={24} />
                  </div>
                  <div className={styles.sectionBody}>
                    <h2 className={styles.sectionTitle}>{t('2VisualNavigationEnhancements', '2. Visual & Navigation Enhancements')}</h2>
                    <p className={styles.sectionText}>
                      {t('wePrioritizeHighContrastRatiosReadableTypographyAndSemanticHtmlToEnsureOurContentRemainsClearAndNavigable', 'We prioritize high contrast ratios, readable typography, and semantic HTML \n                      to ensure our content remains clear and navigable.')}
                    </p>
                    <div className={styles.featureList}>
                      <div className={styles.featureItem}>
                        <CheckCircle size={18} className={styles.checkIcon} />
                        <span className={styles.featureLabel}>{t('highContrastComponents', 'High Contrast Components')}</span>
                      </div>
                      <div className={styles.featureItem}>
                        <CheckCircle size={18} className={styles.checkIcon} />
                        <span className={styles.featureLabel}>{t('clearFontHierarchy', 'Clear Font Hierarchy')}</span>
                      </div>
                      <div className={styles.featureItem}>
                        <CheckCircle size={18} className={styles.checkIcon} />
                        <span className={styles.featureLabel}>{t('scalableTextSizes', 'Scalable Text Sizes')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <div className={styles.iconWrapper}>
                    <Keyboard size={24} />
                  </div>
                  <div className={styles.sectionBody}>
                    <h2 className={styles.sectionTitle}>{t('3AssistiveTechnologySupport', '3. Assistive Technology Support')}</h2>
                    <p className={styles.sectionText}>
                      {t('ourPlatformIsDesignedToBeFullyNavigableViaKeyboardAndCompatibleWithCommonScreenReadingSoftware', 'Our platform is designed to be fully navigable via keyboard and \n                      compatible with common screen reading software.')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Card */}
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>{t('feedbackSupport', 'Feedback & Support')}</h2>
              <p className={styles.contactText}>
                {t('ifYouEncounterAnyAccessibilityBarriersOrHaveSuggestionsOnHowWeCanImproveTheInclusivityOfOurPlatformPleaseReachOut', 'If you encounter any accessibility barriers or have suggestions on how \n                we can improve the inclusivity of our platform, please reach out.')}
              </p>
              <Link href="/contact" className={styles.contactBtn}>
                <Mail size={18} />
                {t('contactAccessibilityTeam', 'Contact Accessibility Team')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityPage;