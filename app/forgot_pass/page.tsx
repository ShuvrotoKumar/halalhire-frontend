'use client';

import React, { useState } from 'react';
import styles from './ForgotPass.module.css';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForgotPassPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/forgot_code');
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.authCard}>
                    <div className={styles.formContainer}>
                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>
                                <CheckCircle2 size={40} />
                            </div>
                            <h2>Check Your Email</h2>
                            <p>
                                We've sent a password reset link to <strong>{email}</strong>. 
                                Please check your inbox and follow the instructions.
                            </p>
                            <button 
                                className={styles.submitBtn}
                                onClick={() => router.push('/auth?mode=login')}
                            >
                                <ArrowLeft size={18} /> Back to Login
                            </button>
                            <p style={{ marginTop: '20px', fontSize: '13px', color: '#6da085' }}>
                                Didn't receive the email? <button onClick={() => setIsSubmitted(false)} style={{ background: 'none', border: 'none', color: '#193f35', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Try again</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1>Account Recovery</h1>
                <p>Restore access to your ethical professional portal</p>
            </header>

            <div className={styles.authCard}>
                <div className={styles.formContainer}>
                    <div className={styles.banner}>
                        <div className={styles.bannerIcon}>
                            <KeyRound size={24} />
                        </div>
                        <div className={styles.bannerText}>
                            <h3>Reset Password</h3>
                            <p>Enter your email to receive a recovery Code</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address</label>
                            <div className={styles.inputWrapper}>
                                <Mail size={18} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : (
                                <>
                                    <Send size={18} /> Send Recovery Code
                                </>
                            )}
                        </button>
                    </form>

                    <Link href="/auth?mode=login" className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassPage;