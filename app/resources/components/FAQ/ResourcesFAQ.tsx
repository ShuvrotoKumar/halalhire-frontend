'use client';

import React, { useState } from 'react';
import styles from './ResourcesFAQ.module.css';
import { useTranslation } from 'react-i18next'

const ResourcesFAQ = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('howDoYouVerifyTheHalalStatusOfAWorkplace', 'How do you verify the Halal status of a workplace?'),
      answer: t('ourVerificationTeamConductsOnsiteOrVirtualAuditsFocusingOnFinancialEthicsFacilityManagementAndHrPoliciesToEnsureTheyAlignWithUniversalShariaStandards', 'Our verification team conducts on-site or virtual audits focusing on financial ethics, facility management, and HR policies to ensure they align with universal Sharia standards.')
    },
    {
      question: t('areThereAnyMembershipFeesForJobSeekers', 'Are there any membership fees for job seekers?'),
      answer: t('standardMembershipForJobSeekersIsCompletelyFreeWeOfferPremiumVerificationServicesForThoseWishingToFasttrackTheirProfileVisibility', 'Standard membership for job seekers is completely free. We offer premium verification services for those wishing to fast-track their profile visibility.')
    },
    {
      question: t('canNonmuslimsUseHalalhire', 'Can non-Muslims use HalalHire?'),
      answer: t('absolutelyHalalhireIsAnEthicalPlatformOpenToAllIndividualsWhoShareOurValuesOfTransparencyFairnessAndMutualRespectInTheWorkplace', 'Absolutely. HalalHire is an ethical platform open to all individuals who share our values of transparency, fairness, and mutual respect in the workplace.')
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <h2 className={styles.title}>{t('frequentlyAskedQuestions', 'Frequently Asked Questions')}</h2>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className={styles.questionBar}>
                <h3 className={styles.question}>{faq.question}</h3>
                <div className={styles.toggleIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className={styles.answerWrapper}>
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesFAQ;
