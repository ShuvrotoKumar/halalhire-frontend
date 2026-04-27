import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ContactHero from './components/ContactHero/ContactHero';
import ContactForm from './components/ContactForm/ContactForm';
import ContactSidebar from './components/ContactSidebar/ContactSidebar';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        <ContactHero />

        <div className="container">
          <div className={styles.grid}>
            {/* Left Column: Form */}
            <div className={styles.leftColumn}>
              <ContactForm />
            </div>

            {/* Right Column: Sidebar & Map */}
            <div className={styles.rightColumn}>
              <ContactSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
