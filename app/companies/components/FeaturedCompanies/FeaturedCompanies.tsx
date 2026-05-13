'use client';
import React, { useMemo } from 'react';
import styles from './FeaturedCompanies.module.css';
import FeaturedCompanyCard from './FeaturedCompanyCard';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const FeaturedCompanies = () => {
  const { t } = useTranslation()
  
  const featuredCompanies = useMemo(() => [
    {
      id: '1',
      logo: '/partners/partner1.png',
      name: t('alRajhiBank', 'Al Rajhi Bank'),
      industry: t('islamicFinance', 'ISLAMIC FINANCE'),
      location: t('riyadhSaudiArabia', 'Riyadh, Saudi Arabia'),
      description: t('leadingTheWorldInIslamicBankingWithEthicalInvestmentPrinciplesAndShariaCompliance', 'Leading the world in Islamic banking with ethical investment principles and Sharia compliance.'),
      jobs: '142',
      team: '15k+',
      est: '1957',
    },
    {
      id: '2',
      logo: '/partners/partner2.png',
      name: t('halalbooking', 'HalalBooking'),
      industry: t('travelHospitality', 'TRAVEL & HOSPITALITY'),
      location: t('londonUk', 'London, UK'),
      description: t('theWorldsLeadingSearchAndBookingWebsiteForHalalconsciousTravellersWorldwide', 'The world\'s leading search and booking website for halal-conscious travellers worldwide.'),
      jobs: '28',
      team: '200+',
      est: '2009',
    },
    {
      id: '3',
      logo: '/partners/partner3.png',
      name: t('zoya', 'Zoya'),
      industry: t('fintech', 'FINTECH'),
      location: t('newYorkUsa', 'New York, USA'),
      description: t('empoweringMuslimsToBuildWealthWithConfidenceThroughShariahcompliantStockScreening', 'Empowering Muslims to build wealth with confidence through Shariah-compliant stock screening.'),
      jobs: '12',
      team: '45',
      est: '2018',
    },
  ], [t]);
  return (
    <section className={styles.featured}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className={styles.iconCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="12" y1="2" x2="12" y2="4"></line>
                <line x1="12" y1="20" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="4" y2="12"></line>
                <line x1="20" y1="12" x2="22" y2="12"></line>
              </svg>
            </div>
            <h2 className={styles.title}>{t('featuredHalalEmployers', 'Featured Halal Employers')}</h2>
          </div>
          <Link href="/companies" className={styles.viewAll}>
            {t('viewAll', 'View All')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {featuredCompanies.map((company) => (
            <FeaturedCompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
