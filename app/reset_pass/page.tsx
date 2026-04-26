'use client';

import React, { useState, useEffect } from 'react';
import styles from './ResetPass.module.css';
import { Lock, Eye, EyeOff, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        
        setIsLoading(true);
        // Simulate password reset
        setTimeout(() => {
            setIsLoading(false);
            setShowModal(true);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                router.push('/auth?mode=login');
            }, 2000);
        }, 1500);
    };

    const requirements = [
        { text: 'At least 8 characters long', met: password.length >= 8 },
        { text: 'Contains a number or symbol', met: /[0-9!@#$%^&*]/.test(password) },
    ];

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1>New Credentials</h1>
                <p>Secure your account with a strong new password</p>
            </header>

            <div className={styles.authCard}>
                <div className={styles.formContainer}>
                    <div className={styles.banner}>
                        <div className={styles.bannerIcon}>
                            <ShieldCheck size={24} />
                        </div>
                        <div className={styles.bannerText}>
                            <h3>Secure Update</h3>
                            <p>Choose a password that you haven't used before</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>New Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={styles.input}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Confirm Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={styles.input}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.passwordRequirements}>
                            {requirements.map((req, i) => (
                                <div key={i} className={`${styles.requirement} ${req.met ? styles.met : ''}`}>
                                    <CheckCircle2 size={14} opacity={req.met ? 1 : 0.3} />
                                    <span>{req.text}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            type="submit" 
                            className={styles.submitBtn}
                            disabled={isLoading || password !== confirmPassword || password.length < 8}
                        >
                            {isLoading ? 'Updating...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalIcon}>
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className={styles.modalTitle}>Update Successful</h2>
                        <p className={styles.modalText}>
                            Your password has been reset successfully. Redirecting you to the secure login portal...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordPage;