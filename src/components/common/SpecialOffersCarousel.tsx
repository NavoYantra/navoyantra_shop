import React, { useState, useEffect } from 'react';
import { Zap, Monitor, Gift, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../animations/ScrollReveal';

export const SpecialOffersCarousel: React.FC = () => {
  const [currentOfferSlide, setCurrentOfferSlide] = useState(0);

  const offers = [
    {
      tag: "Most Popular",
      title: "Exclusive Lab Setup Offer",
      description: "Get a complete base STEM Lab Setup for just ₹50,000 (without GST). Includes premium School LMS Account for all students.",
      buttonText: "Claim Offer",
      link: "/contact",
      priceText: "₹50,000",
      priceSubText: "Excl. GST",
      icon: <Zap className="w-10 h-10 text-yellow-300" />,
      gradient: "from-blue-600 to-blue-900"
    },
    {
      tag: "Special 15% Off",
      title: "LMS Subscription Discount",
      description: "Enhance your students' learning with our Learning Management System. Get a flat 15% discount on all annual LMS subscriptions.",
      buttonText: "Explore LMS",
      link: "/contact",
      priceText: "15% OFF",
      priceSubText: "ON ANNUAL PLANS",
      icon: <Monitor className="w-10 h-10 text-white" />,
      gradient: "from-orange-500 to-orange-700"
    },
    {
      tag: "Bonus Reward",
      title: "Surprise Educational Gift",
      description: "Every product purchase from NavoYantra comes with a surprise educational tech-gift inside the box to fuel student curiosity!",
      buttonText: "Shop Now",
      link: "/shop",
      priceText: "FREE GIFT",
      priceSubText: "WITH EVERY BOX",
      icon: <Gift className="w-10 h-10 text-white" />,
      gradient: "from-teal-500 to-teal-700"
    },
    {
      tag: "Shop Offer",
      title: "Store Wide Discount",
      description: "Looking for individual DIY kits or robotics hardware? Enjoy a flat 5% off on your entire cart when you purchase from our official store.",
      buttonText: "Visit Store",
      link: "/shop",
      priceText: "5% OFF",
      priceSubText: "STORE-WIDE",
      icon: <Tag className="w-10 h-10 text-white" />,
      gradient: "from-purple-500 to-purple-700"
    }
  ];

  const handleNextOffer = () => {
    setCurrentOfferSlide((prev) => (prev + 1) % offers.length);
  };

  const handlePrevOffer = () => {
    setCurrentOfferSlide((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextOffer();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-slate-950 py-24 relative overflow-hidden border-y border-slate-800/50">
      {/* Decorative dark background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

      <ScrollReveal direction="up" className="w-full mx-auto relative px-4 sm:px-6 lg:px-8 max-w-[90rem]">
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Special Offers & Promotions
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
            Take advantage of our exclusive deals to kickstart your journey.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/50 bg-slate-900 group min-h-[500px] flex items-center border border-slate-800 mx-auto">
          <div 
            className="w-full absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentOfferSlide * 100}%)` }}
        >
          {offers.map((offer, index) => (
            <div key={index} className="w-full h-full shrink-0 flex flex-col md:flex-row">
              <div className={`w-full h-full bg-gradient-to-br ${offer.gradient} text-white flex flex-col md:flex-row`}>
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                  <div className="inline-block bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6 self-start border border-white/10">
                    {offer.tag}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 leading-tight">{offer.title}</h3>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                    {offer.description}
                  </p>
                  <div>
                    <Link 
                      to={offer.link}
                      className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      {offer.buttonText}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center relative p-10">
                  {/* Decorative Circles */}
                  <div className="absolute w-[400px] h-[400px] border-[40px] border-white/10 rounded-full"></div>
                  <div className="absolute w-[300px] h-[300px] border-[30px] border-white/5 rounded-full"></div>
                  
                  {/* Price Tag */}
                  <div className="relative z-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md w-64 h-64 rounded-full border border-white/20 shadow-2xl text-center">
                    <div className="mb-4 text-white">
                      {offer.icon}
                    </div>
                    <span className="text-4xl font-black">{offer.priceText}</span>
                    <span className="text-white/80 uppercase tracking-widest text-sm mt-2 font-bold">{offer.priceSubText}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={handlePrevOffer}
          aria-label="Previous Offer" 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center rounded-full text-white transition-all z-20 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNextOffer}
          aria-label="Next Offer" 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center rounded-full text-white transition-all z-20 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
          {offers.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentOfferSlide(index)}
              aria-label={`Go to offer ${index + 1}`} 
              className={`h-3 rounded-full transition-all duration-300 ${currentOfferSlide === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-3'}`}
            ></button>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
};
