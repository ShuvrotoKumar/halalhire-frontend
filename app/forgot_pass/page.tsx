'use client';

import React, { useState } from 'react';
import styles from './ForgotPass.module.css';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/redux/api/authApi';

const ForgotPassPage = () => {
    const [email, setEmail] = useState('');
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        
        try {
            await forgotPassword({ email }).unwrap();
            router.push('/forgot_code');
        } catch (err: any) {
            console.error('Failed to send recovery code:', err);
            setErrorMsg(err?.data?.message || 'Failed to send recovery code. Please try again.');
        }
    };

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
                            {errorMsg && (
                                <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>
                                    {errorMsg}
                                </p>
                            )}
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