'use client';
import React from 'react';
import styles from './CompaniesHero.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const CompaniesHero = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">{t('home2', 'HOME')}</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>{t('companies2', 'COMPANIES')}</span>
        </div>

        <h1 className={styles.title}>{t('exploreEthicalCompanies', 'Explore Ethical Companies')}</h1>
        <p className={styles.subtitle}>
          {t('discoverOrganisationsCommittedToHalalEthicalAndSociallyResponsibleEmploymentAcrossTheGlobe', 'Discover organisations committed to halal, ethical, and socially responsible employment across the globe.')}
        </p>

        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" placeholder={t('searchCompanies', 'Search companies....')} />
          </div>

          <div className={styles.filters}>
            <button className={styles.filterBtn}>
              {t('industry', 'Industry')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button className={styles.filterBtn}>
              {t('location', 'Location')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {/* <button className={styles.filterBtn}>
              Size
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button> */}
            <button className={styles.halalToggle}>
              {t('proceed', 'Proceed')}
              {/* <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg> */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesHero;
