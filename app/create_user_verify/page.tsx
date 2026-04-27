'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyUserMutation } from '@/redux/api/authApi';
import styles from './CreateUserVerify.module.css';
import { ShieldCheck, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

const VerifyContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [verifyUser, { isLoading }] = useVerifyUserMutation();

    useEffect(() => {
        if (!email) {
            // setError('Email is missing. Please try registering again.');
        }
    }, [email]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);

        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            setError('Please enter the full 6-digit code.');
            return;
        }

        try {
            await verifyUser({ email, verificationCode: otpCode }).unwrap();
            setSuccess(true);
            setTimeout(() => {
                router.push('/auth?mode=login');
            }, 2000);
        } catch (err: any) {
            console.error('Verification failed:', err);
            setError(err.data?.message || err.message || 'Invalid verification code. Please try again.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <Image src="/logo.png" alt="HalalHire Logo" width={140} height={48} style={{ objectFit: 'contain' }} />
                    </Link>
                </div>
                     <h1>Verify Your Account</h1>   
                <p>We&apos;ve sent a 6-digit verification code to <span style={{ color: '#193f35', fontWeight: 700 }}>{email || 'your email'}</span></p>
            </div>

            <div className={styles.verifyCard}>
                {success ? (
                    <div className={styles.successMsg}>
                        <CheckCircle2 size={20} />
                        Account verified successfully! Redirecting to login...
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className={styles.errorMsg}>
                                <ShieldCheck size={20} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleVerify}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Enter 6-Digit Code</label>
                                <div className={styles.otpContainer}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className={styles.otpInput}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={isLoading || otp.some(d => !d)}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify Account'
                                )}
                            </button>
                        </form>

                        <div className={styles.resendRow}>
                            <p className={styles.resendText}>
                                Didn&apos;t receive the code?
                                <button className={styles.resendBtn}>Resend Code</button>
                            </p>
                        </div>
                    </>
                )}
            </div>

            <Link href="/auth" style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: '#6da085', fontSize: '14px', fontWeight: 500 }}>
                <ArrowLeft size={16} /> Back to Registration
            </Link>
        </div>
    );
};

const VerifyPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
};

export default VerifyPage;