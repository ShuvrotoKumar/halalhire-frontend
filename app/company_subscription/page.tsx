"use client";

import React from 'react';
import styles from './company_subscription.module.css';
import { Check, ArrowRight, ShieldCheck, TrendingUp, Megaphone, UserCheck, Lock } from 'lucide-react';

const CompanySubscription = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Choose Your Plan & Post Your Job</h1>
          <p className={styles.subtitle}>
            Support ethical hiring standards with our verified talent network. Select a plan
            that fits your recruitment needs while maintaining Shariah-compliant principles.
          </p>
        </header>

        <div className={styles.mainContainer}>
          <div className={styles.pricingGrid}>
            {/* Basic Plan */}
            <div className={styles.card}>
              <h3 className={styles.planType}>Basic</h3>
              <div className={styles.priceWrapper}>
                <span className={styles.price}>$49</span>
                <span className={styles.period}>/job</span>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <Check className={styles.featureIcon} size={20} />
                  <span>30-Day Job Posting</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.featureIcon} size={20} />
                  <span>Email Support</span>
                </li>
              </ul>
              <button className={styles.selectBtn}>Select Plan</button>
            </div>

            {/* Professional Plan */}
            <div className={`${styles.card} ${styles.highlightedCard}`}>
              <div className={styles.badge}>Most Popular</div>
              <h3 className={styles.planType}>Professional</h3>
              <div className={styles.priceWrapper}>
                <span className={styles.price}>$149</span>
                <span className={styles.period}>/job</span>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <ShieldCheck className={styles.featureIcon} size={20} />
                  <span>Halal Verified Badge</span>
                </li>
                <li className={styles.featureItem}>
                  <TrendingUp className={styles.featureIcon} size={20} />
                  <span>Priority in Search</span>
                </li>
                <li className={styles.featureItem}>
                  <Megaphone className={styles.featureIcon} size={20} />
                  <span>Featured Job Status</span>
                </li>
                <li className={styles.featureItem}>
                  <UserCheck className={styles.featureIcon} size={20} />
                  <span>Verified Candidates Only</span>
                </li>
              </ul>
              <button className={styles.currentBtn}>Current Selection</button>
            </div>

            {/* Enterprise Plan */}
            <div className={styles.card}>
              <h3 className={styles.planType}>Enterprise</h3>
              <div className={styles.priceWrapper}>
                <span className={styles.price}>$399</span>
                <span className={styles.period}>/mo</span>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <Check className={styles.featureIcon} size={20} />
                  <span>Unlimited Postings</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.featureIcon} size={20} />
                  <span>Dedicated Recruiter</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.featureIcon} size={20} />
                  <span>Employer Branding API</span>
                </li>
              </ul>
              <button className={styles.selectBtn}>Select Plan</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
            </div>
            <div className={styles.summaryBody}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryItemLabel}>Professional Plan</span>
                <span className={styles.summaryItemValue}>$149.00</span>
              </div>
              <p className={styles.summarySubtext}>Standard Single Job Post</p>
              
              <div className={styles.summaryItem}>
                <span className={styles.summaryItemLabel}>Halal Verification Processing</span>
                <span className={styles.summaryItemValue}>Included</span>
              </div>
              
              <div className={styles.summaryItem}>
                <span className={styles.summaryItemLabel}>Platform Fee</span>
                <span className={styles.summaryItemValue}>$0.00</span>
              </div>
              
              <div className={styles.summaryItem}>
                <span className={styles.summaryItemLabel}>Tax (0%)</span>
                <span className={styles.summaryItemValue}>$0.00</span>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.summaryItem}>
                <span className={styles.totalLabel}>Total Payable</span>
                <span className={styles.totalValue}>$149.00</span>
              </div>

              <button className={styles.checkoutBtn}>
                Continue to Payment <ArrowRight size={20} />
              </button>
              
              <p className={styles.secureText}>SAFE & SECURE CHECKOUT PROCESSING</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className={styles.infoTitle}>Ethically Vetted</h4>
              <p className={styles.infoDesc}>
                Every candidate is screened for skill and cultural alignment with ethical values.
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Lock size={24} />
            </div>
            <div>
              <h4 className={styles.infoTitle}>No Hidden Fees</h4>
              <p className={styles.infoDesc}>
                Transparent pricing with no recruitment success fees. You pay only for the posting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySubscription;
