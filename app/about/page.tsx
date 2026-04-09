import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import AboutHero from './components/AboutHero/AboutHero';
import MissionPhilosophy from './components/MissionPhilosophy/MissionPhilosophy';
import HalalEmployment from './components/HalalEmployment/HalalEmployment';
import GlobalVision from './components/GlobalVision/GlobalVision';
import ComplianceBoard from './components/ComplianceBoard/ComplianceBoard';
import PoweredBy from './components/PoweredBy/PoweredBy';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                <AboutHero />
                <MissionPhilosophy />
                <HalalEmployment />
                <GlobalVision />
                <ComplianceBoard />
                <PoweredBy />
            </main>
            <Footer />
        </>
    );
}