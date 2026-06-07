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
import { useDispatch } from 'react-redux';
import { setBasicInfo } from '@/redux/Slice/registrationSlice';
import { useLogInMutation } from '@/redux/api/authApi';
import { setUser as reduxSetUser } from '@/redux/Slice/authSlice';

const AuthContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [role, setRole] = useState<'user' | 'company'>('user');
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    
    // Registration form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    
    const dispatch = useDispatch();
    const [logIn, { isLoading: isLoggingIn }] = useLogInMutation();

    const decodeJwtPayload = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
                base64 += '=';
            }
            return JSON.parse(atob(base64));
        } catch {
            return null;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        
        if (!email || !password) {
            setLoginError('Please enter both email and password.');
            return;
        }
        
        try {
            const response = await logIn({ email, password }).unwrap();
            
            const token = response?.data?.token || response?.token || response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken || response?.refreshToken;
            
            let user = response?.data?.user || response?.user;

            // If user object doesn't have role explicitly but token exists, decode token to get role
            if (!user?.role && token) {
                const decoded = decodeJwtPayload(token);
                if (decoded?.role) {
                    user = { ...user, role: decoded.role };
                } else if (decoded?.user?.role) {
                    user = { ...user, role: decoded.user.role };
                }
            }

            // Fallback if user is still not available
            if (!user) user = { email, role };
            
            // Validate the selected role matches the user's actual role
            if (user?.role && user.role !== role) {
                setLoginError(`Incorrect role selected. Please login as ${user.role === 'company' ? 'Company' : 'Individual'}.`);
                return;
            }
            
            if (token) {
                localStorage.setItem('token', token);
            }
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            
            // Dispatch to Redux to update Navbar and other components
            dispatch(reduxSetUser({
                user: user,
                token: token
            }));
            
            router.push('/');
        } catch (err: any) {
            console.error('Login failed:', err);
            setLoginError(err?.data?.message || 'Invalid email or password. Please try again.');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError(null);
        
        if (!agreed) {
            setRegisterError('Please agree to the terms to continue');
            return;
        }
        
        try {
            // Save to Redux instead of calling API
            dispatch(setBasicInfo({ name, email, password, role }));
            
            // Navigate to onboarding flow
            router.push(role === 'company' ? '/company_on' : '/personal_info');
        } catch (err: unknown) {
            console.error('Registration failed:', err);
            const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
            setRegisterError(errorMessage);
        }
    };

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'login' || mode === 'register') {
            // Use requestAnimationFrame to avoid synchronous setState warning
            requestAnimationFrame(() => {
                setActiveTab(mode as 'login' | 'register');
            });
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.labelRow}>
                                        <label className={styles.label}>Password</label>
                                        <Link href="/forgot_pass" className={styles.forgotLink}>Forgot password?</Link>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <Lock size={18} className={styles.inputIcon} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={styles.input}
                                            placeholder="........"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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

                                {loginError && <div className={styles.errorMsg}>{loginError}</div>}
                                
                                <button 
                                    type="submit" 
                                    className={styles.submitBtn}
                                    disabled={isLoggingIn}
                                    style={{ opacity: isLoggingIn ? 0.7 : 1 }}
                                >
                                    {isLoggingIn ? 'Logging in...' : <><ArrowRight size={20} /> Sign In to Account</>}
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

                              <form onSubmit={handleRegister}>
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

                                {registerError && (
                                    <div className={styles.errorMessage} style={{ color: '#e74c3c', marginBottom: '10px', fontSize: '14px' }}>
                                        {registerError}
                                    </div>
                                )}

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>{role === 'user' ? 'Full Name' : 'Company Name'}</label>
                                    <div className={styles.inputWrapper}>
                                        <User size={18} className={styles.inputIcon} />
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
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

                                <button 
                                    type="submit" 
                                    className={styles.submitBtn}
                                >
                                    <User size={20} /> Create New Account
                                </button>
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