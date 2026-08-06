import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, Phone, Mail, MapPin, ShieldCheck, Heart, 
  Sun, Moon, ArrowUp, ExternalLink 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme, toggleTheme, setIsQuoteModalOpen, setFilters } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                  Navo<span className="text-blue-400">Yantra</span>
                </span>
                <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-widest leading-none">
                  Technology & Robotics
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NavoYantra Technology is India's leading EdTech & Robotics innovation enterprise. We design, manufacture, and deliver CBSE & ATL-aligned STEM kits, AI vision labs, and IoT smart devices for kids, schools, and colleges across India.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>NavoYantra Innovation Hub, Indiranagar, Bengaluru, KA 560038, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Helpdesk: +91 (080) 4567-8900 | WhatsApp: +91 98765-43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@navoyantra.com | B2B: labsetup@navoyantra.com</span>
              </div>
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
              <li><a href="#why-choose" className="hover:text-white transition-colors">1-Year Hardware Warranty</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Free Video & Code Downloads</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Track Order: Enter Order ID sent on SMS"); }} className="hover:text-white transition-colors">Track Your Shipment</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Return & Replacement Policy: 7 Days Easy Returns"); }} className="hover:text-white transition-colors">7-Day Replacement Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: SSL 256-bit encrypted data protection"); }} className="hover:text-white transition-colors">Privacy Policy & Terms</a></li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Accepted Payment Methods:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-extrabold text-blue-400">UPI / GPay</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-extrabold text-orange-400">RuPay</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-extrabold text-white">Visa</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-extrabold text-white">Mastercard</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-extrabold text-emerald-400">COD Available</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} NavoYantra Technology Pvt. Ltd. All Rights Reserved.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
