import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  School, CheckCircle2, Sparkles, Send, Award, FileText, ChevronRight 
} from 'lucide-react';

export const LabSetupPage: React.FC = () => {
  const { setIsQuoteModalOpen, showToast } = useApp();

  const [formState, setFormState] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    labType: 'Standard Atal Tinkering Lab (ATL)',
    studentsCount: 100
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Quote request submitted! Our STEM Lab team will contact you within 24 hours.', 'success');
    setFormState({
      schoolName: '',
      contactName: '',
      email: '',
      phone: '',
      city: '',
      labType: 'Standard Atal Tinkering Lab (ATL)',
      studentsCount: 100
    });
  };

  const labCategories = [
    {
      id: 'atl',
      title: 'Atal Tinkering Labs (ATL)',
      desc: 'NITI Aayog compliant STEM labs designed for K-12 innovation and prototyping.',
      packages: [
        {
          name: 'ATL Basic / Foundation',
          target: 'Smaller Schools (Up to 20 Students)',
          price: '₹1,99,999',
          badge: 'NITI Aayog Phase 1',
          color: 'border-orange-200 bg-orange-50/40 hover:border-orange-400 hover:shadow-orange-500/10',
          badgeColor: 'bg-orange-100 text-orange-700',
          items: [
            '5x NavoBot Entry Rovers',
            'IoT Basics & 3D Pen Set',
            'Full Component Chest',
            'Printed Curriculum',
            '1-Day Workshop'
          ]
        },
        {
          name: 'ATL Standard (Recommended)',
          target: 'High Schools (30-60 Students)',
          price: '₹2,99,999',
          badge: 'NITI Aayog Phase 2',
          color: 'border-orange-400 bg-orange-50 hover:border-orange-500 hover:shadow-orange-500/20',
          badgeColor: 'bg-orange-500 text-white',
          items: [
            '10x NavoBot Pro V4 AI Rovers',
            '1x Desktop 3D Printer',
            'IoT Climate & Smart Home Packs',
            '300+ Sensors Chest',
            '2-Day Faculty Workshop'
          ]
        },
        {
          name: 'ATL Advanced Innovation',
          target: 'Large Schools & ATL Hubs',
          price: '₹4,99,999',
          badge: 'Premium Equipment',
          color: 'border-orange-300 bg-orange-50/40 hover:border-orange-400 hover:shadow-orange-500/10',
          badgeColor: 'bg-orange-600 text-white',
          items: [
            '15x NavoBot AI Rovers',
            '2x 3D Printers & 1x Laser Engraver',
            'AI Vision Lab with Raspberry Pi',
            'Drone Autonomy Starter Kit',
            'Annual Exhibition Support'
          ]
        }
      ]
    },
    {
      id: 'robotics',
      title: 'Robotics & AI Labs',
      desc: 'Dedicated specialized laboratories for coding, machine learning, and advanced robotics.',
      packages: [
        {
          name: 'Primary STEM Starter',
          target: 'Primary & Middle Schools',
          price: '₹99,999',
          badge: 'For Ages 8-12',
          color: 'border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:shadow-blue-500/10',
          badgeColor: 'bg-blue-100 text-blue-700',
          items: [
            '10x Magnetic Snap Block Kits',
            '5x Arduino Uno Sensor Packs',
            'Scratch/Block Coding Guide',
            'Fun Electronic Modules',
            '1-Day On-Site Workshop'
          ]
        },
        {
          name: 'AI & Machine Learning Hub',
          target: 'High Schools & Coding Clubs',
          price: '₹2,49,999',
          badge: 'Python & OpenCV',
          color: 'border-blue-400 bg-blue-50 hover:border-blue-500 hover:shadow-blue-500/20',
          badgeColor: 'bg-blue-500 text-white',
          items: [
            '10x NavoPi Edge Vision Centers',
            'Raspberry Pi 4 / 5 Clusters',
            'Face Tracking & Gesture AI Kits',
            'Computer Vision Curriculum',
            '2-Day Faculty Certification'
          ]
        },
        {
          name: 'College ROS Engineering Lab',
          target: 'Colleges & Senior Secondary',
          price: '₹5,99,999',
          badge: 'Engineering Grade',
          color: 'border-blue-300 bg-blue-50/40 hover:border-blue-400 hover:shadow-blue-500/10',
          badgeColor: 'bg-blue-600 text-white',
          items: [
            '5x LiDAR Mapping Autonomous Robots',
            '5x 4-DOF Metal Gear Robotic Arms',
            'Jetson Nano AI Edge Devices',
            'Dedicated ROS / C++ Support',
            'Engineering Faculty Training'
          ]
        }
      ]
    },
    {
      id: 'drones',
      title: 'Aerospace & Drone Automation Lab',
      desc: 'Hands-on aero-modeling, quadcopter assembly, and unmanned flight training programs.',
      packages: [
        {
          name: 'Beginner Aero-Modeling',
          target: 'Middle Schools',
          price: '₹89,999',
          badge: 'Starter Drone Kit',
          color: 'border-sky-200 bg-sky-50/40 hover:border-sky-400 hover:shadow-sky-500/10',
          badgeColor: 'bg-sky-100 text-sky-700',
          items: [
            '5x Solderless Quadcopter Assembly Kits',
            'Foam Glider Aero-Kits',
            'Basic Drone Physics Guide',
            'Spare Propellers & Batteries',
            '1-Day Instructor Training'
          ]
        },
        {
          name: 'Drone Assembly & Testing',
          target: 'High Schools & Aero Clubs',
          price: '₹1,49,999',
          badge: 'Most Popular',
          color: 'border-sky-400 bg-sky-50 hover:border-sky-500 hover:shadow-sky-500/20',
          badgeColor: 'bg-sky-500 text-white',
          items: [
            '3x Advanced Drone Frames with Telemetry',
            'Flight Controller Setup Guide',
            'Flight Simulation Software Licenses',
            'Regulation & Safety Training',
            '2-Day Aero Instructor Workshop'
          ]
        },
        {
          name: 'Advanced Drone Autonomy',
          target: 'Colleges & Specialized Clubs',
          price: '₹3,49,999',
          badge: 'Autonomous Flight',
          color: 'border-sky-300 bg-sky-50/40 hover:border-sky-400 hover:shadow-sky-500/10',
          badgeColor: 'bg-sky-600 text-white',
          items: [
            '2x Pixhawk Autonomous Drones',
            '1x Fixed-Wing Survey Drone',
            'Mission Planner & ArduPilot Training',
            'Telemetry & GPS Waypoint Setup',
            'Drone Data Analytics Module'
          ]
        }
      ]
    }
  ];

  const pastSetups = [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80'
  ];

  const reviews = [
    {
      name: 'Dr. Anita Sharma',
      role: 'Principal, DPS Bangalore',
      review: 'NavoYantra completely transformed our ATL space. The equipment quality is top-notch, and their 2-day faculty training ensured our teachers were confident in guiding the students from day one.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Director of Innovation, TechWorld Int.',
      review: 'The AI & ROS Lab package was exactly what our college needed. The Jetson Nano integration and LiDAR rovers have given our engineering students hands-on exposure to real-world autonomous systems.',
      rating: 5
    },
    {
      name: 'Sunita Menon',
      role: 'Head of Science, Greenfield School',
      review: 'The Drone & Aerospace modeling setup is a huge hit among our 9th graders. The support team is incredibly responsive and always helps us prepare for regional science exhibitions.',
      rating: 5
    }
  ];

  return (
    <div className="py-12 bg-[#F6F7F9] min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold">
            <School className="w-4 h-4" />
            <span>NITI AAYOG & CBSE ALIGNED STEM LABS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-slate-900 tracking-tight">
            Turnkey STEM & Atal Tinkering Lab Setup
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            We provide end-to-end laboratory installation, CBSE-aligned K-12 robotics curriculum, certified teacher workshops, and 2-year institutional hardware warranties for schools across India.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>Get Custom Quotation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <a
              href="/brochure.pdf"
              download
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>Download Brochure</span>
            </a>
          </div>
        </div>

        {/* Categories and Packages */}
        <div className="mt-16 space-y-20">
          {labCategories.map((category) => (
            <div key={category.id} className="space-y-8">
              {/* Category Header */}
              <div className="text-center sm:text-left border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold font-heading text-slate-900">{category.title}</h2>
                <p className="text-sm text-slate-600 mt-2">{category.desc}</p>
              </div>

              {/* Category Packages */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {category.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`rounded-3xl p-8 border-2 ${pkg.color} bg-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300`}
                  >
                    <div className="space-y-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide inline-block ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </span>

                      <h3 className="text-2xl font-extrabold font-heading text-slate-900">
                        {pkg.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">{pkg.target}</p>

                      <div className="pt-2">
                        <span className="text-3xl font-extrabold text-blue-600 font-heading">{pkg.price}</span>
                        <span className="text-xs text-slate-400 block font-medium mt-1">All-inclusive turnkey setup package</span>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Included Equipment & Services:</span>
                        <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                          {pkg.items.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors text-center"
                    >
                      Request Quote For This Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Past Lab Setups - Animated Marquee */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">Past Lab Installations</h2>
            <p className="text-sm text-slate-600 mt-2">Glimpses of modern STEM & Robotics labs successfully set up across India.</p>
          </div>
          
          <div className="relative w-full overflow-hidden flex space-x-6 py-4">
            <div className="flex space-x-6 animate-marquee hover:pause-animation whitespace-nowrap min-w-full">
              {[...pastSetups, ...pastSetups].map((img, idx) => (
                <div key={idx} className="w-72 h-48 sm:w-96 sm:h-64 flex-none rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                  <img src={img} alt={`Lab Setup ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">What Institutions Say</h2>
            <p className="text-sm text-slate-600 mt-2">Trusted by 500+ schools, colleges, and EdTech centers.</p>
          </div>

          <div className="relative w-full overflow-hidden flex space-x-6 py-4">
            <div className="flex space-x-6 animate-marquee hover:pause-animation min-w-full group">
              {[...reviews, ...reviews, ...reviews].map((rev, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative w-80 sm:w-96 flex-none hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Award className="w-16 h-16 text-blue-600" />
                  </div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-6">"{rev.review}"</p>
                  <div>
                    <h4 className="font-extrabold text-slate-900">{rev.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">{rev.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instant Quote Form */}
        <div className="mt-20 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT INSTITUTIONAL INQUIRY</span>
              </div>
              <h2 className="text-3xl font-bold font-heading">
                Ready to transform your school's STEM & Robotics room?
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fill out the quick inquiry form to receive our official lab equipment prospectus, CBSE curriculum matrix, and custom price estimate within 24 hours.
              </p>
              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <p>📞 Telephonic Consultation: +91 (080) 4567-8900</p>
                <p>✉ B2B Email: labsetup@navoyantra.com</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-800/90 p-6 sm:p-8 rounded-2xl border border-slate-700">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">School / College Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS Bengaluru"
                      value={formState.schoolName}
                      onChange={e => setFormState({ ...formState, schoolName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Principal / Coordinator"
                      value={formState.contactName}
                      onChange={e => setFormState({ ...formState, contactName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.edu.in"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Lab Quotation Request</span>
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
