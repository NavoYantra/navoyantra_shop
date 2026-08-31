import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { ComponentsSection } from '../components/home/ComponentsSection';
import { OffersSection } from '../components/home/OffersSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { InstitutionalSection } from '../components/home/InstitutionalSection';
import { LearningResourcesSection } from '../components/home/LearningResourcesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { SpecialOffersCarousel } from '../components/common/SpecialOffersCarousel';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <SEO 
        title="Robotics Kits, STEM Products & Lab Setup Solutions | NavoYantra"
        description="Buy robotics kits, STEM kits, Arduino, IoT, AI and electronics components online. Explore complete robotics, AI, IoT and STEM lab setup solutions for schools and institutions."
        keywords="DIY robotic, Labsetup, Robotics for kids, Atal Tinkering Lab equipment, School Lab Setup, STEM learning, AI Kits, IoT projects"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NavoYantra",
            "url": "https://navoyantra.com",
            "logo": "https://navoyantra.com/favicon.png",
            "description": "Best DIY Robotics Kits, STEM Education & Labsetup in India",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9999999999", // Ensure client updates actual phone
              "contactType": "customer service"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://navoyantra.com",
            "name": "NavoYantra Shop",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://navoyantra.com/shop?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      <ScrollReveal><HeroSection /></ScrollReveal>
      <ScrollReveal delay={0.2}><FeaturedCategories /></ScrollReveal>
      <ScrollReveal direction="left"><NewArrivalsSection /></ScrollReveal>
      <ScrollReveal direction="right"><ComponentsSection /></ScrollReveal>
      <ScrollReveal><OffersSection /></ScrollReveal>
      <ScrollReveal><FeaturedProductsSection /></ScrollReveal>
      <ScrollReveal direction="up"><WhyChooseSection /></ScrollReveal>
      <SpecialOffersCarousel />
      <ScrollReveal><InstitutionalSection /></ScrollReveal>
      <ScrollReveal><LearningResourcesSection /></ScrollReveal>
      <ScrollReveal><TestimonialsSection /></ScrollReveal>
      <ScrollReveal direction="none"><PartnersSection /></ScrollReveal>
      <ScrollReveal direction="up"><NewsletterSection /></ScrollReveal>
    </div>
  );
};
