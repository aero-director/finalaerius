import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Globe, CheckCircle2, Plane, X, Maximize2, BookOpen,
  Shield, Users, Wrench, Star, MapPin, Phone, Mail, Award
} from 'lucide-react';
import heroImg from '../../assets/philippines-flight.jpeg';

import phil from '../../assets/philimg/phil1.jpeg';
import phil2 from '../../assets/philimg/phil2.jpeg';
import phil3 from '../../assets/philimg/phil3.jpeg';
import phil4 from '../../assets/philimg/phil4.jpeg';
import phil5 from '../../assets/philimg/phil5.jpeg';

// ─── DATA ────────────────────────────────────────────────────────────────────

const flightHours = [
  { aircraft: 'Cessna 152', hours: 135, color: 'bg-[#1a2e6e]' },
  { aircraft: 'Cessna 172', hours: 40, color: 'bg-[#e21d1d]' },
  { aircraft: 'Multi-Engine PA 34-200', hours: 15, color: 'bg-[#1a2e6e]' },
  { aircraft: 'REDBIRD SD Simulator', hours: 15, color: 'bg-[#e21d1d]' },
  { aircraft: 'REDBIRD FMX Simulator', hours: 15, color: 'bg-[#1a2e6e]' },
];

const simModules = [
  { title: 'Basic Attitude Instrument Flying', hours: 5 },
  { title: 'IFR Procedures Stage 1', hours: 10 },
  { title: 'Advance IFR & NAV Procedures Stage 2', hours: 10 },
  { title: 'Stage / Proficiency Check', hours: 5 },
];

const groundSubjects = [
  'Theory of Flight', 'Advance Aircraft Instruments', 'Advance Aircraft Powerplant',
  'Civil Air Regulations', 'Air Traffic Control & Communications',
  'Advance Aircraft Performance', 'Advance Weight & Balance',
  'Advance Meteorology & Aviation Physiology',
  'Advance Radio Navigation & Air Navigation', 'Advance Flight Planning',
];

const includedItems = [
  {
    icon: <Shield size={22} />, title: 'Documentation Fees',
    items: [
      'Special Study Permit & Visa Extensions',
      'Bureau of Intelligence Clearance',
      'NICA Clearance',
      'NBI Clearance',
      'CAAP Airman Medicals & Exam Fees',
      'CAAP License & Check-Ride Fees',
    ],
  },
  {
    icon: <Star size={22} />, title: 'Uniform & Pilot Kit',
    items: [
      'Pilot Uniform — 3 Sets',
      'Royhle T-Shirt — 2 Pcs',
      'Plotter, E6B, Cx2 Flight Computer',
      'Knee Board, Log Book, Pilot Bag, Map',
      'Jeppesen PPL & CPL/Instrument Books',
      'POH for C152, C172 & PA 34-200',
    ],
  },
  {
    icon: <Users size={22} />, title: 'Food & Accommodation',
    items: [
      'Shared Lodging — Fully Air-Conditioned',
      'Lounge, Wi-Fi, Cable TV & Recreation',
      'Home Cooked Meals 3× Daily + Snacks',
      'Laundry Service',
      'Transportation: Accommodation ↔ Class ↔ Airport',
      '24 / 7 Security & Supervision',
    ],
  },
];

const installments = [
  { label: '1st — Upon Joining', amount: '$20,000' },
  { label: '2nd — After 40 Flying Hours', amount: '$18,000' },
  { label: '3rd — After 80 Flying Hours', amount: '$17,000' },
  { label: '4th — After 120 Flying Hours', amount: '$6,500' },
];

const fleet = [
  { name: 'Cessna 152', count: 10 },
  { name: 'Cessna 172', count: 5 },
  { name: 'Seneca PA 34', count: 1 },
  { name: 'Navajo', count: 2 },
];

const courses = [
  'Private Pilot License', 'Commercial Pilot License',
  'Instrument Rating', 'Multi Engine Rating',
  'ATPL Theory Course', 'Flight Instructor Course',
  'Foreign License Conversion',
];

const coreValues = [
  'Excellence in Training', 'Safety & Responsibility',
  'Integrity & Ethical Standards', 'Continuous Innovation & Improvement',
  'Diversity & Global Perspective', 'Community & Industry Engagement',
];

