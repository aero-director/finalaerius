import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Plus, Minus } from 'lucide-react';
import satiLogo from '../assets/LOGO.webp';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);

    useEffect(() => {
        setIsOpen(false);
        setMobileDropdown(null);
    }, [location]);

    const navItems = [
        { name: 'About Us', path: '/about', hasDropdown: false },
        {
            name: 'Courses',
            path: '/courses',
            hasDropdown: true,
            dropdownLinks: [
                { name: 'Ground School', path: '/courses/groundschool-page' },
                { name: 'Private Pilot', path: '/courses/private-pilot' },
                { name: 'Night Rating', path: '/courses/night-rating' },
                { name: 'Instrument Rating', path: '/courses/instrument-rating' },
                { name: 'Commercial Pilot', path: '/courses/commercial-pilot' },
                { name: 'Flight Instructor', path: '/courses/flight-instructor' },
                { name: 'Type Rating', path: '/courses/type-rating' },
                { name: 'Airline Prep', path: '/courses/airline-prep' },
            ]
        },
        { 
            name: 'Flying Training', 
            path: '/flying-training-abroad', 
            hasDropdown: true,
            dropdownLinks: [
                { name: 'USA', path: '/abroad/usa' },
                { name: 'Spain', path: '/abroad/spain' },
                { name: 'Australia', path: '/abroad/australia' },
                { name: 'New Zealand', path: '/abroad/new-zealand' },
                { name: 'Philippines', path: '/abroad/philippines' },
                { name: 'South Africa', path: '/abroad/south-africa' },
                { name: 'Brazil', path: '/abroad/brazil' },
            ]
        },
        { name: 'Gallery', path: '/nav-gallery', hasDropdown: false },
        { name: 'Contact Us', path: '/contact', hasDropdown: false },
    ];

    return (
        <div className="w-full relative z-[1000] font-['Montserrat',sans-serif]">
            {/* --- TOP HEADER --- */}
            <header className="bg-white py-4 md:py-6 px-4 md:px-8 lg:px-12 border-b-2 border-[#203a8c]/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                    <div className="flex items-center z-20">
                        <Link to="/" className="flex-shrink-0">
                            <img src={satiLogo} alt="Aerius Academy" className="h-8 md:h-12 w-auto object-contain" />
                        </Link>
                        <div className="md:hidden ml-3">
                            <h1 className="text-[#203a8c] font-black uppercase leading-[1.1] text-[12px] sm:text-[14px]">
                                Aerius <br /> Pilot Academy
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                        <div className="text-center pointer-events-auto">
                            <h1 className="text-[#203a8c] font-black uppercase leading-none tracking-tight text-xl lg:text-2xl">Aerius Pilot Academy</h1>
                            <p className="text-[8px] lg:text-[10px] text-red-600 font-bold tracking-[0.3em] lg:tracking-[0.4em] uppercase mt-1">Global Center for Aviation Excellence</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 z-20">
                        <Link to="/contact" className="hidden lg:block">
                            <button className="bg-[#e31e24] text-white px-5 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-md active:scale-95 transition-transform">
                                Apply Now
                            </button>
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white bg-[#203a8c] rounded-md">
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* --- DESKTOP NAVIGATION (CSS HOVERS ONLY) --- */}
            <nav className="hidden lg:block bg-[#203a8c] text-white sticky top-0 z-50 shadow-xl">
                <ul className="flex items-center justify-center">
                    {navItems.map((item) => (
                        <li key={item.name} className="relative group">
                            <Link to={item.path} className={`px-6 xl:px-8 py-4 text-[11px] xl:text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:bg-[#1a3178] transition-colors ${location.pathname === item.path ? 'text-red-400' : 'text-white'}`}>
                                {item.name}
                                {item.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
                            </Link>
                            
                            {item.hasDropdown && (
                                <div className="absolute top-full left-0 w-72 bg-white text-[#203a8c] shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50 border-t-4 border-red-500">
                                    {item.dropdownLinks.map((sub) => (
                                        <Link key={sub.name} to={sub.path} className="block px-6 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 font-bold text-[11px] uppercase tracking-wide hover:text-red-600 transition-colors">
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* --- MOBILE NAVIGATION DRAWER (NO ANIMATE PRESENCE) --- */}
            <div className={`fixed inset-0 bg-[#203a8c]/80 z-[998] lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
            
            <div className={`fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[999] lg:hidden shadow-2xl flex flex-col border-l-4 border-red-500 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-10">
                        <img src={satiLogo} alt="Logo" className="h-8" />
                        <button onClick={() => setIsOpen(false)} className="text-[#203a8c] p-2"><X size={24} /></button>
                    </div>

                    <ul className="space-y-1 overflow-y-auto flex-grow pr-2">
                        {navItems.map((item) => (
                            <li key={item.name} className="border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <Link to={item.path} className={`text-base font-black uppercase tracking-tight py-4 flex-grow ${location.pathname === item.path ? 'text-red-600' : 'text-[#203a8c]'}`}>{item.name}</Link>
                                    {item.hasDropdown && (
                                        <button onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)} className="p-4 text-[#203a8c]/40">
                                            {mobileDropdown === item.name ? <Minus size={18} /> : <Plus size={18} />}
                                        </button>
                                    )}
                                </div>
                                {item.hasDropdown && (
                                    <div className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-lg ${mobileDropdown === item.name ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                        <div className="py-2 px-4 space-y-1">
                                            {item.dropdownLinks.map((sub) => (
                                                <Link key={sub.name} to={sub.path} className="block py-3 text-[#203a8c] text-xs font-bold border-b border-white last:border-0 uppercase tracking-wide">{sub.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-8">
                        <Link to="/contact"><button className="w-full bg-[#e31e24] text-white py-4 rounded-sm font-black uppercase tracking-widest text-xs shadow-lg">Begin Enrollment</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;