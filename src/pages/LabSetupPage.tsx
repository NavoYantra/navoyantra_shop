import React from 'react';
import { SEO } from '../components/SEO';
import { 
  MessageSquare, PenTool, Wrench, HardDrive, GraduationCap, 
  CheckCircle2, Target, Cpu, 
  Settings, Wifi, Move3d, ShieldCheck, FileText, BrainCircuit, Plane, Building2
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollReveal';
import { SpecialOffersCarousel } from '../components/common/SpecialOffersCarousel';

export const LabSetupPage: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-12 lg:pt-20 pb-20 overflow-hidden relative">
      <SEO 
        title="STEM & Robotics Laboratory Setup for Schools & Colleges | NavoYantra"
        description="End-to-End STEM Laboratory Development. We build innovation labs tailored to your institution—not a one-size-fits-all package."
        keywords="School Robotics Lab, STEM Lab Setup, AI Lab for Schools, Institution Tech Infrastructure, NavoYantra Lab Solutions"
      />

      {/* Clean Background */}

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Hero Section */}
        <ScrollReveal className="flex flex-col items-center text-center mb-24">
          <div>
            <span className="uppercase p-2 px-8 rounded-full bg-blue-50 text-blue-600 font-bold tracking-wider text-xs border border-blue-100">
              LAB SETUP
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-heading text-slate-900 mt-8 mb-6 leading-tight">
            End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">STEM Laboratory</span> Development
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 max-w-4xl leading-relaxed font-light">
            We build innovation labs tailored to your institution—not a one-size-fits-all package. Explore our customized environments designed to inspire the next generation.
          </p>
        </ScrollReveal>
      </div>

      {/* Special Offers Section */}
      <SpecialOffersCarousel />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        {/* Our Proven Process Section */}
        <div className="mt-32 mb-32 relative">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3 block">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900">Our Proven Process</h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">A streamlined approach from ideation to execution.</p>
          </ScrollReveal>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0"></div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 relative z-10">
              
              <StaggerItem className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:shadow-blue-500/30 group-hover:ring-8 group-hover:ring-blue-50 group-hover:-translate-y-1 transition-all duration-300 mb-6 border border-slate-100 relative">
                  <MessageSquare className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-slate-50 shadow-sm">1</div>
                </div>
                <span className="font-bold font-heading text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">Consultation</span>
                <p className="text-sm text-slate-500 font-medium">Requirement gathering & space assessment</p>
              </StaggerItem>

              <StaggerItem className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:shadow-blue-500/30 group-hover:ring-8 group-hover:ring-blue-50 group-hover:-translate-y-1 transition-all duration-300 mb-6 border border-slate-100 relative">
                  <PenTool className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-slate-50 shadow-sm">2</div>
                </div>
                <span className="font-bold font-heading text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">Lab Design</span>
                <p className="text-sm text-slate-500 font-medium">Customizing curriculum & hardware</p>
              </StaggerItem>

              <StaggerItem className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:shadow-blue-500/30 group-hover:ring-8 group-hover:ring-blue-50 group-hover:-translate-y-1 transition-all duration-300 mb-6 border border-slate-100 relative">
                  <Wrench className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-slate-50 shadow-sm">3</div>
                </div>
                <span className="font-bold font-heading text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">Manufacturing</span>
                <p className="text-sm text-slate-500 font-medium">In-house production of kits</p>
              </StaggerItem>

              <StaggerItem className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:shadow-blue-500/30 group-hover:ring-8 group-hover:ring-blue-50 group-hover:-translate-y-1 transition-all duration-300 mb-6 border border-slate-100 relative">
                  <HardDrive className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-slate-50 shadow-sm">4</div>
                </div>
                <span className="font-bold font-heading text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">Installation</span>
                <p className="text-sm text-slate-500 font-medium">On-site setup & commissioning</p>
              </StaggerItem>

              <StaggerItem className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:shadow-blue-500/30 group-hover:ring-8 group-hover:ring-blue-50 group-hover:-translate-y-1 transition-all duration-300 mb-6 border border-slate-100 relative">
                  <GraduationCap className="w-8 h-8" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border-4 border-slate-50 shadow-sm">5</div>
                </div>
                <span className="font-bold font-heading text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">Training</span>
                <p className="text-sm text-slate-500 font-medium">Comprehensive teacher onboarding</p>
              </StaggerItem>

            </StaggerContainer>
          </div>
        </div>

        {/* Our Laboratory Solutions Section */}
        <div className="mb-32">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3 block">Specialized Domains</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900">Our Laboratory Solutions</h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Detailed domains designed for specialized technology education, equipping students with future-ready skills.</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            
            {/* Lab 1 */}
            <StaggerItem className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Move3d className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">STEM Foundation Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Introduce young minds to the fundamentals of Science, Technology, Engineering, and Math through interactive DIY kits and hands-on experiments.
              </p>
              <div className="space-y-4 mt-auto">
                {['Basic Electronics', 'Mechanics & Structures', 'Logic Building', 'Fun DIY Kits'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Lab 2 */}
            <StaggerItem className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Robotics & Embedded Systems Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Comprehensive lab setup for building programmable robots and embedded systems. Equip students with skills in Arduino, sensors, motors, and microcontrollers.
              </p>
              <div className="space-y-4 mt-auto">
                {['Arduino Programming', 'Motor Drivers & Sensors', 'Chassis & Mechanical Parts', 'Autonomous Bots'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Lab 3 */}
            <StaggerItem className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Artificial Intelligence Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Dedicated hardware and software setups to teach machine learning, computer vision, and data science practically.
              </p>
              <div className="space-y-4 mt-auto">
                {['Edge AI Devices', 'Computer Vision Cameras', 'ML Model Deployment', 'Python Coding'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Lab 4 */}
            <StaggerItem className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Wifi className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Internet of Things (IoT) Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Connect physical devices to the cloud. Teach students how to build smart homes, automated agriculture, and industrial IoT solutions.
              </p>
              <div className="space-y-4 mt-auto">
                {['WiFi/Bluetooth Modules', 'Cloud Dashboards', 'Smart Sensors', 'Home Automation'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Lab 5 */}
            <StaggerItem className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Plane className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Drone Innovation Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Aerodynamics, flight controllers, and programming logic combined to teach students how to build and fly their own quadcopters.
              </p>
              <div className="space-y-4 mt-auto">
                {['Drone Assembly', 'Flight Dynamics', 'RC Controllers', 'Safety Enclosures'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Lab 6 */}
            <StaggerItem className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Atal Tinkering Lab (ATL)</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Government-compliant innovation workspaces containing 3D printers, electronics, and mechanical tools as per NITI Aayog guidelines.
              </p>
              <div className="space-y-4 mt-auto">
                {['3D Printing', 'Complete ATL Packages', 'Tinkering Tools', 'Compliance Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </div>

      {/* Every NavoYantra Lab Includes Section - Full Width */}
      <div className="w-full bg-[#040b16] relative overflow-hidden py-24 lg:py-32 border-y border-slate-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6 leading-tight text-white">Every NavoYantra <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Lab Includes</span></h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-10">
              We go beyond just dropping off hardware. Our holistic approach ensures that your lab is a living ecosystem of learning, backed by continuous support, training, and curriculum.
            </p>
            <button className="hidden lg:inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300">
              Contact Us <MessageSquare className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {[
              { title: 'In-house manufactured kits', icon: <Target className="w-6 h-6 text-cyan-400" /> },
              { title: 'Installation & commissioning', icon: <Settings className="w-6 h-6 text-cyan-400" /> },
              { title: 'Teacher training', icon: <GraduationCap className="w-6 h-6 text-cyan-400" /> },
              { title: 'Student curriculum', icon: <FileText className="w-6 h-6 text-cyan-400" /> },
              { title: 'LMS access', icon: <Wifi className="w-6 h-6 text-cyan-400" /> },
              { title: 'Assessment & certification', icon: <ShieldCheck className="w-6 h-6 text-cyan-400" /> },
              { title: 'Technical support', icon: <Cpu className="w-6 h-6 text-cyan-400" /> },
              { title: 'Competition mentorship', icon: <Move3d className="w-6 h-6 text-cyan-400" /> },
            ].map((item, idx) => (
              <div key={idx} className="group flex items-center gap-5 bg-white/5 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-slate-200 font-semibold text-sm sm:text-base group-hover:text-white transition-colors">{item.title}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
