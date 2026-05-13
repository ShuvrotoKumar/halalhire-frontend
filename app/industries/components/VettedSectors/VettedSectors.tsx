'use client';
import React, { useMemo } from 'react';
import styles from './VettedSectors.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'

const VettedSectors = () => {
  const { t } = useTranslation();

  const sectors = useMemo(() => [
    { id: 1, name: t('construction', 'Construction'), count: t('134Openings', '134 Openings'), image: '/i1.png' },
    { id: 2, name: t('engineering', 'Engineering'), count: t('89Openings', '89 Openings'), image: '/i2.png' },
    { id: 3, name: t('healthcare', 'Healthcare'), count: t('210Openings', '210 Openings'), image: '/i3.png' },
    { id: 4, name: t('itTech', 'IT & Tech'), count: t('54Openings', '54 Openings'), image: '/i4.png' },
    { id: 5, name: t('logistics', 'Logistics'), count: t('46Openings', '46 Openings'), image: '/i5.png' },
    { id: 6, name: t('catering', 'Catering'), count: t('75Openings', '75 Openings'), image: '/i1.png' },
    { id: 7, name: t('commerce', 'Commerce'), count: t('132Openings', '132 Openings'), image: '/i2.png' },
    { id: 8, name: t('administration', 'Administration'), count: t('64Openings', '64 Openings'), image: '/i3.png' },
    { id: 9, name: t('services', 'Services'), count: t('83Openings', '83 Openings'), image: '/i4.png' },
    { id: 10, name: t('otherSectors', 'Other Sectors'), count: t('31Openings', '31 Openings'), image: '/i5.png' },
  ], [t]);
  return (
    <section className={styles.sectorsSection}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{t('vettedSectors', 'Vetted Sectors')}</h2>
            <p className={styles.subtitle}>
              {t('everyIndustryInOurNetworkIsAuditedForEthicalLaborPracticesAndSpiritualAccommodation', 'Every industry in our network is audited for ethical labor practices and\n              spiritual accommodation.')}
            </p>
          </div>
          
          <div className={styles.viewToggles}>
            <button className={`${styles.toggleBtn} ${styles.active}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button className={styles.toggleBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {sectors.map((sector) => (
            <div key={sector.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={sector.image} 
                  alt={sector.name} 
                  fill 
                  className={styles.image}
                  style={{objectFit: 'cover'}}
                />
                <div className={styles.overlay}></div>
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.sectorName}>{sector.name}</h3>
                <p className={styles.openings}>{sector.count}</p>
                
                <Link href={`/jobs?industry=${sector.name}`} className={styles.viewJobsLink}>
                  {t('viewJobs', 'VIEW JOBS')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VettedSectors;
