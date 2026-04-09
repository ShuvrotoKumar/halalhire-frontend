'use client';
import React, { useMemo } from 'react';
import styles from './ComplianceBoard.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'

const ComplianceBoard = () => {
  const { t } = useTranslation()
  const members = useMemo(() => [
    {
      name: t('drOmarAlfayed', 'Dr. Omar Al-Fayed'),
      role: t('headOfShariaEthics', 'Head of Sharia Ethics'),
      quote: t('ensuringThatCorporateGovernanceHonorsTheSpiritOfShariaIsOurPrimaryMandate', '"Ensuring that corporate governance honors the spirit of Sharia is our primary mandate."'),
      image: '/b1.png' // Using placeholder that fits the style
    },
    {
      name: t('sarahJameel', 'Sarah Jameel'),
      role: t('workplaceEqualityLead', 'Workplace Equality Lead'),
      quote: t('dignityAndFairnessArentJustValuesTheyAreInstitutionalRequirementsForEveryPartner', '"Dignity and fairness aren\'t just values; they are institutional requirements for every partner."'),
      image: '/b2.png'
    },
    {
      name: t('imranKhalid', 'Imran Khalid'),
      role: t('financialComplianceAuditor', 'Financial Compliance Auditor'),
      quote: t('rigorousOversightEnsuresEveryFinancialInteractionRemainsWithinOurEthicalBounds', '"Rigorous oversight ensures every financial interaction remains within our ethical bounds."'),
      image: '/b3.png'
    }
  ], [t]);

  return (
    <section className={styles.boardSection}>
      <div className="container">

        <div className={styles.header}>
          <h2 className={styles.title}>{t('complianceAdvisoryBoard', 'Compliance Advisory Board')}</h2>
          <p className={styles.subtitle}>
            {t('ourStandardsAreGovernedByAnIndependentCouncilOfEthicalScholarsAndIndustryVeterans', 'Our standards are governed by an independent council of ethical scholars and industry veterans.')}
          </p>
        </div>

        <div className={styles.grid}>
          {members.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.quote}>{member.quote}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComplianceBoard;
