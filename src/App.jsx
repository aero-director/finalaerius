import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css'; 

// --- CONTEXT ---
import { AuthProvider } from './context/AuthContext';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// --- HOME SECTIONS ---
import HeroSection from './pages/HeroSection';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import Rtr2Page from './pages/Rtr2Page'; 
import SimulatorPage from './pages/SimulatorPage';
import AboutPage from './pages/Aboutpage';
import WhyChoosePage from './pages/WhyChoose';
import PopularCourses from './pages/PopularCourses';
import ProgramOverview from './pages/ProgramOverview';
import GalleryPage from './pages/GalleryPage';
import AeriousTestimonials from './pages/AeriousTestimonials';

// --- NAVLINK PAGES ---
import AboutusPage from './navlinks/AboutusPage';
import Courses from './navlinks/Courses/Courses';
import InstrumentRating from './navlinks/Courses/InstrumentRating';
import PrivatePilotLICENCE from './navlinks/Courses/PrivatePilotLicense';
import NightRating from './navlinks/Courses/NightRating';
import CommercialPilotLICENCE from './navlinks/Courses/CommercialPilotLicense';
import FlightInstructorCourse from './navlinks/Courses/FlightInstructorCourse';
import FlyingTrainingAbroad from './navlinks/Courses/FlyingTrainingAbroad';
import NavGallery from './navlinks/NavGallery';
import ContactPage from './navlinks/ContactPage';
import GroundSchoolPage from './navlinks/Courses/GroundSchoolPage';
import AirlinePrepPage from './navlinks/Courses/AirlinePrepPage'; 
import TypeRatingPage from './navlinks/Courses/TypeRatingPage';

// --- SEPARATE COUNTRY PAGES ---
import USAPage from './navlinks/AbroadCountries/USAPage';
import SpainPage from './navlinks/AbroadCountries/SpainPage';
import AustraliaPage from './navlinks/AbroadCountries/AustraliaPage';
import NZPage from './navlinks/AbroadCountries/NZPage';
import PhilippinesPage from './navlinks/AbroadCountries/PhilippinesPage';
import SouthAfricaPage from './navlinks/AbroadCountries/SouthAfricaPage';
import BrazilPage from './navlinks/AbroadCountries/BrazilPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="relative min-h-screen flex flex-col">
          <Navbar />

          <Routes>
            {/* MAIN HOME ROUTE */}
            <Route path="/" element={
              <main>
                <HeroSection /> 
                <section id="about" className="py-4">
                  <AboutPage />
                </section>
                <WhyChoosePage />
                <section id="courses">
                  <PopularCourses />
                </section>
                <ProgramOverview />
                <section id="gallery">
                  <GalleryPage />
                </section>
                <section id="testimonials">
                  <AeriousTestimonials />
                </section>
              </main>
            } />

            {/* GENERAL PAGES */}
            <Route path="/about" element={<AboutusPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/nav-gallery" element={<NavGallery />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* COURSE PAGES */}
            <Route path="/courses/groundschool-page" element={<GroundSchoolPage />} />
            <Route path="/courses/instrument-rating" element={<InstrumentRating />} />
            <Route path="/courses/private-pilot" element={<PrivatePilotLICENCE />} />
            <Route path="/courses/night-rating" element={<NightRating />} />
            <Route path="/courses/commercial-pilot" element={<CommercialPilotLICENCE />} />
            <Route path="/courses/flight-instructor" element={<FlightInstructorCourse />} />
            <Route path="/courses/airline-prep" element={<AirlinePrepPage />} />
            <Route path="/courses/type-rating" element={<TypeRatingPage />} />

            {/* ABROAD HUB */}
            <Route path="/flying-training-abroad" element={<FlyingTrainingAbroad />} />

            {/* INDIVIDUAL COUNTRY PAGES */}
            <Route path="/abroad/usa" element={<USAPage />} />
            <Route path="/abroad/spain" element={<SpainPage />} />
            <Route path="/abroad/australia" element={<AustraliaPage />} />
            <Route path="/abroad/new-zealand" element={<NZPage />} />
            <Route path="/abroad/philippines" element={<PhilippinesPage />} />
            <Route path="/abroad/south-africa" element={<SouthAfricaPage />} />
            <Route path="/abroad/brazil" element={<BrazilPage />} />

            {/* AUTH & PROFILE PAGES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/dashboard" element={<Navigate to="/profile" replace />} />

            {/* AVIATION LEARNING & SIMULATOR MODULES (PROTECTED) */}
            <Route path="/rtr2" element={
              <ProtectedRoute>
                <Rtr2Page />
              </ProtectedRoute>
            } />
            <Route path="/simulator" element={
              <ProtectedRoute>
                <SimulatorPage />
              </ProtectedRoute>
            } />
          </Routes>

          <Footer />
          <FloatingActions />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
