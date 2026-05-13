'use client';
import React from 'react';
import styles from './MissionPhilosophy.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next'

const MissionPhilosophy = () => {
  const { t } = useTranslation()
  return (
    <section className={styles.missionSection}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Mission Card */}
          <div className={styles.cardLight}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E49E21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            </div>
            
            <h2 className={styles.cardTitle}>{t('ourMission', 'Our Mission')}</h2>
            
            <p className={styles.cardText}>
              {t('toSetTheAbsoluteGlobalStandardForEthicalRecruitmentWeCurateAnEnvironmentWhereMeritocracyFlourishesEnsuringThatEveryPlacementHonorsBothTheTalentsDignityAndTheEmployersVision', 'To set the absolute global standard for ethical recruitment. We\n              curate an environment where meritocracy flourishes, ensuring that\n              every placement honors both the talent\'s dignity and the employer\'s\n              vision.')}
            </p>
            
            <div className={styles.imageContainer}>
              <Image 
                src="/hero.png" // Reusing a nice corporate image
                alt="Boardroom" 
                fill 
                className={styles.image}
                style={{objectFit: 'cover'}}
              />
            </div>
          </div>

          {/* Philosophy Card */}
          <div className={styles.cardDark}>
            <div className={styles.iconWrapper}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E49E21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
            </div>
            
            <h2 className={styles.cardTitleDark}>{t('ourPhilosophy', 'Our Philosophy')}</h2>
            
            <p className={styles.cardTextDark}>
              {t('employmentIsMoreThanALegalContractItIsASacredBondOurHalalfirstApproachEnsuresThatEveryStepOfTheHiringJourneyfromSourcingToOnboardingisFreeFromExploitationAndBuiltOnRadicalTransparency', 'Employment is more than a legal contract; it is a sacred bond. Our\n              "Halal-First" approach ensures that every step of the hiring journey—from\n              sourcing to onboarding—is free from exploitation and built on radical\n              transparency.')}
            </p>
            
            <div className={styles.imageContainer}>
              <Image 
                src="/i3.png" // Reusing an office window image placeholder
                alt={t('officeWindow', 'Office Window')} 
                fill 
                className={styles.image}
                style={{objectFit: 'cover'}}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionPhilosophy;
