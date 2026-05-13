import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import CompaniesHero from './components/CompaniesHero/CompaniesHero';
import FeaturedCompanies from './components/FeaturedCompanies/FeaturedCompanies';
import BrowseCompanies from './components/BrowseCompanies/BrowseCompanies';

const CompaniesPage = () => {
    return (
        <main>
            <Navbar />
            <CompaniesHero />
            {/* <FeaturedCompanies /> */}
            <BrowseCompanies />
            <Footer />
        </main>
    );
};

export default CompaniesPage;