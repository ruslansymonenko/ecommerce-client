import React from 'react';
import Hero from '../components/Hero.jsx';
import LatestCollections from '../components/LatestCollections.jsx';
import BestSeller from '../components/BestSeller.jsx';
import OurPolicy from '../components/OurPolicy.jsx';
import NewsletterBox from '../components/NewsletterBox.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
