import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { OffersSection } from '../components/home/OffersSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { InstitutionalSection } from '../components/home/InstitutionalSection';
import { LearningResourcesSection } from '../components/home/LearningResourcesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { SEO } from '../components/SEO';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <SEO 
        title="Robotics Kits, STEM Products & Lab Setup Solutions | NavoYantra"
        description="Buy robotics kits, STEM kits, Arduino, IoT, AI and electronics components online. Explore complete robotics, AI, IoT and STEM lab setup solutions for schools and institutions."
        keywords="DIY robotic, Labsetup, Robotics for kids, Atal Tinkering Lab equipment, School Lab Setup, STEM learning, AI Kits, IoT projects"
      />
      <HeroSection />
      <FeaturedCategories />
      <NewArrivalsSection />
      <OffersSection />
      <FeaturedProductsSection />
      <BestSellersSection />
      <WhyChooseSection />
      <InstitutionalSection />
      <LearningResourcesSection />
      <TestimonialsSection />
      <PartnersSection />
      <NewsletterSection />
    </div>
  );
};
