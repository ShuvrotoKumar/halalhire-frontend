'use client';
import React, { useMemo } from 'react';
import styles from './BrowseCompanies.module.css';
import CompanyListCard from './CompanyListCard';
import CompanySidebar from './CompanySidebar';
import BrowsePagination from './BrowsePagination';
import { useTranslation } from 'react-i18next'

const BrowseCompanies = () => {
  const { t } = useTranslation();

  const ALL_COMPANIES = useMemo(() => [
    {
      id: 'wahed',
      logo: '/partners/partner1.png',
      name: t('wahedInvest', 'Wahed Invest'),
      industry: t('wealthManagement', 'Wealth Management'),
      badges: [t('halalCertified', 'HALAL CERTIFIED'), t('remoteFriendly', 'REMOTE FRIENDLY')],
      description: t('automatedEthicalInvestingForEveryoneSimpleFairAndHalal', 'Automated ethical investing for everyone. Simple, fair, and halal.'),
      features: {
        prayerRoom: true,
        halalFood: true,
        nurseryRoom: true,
        motherFriendly: true,
      },
      openRoles: '15',
      staffCount: '50-200',
    },
    {
      id: 'shariapaul',
      logo: '/partners/partner2.png',
      name: t('shariapaul', 'ShariaPaul'),
      industry: t('legalServices', 'Legal Services'),
      badges: [t('halalCertified', 'HALAL CERTIFIED'), t('global', 'GLOBAL')],
      description: t('specializedLegalAdvisoryForShariacompliantContractsAndLitigation', 'Specialized legal advisory for Sharia-compliant contracts and litigation.'),
      features: {
        prayerRoom: true,
        halalFood: true,
        nurseryRoom: true,
        motherFriendly: true,
      },
      openRoles: '3',
      staffCount: '10-50',
    },
    {
      id: 'halalfoodie',
      logo: '/partners/partner3.png',
      name: t('halalFoodie', 'Halal Foodie'),
      industry: t('foodBeverage', 'Food & Beverage'),
      badges: [t('halalCertified', 'HALAL CERTIFIED')],
      description: t('torontosMostTrustedSourceForVerifiedHalalRestaurantsAndReviews', 'Toronto\'s most trusted source for verified halal restaurants and reviews.'),
      features: {
        prayerRoom: true,
        halalFood: true,
        nurseryRoom: true,
        motherFriendly: true,
      },
      openRoles: '8',
      staffCount: '1-10',
    },
    {
      id: 'wahed-2',
      logo: '/partners/partner1.png',
      name: t('wahedInvest', 'Wahed Invest'),
      industry: t('wealthManagement', 'Wealth Management'),
      badges: [t('halalCertified', 'HALAL CERTIFIED'), t('remoteFriendly', 'REMOTE FRIENDLY')],
      description: t('automatedEthicalInvestingForEveryoneSimpleFairAndHalal', 'Automated ethical investing for everyone. Simple, fair, and halal.'),
      features: {
        prayerRoom: true,
        halalFood: true,
        nurseryRoom: true,
        motherFriendly: true,
      },
      openRoles: '15',
      staffCount: '50-200',
    },
    {
      id: 'shariapaul-2',
      logo: '/partners/partner2.png',
      name: t('shariapaul', 'ShariaPaul'),
      industry: t('legalServices', 'Legal Services'),
      badges: [t('halalCertified', 'HALAL CERTIFIED'), t('global', 'GLOBAL')],
      description: t('specializedLegalAdvisoryForShariacompliantContractsAndLitigation', 'Specialized legal advisory for Sharia-compliant contracts and litigation.'),
      features: {
        prayerRoom: true,
        halalFood: true,
        nurseryRoom: true,
        motherFriendly: true,
      },
      openRoles: '3',
      staffCount: '10-50',
    },
    {
      id: 'halalfoodie-2',
      logo: '/partners/partner3.png',
      name: t('halalFoodie', 'Halal Foodie'),
      industry: t('foodBeverage', 'Food & Beverage'),
      badges: [t('halalCertified', 'HALAL CERTIFIED')],
      description: t('torontosMostTrustedSourceForVerifiedHalalRestaurantsAndReviews', 'Toronto\'s most trusted source for verified halal restaurants and reviews.'),
      features: {
        prayerRoom: true,
        halalFood: true,
        nurseryRoom: true,
        motherFriendly: true,
      },
      openRoles: '8',
      staffCount: '1-10',
    },
  ], [t]);
  return (
    <section className={styles.browse}>
      <div className="container">
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{t('browseAllCompanies', 'Browse All Companies')}</h2>
          <span className={styles.resultsCount}>{t('showing112Of248Companies', 'Showing 1-12 of 248 companies')}</span>
        </div>

        <div className={styles.grid}>
            <div className={styles.list}>
              {ALL_COMPANIES.map((company) => (
                <CompanyListCard key={company.id} company={company} />
              ))}
            </div>
            <BrowsePagination />
        </div>
      </div>
    </section>
  );
};

export default BrowseCompanies;
