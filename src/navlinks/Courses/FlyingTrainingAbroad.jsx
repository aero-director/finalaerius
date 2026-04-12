import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- ASSET IMPORTS ---
import mainHeroImg from '../../assets/FIC-IMG.webp';
import usaImg from '../../assets/usa-flight.jpg';
import spainImg from '../../assets/spain-flight.png';
import australiaImg from '../../assets/australia-flight.png';
import nzImg from '../../assets/nz-flight.jpg';
import philippinesImg from '../../assets/philippines-flight.png';
import southAfricaImg from '../../assets/sa-flight.png';
// Adding a Brazil image for the card background (using one from your gallery)
import brazilImg from '../../assets/braimg/brazil-01.jpeg';

const FlyingTraining = () => {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const destinations = [
    { 
      name: "USA", 
      path: "/abroad/usa",
      img: usaImg, 
      subtitle: "Florida Hub", 
      content: "Through our exclusive partnership with AirLink Flight School in Florida, Aerius Aviators offers Indian students a streamlined pathway to earning a Commercial Pilot Licence (CPL)." 
    },
    { 
      name: "SPAIN", 
      path: "/abroad/spain",
      img: spainImg, 
      subtitle: "EASA Centres", 
      content: "Experience flying over Spain’s diverse landscapes—from golden coastlines to historic cities. Spain offers near-perfect weather with over 300 sunny days a year." 
    },
    { 
      name: "AUSTRALIA", 
      path: "/abroad/australia",
      img: australiaImg, 
      subtitle: "Melbourne Base", 
      content: "Train at Moorabbin Airport, one of Australia's premier aviation hubs. Gain exposure to busy traffic, controlled airspace, and world-class instructors." 
    },
    { 
      name: "NEW ZEALAND", 
      path: "/abroad/new-zealand",
      img: nzImg, 
      subtitle: "North Otago", 
      content: "Learn to fly in a peaceful aviation setting at Oamaru Airport. Offers scenic landscapes ranging from rugged coastlines to distant mountains." 
    },
    { 
      name: "PHILIPPINES", 
      path: "/abroad/philippines",
      img: philippinesImg, 
      subtitle: "Echo Air Academy", 
      content: "Associated with Echo Air International, known for a disciplined and professional approach to pilot education in the heart of Asia." 
    },
    { 
      name: "SOUTH AFRICA", 
      path: "/abroad/south-africa",
      img: southAfricaImg, 
      subtitle: "Vulcan Aviation", 
      content: "Collaborate with Vulcan Aviation for robust, industry-aligned pilot training in one of the most respected aviation environments." 
    },
    // --- ADDED BRAZIL DESTINATION ---
    { 
      name: "BRAZIL", 
      path: "/abroad/brazil",
      img: brazilImg, 
      subtitle: "Salvador Base", 
      content: "Partnered with AeroTime Escola de Aviação Civil. Train in controlled airspace alongside real airline traffic at Salvador International." 
    }
  ];

  return (
    <div className="bg-[#fcfcfc] font-sans text-[#1a2e6e] antialiased overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section ref={headerRef} className="relative h-[75vh] md:h-[85vh] flex items-center overflow-hidden bg-[#1a2e6e]">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mainHeroImg})`, y }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e6e]/90 via-[#1a2e6e]/40 to-[#fcfcfc]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
              <span className="h-[2px] md:h-[3px] w-10 md:w-16 bg-[#e21d1d]" />
              <span className="text-white text-[10px] md:text-sm font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">Global Reach</span>
            </div>
            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-black uppercase italic leading-[0.85] md:leading-[0.75] tracking-tighter">
              FLYING <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>TRAINING</span>
            </h1>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[#e21d1d] text-3xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-widest mt-2 md:mt-4"
            >
              ABROAD
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative -mt-20 md:-mt-40 z-20">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white p-8 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8 space-y-6 md:space-y-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#1a2e6e]">
                World-Class <span className="text-[#e21d1d]">Milestones</span>
              </h2>
              <div className="space-y-6 md:space-y-8 text-lg md:text-xl leading-relaxed text-gray-600 font-medium">
                <p>
                  AERIUS Aviators is excited to announce a <span className="text-[#1a2e6e] font-black underline decoration-[#e21d1d] decoration-4">groundbreaking collaboration</span> with leading Flight Training Centres globally.
                </p>
                <p className="border-l-4 border-[#e21d1d] pl-4 md:pl-8 italic text-xl md:text-2xl text-[#1a2e6e]">
                  "Undertake flight training abroad with the ultimate goal of obtaining a Foreign CPL."
                </p>
                
                <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-tight">
                  Join us on this remarkable journey and let your dreams of becoming a certified pilot reach new horizons.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center">
               <motion.div 
                 whileInView={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="w-full bg-[#1a2e6e] rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl"
               >
                 <Globe className="absolute -right-16 -top-16 opacity-10 group-hover:rotate-90 transition-transform duration-[2000ms]" size={250} />
                 <div className="relative z-10">
                   <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-6 md:mb-8">Benefits</h3>
                   <ul className="space-y-4 md:space-y-6">
                     {["Foreign CPL", "300+ Flying Days", "Controlled Airspace", "Modern Fleets"].map((item, idx) => (
                       <li key={idx} className="flex items-center gap-3 font-black text-[10px] md:text-xs uppercase tracking-widest">
                         <ShieldCheck className="text-[#e21d1d]" size={16} /> {item}
                       </li>
                     ))}
                   </ul>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- DESTINATION HUB --- */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20 space-y-4">
          <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            Global Partnership <br />
            <span className="text-[#e21d1d]">Network</span>
          </h3>
          <p className="text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs">
            Selection of Premier Flight Academies
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12"
        >
          {destinations.map((dest, i) => (
            <Link to={dest.path} key={i}>
              <motion.div 
                variants={itemVariants}
                className="group relative h-[450px] md:h-[550px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                  style={{ backgroundImage: `url(${dest.img})` }} 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e6e] via-[#1a2e6e]/30 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500" />

                {/* Arrow Button */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10">
                  <div className="bg-[#e21d1d] text-white p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-2xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                    <ArrowRight size={20} className="md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
                      {dest.name}
                    </h4>
                    <div className="w-8 h-1 bg-[#e21d1d] lg:group-hover:w-full transition-all duration-700" />
                    <p className="text-[#e21d1d] font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]">
                      {dest.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-white/80 font-medium leading-relaxed lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:max-h-0 lg:group-hover:max-h-40 overflow-hidden">
                      {dest.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default FlyingTraining;