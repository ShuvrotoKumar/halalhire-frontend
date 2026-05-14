'use client';

import React from 'react';
import styles from './UserSettings.module.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import { User, Shield, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next'

const UserSettings = () => {
    const { t } = useTranslation()
    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            <main className={styles.contentContainer}>
                <h1 className={styles.title}>{t('accountSettings', 'Account Settings')}</h1>
                <p className={styles.subtitle}>
                    {t('manageYourInstitutionalProfilePrivacyAndSecurityPreferences', 'Manage your institutional profile, privacy, and security preferences.')}
                </p>

                {/* Account Settings Section */}
                <section className={styles.card}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <User size={20} color="#0c3126" />
                            {t('accountSettings', 'Account Settings')}
                        </div>
                    </div>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('candidateEmail', 'CANDIDATE EMAIL')}</label>
                            <input
                                type="email"
                                value="admin@techdeen.com"
                                readOnly
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('password', 'PASSWORD')}</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="password"
                                    value="********"
                                    readOnly
                                    className={styles.input}
                                />
                                <button className={styles.updateBtn}>{t('update', 'Update')}</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Privacy Controls Section */}
                <section className={styles.card}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <Shield size={20} color="#0c3126" />
                            {t('privacyControls', 'Privacy Controls')}
                        </div>
                    </div>
                    <div className={styles.toggleGroup}>
                        <div className={styles.toggleItem}>
                            <div className={styles.toggleInfo}>
                                <div className={styles.toggleTitle}>{t('profileVisibility', 'Profile Visibility')}</div>
                                <div className={styles.toggleDesc}>{t('enableAidrivenJobRecommendationsBasedOnYourProfile', 'Enable AI-driven job recommendations based on your profile.')}</div>
                            </div>
                            <label className={styles.switch}>
                                <input type="checkbox" defaultChecked />
                                <span className={styles.slider}></span>
                            </label>
                        </div>

                        <div className={styles.toggleItem}>
                            <div className={styles.toggleInfo}>
                                <div className={styles.toggleTitle}>{t('aiDataConsent', 'AI Data Consent')}</div>
                                <div className={styles.toggleDesc}>{t('enableAidrivenJobRecommendationsBasedOnYourProfile', 'Enable AI-driven job recommendations based on your profile.')}</div>
                            </div>
                            <label className={styles.switch}>
                                <input type="checkbox" />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Notification Preferences Section */}
                <section className={styles.card}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <Bell size={20} color="#0c3126" />
                            {t('notificationPreferences', 'Notification Preferences')}
                        </div>
                    </div>
                    <div className={styles.toggleItem}>
                        <div className={styles.toggleInfo}>
                            <div className={styles.toggleTitle}>{t('newApplicantAlerts', 'New Applicant Alerts')}</div>
                            <div className={styles.toggleDesc} style={{ color: '#193f35', opacity: 0.6 }}>
                                {t('getNotifiedAsSoonAsSomeoneAppliesToYourJobPosts', 'Get notified as soon as someone applies to your job posts.')}
                            </div>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </section>

                {/* Footer Actions */}
                <div className={styles.actions}>
                    <Link href="/user_profile" className={styles.cancelBtn}>{t('cancel', 'Cancel')}</Link>
                    <Link href="/" className={styles.saveBtn}>{t('saveAllChanges', 'Save All Changes')}</Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserSettings;
