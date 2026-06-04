"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./payment_success.module.css";

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams?.get("session_id") || "";
  const orderNumber = sessionId
    ? `#${sessionId.slice(-6).toUpperCase()}`
    : "#------";

  // Format today's date as "May 28, 2024" style
  const transactionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {/* Green checkmark circle */}
        <div className={styles.iconWrapper}>
          <svg
            className={styles.checkIcon}
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="26" cy="26" r="26" fill="#22c55e" />
            <path
              d="M14 27L22 35L38 19"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>Payment Successful</h1>
        <p className={styles.subheading}>
          Your payment has been processed successfully.
        </p>

        {/* Order Details Box */}
        <div className={styles.detailsBox}>
          <h2 className={styles.detailsTitle}>Order Details</h2>
          <hr className={styles.divider} />

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Order Number</span>
              <span className={styles.detailValue}>{orderNumber}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Transaction Date</span>
              <span className={styles.detailValue}>{transactionDate}</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          className={styles.btn}
          onClick={() => router.push("/")}
        >
          Return to Homepage
        </button>
      </div>
    </main>
  );
};

const PaymentSuccessPage = () => (
  <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
    <PaymentSuccessContent />
  </Suspense>
);

export default PaymentSuccessPage;
