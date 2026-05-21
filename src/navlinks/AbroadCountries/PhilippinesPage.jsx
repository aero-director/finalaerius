import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, CheckCircle2, Plane, X, Maximize2 } from 'lucide-react';
import heroImg from '../../assets/philippines-flight.jpeg';

// --- ASSET IMPORTS ---
import phil from '../../assets/philimg/phil1.jpeg'; 
import phil2 from '../../assets/philimg/phil2.jpeg';
import phil3 from '../../assets/philimg/phil3.jpeg';
import phil4 from '../../assets/philimg/phil4.jpeg';
import phil5 from '../../assets/philimg/phil5.jpeg';

const PhilippinesPage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Updated to include all 5 imported images
  const galleryImages = [phil, phil2, phil3, phil4, phil5];

  return (
    <div className="bg-[#fcfcfc] font-sans text-[#1a2e6e] antialiased">
      
      {/* --- MODERN LIGHTBOX MODAL --- */}
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section ref={headerRef} className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden bg-[#1a2e6e]">
        <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})`, y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e6e]/90 via-[#1a2e6e]/40 to-[#fcfcfc]" />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-[#e21d1d]" />
              <span className="text-white text-xs md:text-sm font-black uppercase tracking-[0.4em]">Echo Air Academy</span>
            </div>
            <h1 className="text-white text-5xl md:text-8xl font-black uppercase italic leading-[0.9] tracking-tighter">
              PHILIPPINES <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>ASIA'S HUB</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative -mt-24 z-20">
        <div className="bg-white p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-gray-100 grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            <header className="mb-10">
                <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#1a2e6e] leading-tight">
                    Echo Air <br/>
                    <span className="text-[#e21d1d]">Aviation Academy</span>
                </h2>
            </header>

            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              <p className="font-bold text-[#1a2e6e] border-l-4 border-[#e21d1d] pl-6 italic">
                Aerius Aviators is proud to be associated with Echo Air International Aviation Academy, one of the Philippines’ established institutions known for its disciplined approach.
              </p>
              <p>
                Indian students gain access to a structured and cost-effective pathway for pursuing their CPL. Echo Air offers comprehensive training supported by skilled instructors and a focused campus atmosphere that encourages consistent growth.
              </p>
            </div>

            {/* --- DYNAMIC GRID (All Images) --- */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Feature Image */}
              <motion.div
                layoutId={galleryImages[0]}
                onClick={() => setSelectedImg(galleryImages[0])}
                className="md:col-span-2 group relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden cursor-zoom-in bg-gray-100 shadow-lg"
              >
                <img src={galleryImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Echo Air Academy" />
                <div className="absolute inset-0 bg-[#1a2e6e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                        <Maximize2 className="text-white" size={24} />
                    </div>
                </div>
              </motion.div>

              {/* Secondary Images */}
              {galleryImages.slice(1).map((img, index) => (
                <motion.div
                  key={index}
                  layoutId={img}
                  onClick={() => setSelectedImg(img)}
                  className="group relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden cursor-zoom-in bg-gray-100 shadow-lg"
                >
                  <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Training Facility" />
                  <div className="absolute inset-0 bg-[#1a2e6e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                        <Maximize2 className="text-white" size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- SIDEBAR CARD --- */}
          <div className="lg:col-span-4">
            <div className="bg-[#1a2e6e] p-10 rounded-[3rem] text-white sticky top-24 shadow-2xl overflow-hidden border border-white/5">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#e21d1d] rounded-2xl flex items-center justify-center mb-8 rotate-3 shadow-lg">
                    <Globe className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-black uppercase mb-6 tracking-tight italic">Academy Highlights</h3>
                
                <ul className="space-y-5 text-sm font-bold uppercase tracking-widest text-white/60">
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#e21d1d]" /> Cost-Effective</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#e21d1d]" /> Disciplined Training</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#e21d1d]" /> Modern Campus</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#e21d1d]" /> Skilled Instructors</li>
                </ul>

                <button className="group relative w-full mt-10 bg-[#e21d1d] text-white py-5 rounded-2xl font-black uppercase italic overflow-hidden transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(226,29,29,0.5)]">
                  <span className="relative z-10">Enquire Now</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="absolute inset-0 z-20 flex items-center justify-center text-[#1a2e6e] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    Enquire Now
                  </span>
                </button>
              </div>

              <Plane size={280} className="absolute -right-20 -bottom-20 text-white/5 -rotate-12 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PhilippinesPage;