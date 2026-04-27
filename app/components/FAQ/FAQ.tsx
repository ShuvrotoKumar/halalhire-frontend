'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styles from './FAQ.module.css';
import { useTranslation } from 'react-i18next';
import { useGetAllFaqQuery } from '@/redux/api/faqApi';
import { Loader2 } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();
  const { data: faqResponse, isLoading } = useGetAllFaqQuery({});
  
  // Handle different potential response structures from the API
  const faqs = Array.isArray(faqResponse?.data?.data) 
    ? faqResponse.data.data 
    : (Array.isArray(faqResponse?.data) ? faqResponse.data : []);
  
  const [openId, setOpenId] = useState<string | null>(null);

  // Automatically open the first FAQ when data loads
  useEffect(() => {
    if (faqs.length > 0 && !openId) {
      setOpenId(faqs[0]._id || '0');
    }
  }, [faqs, openId]);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`section ${styles.faqSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('frequentlyAskedQuestions', 'Frequently Asked Questions')}</h2>
        </div>

        <div className={styles.faqList}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '40px 0', color: 'var(--bg-primary)' }}>
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq: any, index: number) => (
              <div
                key={faq._id || index}
                className={`${styles.faqItem} ${openId === (faq._id || index.toString()) ? styles.active : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(faq._id || index.toString())}
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
                    maxHeight: openId === (faq._id || index.toString()) ? '200px' : '0',
                    opacity: openId === (faq._id || index.toString()) ? '1' : '0'
                  }}
                >
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              {t('noFaqsFound', 'No FAQs found.')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
