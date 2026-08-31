import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, Mail, MapPin,    
} from 'lucide-react';
import { SocialLinks } from '../common/SocialLinks';

export const Footer: React.FC = () => {
  const { setIsQuoteModalOpen, setFilters } = useApp();

  const handleCategoryFilter = (cat: any) => {
    setFilters(prev => ({ ...prev, selectedCategories: [cat] }));
    const sec = document.getElementById('featured-kits');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center space-x-3 group">
              <img 
                src="/NavoYAntra%20shop%20logo.png" 
                alt="NavoYantra Technology" 
                className="h-16 sm:h-20 object-contain group-hover:scale-105 transition-transform brightness-0 invert" 
              />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NavoYantra Technology is India's leading EdTech & Robotics innovation enterprise. We design, manufacture, and deliver CBSE & ATL-aligned STEM kits, AI vision labs, and IoT smart devices for kids, schools, and colleges across India.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>1/10726-A KH No. 1622/62, Gali No. 2, Subhash Park, Naveen Shahdara, Delhi - 110032</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Helpline: +91 9582528010 | Mob/WA: +91 8796599974</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@navoyantra.com</span>
              </div>
            </div>

            <div className="pt-4">
              <SocialLinks className="text-slate-400" iconClassName="w-4 h-4 hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              STEM Hardware Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleCategoryFilter('Robotics')} className="hover:text-blue-400 transition-colors">
                  Autonomous Robotics & Rovers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('AI & Machine Learning')} className="hover:text-blue-400 transition-colors">
                  AI & Computer Vision Labs
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('IoT & Smart Home')} className="hover:text-blue-400 transition-colors">
                  IoT & Smart City Devices
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('Embedded Systems')} className="hover:text-blue-400 transition-colors">
                  Arduino & ESP32 Starter Kits
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('STEM Starter')} className="hover:text-blue-400 transition-colors">
                  Kids Snap Blocks (Ages 8-10)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryFilter('Drones & Automation')} className="hover:text-blue-400 transition-colors">
                  Solderless Quadcopter Drones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Shop By Age & Institution */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Age Groups & B2B
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#age-groups" className="hover:text-orange-400 transition-colors">Kids (Ages 8-10 Yrs)</a></li>
              <li><a href="#age-groups" className="hover:text-orange-400 transition-colors">Pre-Teens (Ages 11-13 Yrs)</a></li>
              <li><a href="#age-groups" className="hover:text-orange-400 transition-colors">Teens (Ages 14-16 Yrs)</a></li>
              <li><a href="#age-groups" className="hover:text-orange-400 transition-colors">College & Makers (17+ Yrs)</a></li>
              <li>
                <button onClick={() => setIsQuoteModalOpen(true)} className="text-orange-400 font-bold hover:underline">
                  Atal Tinkering Lab Setup (ATL)
                </button>
              </li>
              <li>
                <button onClick={() => setIsQuoteModalOpen(true)} className="hover:text-orange-400 transition-colors">
                  School Bulk Quotation Request
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Support & Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#why-choose" className="hover:text-white transition-colors">1-Week Warranty on Premium Products</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Free Video & Code Downloads</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Track Order: Enter Order ID sent on SMS"); }} className="hover:text-white transition-colors">Track Your Shipment</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Return & Replacement Policy: 7 Days Easy Returns"); }} className="hover:text-white transition-colors">7-Day Replacement Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: SSL 256-bit encrypted data protection"); }} className="hover:text-white transition-colors">Privacy Policy & Terms</a></li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Accepted Payment Methods:
              </span>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-4 py-2 bg-slate-900 border border-slate-700/80 rounded-md flex items-center justify-center shadow-sm h-[40px]" title="UPI">
                  <img src="https://imgs.search.brave.com/5i8nTOk_bQPbXmOHzJ-sCHfWm30Hs9-CK0d0zkkEPFc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdo/ZHByby5jb20vd3At/Y29udGVudC90aGVt/ZXMvcG5naGRwcm8v/ZG93bmxvYWQvc29j/aWFsLW1lZGlhLWFu/ZC1icmFuZHMvdXBp/LWxvZ28ucG5n" alt="UPI" className="h-5 object-contain" />
                </span>
                <span className="px-4 py-2 bg-slate-900 border border-slate-700/80 rounded-md flex items-center justify-center shadow-sm h-[40px]">
                  <img src="https://imgs.search.brave.com/0Mq4VX3CYlyyFyCy3xYH5S4SgewebxtPBKU56nQULMg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/dHlwLnVzL2ZpbGUv/cnVwYXkuc3Zn" alt="RuPay" className="h-5 object-contain" />
                </span>
                <span className="px-4 py-2 bg-slate-900 border border-slate-700/80 rounded-md flex items-center justify-center shadow-sm h-[40px]">
                  <img src="https://imgs.search.brave.com/Ju0QWmfCr1UgVDSk_Xd1ukNlQATaziauVDLJgFKjHlQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/OTc1LzU2Ny9zbWFs/bC92aXNhLWxvZ28t/dmlzYS1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="VISA" className="h-5 object-contain brightness-0 invert" />
                </span>
                <span className="px-4 py-2 bg-slate-900 border border-slate-700/80 rounded-md flex items-center justify-center space-x-2 shadow-sm h-[40px]">
                  <div className="flex -space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 mix-blend-screen opacity-90"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 mix-blend-screen opacity-90"></div>
                  </div>
                  <span className="text-[12px] font-bold text-white tracking-wide">mastercard</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} NavoYantra Technology Pvt. Ltd. All Rights Reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/admin" className="hover:text-blue-500 transition-colors">Admin Login</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
