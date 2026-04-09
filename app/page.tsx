import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Process from './components/Process/Process';
import FeaturedJobs from './components/FeaturedJobs/FeaturedJobs';
import Industries from './components/Industries/Industries';
import Ethics from './components/Ethics/Ethics';
// import FAQ from './components/FAQ/FAQ';
import Feedback from './components/Feedback/Feedback';
import Footer from './components/Footer/Footer';
import ResourcesFAQ from './resources/components/FAQ/ResourcesFAQ';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Process />
        <FeaturedJobs />
        <Industries />
        <Ethics />
        <ResourcesFAQ />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
