import React, { ReactNode } from 'react';
import styles from './JobDetailsSection.module.css';

interface JobDetailsSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ title, icon, children }) => {
  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.iconWrapper}>{icon}</span>
        {title}
      </h2>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default JobDetailsSection;
