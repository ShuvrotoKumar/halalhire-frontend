"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./success.module.css";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams?.get("sessionId") || searchParams?.get("session_id") || "";
  
  const [amount, setAmount] = useState("0");
  const [plan, setPlan] = useState("Subscription");
  const [billing, setBilling] = useState("");

  useEffect(() => {
    let amt = searchParams?.get("amount");
    let pln = searchParams?.get("plan");
    let bln = searchParams?.get("billing");

    if (!amt || amt === "0") {
      try {
        const pendingStr = localStorage.getItem("pendingPayment");
        if (pendingStr) {
          const pending = JSON.parse(pendingStr);
          if (pending.amount !== undefined) amt = pending.amount.toString();
          if (pending.plan) pln = pending.plan;
          if (pending.billing) bln = pending.billing;
        }
      } catch (e) {
        console.error("Error reading pending payment", e);
      }
    }

    setAmount(amt || "0");
    setPlan(pln || "Subscription");
    setBilling(bln || "");
  }, [searchParams]);

  const orderNumber = sessionId
    ? `#${sessionId.slice(-8).toUpperCase()}`
    : "#--------";

  const transactionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedAmount = parseFloat(amount).toFixed(2);

  return (
    <main className={styles.page}>
      <div className={styles.card}>

        {/* Green checkmark */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M8 18.5L15 25.5L28 11"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>Payment Successful</h1>
        <p className={styles.subheading}>
          Your payment has been processed successfully.
        </p>

        {/* Total amount highlight */}
        <div className={styles.amountBadge}>
          <span className={styles.amountLabel}>Total Amount Paid</span>
          <span className={styles.amountValue}>${formattedAmount}</span>
        </div>

        {/* Order Details */}
        <div className={styles.detailsBox}>
          <h2 className={styles.detailsTitle}>Order Details</h2>
          <hr className={styles.divider} />
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Order Number</span>
              <span className={styles.detailValue}>{orderNumber}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Total Amount</span>
              <span className={styles.detailValue}>${formattedAmount}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Plan</span>
              <span className={styles.detailValue}>
                {plan}{billing ? ` – ${billing}` : ""}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Transaction Date</span>
              <span className={styles.detailValue}>{transactionDate}</span>
            </div>
          </div>
        </div>

        <button className={styles.btn} onClick={() => router.push("/")}>
          Return to Homepage
        </button>
      </div>
    </main>
  );
};

const SuccessPage = () => (
  <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f3f4f6" }} />}>
    <SuccessContent />
  </Suspense>
);

export default SuccessPage;
