import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, CheckCircle2, Plane, X, Maximize2, Star, ShieldCheck, ClipboardList, GraduationCap, DollarSign } from 'lucide-react';

// --- ASSET IMPORTS ---
import br0 from '../../assets/braimg/brazil-01.jpeg';
import br1 from '../../assets/braimg/brazil-02.jpeg';
import br2 from '../../assets/braimg/brazil-03.jpeg';
import br3 from '../../assets/braimg/brazil-04.jpeg';

// ─── STAT CARD ───────────────────────────────────────────────────────────────
const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
    <span className="text-2xl md:text-3xl font-black text-[#e21d1d] italic leading-none">{value}</span>
    <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-1 leading-tight">{label}</span>
  </div>
);

// ─── PHASE ROW ────────────────────────────────────────────────────────────────
const PhaseRow = ({ number, title, duration }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: number * 0.08 }}
    className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0"
  >
    <span className="w-8 h-8 rounded-full bg-[#e21d1d] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
      {number}
    </span>
    <span className="flex-1 font-bold text-[#1a2e6e] text-sm md:text-base">{title}</span>
    <span className="text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
      {duration}
    </span>
  </motion.li>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const BrazilPage = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const galleryImages = [br0, br1, br2, br3];

  const phases = [
    { number: 1, title: 'Private Pilot Licence', duration: '4–5 months' },
    { number: 2, title: 'Time Building', duration: '4 months' },
    { number: 3, title: 'Commercial Pilot & Instrument Rating (Single Engine)', duration: '3–4 months' },
    { number: 4, title: 'Multi Engine Endorsement', duration: '2–4 weeks' },
    { number: 5, title: 'Airbus A320 Jet Familiarisation Course', duration: '2–3 weeks (optional)' },
  ];

  const anacBenefits = [
    'Controlled Airspace (SBSV)',
    'DGCA India Compliant',
    'Zero Accident Record',
    'Multi-Engine Rating',
    'Instrument Rating',
    'A320 Familiarisation',
  ];

  return (
    <div className="bg-[#fcfcfc] font-sans text-[#1a2e6e] antialiased">

      {/* ── LIGHTBOX MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-[#1a2e6e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} strokeWidth={1} />
            </motion.button>
            <motion.img
              layoutId={selectedImg}
              src={selectedImg}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden bg-[#1a2e6e]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#e21d1d] text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full">
                ✦ New Destination — 2026
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-[#e21d1d]" />
              <span className="text-white text-xs md:text-sm font-black uppercase tracking-[0.4em]">ANAC Pilot Training</span>
            </div>
            <h1 className="text-white text-5xl md:text-8xl font-black uppercase italic leading-[0.9] tracking-tighter">
              BRAZIL <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>SALVADOR BASE</span>
            </h1>
            <div className="mt-8 bg-[#e21d1d] text-white px-8 py-3 inline-block font-black uppercase italic tracking-widest rounded-full shadow-lg">
              Cost: USD 48,000
            </div>
          </motion.div>
        </div>
        <Plane size={400} className="absolute -right-20 bottom-0 text-white/5 -rotate-12 pointer-events-none hidden lg:block" />
      </section>

      {/* ── CONTENT SECTION ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative -mt-24 z-20">
        <div className="bg-white p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-gray-100 grid lg:grid-cols-12 gap-12">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="lg:col-span-8">
            <header className="mb-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#1a2e6e] leading-tight">
                Fly Commercial <br />
                <span className="text-[#e21d1d]">In Brazil (ANAC)</span>
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-[#e21d1d] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-sm">
                  <MapPin size={18} /> Salvador International Airport (SBSV)
                </p>
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] flex items-center gap-2 text-sm">
                  <MapPin size={18} /> Petrolina — Satellite Base
                </p>
              </div>
            </header>

            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              <p className="font-bold text-[#1a2e6e] border-l-4 border-[#e21d1d] pl-6 italic">
                Aerius Pilot Academy has partnered with AeroTime Escola de Aviação Civil — an ANAC-approved
                school based in Salvador, Bahia — to offer a fully integrated ab-initio CPL program aligned with Indian DGCA requirements.
              </p>
              <p>
                This integrated CPL program is fully structured to meet Indian DGCA requirements, giving Indian students a globally respected license at a competitive cost. AeroTime (CNPJ: 10.832.791/0001-70) has been approved by Brazil's Civil Aviation Authority since 2012 and is led by General Director Gilmar de Paula.
              </p>
            </div>

            {/* ── AEROTIME STATS ────────────────────────────────────────── */}
            <div className="mt-12 bg-[#1a2e6e] rounded-[2rem] p-8">
              <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-6">AeroTime — Safety & Experience</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <StatCard value="650+" label="Cadets Trained" />
                <StatCard value="8,000+" label="Hrs of Instruction" />
                <StatCard value="14,000+" label="Takeoffs & Landings" />
                <StatCard value="Zero" label="Accidents" />
                <StatCard value="2012" label="ANAC Approved" />
              </div>
            </div>

            {/* ── TRAINING BASES ─────────────────────────────────────────── */}
            <div className="mt-14 grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h4 className="text-[#1a2e6e] font-black uppercase italic mb-3 flex items-center gap-2">
                   Primary Base — Salvador
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Located at Salvador International (SBSV). Students train in controlled airspace alongside real airline traffic with English tower communications.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h4 className="text-[#e21d1d] font-black uppercase italic mb-3 flex items-center gap-2">
                   Satellite Base — Petrolina
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A private airstrip used for expedited training, advanced maneuver training, and extensive cross-country flight phases.
                </p>
              </div>
            </div>

            {/* ── TRAINING PHASES ───────────────────────────────────────── */}
            <div className="mt-14">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[2px] w-8 bg-[#e21d1d]" />
                <h3 className="text-lg font-black uppercase italic tracking-widest text-[#1a2e6e]">Phases of Training</h3>
              </div>
              <ul className="bg-white border border-gray-100 rounded-3xl px-8 py-2">
                {phases.map((p) => (
                  <PhaseRow key={p.number} {...p} />
                ))}
              </ul>
              <p className="mt-4 text-xs text-gray-400 font-semibold italic">
                * Anticipated total duration: 12–14 months (subject to student performance, medicals, ANAC checkride dates & weather).
              </p>
            </div>

            {/* ── DGCA COMPLIANCE ───────────────────────────────────────── */}
            <div className="mt-14">
               <div className="flex items-center gap-4 mb-6">
                <span className="h-[2px] w-8 bg-[#e21d1d]" />
                <h3 className="text-lg font-black uppercase italic tracking-widest text-[#1a2e6e]">DGCA India Compliance</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                {[
                  '200 Hours Total Flight Time',
                  '100 Hours Pilot-in-Command',
                  '50 Hours Cross-Country (100nm+)',
                  '300nm XC with 2 Aerodrome Landings',
                  'Instrument: 20h Actual + 20h Sim',
                  'Multi Engine: 15h Actual + 10h Sim'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm font-bold text-[#1a2e6e]">
                    <CheckCircle2 size={16} className="text-[#e21d1d]" /> {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-500 italic">
                Structured in accordance with The Aircraft Rules, 1937 — Section L.
              </p>
            </div>

            {/* ── SPECIAL OFFER ──────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-14 bg-gradient-to-r from-[#e21d1d] to-[#b01515] rounded-[2rem] p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Star className="text-white" size={28} />
              </div>
              <div>
                <p className="text-white font-black uppercase italic tracking-widest text-sm mb-1">Special Aerius Cadet Offer</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Enrol on or before <strong className="text-white">30 April 2026</strong> and receive a complimentary{' '}
                  <strong className="text-white">A320 Jet Familiarisation Course</strong> + <strong className="text-white">CRM Course</strong>.
                </p>
              </div>
            </motion.div>

            {/* ── PHOTO GALLERY ─────────────────────────────────────────── */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  layoutId={img}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedImg(img)}
                  className="group relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden cursor-zoom-in bg-gray-100 shadow-lg"
                >
                  <img src={img} alt="Brazil Flight Training" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#1a2e6e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Maximize2 className="text-white" size={24} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── SIDEBAR ────────────────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <div className="space-y-8 sticky top-24">
              
              {/* Fee Card */}
              <div className="bg-[#1a2e6e] p-10 rounded-[3rem] text-white shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                  <DollarSign className="text-[#e21d1d] mb-4" size={40} />
                  <h3 className="text-2xl font-black uppercase mb-1 italic">Course Fee</h3>
                  <p className="text-4xl font-black italic text-white mb-4">USD 48,000</p>
                  <div className="space-y-3 mb-8">
                    {['200 Flight Hours', 'Simulator Sessions', '12 Months Accommodation', 'ANAC Ground Theory', 'Check-ride Rentals', 'Pilot Kit & Headset'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
                        <CheckCircle2 size={14} className="text-[#e21d1d]" /> {item}
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#e21d1d] text-white py-5 rounded-2xl font-black uppercase italic shadow-lg active:scale-95 transition-all">
                    Apply Now
                  </button>
                </div>
                <Plane size={200} className="absolute -right-10 -bottom-10 text-white/5 -rotate-12 pointer-events-none" />
              </div>

              {/* Admission Card */}
              <div className="bg-white border border-gray-100 p-8 rounded-[3rem] shadow-xl">
                <h3 className="text-lg font-black uppercase italic text-[#1a2e6e] mb-6 flex items-center gap-2">
                  <ClipboardList size={20} className="text-[#e21d1d]" /> Admission
                </h3>
                <ul className="space-y-4">
                  {[
                    'Age 17–38 years',
                    'High School (Physics & Math)',
                    'Clean Criminal Background',
                    'Medically Fit (DGCA)',
                    'Financial Capacity'
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e21d1d] mt-1 flex-shrink-0" /> {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Brazil? */}
              <div className="bg-gray-900 p-8 rounded-[3rem] text-white shadow-xl">
                 <h3 className="text-lg font-black uppercase italic mb-6 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#e21d1d]" /> Why Brazil?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black text-[#e21d1d] uppercase tracking-[0.2em] mb-1">Infrastructure</h5>
                    <p className="text-[11px] text-white/60 leading-relaxed font-medium">World's 2nd largest airport network provides unmatched airspace exposure.</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-[#e21d1d] uppercase tracking-[0.2em] mb-1">Licence Recognition</h5>
                    <p className="text-[11px] text-white/60 leading-relaxed font-medium">ANAC is ranked among the most respected civil aviation authorities globally by ICAO.</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-[#e21d1d] uppercase tracking-[0.2em] mb-1">Living Costs</h5>
                    <p className="text-[11px] text-white/60 leading-relaxed font-medium">Affordable expenses in Salvador; shared accommodation is already included.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrazilPage;