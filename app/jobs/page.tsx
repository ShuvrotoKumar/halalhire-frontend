'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import JobsHero from '../components/JobsHero/JobsHero';
import JobFilters from '../components/JobFilters/JobFilters';
import JobCard from '../components/JobCard/JobCard';
import styles from './JobsPage.module.css';
import { useTranslation, Trans } from 'react-i18next'

const Page = () => {
    const { t } = useTranslation();

    const MOCK_JOBS = useMemo(() => [
        {
            id: 1,
            title: t('seniorComplianceOfficer', 'Senior Compliance Officer'),
            company: t('albarakaFinancialGroup', 'Al-Baraka Financial Group'),
            location: t('londonUkHybrid', 'London, UK (Hybrid)'),
            salary: t('6500085000', '£65,000 - £85,000'),
            salaryNum: 75000,
            posted: t('posted2DaysAgo', 'Posted 2 days ago'),
            datePosted: new Date(Date.now() - 2 * 86400000).toISOString(),
            tags: ['Halal Verified'],
            industry: 'Islamic Finance',
            employmentType: 'Full-time',
            remoteAllowed: false,
            noTravelRequired: false,
            logo: '/f3.png',
        },
        {
            id: 2,
            title: t('leadBackendDeveloper', 'Lead Backend Developer'),
            company: t('ethicaDigitalSolutions', 'Ethica Digital Solutions'),
            location: t('remoteDubaiUaeBase', 'Remote (Dubai, UAE Base)'),
            salary: t('80000110000', '$80,000 - $110,000'),
            salaryNum: 95000,
            posted: t('posted6HoursAgo', 'Posted 6 hours ago'),
            datePosted: new Date(Date.now() - 6 * 3600000).toISOString(),
            tags: ['Halal Verified'],
            industry: 'Technology',
            employmentType: 'Full-time',
            remoteAllowed: true,
            noTravelRequired: false,
            logo: '/f1.png',
        },
        {
            id: 3,
            title: t('operationsManager', 'Operations Manager'),
            company: t('crescentHealthSystems', 'Crescent Health Systems'),
            location: t('manchesterUk', 'Manchester, UK'),
            salary: t('4500055000', '£45,000 - £55,000'),
            salaryNum: 50000,
            posted: t('posted1WeekAgo', 'Posted 1 week ago'),
            datePosted: new Date(Date.now() - 7 * 86400000).toISOString(),
            tags: ['Halal Verified'],
            industry: 'Healthcare',
            employmentType: 'Part-time job',
            remoteAllowed: false,
            noTravelRequired: true,
            logo: '/f2.png',
        },
        {
            id: 4,
            title: t('frontendEngineer', 'Frontend Engineer'),
            company: t('techInnovators', 'Tech Innovators'),
            location: t('remote', 'Remote'),
            salary: t('120000140000', '$120,000 - $140,000'),
            salaryNum: 130000,
            posted: t('posted1DayAgo', 'Posted 1 day ago'),
            datePosted: new Date(Date.now() - 1 * 86400000).toISOString(),
            tags: [],
            industry: 'Technology',
            employmentType: 'Contract',
            remoteAllowed: true,
            noTravelRequired: true,
            logo: '/f4.png',
        },
        {
            id: 5,
            title: t('islamicFinanceAnalyst', 'Islamic Finance Analyst'),
            company: t('globalHalalBank', 'Global Halal Bank'),
            location: t('kualaLumpurMalaysia', 'Kuala Lumpur, Malaysia'),
            salary: t('5000070000', '$50,000 - $70,000'),
            salaryNum: 60000,
            posted: t('posted3DaysAgo', 'Posted 3 days ago'),
            datePosted: new Date(Date.now() - 3 * 86400000).toISOString(),
            tags: ['Halal Verified'],
            industry: 'Islamic Finance',
            employmentType: 'Full-time',
            remoteAllowed: false,
            noTravelRequired: false,
            logo: '/f5.png',
        },
        {
            id: 6,
            title: t('educationalConsultant', 'Educational Consultant'),
            company: t('onlineMadrasa', 'Online Madrasa'),
            location: t('remoteAnywhere', 'Remote (Anywhere)'),
            salary: t('3000040000', '$30,000 - $40,000'),
            salaryNum: 35000,
            posted: t('posted2WeeksAgo', 'Posted 2 weeks ago'),
            datePosted: new Date(Date.now() - 14 * 86400000).toISOString(),
            tags: [],
            industry: 'Education',
            employmentType: 'Remote',
            remoteAllowed: true,
            noTravelRequired: true,
            logo: '/f6.png',
        },
    ], [t]);
    const [filters, setFilters] = useState({
        halalVerified: true,
        industry: '',
        salaryRange: 180, // Default to max
        employmentType: '',
        remoteAllowed: false,
        noTravelRequired: false
    });

    const [sortBy, setSortBy] = useState('Relevance');

    const filteredAndSortedJobs = useMemo(() => {
        let result = [...MOCK_JOBS];

        // Apply Filters
        if (filters.halalVerified) {
            result = result.filter(job => job.tags.includes('Halal Verified'));
        }
        if (filters.industry) {
            result = result.filter(job => job.industry === filters.industry);
        }
        if (filters.employmentType) {
            result = result.filter(job => job.employmentType === filters.employmentType);
        }
        if (filters.remoteAllowed) {
            result = result.filter(job => job.remoteAllowed === filters.remoteAllowed);
        }
        if (filters.noTravelRequired) {
            result = result.filter(job => job.noTravelRequired === filters.noTravelRequired);
        }

        // Filter by Salary (Show jobs with salary <= selected max range)
        // If range is 180k+, we show everything above 40k. 
        // We'll treat the slider as a MAXIMUM salary filter to see some dynamic changes,
        // OR as a minimum. Let's make it a minimum required salary.
        result = result.filter(job => job.salaryNum >= (filters.salaryRange * 1000));

        // Apply Sorting
        switch (sortBy) {
            case 'Newest':
                result.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
                break;
            case 'Salary':
                result.sort((a, b) => b.salaryNum - a.salaryNum);
                break;
            case 'Relevance':
            default:
                // Keep original mockup order
                break;
        }

        return result;
    }, [filters, sortBy]);

    return (
        <div >
            <Navbar />
            <main className={styles.pageWrapper}>
                <JobsHero />

                <section className={styles.contentSection}>
                    <div className="container">
                        <div className={styles.layout}>
                            <JobFilters filters={filters} setFilters={setFilters} />

                            <div className={styles.mainContent}>
                                {/* <div className={styles.resultsHeader}>
                                    <h2 className={styles.resultsCount}>
                                        {filteredAndSortedJobs.length.toLocaleString()}<Trans i18nKey="jobsFoundSpanresultsBasedOnYourSelectedFiltersspan">Jobs Found
                                        <span>Results based on your selected filters</span></Trans></h2>
                                    <div className={styles.sort}>
                                        {t('sortBy', 'SORT BY:')}
                                        <select
                                            className={styles.sortSelect}
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="Relevance">{t('relevance', 'Relevance')}</option>
                                            <option value="Newest">{t('newest', 'Newest')}</option>
                                            <option value="Salary">{t('salaryHighToLow', 'Salary (High to Low)')}</option>
                                        </select>
                                    </div>
                                </div> */}

                                <div className={styles.jobList}>
                                    {filteredAndSortedJobs.length > 0 ? (
                                        filteredAndSortedJobs.map((job) => (
                                            <JobCard key={job.id} job={job} />
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                            {t('noJobsMatchYourSelectedCriteriaTryAdjustingYourFilters', 'No jobs match your selected criteria. Try adjusting your filters.')}
                                        </div>
                                    )}
                                </div>

                                {filteredAndSortedJobs.length > 0 && (
                                    <div className={styles.pagination}>
                                        <button className={`${styles.pageBtn} ${styles.pageArrow}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                        <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                                        <button className={styles.pageBtn}>2</button>
                                        <button className={styles.pageBtn}>3</button>
                                        <span style={{ color: '#6b7280' }}>{t('key2', '...')}</span>
                                        <button className={styles.pageBtn}>12</button>
                                        <button className={`${styles.pageBtn} ${styles.pageArrow}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Page;