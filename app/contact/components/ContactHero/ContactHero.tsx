'use client';
import React from 'react';
import styles from './ContactHero.module.css';
import { useTranslation } from 'react-i18next'

const ContactHero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <h1 className={styles.title}>{t('professionalSupportContact', 'Professional Support & Contact')}</h1>
        <p className={styles.subtitle}>
          {t('atHalalhireWeTreatEveryInquiryWithTheDignityAndRespectOurGlobalUmmahDeservesReachOutToOurEthicalSupportTeamForAnyAssistance', 'At HalalHire, we treat every inquiry with the dignity and respect our global\n          Ummah deserves. Reach out to our ethical support team for any assistance.')}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
