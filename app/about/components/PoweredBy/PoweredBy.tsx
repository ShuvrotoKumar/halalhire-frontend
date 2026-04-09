'use client';
import React from 'react';
import styles from './PoweredBy.module.css';
import { useTranslation } from 'react-i18next'

const PoweredBy = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.poweredSection}>
      <div className="container">
        
        <div className={styles.content}>
          <div className={styles.badge}>
            {t('byt', 'BÆYT')}
          </div>
          
          <h2 className={styles.title}>{t('poweredByByt', 'Powered by BÆYT')}</h2>
          
          <p className={styles.text}>
            {t('bytIsATechnologyCompanySpecializingInEthicalDigitalSolutionsForTheMuslimCommunityWithExpertiseInPlatformDevelopmentComplianceSystemsAndScalableArchitectureBytProvidesTheTechnologicalFoundationThatPowersHalalhire', 'BÆYT is a technology company specializing in ethical digital solutions for the Muslim\n            community. With expertise in platform development, compliance systems, and scalable\n            architecture, BÆYT provides the technological foundation that powers HalalHire.')}
          </p>
          
          <p className={styles.text}>
            {t('ourCommitmentToQualitySecurityAndIslamicPrinciplesDrivesEveryAspectOfOurEngineeringAndOperationalPracticesEnsuringThatHalalhireRemainsATrustedAndReliablePlatformForHalalEmployment', 'Our commitment to quality, security, and Islamic principles drives every aspect of our\n            engineering and operational practices, ensuring that HalalHire remains a trusted and\n            reliable platform for halal employment.')}
          </p>
        </div>

      </div>
    </section>
  );
};

export default PoweredBy;
