'use client';
import React, { useMemo } from 'react';
import styles from './HalalEmployment.module.css';
import Image from 'next/image';
import { useTranslation, Trans } from 'react-i18next'

const HalalEmployment = () => {
  const { t } = useTranslation()
  const features = useMemo(() => [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
      title: t('fairCompensation', 'Fair Compensation'),
      description: t('equitablePayStructuresBasedOnMarketValueAndIndividualMeritWithoutBias', 'Equitable pay structures based on market value and individual merit without bias.')
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>,
      title: t('radicalTransparency', 'Radical Transparency'),
      description: t('noHiddenClausesClearExpectationsAndHonestFeedbackThroughoutTheCareerLifecycle', 'No hidden clauses, clear expectations, and honest feedback throughout the career lifecycle.')
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
      title: t('ethicalCompliance', 'Ethical Compliance'),
      description: t('strictAdherenceToMoralPrinciplesThatExceedLocalLaborLawsInEveryJurisdiction', 'Strict adherence to moral principles that exceed local labor laws in every jurisdiction.')
    }
  ], [t]);

  return (
    <section className={styles.employmentSection}>
      <div className="container">
        <div className={styles.layout}>

          {/* Left Column - Content */}
          <div className={styles.contentColumn}>
            <h2 className={styles.title}><Trans i18nKey="whatSpanClassnamestyleshighlighthalalEmploymentspanMeans">What <span className={styles.highlight}>Halal Employment</span> Means</Trans></h2>
            <p className={styles.description}>
              {t('beyondComplianceOurFrameworkFocusesOnTheHolisticWellbeingOfTheWorkforceItRepresentsAParadigmShiftFromLaborAsAResourceToLaborAsAPartnership', 'Beyond compliance, our framework focuses on the holistic well-being\n              of the workforce. It represents a paradigm shift from \'labor as a resource\'\n              to \'labor as a partnership.\'')}
            </p>

            <div className={styles.featureList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.iconBox}>
                    {feature.icon}
                  </div>
                  <div className={styles.featureText}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Collage */}
          <div className={styles.collageColumn}>
            <div className={styles.collageGrid}>
              
              {/* Masonry Left Column */}
              <div className={styles.masonryColLeft}>
                <div className={styles.imageBox1}>
                  <Image src="/i5.png" alt={t('professionalWoman', 'Professional Woman')} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.auditBox}>
                  <span className={styles.auditNumber}>{t('100', '100%')}</span>
                  <span className={styles.auditText}>{t('ethicalAudit', 'ETHICAL AUDIT')}</span>
                </div>
              </div>

              {/* Masonry Right Column */}
              <div className={styles.masonryColRight}>
                <div className={styles.premiumBox}>
                  <span className={styles.premiumTitle}>{t('premium', 'Premium')}</span>
                  <span className={styles.premiumText}>{t('selectionProcess', 'SELECTION PROCESS')}</span>
                </div>
                <div className={styles.imageBox2}>
                  <Image src="/i2.png" alt="Professionals" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HalalEmployment;
