"use client";

import React, { useMemo } from 'react';
import styles from './JobDetailsFeatures.module.css';
import { useTranslation } from 'react-i18next'

const JobDetailsFeatures = () => {
  const { t } = useTranslation()
  const features = useMemo(() => [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>,
      title: t('prayerFacilities', 'Prayer Facilities'),
      description: t('dedicatedQuietPrayerRoomWithWuduFacilitiesOnsite', 'Dedicated quiet prayer room with Wudu facilities on-site.')
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
      title: t('jumuahFlexibility', 'Jumu\'ah Flexibility'),
      description: t('extendedFridayLunchBreakForCongregationalPrayers', 'Extended Friday lunch break for congregational prayers.')
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>,
      title: t('halalCatering', 'Halal Catering'),
      description: t('100HalalcertifiedCorporateCanteenAndCatering', '100% Halal-certified corporate canteen and catering.')
    }
  ], [t]);

  return (
    <div className={styles.featuresCard}>
      <h3 className={styles.title}>{t('halalspecificWorkplaceFeatures', 'Halal-Specific Workplace Features')}</h3>
      
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h4 className={styles.featureTitle}>{feature.title}</h4>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetailsFeatures;
