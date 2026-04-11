'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProfessionalInfo.module.css';

const ProfessionalProfilePage = () => {
    const [jobTitle, setJobTitle] = useState('Product Designer');
    const [experience, setExperience] = useState('Senior Level (5-10 years)');
    const [skills, setSkills] = useState(['UI/UX DESIGN', 'PRODUCT STRATEGY', 'FIGMA']);
    const [skillInput, setSkillInput] = useState('');
    const [primaryLanguage, setPrimaryLanguage] = useState('English (Native/Professional)');
    const [otherLanguages, setOtherLanguages] = useState('');
    const [resume, setResume] = useState({ name: 'resume_july_2023.pdf', size: '1.2 MB', time: '2 mins ago' });
    const [certificates, setCertificates] = useState([
        { id: 1, name: 'google_ux_cert.png', status: 'Ready to upload' }
    ]);

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!skills.includes(skillInput.trim().toUpperCase())) {
                setSkills([...skills, skillInput.trim().toUpperCase()]);
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const removeCert = (id: number) => {
        setCertificates(certificates.filter(cert => cert.id !== id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
            setResume({
                name: file.name,
                size: `${sizeMB} MB`,
                time: 'Just now'
            });
        }
    };

    const handleCertAdd = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e: any) => {
            const file = e.target.files?.[0];
            if (file) {
                setCertificates([...certificates, {
                    id: Date.now(),
                    name: file.name,
                    status: 'Selected'
                }]);
            }
        };
        input.click();
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Top Bar */}
            <header className={styles.topBar}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="HalalHire Logo" width={120} height={40} style={{ objectFit: 'contain' }} />
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* Progress Header */}
                <header className={styles.header}>
                    <div className={styles.stepInfo}>
                        <span>Step 3 of 5</span>
                        <span className={styles.percentage}>60% Complete</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>

                    <h1 className={styles.title}>Professional Profile</h1>
                    <p className={styles.subtitle}>
                        Help us match you with ethical opportunities that align with your expertise
                        and Islamic values.
                    </p>
                </header>

                <form className={styles.formBody} onSubmit={(e) => e.preventDefault()}>
                    {/* Experience Details */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <svg className={styles.iconCircle} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            Experience Details
                        </div>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Current Job Title</label>
                                <input 
                                    type="text" 
                                    className={styles.input} 
                                    value={jobTitle} 
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Years of Experience</label>
                                <div className={styles.selectWrapper}>
                                    <select 
                                        className={styles.select} 
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        <option>Entry Level (0-2 years)</option>
                                        <option>Mid Level (2-5 years)</option>
                                        <option>Senior Level (5-10 years)</option>
                                        <option>Expert Level (10+ years)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Skills & Languages */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <svg className={styles.iconCircle} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            Skills & Languages
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
                            <label className={styles.label}>Key Professional Skills</label>
                            <div className={styles.tagsContainer}>
                                {skills.map((skill) => (
                                    <div key={skill} className={styles.tag}>
                                        {skill}
                                        <span className={styles.removeTag} onClick={() => removeSkill(skill)}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </span>
                                    </div>
                                ))}
                                <input 
                                    type="text" 
                                    className={styles.tagInput} 
                                    placeholder="Add a skill..." 
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleAddSkill}
                                />
                            </div>
                            <p className={styles.recommended}>Recommended: Visual Design, Agile, Prototyping</p>
                        </div>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Primary Language</label>
                                <div className={styles.selectWrapper}>
                                    <select 
                                        className={styles.select} 
                                        value={primaryLanguage}
                                        onChange={(e) => setPrimaryLanguage(e.target.value)}
                                    >
                                        <option>English (Native/Professional)</option>
                                        <option>Arabic</option>
                                        <option>Malay</option>
                                        <option>Urdu</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Other Languages</label>
                                <input 
                                    type="text" 
                                    className={styles.input} 
                                    placeholder="e.g. Arabic, Malay" 
                                    value={otherLanguages}
                                    onChange={(e) => setOtherLanguages(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Professional Documents */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <svg className={styles.iconCircle} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            Professional Documents
                        </div>

                        <div className={styles.uploadArea}>
                            <div className={styles.docIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <path d="M12 18v-6" /><polyline points="9 15 12 12 15 15" />
                                </svg>
                            </div>
                            <div className={styles.fileName}>{resume.name}</div>
                            <div className={styles.fileInfo}>Uploaded {resume.time} • {resume.size}</div>
                            <label className={styles.changeBtn}>Change File
                                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            </label>
                        </div>

                        <div className={styles.successBanner}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Skills extracted successfully from your CV.
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <div className={styles.label} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                Professional Certificates
                                <span style={{ fontWeight: 400, color: '#9ca3af' }}>Optional</span>
                            </div>
                            <div className={styles.certificatesGrid}>
                                {certificates.map((cert) => (
                                    <div key={cert.id} className={styles.certCard}>
                                        <div className={styles.certIcon}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="8" r="7" />
                                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                                            </svg>
                                        </div>
                                        <div className={styles.certDetails}>
                                            <div className={styles.certName}>{cert.name}</div>
                                            <div className={styles.certStatus}>{cert.status}</div>
                                        </div>
                                        <div className={styles.deleteCert} onClick={() => removeCert(cert.id)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                                <div className={styles.addCert} onClick={handleCertAdd}>
                                    <svg className={styles.addIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                    Add another
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Navigation */}
                    <div className={styles.navigation}>
                        <Link href="/identity_doc" className={styles.backBtn}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back
                        </Link>
                        <Link href="/work_pre" className={styles.continueBtn}>
                            Save & Continue
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </form>

                <div className={styles.docNote}>
                    <div className={styles.securityNote}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        ETHICAL & SECURE DATA STANDARDS
                    </div>
                    <p className={styles.privacyText}>
                        Your professional information is stored securely. We only share profile details with hiring companies when you explicitly apply for a role.
                    </p>
                </div>
            </main>

            <footer style={{ paddingBottom: '40px', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
                © 2024 HalalHire. The Ethical Professional Network for the Ummah.
            </footer>
        </div>
    );
};

export default ProfessionalProfilePage;
