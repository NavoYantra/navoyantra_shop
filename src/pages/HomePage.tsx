import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { OffersSection } from '../components/home/OffersSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { ShopByAgeSection } from '../components/home/ShopByAgeSection';
import { ShopByTechSection } from '../components/home/ShopByTechSection';
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
        title="India's Best DIY Robotics Kits & Labsetup"
        description="NavoYantra provides the best DIY robotic kits for kids, students, and engineers in India. Explore our labsetup solutions for schools, Atal Tinkering Labs (ATL), AI education, and IoT projects."
        keywords="DIY robotic, Labsetup, Robotics for kids, Atal Tinkering Lab equipment, School Lab Setup, STEM learning, AI Kits, IoT projects"
      />
      <HeroSection />
      <FeaturedCategories />
      <NewArrivalsSection />
      <OffersSection />
      <FeaturedProductsSection />
      <ShopByAgeSection />
      <ShopByTechSection />
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
