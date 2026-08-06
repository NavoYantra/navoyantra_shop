import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { OffersSection } from '../components/home/OffersSection';
import { ShopByAgeSection } from '../components/home/ShopByAgeSection';
import { ShopByTechSection } from '../components/home/ShopByTechSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { InstitutionalSection } from '../components/home/InstitutionalSection';
import { LearningResourcesSection } from '../components/home/LearningResourcesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturedCategories />
      <OffersSection />
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
