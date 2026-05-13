'use client';
import React, { useMemo } from 'react';
import styles from './EnsuringExcellence.module.css';
import { useTranslation } from 'react-i18next'

const EnsuringExcellence = () => {
  const { t } = useTranslation()
  const pillars = useMemo(() => [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>,
      title: t('prayerAccommodation', 'Prayer Accommodation'),
      description: t('dedicatedPrayerSpacesAndFlexibleSchedulingToBalanceMandatoryRequirementsForAllRegisteredEmployees', 'Dedicated prayer spaces and flexible scheduling to balance mandatory requirements for all registered employees.')
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
      title: t('fairWages', 'Fair Wages'),
      description: t('weVerifyThatAllCompensationPackagesAdhereToEquitableLaborLawsAndProvideCompetitiveLivingStandards', 'We verify that all compensation packages adhere to equitable labor laws and provide competitive living standards.')
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
      title: t('ethicalBusiness', 'Ethical Business'),
      description: t('vettingForShariacompliantCorporateGovernanceEnsuringNoInvolvementInRestrictedIndustriesOrPredatoryPractices', 'Vetting for Sharia-compliant corporate governance, ensuring no involvement in restricted industries or predatory practices.')
    }
  ], [t]);

  return (
    <section className={styles.excellenceSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('ensuringExcellenceAcrossSectors', 'Ensuring Excellence Across Sectors')}</h2>
          <p className={styles.subtitle}>
            {t('theHalalhireSealOfApprovalIsOnlyGrantedToOrganizationsThatMeetOurRigorousEthicalAndSpiritualBenchmarks', 'The HalalHire seal of approval is only granted to organizations that meet our rigorous\n            ethical and spiritual benchmarks.')}
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => (
            <div key={index} className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                {pillar.icon}
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDescription}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnsuringExcellence;
