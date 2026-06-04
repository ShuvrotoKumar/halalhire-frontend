"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./cancel.module.css";

const CancelPage = () => {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <div className={styles.card}>

        {/* Red X icon */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M11 11L25 25M25 11L11 25"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>Payment Cancelled</h1>
        <p className={styles.subheading}>
          Your payment was not completed. No charges have been made to your account.
        </p>

        {/* Info box */}
        <div className={styles.detailsBox}>
          <h2 className={styles.detailsTitle}>What Happened?</h2>
          <hr className={styles.divider} />
          <ul className={styles.reasonList}>
            <li>You cancelled the payment process</li>
            <li>Your subscription was not activated</li>
            <li>You can try again anytime from the plans page</li>
          </ul>
        </div>

        <div className={styles.btnGroup}>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/company_subscription")}
          >
            Try Again
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => router.push("/")}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </main>
  );
};

export default CancelPage;
