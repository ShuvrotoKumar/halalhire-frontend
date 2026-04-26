'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ForgotCode.module.css';
import { ShieldCheck, ArrowLeft, Timer, CheckCircle2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useVerifyEmailMutation } from '@/redux/api/authApi';

const VerifyCodePage = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(59);
    const [errorMsg, setErrorMsg] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        const fullCode = code.join('');
        if (fullCode.length < 6) return;
        
        try {
            await verifyEmail({ verificationCode: fullCode }).unwrap();
            router.push('/reset_pass');
        } catch (err: any) {
            console.error('Failed to verify code:', err);
            setErrorMsg(err?.data?.message || 'Invalid verification code. Please try again.');
        }
    };

    const handleResend = () => {
        setTimer(59);
        // Simulate resend logic
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1>Verify Your Identity</h1>
                <p>Enter the security code sent to your email</p>
            </header>

            <div className={styles.authCard}>
                <div className={styles.formContainer}>
                    <div className={styles.banner}>
                        <div className={styles.bannerIcon}>
                            <ShieldCheck size={24} />
                        </div>
                        <div className={styles.bannerText}>
                            <h3>Security Code</h3>
                            <p>Protecting your account with two-factor verification</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.codeInputWrapper}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    className={styles.codeInput}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    placeholder="•"
                                    maxLength={1}
                                    required
                                />
                            ))}
                        </div>

                        {errorMsg && (
                            <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '16px', textAlign: 'center' }}>
                                {errorMsg}
                            </p>
                        )}

                        <button 
                            type="submit" 
                            className={styles.submitBtn}
                            disabled={isLoading || code.join('').length < 6}
                        >
                            {isLoading ? 'Verifying...' : (
                                <>
                                    <CheckCircle2 size={18} /> Verify & Continue
                                </>
                            )}
                        </button>
                    </form>

                    <div className={styles.resendRow}>
                        <p className={styles.resendText}>
                            <Timer size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                            Resend code in 0:{timer < 10 ? `0${timer}` : timer}
                        </p>
                        <button 
                            className={styles.resendBtn} 
                            onClick={handleResend}
                            disabled={timer > 0}
                        >
                            <RefreshCw size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                            Resend Verification Code
                        </button>
                    </div>

                    <Link href="/forgot_pass" className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Recovery
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodePage;
