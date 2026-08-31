import React from 'react';
import { SEO } from '../components/SEO';
import { 
  MessageSquare, PenTool, Wrench, HardDrive, GraduationCap, 
  ChevronLeft, ChevronRight, Zap, CheckCircle2, Target, Cpu, 
  Settings, Wifi, Move3d, ShieldCheck, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

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

        {/* Special Offers Section */}
        <SpecialOffersCarousel />

        {/* Our Proven Process Section */}
        <div className="mb-24">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">Our Proven Process</h2>
            <p className="text-slate-500 mt-4 text-lg">A streamlined approach from ideation to execution.</p>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10">
            
            <StaggerItem className="flex flex-col items-center text-center group bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 mb-4 border border-slate-100 group-hover:border-blue-600">
                <MessageSquare className="w-8 h-8" />
              </div>
              <span className="font-bold font-heading text-slate-800 text-lg mb-2">Consultation</span>
              <p className="text-sm text-slate-500 font-medium">Requirement gathering & space assessment</p>
            </StaggerItem>

            <StaggerItem className="flex flex-col items-center text-center group bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 mb-4 border border-slate-100 group-hover:border-blue-600">
                <PenTool className="w-8 h-8" />
              </div>
              <span className="font-bold font-heading text-slate-800 text-lg mb-2">Lab Design</span>
              <p className="text-sm text-slate-500 font-medium">Customizing curriculum & hardware</p>
            </StaggerItem>

            <StaggerItem className="flex flex-col items-center text-center group bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 mb-4 border border-slate-100 group-hover:border-blue-600">
                <Wrench className="w-8 h-8" />
              </div>
              <span className="font-bold font-heading text-slate-800 text-lg mb-2">Manufacturing</span>
              <p className="text-sm text-slate-500 font-medium">In-house production of kits</p>
            </StaggerItem>

            <StaggerItem className="flex flex-col items-center text-center group bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 mb-4 border border-slate-100 group-hover:border-blue-600">
                <HardDrive className="w-8 h-8" />
              </div>
              <span className="font-bold font-heading text-slate-800 text-lg mb-2">Installation</span>
              <p className="text-sm text-slate-500 font-medium">On-site setup & commissioning</p>
            </StaggerItem>

            <StaggerItem className="flex flex-col items-center text-center group bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 mb-4 border border-slate-100 group-hover:border-blue-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <span className="font-bold font-heading text-slate-800 text-lg mb-2">Training</span>
              <p className="text-sm text-slate-500 font-medium">Comprehensive teacher onboarding</p>
            </StaggerItem>

          </StaggerContainer>
        </div>

        {/* Our Laboratory Solutions Section */}
        <div className="mb-24">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">Our Laboratory Solutions</h2>
            <p className="text-slate-500 mt-4 text-lg">Detailed domains designed for specialized technology education.</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <StaggerItem className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">STEM Foundation Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Introduce young minds to the fundamentals of Science, Technology, Engineering, and Math through interactive DIY kits and hands-on experiments.
              </p>
              <div className="space-y-3 mt-auto">
                {['Basic Electronics', 'Mechanics & Structures', 'Logic Building', 'Fun DIY Kits'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Robotics & Embedded Systems Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Comprehensive lab setup for building programmable robots and embedded systems. Equip students with skills in Arduino, sensors, motors, and microcontrollers.
              </p>
              <div className="space-y-3 mt-auto">
                {['Arduino Programming', 'Motor Drivers & Sensors', 'Chassis & Mechanical Parts', 'Autonomous Bots'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Artificial Intelligence Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Dedicated hardware and software setups to teach machine learning, computer vision, and data science practically.
              </p>
              <div className="space-y-3 mt-auto">
                {['Edge AI Devices', 'Computer Vision Cameras', 'ML Model Deployment', 'Python Coding'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Internet of Things (IoT) Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Connect physical devices to the cloud. Teach students how to build smart homes, automated agriculture, and industrial IoT solutions.
              </p>
              <div className="space-y-3 mt-auto">
                {['WiFi/Bluetooth Modules', 'Cloud Dashboards', 'Smart Sensors', 'Home Automation'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Drone Innovation Lab</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Aerodynamics, flight controllers, and programming logic combined to teach students how to build and fly their own quadcopters.
              </p>
              <div className="space-y-3 mt-auto">
                {['Drone Assembly', 'Flight Dynamics', 'RC Controllers', 'Safety Enclosures'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Atal Tinkering Lab (ATL)</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                Government-compliant innovation workspaces containing 3D printers, electronics, and mechanical tools as per NITI Aayog guidelines.
              </p>
              <div className="space-y-3 mt-auto">
                {['3D Printing', 'Complete ATL Packages', 'Tinkering Tools', 'Compliance Support'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>

        {/* Every NavoYantra Lab Includes Section */}
        <ScrollReveal direction="up" className="bg-[#040b16] text-white rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold font-heading mb-6 leading-tight">Every NavoYantra <br className="hidden lg:block"/> Lab Includes</h2>
              <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed mb-8">
                We go beyond just dropping off hardware. Our holistic approach ensures that your lab is a living ecosystem of learning, backed by continuous support, training, and curriculum.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
              {[
                { title: 'In-house manufactured kits', icon: <Target className="w-5 h-5 text-cyan-400" /> },
                { title: 'Installation & commissioning', icon: <Settings className="w-5 h-5 text-cyan-400" /> },
                { title: 'Teacher training', icon: <GraduationCap className="w-5 h-5 text-cyan-400" /> },
                { title: 'Student curriculum', icon: <FileText className="w-5 h-5 text-cyan-400" /> },
                { title: 'LMS access', icon: <Wifi className="w-5 h-5 text-cyan-400" /> },
                { title: 'Assessment & certification', icon: <ShieldCheck className="w-5 h-5 text-cyan-400" /> },
                { title: 'Technical support', icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
                { title: 'Competition mentorship', icon: <Move3d className="w-5 h-5 text-cyan-400" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-slate-200 font-semibold text-sm sm:text-base">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
