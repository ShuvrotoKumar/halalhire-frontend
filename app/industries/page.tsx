import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import IndustriesHero from './components/IndustriesHero/IndustriesHero';
import VettedSectors from './components/VettedSectors/VettedSectors';
import EnsuringExcellence from './components/EnsuringExcellence/EnsuringExcellence';
import IndustryCTA from './components/IndustryCTA/IndustryCTA';

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustriesHero />
        <VettedSectors />
        <EnsuringExcellence />
        <IndustryCTA />
      </main>
      <Footer />
    </>
  );
}
