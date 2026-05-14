'use client';

import React, { useState } from 'react';
import styles from './ResourcesFAQ.module.css';
import { useTranslation } from 'react-i18next';
import { useGetAllFaqQuery } from '@/redux/api/faqApi';
import { Loader2 } from 'lucide-react';

const ResourcesFAQ = () => {
  const { t } = useTranslation();
  const { data: faqResponse, isLoading } = useGetAllFaqQuery({});
  
  // Extract data from standard or nested RTK Query response
  const faqs = Array.isArray(faqResponse?.data?.data) 
    ? faqResponse.data.data 
    : (Array.isArray(faqResponse?.data) ? faqResponse.data : []);
    
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // Default to first open
  React.useEffect(() => {
    if (faqs.length > 0 && openIndex === null) {
      setOpenIndex(faqs[0]._id || '0');
    }
  }, [faqs]);

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <h2 className={styles.title}>{t('frequentlyAskedQuestions', 'Frequently Asked Questions')}</h2>
        
        <div className={styles.faqList}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', color: 'var(--bg-primary)' }}>
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq: any, index: number) => {
              const currentId = faq._id || index.toString();
              return (
                <div 
                  key={currentId} 
                  className={`${styles.faqItem} ${openIndex === currentId ? styles.open : ''}`}
                  onClick={() => setOpenIndex(openIndex === currentId ? null : currentId)}
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
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              {t('noFaqsFound', 'No FAQs found.')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourcesFAQ;
