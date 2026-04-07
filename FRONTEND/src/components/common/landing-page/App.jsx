// app/components/common/landing-page/App.jsx
import { useLanding } from "../hooks/useLanding";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { AboutSection } from "./AboutSection";
import { CTASection } from "./CTASection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export default function LandingPage({ showForm = false }) {
  const {
    mobileMenuOpen,
    scrolled,
    formSubmitted,
    mounted,
    isSending,
    actionData,
    setIsSending,
    toggleMobileMenu
  } = useLanding();

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation 
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        showForm={showForm}
        onToggleMobileMenu={toggleMobileMenu}
      />

      <HeroSection showForm={showForm} />
      <FeaturesSection />
      <AboutSection />
      <CTASection showForm={showForm} />
      <ContactSection 
        formSubmitted={formSubmitted}
        actionData={actionData}
        isSending={isSending}
        setIsSending={setIsSending}
      />
      <Footer />

      <style jsx>{`
        @media (max-width: 640px) {
          input, button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}