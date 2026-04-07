import { Package } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Acharya Pack and Scan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterBrand() {
  const scrollToHero = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={scrollToHero}>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-2 rounded-lg">
          <Package className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Acharya Pack and Scan</h2>
          <p className="text-sm text-gray-400">Logistics Management Solution</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm">
        Streamlining packing and scanning operations for businesses worldwide.
        Efficient, reliable, and easy to use.
      </p>
    </div>
  );
}

function FooterLinks() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <div className="space-y-2">
        <Link 
          to="/user/login" 
          className="block text-gray-400 hover:text-yellow-400 transition-colors"
        >
          Admin Login
        </Link>
        <button onClick={() => scrollToSection('features')} className="block text-gray-400 hover:text-yellow-400 transition-colors">
          Features
        </button>
        <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-yellow-400 transition-colors">
          About Us
        </button>
        <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-yellow-400 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}

function FooterContact() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
      <div className="space-y-2 text-gray-400 text-sm">
        <p>📧 it@acharyapanchakarma.com</p>
        <p>📞 +91 8075146088</p>
        <p>🕒 Mon-Sat, 9AM-7PM IST</p>
      </div>
    </div>
  );
}