const alumni = [
  { name: 'Capt. Ashok Karunanithi', role: 'Line Captain — ATR Fleet, Cebu Pacific' },
  { name: 'Capt. Akshay Gopal', role: 'Captain A320/321, Cebu Pacific' },
  { name: 'Capt. Midhun Narayanan', role: 'Senior First Officer B777, Emirates Airlines' },
  { name: 'Capt. Dayang Shermin Mahadali', role: 'First Officer, Cebu Pacific (Cebgo)' },
  { name: 'Capt. Geby Wita Subrata', role: 'First Officer Cessna Grand Caravan, Susi Air Indonesia' },
  { name: 'Capt. Samantha Varela', role: 'First Officer, AirAsia' },
  { name: 'Capt. Ho Trang Nhung', role: '1st Female Vietnamese Pilot on Embraer Jet' },
  { name: 'Capt. Sutan Harahap', role: 'Captain A320, Batik Air (Jakarta)' },
  { name: 'Capt. Sebastian Franco Varela', role: 'First Officer, Air Asia' },
  { name: 'Capt. Luu Minh Tin', role: 'First Officer A320, Pacific Airlines' },
  { name: 'Capt. Nawang Sherpa', role: 'First Officer ATR 72, Yeti Airlines Nepal' },
  { name: 'Capt. King Pacana', role: 'First Officer, Cebu Pacific / Cebgo' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const SectionHeader = ({ tag, title, accent }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-3">
      <span className="h-[2px] w-8 bg-[#e21d1d]" />
      <span className="text-[#e21d1d] text-xs font-black uppercase tracking-[0.35em]">{tag}</span>
    </div>
    <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#1a2e6e] leading-tight">
      {title} <br /><span className="text-[#e21d1d]">{accent}</span>
    </h2>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10 ${className}`}>
    {children}
  </div>
);

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const PhilippinesPage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const galleryImages = [phil, phil2, phil3, phil4, phil5];

  return (
    <div className="bg-[#f5f6fa] font-sans text-[#1a2e6e] antialiased">

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-[#1a2e6e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedImg(null)}>
              <X size={40} strokeWidth={1} />
            </motion.button>
            <motion.img layoutId={selectedImg} src={selectedImg}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={headerRef} className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden bg-[#1a2e6e]">
        <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})`, y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e6e]/90 via-[#1a2e6e]/40 to-[#f5f6fa]" />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-[#e21d1d]" />
              <span className="text-white text-xs md:text-sm font-black uppercase tracking-[0.4em]">Royhle Aviation Academy · Est. 2013</span>
            </div>
            <h1 className="text-white text-5xl md:text-8xl font-black uppercase italic leading-[0.9] tracking-tighter">
              PHILIPPINES <br /><span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>ASIA'S HUB</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT + GALLERY ── */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative -mt-24 z-20">
        <div className="bg-white p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-gray-100 grid lg:grid-cols-12 gap-12">

          <div className="lg:col-span-8">
            <header className="mb-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#1a2e6e] leading-tight">
                Royhle <br /><span className="text-[#e21d1d]">Aviation Academy</span>
              </h2>
            </header>

            <div className="space-y-5 text-lg md:text-xl text-gray-600 leading-relaxed">
              <p className="font-bold text-[#1a2e6e] border-l-4 border-[#e21d1d] pl-6 italic">
                Aerius Aviators is proud to partner with Royhle Aviation Academy — established in 2013 in Dumaguete City, Negros Oriental, Philippines, and certified by CAAP with international approvals from CAAV (Vietnam), CAAN (Nepal) and MCAA (Maldives).
              </p>
              <p>
                Indian students gain access to a fully structured, all-inclusive 220-hour Indian DGCA program covering PPL, CPL, Instrument Rating and Multi-Engine Rating — completed in just 12 to 14 months. The package includes 365 hours of ground schooling, advanced simulator training, food, accommodation, documentation, uniforms and a full pilot kit.
              </p>
              <p>
                Royhle holds the BARS Gold Standard accreditation and operates its own CAAP-approved in-house Maintenance Organisation (AMO) — with engine overhaul capabilities and a maintenance team recertified every two years at Lycoming, Pennsylvania, USA. Alumni are now flying with Cebu Pacific, Emirates Airlines, AirAsia, Batik Air, Yeti Airlines and more.
              </p>
            </div>

            {/* GALLERY */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div layoutId={galleryImages[0]} onClick={() => setSelectedImg(galleryImages[0])}
                className="md:col-span-2 group relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden cursor-zoom-in bg-gray-100 shadow-lg">
                <img src={galleryImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Royhle Aviation Academy" />
                <div className="absolute inset-0 bg-[#1a2e6e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30"><Maximize2 className="text-white" size={24} /></div>
                </div>
              </motion.div>
              {galleryImages.slice(1).map((img, i) => (
                <motion.div key={i} layoutId={img} onClick={() => setSelectedImg(img)}
                  className="group relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden cursor-zoom-in bg-gray-100 shadow-lg">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Training Facility" />
                  <div className="absolute inset-0 bg-[#1a2e6e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30"><Maximize2 className="text-white" size={24} /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-[#1a2e6e] p-10 rounded-[3rem] text-white sticky top-24 shadow-2xl overflow-hidden border border-white/5">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#e21d1d] rounded-2xl flex items-center justify-center mb-8 rotate-3 shadow-lg">
                  <Globe className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2 tracking-tight italic">Academy Highlights</h3>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Dumaguete City, Philippines</p>
                <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/60">
                  {[
                    'CAAP Certified · Est. 2013',
                    'BARS Gold Standard',
                    '220 Flying Hours',
                    'Food & Accommodation Included',
                    'In-House AMO Maintenance',
                    'CAAV · CAAN · MCAA Approved',
                    '12–14 Month Duration',
                    'Installment Payment Plans',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-[#e21d1d] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 bg-white/10 rounded-2xl p-5 border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1">All-Inclusive Package</p>
                  <p className="text-4xl font-black text-white">$61,500</p>
                  <p className="text-white/40 text-xs mt-1">USD · Incl. 12% VAT</p>
                </div>
                <button className="group relative w-full mt-6 bg-[#e21d1d] text-white py-5 rounded-2xl font-black uppercase italic overflow-hidden transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(226,29,29,0.5)]">
                  <span className="relative z-10">Enquire Now</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="absolute inset-0 z-20 flex items-center justify-center text-[#1a2e6e] translate-y-full group-hover:translate-y-0 transition-transform duration-300">Enquire Now</span>
                </button>
              </div>
              <Plane size={280} className="absolute -right-20 -bottom-20 text-white/5 -rotate-12 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ── FLIGHT HOURS BREAKDOWN ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Program Structure" title="220-Hour" accent="Flight Training Plan" />
        <div className="grid md:grid-cols-5 gap-4">
          {flightHours.map((item, i) => (
            <div key={i} className={`${item.color} rounded-[1.5rem] p-6 text-white flex flex-col justify-between shadow-lg`}>
              <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">{item.aircraft}</p>
              <p className="text-5xl font-black">{item.hours}<span className="text-2xl ml-1">hrs</span></p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[#1a2e6e] rounded-[1.5rem] p-6 flex items-center justify-between shadow-lg">
          <p className="text-white/60 text-sm font-black uppercase tracking-widest">Total Flying Hours</p>
          <p className="text-white text-5xl font-black">220 hrs</p>
        </div>

        {/* SIMULATOR TRAINING */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#e21d1d] rounded-xl flex items-center justify-center"><BookOpen size={18} className="text-white" /></div>
              <div>
                <h3 className="font-black uppercase text-[#1a2e6e] text-lg italic">Simulator Training</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">REDBIRD SD / REDBIRD FMX · Incl. 10 hrs ME Sim</p>
              </div>
            </div>
            <div className="space-y-3">
              {simModules.map((m, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-sm font-bold text-gray-600">{m.title}</span>
                  <span className="text-[#e21d1d] font-black text-sm">{m.hours} hrs</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#1a2e6e] rounded-xl flex items-center justify-center"><BookOpen size={18} className="text-white" /></div>
              <div>
                <h3 className="font-black uppercase text-[#1a2e6e] text-lg italic">Ground Schooling</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">365 Hours · Theory & Advanced Subjects</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {groundSubjects.map((s, i) => (
                <span key={i} className="bg-[#1a2e6e]/8 text-[#1a2e6e] text-xs font-bold px-3 py-2 rounded-full border border-[#1a2e6e]/15">{s}</span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Package Inclusions" title="Everything" accent="Included" />
        <div className="grid md:grid-cols-3 gap-6">
          {includedItems.map((block, i) => (
            <Card key={i}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow ${i % 2 === 0 ? 'bg-[#1a2e6e]' : 'bg-[#e21d1d]'}`}>
                <span className="text-white">{block.icon}</span>
              </div>
              <h3 className="font-black uppercase italic text-[#1a2e6e] text-lg mb-4">{block.title}</h3>
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-500 font-medium">
                    <CheckCircle2 size={14} className="text-[#e21d1d] mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-[1.5rem] p-6">
          <p className="text-amber-800 text-sm font-bold">
            <span className="font-black uppercase">Please Note:</span> Students must cover their own travel and stay for PPL, CPL/IR exams and Airman Medicals if done at CAAP Manila. Alternatively, all can be completed at CAAP Dumaguete (additional USD 800 for PPL, C172, CPL, IR, ME, NTC Radio License, ELP online). Fees are inclusive of 12% VAT and subject to change without prior notice.
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Fees & Payment" title="Flexible" accent="Installment Plan" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a2e6e] rounded-[2rem] p-10 text-white shadow-2xl flex flex-col justify-between">
            <div>
              <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">Total Package Price</p>
              <p className="text-7xl font-black">$61,500</p>
              <p className="text-white/40 text-sm mt-2">USD · Inclusive of 12% VAT</p>
            </div>
            <ul className="mt-8 space-y-2 text-sm text-white/60 font-bold">
              <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#e21d1d] shrink-0 mt-0.5" /> 220 Flight Hours (PPL + CPL + IR + ME)</li>
              <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#e21d1d] shrink-0 mt-0.5" /> 365 Hours Ground Schooling</li>
              <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#e21d1d] shrink-0 mt-0.5" /> Food, Accommodation & Transport</li>
              <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#e21d1d] shrink-0 mt-0.5" /> All Documentation & Exam Fees</li>
              <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#e21d1d] shrink-0 mt-0.5" /> Uniforms & Full Pilot Kit</li>
              <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#e21d1d] shrink-0 mt-0.5" /> 12–14 Month Duration</li>
            </ul>
          </div>

          <Card className="flex flex-col justify-between">
            <div>
              <h3 className="font-black uppercase italic text-[#1a2e6e] text-xl mb-6">4 Installments</h3>
              <div className="space-y-3">
                {installments.map((inst, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Installment {i + 1}</p>
                      <p className="text-sm font-bold text-[#1a2e6e]">{inst.label}</p>
                    </div>
                    <p className="text-2xl font-black text-[#e21d1d]">{inst.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-6 group relative w-full bg-[#e21d1d] text-white py-5 rounded-2xl font-black uppercase italic overflow-hidden transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(226,29,29,0.5)]">
              <span className="relative z-10">Apply Now</span>
              <div className="absolute inset-0 bg-[#1a2e6e] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">Apply Now</span>
            </button>
          </Card>
        </div>
      </section>

      {/* ── COURSES OFFERED ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Training Programs" title="Course" accent="Offerings" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {courses.map((course, i) => (
            <div key={i} className={`rounded-[1.5rem] p-6 shadow font-black uppercase italic text-sm tracking-tight flex items-center gap-3 ${i % 3 === 0 ? 'bg-[#e21d1d] text-white' : i % 3 === 1 ? 'bg-[#1a2e6e] text-white' : 'bg-white text-[#1a2e6e] border border-gray-100'}`}>
              <Plane size={18} className="shrink-0" /> {course}
            </div>
          ))}
        </div>
      </section>

      {/* ── FLEET ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Aircraft Fleet" title="Training" accent="Fleet" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {fleet.map((item, i) => (
            <div key={i} className={`rounded-[2rem] p-8 text-center shadow-xl ${i % 2 === 0 ? 'bg-[#1a2e6e] text-white' : 'bg-[#e21d1d] text-white'}`}>
              <Plane size={36} className="mx-auto mb-4 opacity-60" />
              <p className="text-6xl font-black">{item.count}</p>
              <p className="text-white/60 text-xs font-black uppercase tracking-widest mt-2">{item.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-gray-400 text-sm font-bold italic">
          ** Four additional training aircraft (two C152s + two C172s) expected to arrive soon.
        </p>
      </section>

      {/* ── SIMULATORS ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Technology" title="Advanced" accent="Simulators" />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'REDBIRD FMX', bg: 'bg-[#1a2e6e]',
              desc: 'Full-motion flight simulator providing an immersive, realistic training experience. Students practice a full range of scenarios — from normal operations to emergency procedures — in a controlled, safe environment.',
            },
            {
              name: 'REDBIRD SD (G1000)', bg: 'bg-[#e21d1d]',
              desc: 'High-fidelity flight training device designed to refine instrument proficiency and cockpit familiarisation. Students develop strong piloting skills with situational awareness and precision in every manoeuvre.',
            },
          ].map((sim, i) => (
            <div key={i} className={`${sim.bg} rounded-[2rem] p-10 text-white shadow-2xl overflow-hidden relative`}>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-white/50 mb-3">Simulator</p>
              <h3 className="text-3xl font-black uppercase italic mb-5">{sim.name}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{sim.desc}</p>
              <Plane size={160} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ── MAINTENANCE / WHAT SETS US APART ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Safety First" title="What Sets" accent="Us Apart" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#1a2e6e] rounded-2xl flex items-center justify-center"><Wrench size={22} className="text-white" /></div>
              <h3 className="font-black uppercase italic text-[#1a2e6e] text-xl">In-House AMO</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Unlike most flight schools, Royhle operates its own CAAP-approved Maintenance Organisation (AMO), giving full in-house control over every aircraft's safety, performance and compliance with aviation regulations.
            </p>
            <ul className="space-y-3">
              {[
                'CAAP-Approved Maintenance Organisation',
                'Authorised Engine Overhaul Capability',
                'Maintenance Team Recertified Every 2 Years at Lycoming, Pennsylvania, USA',
                'Exceeds Safety Regulations via Rigorous Monitoring',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-500 font-medium">
                  <CheckCircle2 size={14} className="text-[#e21d1d] mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#e21d1d] rounded-2xl flex items-center justify-center"><Award size={22} className="text-white" /></div>
              <h3 className="font-black uppercase italic text-[#1a2e6e] text-xl">Accreditations</h3>
            </div>
            <div className="space-y-3">
              {[
                { title: 'CAAP', desc: 'Civil Aviation Authority of the Philippines — Primary Certification' },
                { title: 'CAAV', desc: 'Civil Aviation Authority of Vietnam — Approved' },
                { title: 'CAAN', desc: 'Civil Aviation Authority of Nepal — Approved' },
                { title: 'MCAA', desc: 'Maldives Civil Aviation Authority — Approved' },
                { title: 'BARS Gold', desc: 'Basic Aviation Risk Standard — Gold Standard (Royhle Airway Charter)' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <span className={`text-xs font-black uppercase px-2 py-1 rounded-lg shrink-0 ${i === 4 ? 'bg-yellow-400 text-yellow-900' : 'bg-[#1a2e6e] text-white'}`}>{a.title}</span>
                  <p className="text-sm text-gray-500 font-medium">{a.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Our Foundation" title="Core" accent="Values" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {coreValues.map((val, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow flex items-start gap-3">
              <span className="text-[#e21d1d] font-black text-2xl leading-none">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-bold text-[#1a2e6e] text-sm uppercase tracking-wide">{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ALUMNI SUCCESS STORIES ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionHeader tag="Community" title="Alumni" accent="Success Stories" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alumni.map((a, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow flex items-start gap-4">
              <div className="w-10 h-10 bg-[#1a2e6e] rounded-full flex items-center justify-center shrink-0">
                <Plane size={16} className="text-white" />
              </div>
              <div>
                <p className="font-black text-[#1a2e6e] text-sm uppercase italic">{a.name}</p>
                <p className="text-gray-400 text-xs font-bold mt-1">{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto pb-24">
        <div className="bg-[#1a2e6e] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 text-white shadow-2xl overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-8 bg-[#e21d1d]" />
                <span className="text-[#e21d1d] text-xs font-black uppercase tracking-[0.35em]">Get In Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-tight mb-4">
                Start Your <br /><span className="text-[#e21d1d]">Journey Today</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Reach out to Royhle Aviation Academy directly or contact us at Aerius Aviators and we will guide you through the entire admission process.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={18} />, text: '2nd Floor Ong Building, North National Highway, Buñao, Dumaguete City, Negros Oriental, Philippines 6200' },
                { icon: <Phone size={18} />, text: '+63 (035) 522 1084 / 420 0773 · Mobile: +639177994053 / +63917042054' },
                { icon: <Mail size={18} />, text: 'royhleflight@gmail.com · admin@royhleflight.com' },
                { icon: <Globe size={18} />, text: 'www.royhleaviation.com' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 rounded-2xl px-5 py-4 border border-white/10">
                  <span className="text-[#e21d1d] mt-0.5 shrink-0">{c.icon}</span>
                  <p className="text-white/70 text-sm font-medium">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
          <Plane size={400} className="absolute -right-32 -bottom-32 text-white/5 -rotate-12 pointer-events-none" />
        </div>
      </section>

    </div>
  );
};

export default PhilippinesPage;