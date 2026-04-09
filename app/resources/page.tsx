import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ResourcesHero from './components/ResourcesHero/ResourcesHero';
import EmploymentStandards from './components/EmploymentStandards/EmploymentStandards';
import LegalFramework from './components/LegalFramework/LegalFramework';
import ResourcesGetStarted from './components/GetStarted/ResourcesGetStarted';
import ResourcesFAQ from './components/FAQ/ResourcesFAQ';
import Feedback from '../components/Feedback/Feedback';
import SupportSection from './components/SupportSection/SupportSection';

export default function ResourcesPage() {
    return (
        <>
            <Navbar />
            <main>
                <ResourcesHero />
                <EmploymentStandards />
                <LegalFramework />
                <ResourcesGetStarted />
                <ResourcesFAQ />
                <Feedback />
                <SupportSection />
            </main>
            <Footer />
        </>
    );
}