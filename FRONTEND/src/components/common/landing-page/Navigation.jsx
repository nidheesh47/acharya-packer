import { Package, Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Form } from "react-router";

export function Navigation({ scrolled, mobileMenuOpen, showForm, onToggleMobileMenu }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative bg-gradient-to-r from-yellow-500 to-amber-500 p-2 rounded-xl shadow-md">
              <Package className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">
                Acharya Pack and Scan
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500">Efficient Logistics Management</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-yellow-600 transition-colors font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-yellow-600 transition-colors font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-yellow-600 transition-colors font-medium">
              Contact
            </button>
            
            {showForm && (
              <Link
                to="/user/login"
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 shadow-md"
              >
                User Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu showForm={showForm} onClose={onToggleMobileMenu} />
        )}
      </div>
    </nav>
  );
}

function MobileMenu({ showForm, onClose }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <div className="md:hidden py-4 border-t border-gray-100">
      <div className="flex flex-col space-y-3">
        <button onClick={() => scrollToSection('features')} className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
          Features
        </button>
        <button onClick={() => scrollToSection('about')} className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
          About
        </button>
        <button onClick={() => scrollToSection('contact')} className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
          Contact
        </button>
        {showForm && (
          <Link
            to="/user/login"
            className="px-3 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg text-center hover:from-yellow-600 hover:to-amber-600 transition-colors"
            onClick={onClose}
          >
            User Login
          </Link>
        )}
      </div>
    </div>
  );
}