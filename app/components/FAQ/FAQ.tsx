'use client';

import React, { useState, useMemo } from 'react';
import styles from './FAQ.module.css';
import { useTranslation } from 'react-i18next'

const FAQ = () => {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = useMemo(() => [
    {
      id: 1,
      question: t('howDoYouVerifyTheHalalStatusOfAWorkplace', 'How do you verify the Halal status of a workplace?'),
      answer: t('ourVerificationTeamConductsOnsiteOrVirtualAuditsFocusingOnFinancialEthicsFacilityManagementAndHrPoliciesToEnsureTheyAlignWithUniversalShariaStandards', 'Our verification team conducts on-site or virtual audits focusing on financial ethics, facility management, and HR policies to ensure they align with universal Sharia standards.')
    },
    {
      id: 2,
      question: t('areThereAnyMembershipFeesForJobSeekers', 'Are there any membership fees for job seekers?'),
      answer: t('standardMembershipForJobSeekersIsCompletelyFreeWeOfferPremiumVerificationServicesForThoseWishingToFasttrackTheirProfileVisibility', 'Standard membership for job seekers is completely free. We offer premium verification services for those wishing to fast-track their profile visibility.')
    },
    {
      id: 3,
      question: t('canNonmuslimsUseHalalhire', 'Can non-Muslims use HalalHire?'),
      answer: t('absolutelyHalalhireIsAnEthicalPlatformOpenToAllIndividualsWhoShareOurValuesOfTransparencyFairnessAndMutualRespectInTheWorkplace', 'Absolutely. HalalHire is an ethical platform open to all individuals who share our values of transparency, fairness, and mutual respect in the workplace.')
    }
  ], [t]);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`section ${styles.faqSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('frequentlyAskedQuestions', 'Frequently Asked Questions')}</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${styles.faqItem} ${openId === faq.id ? styles.active : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(faq.id)}
              >
                <span>{faq.question}</span>
                <div className={styles.iconWrapper}>
                  <svg
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    className={styles.chevron}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              <div
                className={styles.faqAnswerWrapper}
                style={{
                  maxHeight: openId === faq.id ? '200px' : '0',
                  opacity: openId === faq.id ? '1' : '0'
                }}
              >
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
