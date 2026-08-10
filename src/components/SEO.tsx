import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  image = '/favicon.png', // Fallback to logo
  url = 'https://navoyantra.com' // Fallback domain
}) => {
  const defaultTitle = "NavoYantra | Best DIY Robotics Kits, STEM Education & Labsetup in India";
  const defaultDescription = "Shop premium DIY Robotic Kits, AI, IoT projects, and STEM education tools at NavoYantra. We provide complete Atal Tinkering Lab (ATL) and School Lab Setup solutions in India. Top quality robotics for kids and engineering students.";
  const defaultKeywords = "NavoYantra, DIY robotic, Labsetup, Robotics for kids, STEM Education India, AI Kits, IoT projects, School Lab Setup, Atal Tinkering Lab equipment, Robotics Kits, Electronics Components, Navayantra shop";

  const seoTitle = title ? `${title} | NavoYantra Robotics` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />

      {/* OpenGraph / Social Media Metadata */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NavoYantra" />

      {/* Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
