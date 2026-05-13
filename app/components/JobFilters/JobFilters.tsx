"use client";

import React, { useMemo } from 'react';
import styles from './JobFilters.module.css';
import { useTranslation } from 'react-i18next'

interface JobFiltersProps {
  filters: {
    halalVerified: boolean;
    industry: string;
    salaryRange: number;
    employmentType: string;
    remoteAllowed: boolean;
    noTravelRequired: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, setFilters }) => {
  const { t } = useTranslation()
  const toggleFilter = (key: string, value?: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value !== undefined ? value : !prev[key as keyof typeof prev]
    }));
  };

  const clearAll = () => {
    setFilters({
      halalVerified: false,
      industry: '',
      salaryRange: 40,
      employmentType: 'Full-time',
      remoteAllowed: false,
      noTravelRequired: false
    });
  };

  const industries = useMemo(() => [
    t('islamicFinance', 'Islamic Finance'),
    t('healthcare', 'Healthcare'),
    t('technology', 'Technology'),
    t('education', 'Education')
  ], [t]);

  const employmentTypes = useMemo(() => [
    t('fulltime', 'Full-time'),
    t('contract', 'Contract'),
    t('parttimejob', 'Part-time job'),
    t('remote', 'Remote')
  ], [t]);

  return (
    <aside className={styles.filters}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('filters', 'Filters')}</h3>
        <button className={styles.clearAll} onClick={clearAll}>{t('clearAll', 'Clear All')}</button>
      </div>

      <div
        className={styles.verifiedBadge}
        style={filters.halalVerified ? { background: 'linear-gradient(135deg, #193f35 0%, #0d4d3b 100%)', opacity: 1 } : { background: 'rgba(25, 63, 53, 0.08)', color: '#193f35' }}
        onClick={() => toggleFilter('halalVerified')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0L12.9389 2.06107L16.4894 1.58359L17.9389 4.81641L21 6.54508L20.4894 10L21 13.4549L17.9389 15.1836L16.4894 18.4164L12.9389 17.9389L10 20L7.06107 17.9389L3.51056 18.4164L2.06107 15.1836L-1 13.4549L-0.489435 10L-1 6.54508L2.06107 4.81641L3.51056 1.58359L7.06107 2.06107L10 0Z" fill={filters.halalVerified ? "#FEEE96" : "#193f35"} />
          <path d="M14 7L8.5 12.5L6 10" stroke={filters.halalVerified ? "#193f35" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.verifiedText}>{t('halalVerified', 'Halal Verified')}</span>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle} onClick={() => toggleFilter('industry', '')}>
          {t('industry', 'Industry')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: filters.industry ? 'rotate(180deg)' : 'none', transition: 'Transform 0.2s' }}><path d="M18 15l-6-6-6 6" /></svg>
        </h4>
        <div className={styles.optionList}>
          {industries.map(ind => (
            <label key={ind} className={`${styles.option} ${filters.industry === ind ? styles.active : ''}`} onClick={() => toggleFilter('industry', ind)}>
              <span className={styles.checkbox}>
                {filters.industry === ind && <div className={styles.radioInner}></div>}
              </span>
              {ind}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>{t('salaryRangeAnnual', 'Salary Range (Annual)')}</h4>
        <div className={styles.sliderContainer}>
          <div className={styles.rangeTrack}>
            <div className={styles.rangeProgress} style={{ width: `${((filters.salaryRange - 40) / 140) * 100}%` }}></div>
            <input
              type="range"
              min="40"
              max="180"
              value={filters.salaryRange}
              onChange={(e) => toggleFilter('salaryRange', parseInt(e.target.value))}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
            <div className={styles.rangeThumb} style={{ left: `${((filters.salaryRange - 40) / 140) * 100}%`, pointerEvents: 'none' }}></div>
          </div>
          <div className={styles.sliderRange}>
            <span>{t('40k', '$40k')}</span>
            <span>{t('salaryrangek', '${{salaryRange}}k+', { salaryRange: filters.salaryRange })}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>{t('employmentType', 'Employment Type')}</h4>
        <div className={styles.optionList}>
          {employmentTypes.map(type => (
            <label key={type} className={`${styles.option} ${filters.employmentType === type ? styles.active : ''}`} onClick={() => toggleFilter('employmentType', type)}>
              <div className={styles.checkbox}>
                {filters.employmentType === type && <div className={styles.radioInner}></div>}
              </div>
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section} style={{ marginBottom: '16px' }}>
        <div className={styles.toggleContainer} onClick={() => toggleFilter('remoteAllowed')}>
          <span className={styles.toggleLabel}>{t('remoteAllowed', 'Remote Allowed')}</span>
          <div className={`${styles.toggleSwitch} ${filters.remoteAllowed ? styles.active : ''}`}>
            <div className={styles.toggleThumb}></div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.toggleContainer} onClick={() => toggleFilter('noTravelRequired')}>
          <span className={styles.toggleLabel}>{t('noTravelRequired', 'No Travel Required')}</span>
          <div className={`${styles.toggleSwitch} ${filters.noTravelRequired ? styles.active : ''}`}>
            <div className={styles.toggleThumb}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default JobFilters;
