'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import CompanyDetailsHero from './components/CompanyDetailsHero/CompanyDetailsHero';
import CompanyStatsGrid from './components/CompanyStatsGrid/CompanyStatsGrid';
import CompanyAboutSection from './components/CompanyAboutSection/CompanyAboutSection';
import HalalWorkplaceSidebar from './components/HalalWorkplaceSidebar/HalalWorkplaceSidebar';
import CompanyBottomCTA from './components/CompanyBottomCTA/CompanyBottomCTA';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const CompanyDetailsPage = () => {
  const { t } = useTranslation();

  const COMPANY_DATA = useMemo(() => ({
    name: t('ethicalWealthManagement', 'Ethical Wealth Management'),
    industry: t('islamicFinance', 'Islamic Finance'),
    location: t('mayfairLondon', 'Mayfair, London'),
    employees: t('50200Employees', '50-200 Employees'),
    founded: '2013',
    logo: '/i1.png', 
    banner: '/cd1.png',
    stats: {
      employees: '140+',
      offices: '4',
      roles: '12',
      years: '12',
    },
    description: [
      t('weAreAPremierShariacompliantWealthManagementFirmDedicatedToBridgingTheGapBetweenProfessionalExcellenceAndEthicalInvestmentStrategiesSince2012OurMissionHasBeenToProvideHighnetworthIndividualsAndInstitutionalClientsWithInvestmentSolutionsThatAreNotOnlyFinanciallySoundButAlsoStrictlyAdhereToIslamicEthicalPrinciples', 'We are a premier Sharia-compliant wealth management firm dedicated to bridging the gap between professional excellence and ethical investment strategies. Since 2012, our mission has been to provide high-net-worth individuals and institutional clients with investment solutions that are not only financially sound but also strictly adhere to Islamic ethical principles.'),
      t('ourTeamConsistsOfIndustryVeteransAndShariaScholarsWhoWorkHandinhandToAuditEveryPortfolioEnsuringTransparencyFairnessAndTheExclusionOfProhibitedIndustriesSuchAsConventionalBankingGamblingAndTobacco', 'Our team consists of industry veterans and Sharia scholars who work hand-in-hand to audit every portfolio, ensuring transparency, fairness, and the exclusion of prohibited industries such as conventional banking, gambling, and tobacco.'),
    ],
    leadership: [
      { name: t('ahmadAlsayed', 'Ahmad Al-Sayed'), title: t('chiefExecutiveOfficer', 'Chief Executive Officer'), image: '/b1.png' },
      { name: t('sarahJenkins', 'Sarah Jenkins'), title: t('headOfShariaCompliance', 'Head of Sharia Compliance'), image: '/b2.png' },
    ],
  }), [t]);
  return (
    <main>
      <Navbar />
      <div style={{ backgroundColor: '#F8F6EF', paddingBottom: '80px' }}>
        <CompanyDetailsHero company={COMPANY_DATA} />
        <CompanyStatsGrid stats={COMPANY_DATA.stats} />
      </div>
      <CompanyAboutSection
        name={COMPANY_DATA.name}
        description={COMPANY_DATA.description}
        leadership={COMPANY_DATA.leadership}
      >
        <HalalWorkplaceSidebar />
      </CompanyAboutSection>
      <CompanyBottomCTA />
      <Footer />
    </main>
  );
};

export default CompanyDetailsPage;
