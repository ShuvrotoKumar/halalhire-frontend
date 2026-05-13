'use client';
import React, { useMemo } from 'react';
import styles from './HalalWorkplaceSidebar.module.css';
import { useTranslation } from 'react-i18next'

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HalalWorkplaceSidebar = () => {
  const { t } = useTranslation()

  const features: Feature[] = useMemo(() => [
    {
      title: t('prayerFacilities', 'Prayer Facilities'),
      description: t('dedicatedPrayerRoomOnEveryFloorWithPrayerMatsProvided', 'Dedicated prayer room on every floor with prayer mats provided.'),
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>,
    },
    {
      title: t('wuduStations', 'Wudu Stations'),
      description: t('modernPrivateWuduFacilitiesAvailableWithinTheOfficeSuite', 'Modern, private wudu facilities available within the office suite.'),
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
    },
    {
      title: t('jumuahFlexibility', 'Jumu\'ah Flexibility'),
      description: t('extendedLunchBreaksOnFridaysToAccommodateCongregationalPrayers', 'Extended lunch breaks on Fridays to accommodate congregational prayers.'),
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    },
    {
      title: t('halalCatering', 'Halal Catering'),
      description: t('100HalalCertifiedPantryAndCateredCompanyEvents', '100% Halal certified pantry and catered company events.'),
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>,
    },
    {
      title: t('nurseryRoom', 'Nursery Room'),
      description: t('onsiteChildcareFacilitiesForWorkingParentsWithCertifiedStaff', 'On-site childcare facilities for working parents with certified staff.'),
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>,
    },
    {
      title: t('motherFriendlyHours', 'Mother Friendly Hours'),
      description: t('flexibleStartAndEndTimesToAccommodateSchoolRunsAndFamilyNeeds', 'Flexible start and end times to accommodate school runs and family needs.'),
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>,
    },
  ], [t]);

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>{t('halalWorkplace', 'Halal Workplace')}</h3>
      <div className={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.iconCircle}>
              {feature.icon}
            </div>
            <div>
              <h4 className={styles.featureTitle}>{feature.title}</h4>
              <p className={styles.featureDesc}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HalalWorkplaceSidebar;
