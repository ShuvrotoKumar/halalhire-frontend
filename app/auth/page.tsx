'use client';

import React, { useState, useEffect, Suspense } from 'react';
import styles from './Auth.module.css';
import {
    Mail,
    Lock,
    Eye,
    ArrowRight,
    CheckCircle,
    ShieldCheck,
    User,
    Fingerprint,
    Briefcase
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
const AuthContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [role, setRole] = useState<'user' | 'company'>('user');
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Trigger mock login
        login(role);
        // Redirect to home or specific page
        router.push('/');
    };

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'login' || mode === 'register') {
            setActiveTab(mode);
        }
    }, [searchParams]);

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className="animate-fade-in">Secure Access Portal</h1>
                <p className="animate-fade-in delay-1">Building a dignified future for the global Ummah.</p>
            </header>

            <main className={`${styles.authCard} animate-fade-in delay-2`}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'register' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>

                <div className={styles.formContainer}>
                    {activeTab === 'login' ? (
                        <div className="animate-fade-in">
                            <div className={styles.banner}>
                                <Image
                                    src="/g1.png"
                                    alt="Welcome"
                                    width={48}
                                    height={48}
                                    className={styles.bannerImage}
                                />
                                <div className={styles.bannerText}>
                                    <h3>Welcome Back</h3>
                                    <p>Access your ethical career dashboard</p>
                                </div>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className={styles.roleSelection}>
                                    <button
                                        type="button"
                                        className={`${styles.roleCard} ${role === 'user' ? styles.activeRole : ''}`}
                                        onClick={() => setRole('user')}
                                    >
                                        <div className={styles.roleIcon}>
                                            <User size={20} />
                                        </div>
                                        <div className={styles.roleText}>
                                            <span>Individual</span>
                                            <p>I am looking for ethical work</p>
                                        </div>
                                        {role === 'user' && <CheckCircle size={16} className={styles.roleCheck} />}
                                    </button>

                                    <button
                                        type="button"
                                        className={`${styles.roleCard} ${role === 'company' ? styles.activeRole : ''}`}
                                        onClick={() => setRole('company')}
                                    >
                                        <div className={styles.roleIcon}>
                                            <Briefcase size={20} />
                                        </div>
                                        <div className={styles.roleText}>
                                            <span>Company</span>
                                            <p>We are hiring ethical talent</p>
                                        </div>
                                        {role === 'company' && <CheckCircle size={16} className={styles.roleCheck} />}
                                    </button>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Email Address</label>
                                    <div className={styles.inputWrapper}>
                                        <Mail size={18} className={styles.inputIcon} />
                                        <input
                                            type="email"
                                            className={styles.input}
                                            placeholder="name@halalhire.com"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.labelRow}>
                                        <label className={styles.label}>Password</label>
                                        <Link href="#" className={styles.forgotLink}>Forgot password?</Link>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <Lock size={18} className={styles.inputIcon} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={styles.input}
                                            placeholder="........"
                                        />
                                        <button
                                            type="button"
                                            className={styles.togglePassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <div
                                        className={styles.checkbox}
                                        onClick={() => setAgreed(!agreed)}
                                        style={{ background: agreed ? '#193f35' : 'transparent', borderColor: agreed ? '#193f35' : '#e0e6e2' }}
                                    >
                                        {agreed && <CheckCircle size={16} color="white" />}
                                    </div>
                                    <p className={styles.checkboxText}>
                                        I confirm my commitment to <Link href="#">Halal Employment Standards</Link> and ethical conduct within the workplace.
                                    </p>
                                </div>

                                <button type="submit" className={styles.submitBtn}>
                                    <ArrowRight size={20} /> Sign In to Account
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className={styles.banner}>
                                <div className={styles.bannerImage} style={{ background: '#193f35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Fingerprint size={24} color="#FEEE96" />
                                </div>
                                <div className={styles.bannerText}>
                                    <h3>Join HalalHire</h3>
                                    <p>Start your ethical career journey today</p>
                                </div>
                            </div>

                              <form onSubmit={(e) => e.preventDefault()}>
                                <div className={styles.roleSelection}>
                                    <button
                                        type="button"
                                        className={`${styles.roleCard} ${role === 'user' ? styles.activeRole : ''}`}
                                        onClick={() => setRole('user')}
                                    >
                                        <div className={styles.roleIcon}>
                                            <User size={20} />
                                        </div>
                                        <div className={styles.roleText}>
                                            <span>Individual</span>
                                            <p>I am looking for ethical work</p>
                                        </div>
                                        {role === 'user' && <CheckCircle size={16} className={styles.roleCheck} />}
                                    </button>

                                    <button
                                        type="button"
                                        className={`${styles.roleCard} ${role === 'company' ? styles.activeRole : ''}`}
                                        onClick={() => setRole('company')}
                                    >
                                        <div className={styles.roleIcon}>
                                            <Briefcase size={20} />
                                        </div>
                                        <div className={styles.roleText}>
                                            <span>Company</span>
                                            <p>We are hiring ethical talent</p>
                                        </div>
                                        {role === 'company' && <CheckCircle size={16} className={styles.roleCheck} />}
                                    </button>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{role === 'user' ? 'Full Name' : 'Company Name'}</label>
                                    <div className={styles.inputWrapper}>
                                        <User size={18} className={styles.inputIcon} />
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Email Address</label>
                                    <div className={styles.inputWrapper}>
                                        <Mail size={18} className={styles.inputIcon} />
                                        <input
                                            type="email"
                                            className={styles.input}
                                            placeholder="name@halalhire.com"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Password</label>
                                    <div className={styles.inputWrapper}>
                                        <Lock size={18} className={styles.inputIcon} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={styles.input}
                                            placeholder="........"
                                        />
                                        <button
                                            type="button"
                                            className={styles.togglePassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <div
                                        className={styles.checkbox}
                                        onClick={() => setAgreed(!agreed)}
                                        style={{ background: agreed ? '#193f35' : 'transparent', borderColor: agreed ? '#193f35' : '#e0e6e2' }}
                                    >
                                        {agreed && <CheckCircle size={16} color="white" />}
                                    </div>
                                    <p className={styles.checkboxText}>
                                        I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link> and commit to ethical professional standards.
                                    </p>
                                </div>

                                <Link href={role === 'company' ? "/company_on" : "/personal_info"} className={styles.submitBtn}>
                                    <User size={20} /> Create New Account
                                </Link>
                            </form>
                        </div>
                    )}
                </div>

                <footer className={styles.footer}>
                    <div className={styles.secureTag}>
                        <ShieldCheck size={14} /> Secure Encryption
                    </div>
                    <p>
                        Your data is secured with end-to-end encryption. Built on the principles of Amanah (Trust) and Sharia-compliant data privacy.
                    </p>
                </footer>
            </main>

            <div className={`${styles.externalLinks} animate-fade-in delay-3`}>
                <Link href="#" className={styles.externalLink}>Privacy Policy</Link>
                <Link href="#" className={styles.externalLink}>Terms of Service</Link>
                <Link href="#" className={styles.externalLink}>Sharia Compliance Certificate</Link>
            </div>

            <div className={`${styles.copyright} animate-fade-in delay-3`}>
                © 2026 HalalHire. Building the Global Ummah through Ethical Work.
            </div>
        </div>
    );
};

const AuthPage = () => {
    return (
        <Suspense fallback={<div className={styles.pageContainer}>Loading...</div>}>
            <AuthContent />
        </Suspense>
    );
};

export default AuthPage;