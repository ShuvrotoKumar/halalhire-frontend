'use client';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import JobDetailsHeader from '../../components/JobDetails/JobDetailsHeader';
import JobDetailsMatch from '../../components/JobDetails/JobDetailsMatch';
import JobDetailsSection from '../../components/JobDetails/JobDetailsSection';
import JobDetailsFeatures from '../../components/JobDetails/JobDetailsFeatures';
import JobDetailsSidebar from '../../components/JobDetails/JobDetailsSidebar';
import styles from './JobDetailsPage.module.css';
import { useTranslation } from 'react-i18next'

const JobPage = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className="container">
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <span>{t('globalMarkets', 'Global Markets')}</span>
            <span className={styles.separator}>{t('gt', '&gt;')}</span>
            <span>{t('islamicFinance', 'Islamic Finance')}</span>
            <span className={styles.separator}>{t('gt', '&gt;')}</span>
            <span className={styles.current}>{t('seniorAnalyst', 'Senior Analyst')}</span>
          </div>

          <div className={styles.layout}>
            {/* Left Column - Main Details */}
            <div className={styles.leftColumn}>
              <JobDetailsHeader />
              <JobDetailsMatch />

              <JobDetailsSection
                title={t('jobDescription', 'Job Description')}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
              >
                <p>
                  {t('amanahGlobalFinanceIsSeekingAHighlySkilledSeniorIslamicInvestmentAnalystToJoinOurLondonbasedEthicalInvestmentCommitteeThisRoleIsPivotalInEnsuringOurGlobalPortfolioMaintainsTheHighestStandardsOfShariaComplianceWhileDeliveringRobustFinancialReturnsForOurInstitutionalClients', 'Amanah Global Finance is seeking a highly skilled Senior Islamic Investment Analyst to join our London-based Ethical Investment Committee. This role is pivotal in ensuring our global portfolio maintains the highest standards of Sharia compliance while delivering robust financial returns for our institutional clients.')}
                </p>
                <p>
                  {t('youWillLeadResearchIntoEmergingShariacompliantEquityMarketsConductRigorousFinancialModelingAndCollaborateWithOurShariaBoardToVetComplexFinancialInstrumentsThisIsAnOpportunityToBeAtTheForefrontOfEthicalFinanceDrivingWealthCreationThatAlignsWithIslamicPrinciplesOfJusticeAndSocialResponsibility', 'You will lead research into emerging Sharia-compliant equity markets, conduct rigorous financial modeling, and collaborate with our Sharia Board to vet complex financial instruments. This is an opportunity to be at the forefront of ethical finance, driving wealth creation that aligns with Islamic principles of justice and social responsibility.')}
                </p>
              </JobDetailsSection>

              <JobDetailsSection
                title={t('requirements', 'Requirements')}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="icon-green"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>}
              >
                <ul>
                  <li>{t('mastersDegreeInIslamicFinanceEconomicsOrRelatedQuantitativeField', 'Masters degree in Islamic Finance, Economics, or related quantitative field.')}</li>
                  <li>{t('6YearsOfExperienceInInvestmentBankingOrPrivateEquity', '6+ years of experience in investment banking or private equity.')}</li>
                  <li>{t('deepUnderstandingOfAaoifiAndIfsbStandards', 'Deep understanding of AAOIFI and IFSB standards.')}</li>
                  <li>{t('provenTrackRecordInStructuringComplexSukukAndTakafulProducts', 'Proven track record in structuring complex Sukuk and Takaful products.')}</li>
                  <li>{t('advancedProficiencyInFinancialModelingLboDcfMa', 'Advanced proficiency in financial modeling (LBO, DCF, M&A).')}</li>
                </ul>
              </JobDetailsSection>

              <JobDetailsFeatures />

              <JobDetailsSection
                title={t('aboutEthicalWealthManagement', 'About Ethical Wealth Management')}
                icon={null} // Design doesn't show an icon for this section title
              >
                <p>
                  {t('foundedIn2008EthicalWealthManagementIsAPremierBoutiqueFirmDedicatedToShariacompliantAssetManagementWeManageOver42bInAssetsForSovereignWealthFundsAndHighnetworthIndividualsAcrossTheGccAndEuropeOurMissionIsToProveThatEthicalShariacompliantInvestingCanOutperformTraditionalBenchmarksWhileMaintainingTheHighestSpiritualAndMoralStandards', 'Founded in 2008, Ethical Wealth Management is a premier boutique firm dedicated to Sharia-compliant asset management. We manage over £4.2B in assets for sovereign wealth funds and high-net-worth individuals across the GCC and Europe. Our mission is to prove that ethical, Sharia-compliant investing can outperform traditional benchmarks while maintaining the highest spiritual and moral standards.')}
                </p>
              </JobDetailsSection>
            </div>

            {/* Right Column - Sidebar */}
            <div className={styles.rightColumn}>
              <JobDetailsSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobPage;
