'use client';
import React from 'react';
import styles from './CompanyStatsGrid.module.css';
import { useTranslation } from 'react-i18next'

interface CompanyStatsGridProps {
  stats: {
    employees: string;
    offices: string;
    roles: string;
    years: string;
  };
}

const CompanyStatsGrid: React.FC<CompanyStatsGridProps> = ({ stats }) => {
  const { t } = useTranslation()
  const statItems = [
    { label: t('employees', 'Employees'), value: stats.employees },
    { label: t('globalOffices', 'Global Offices'), value: stats.offices },
    { label: t('openRoles', 'Open Roles'), value: stats.roles },
    { label: t('yearsActive', 'Years Active'), value: stats.years },
  ];

  return (
    <div className="container">
      <div className={styles.grid}>
        {statItems.map((item, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyStatsGrid;
