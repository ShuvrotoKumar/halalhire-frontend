'use client';
import React from 'react';
import styles from './CompanyAboutSection.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'

interface Leader {
  name: string;
  title: string;
  image: string;
}

interface CompanyAboutSectionProps {
  name: string;
  description: string[];
  leadership: Leader[];
  children?: React.ReactNode;
}

const CompanyAboutSection: React.FC<CompanyAboutSectionProps> = ({ name, description, leadership, children }) => {
  const { t } = useTranslation()
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.about}>
              <h2 className={styles.title}>{t('aboutName', 'About {{name}}', { name })}</h2>
              <div className={styles.description}>
                {description.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>

            <div className={styles.leadership}>
              <h2 className={styles.title}>{t('executiveLeadership', 'Executive Leadership')}</h2>
              <div className={styles.leadershipGrid}>
                {leadership.map((leader, index) => (
                  <div key={index} className={styles.leaderCard}>
                    <div className={styles.avatar}>
                      <Image src={leader.image} alt={leader.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 className={styles.leaderName}>{leader.name}</h4>
                      <p className={styles.leaderTitle}>{leader.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.sidebar}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyAboutSection;
