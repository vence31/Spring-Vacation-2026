
import React from 'react';
import { AppSection } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div 
        className="text-2xl font-bold tracking-tighter cursor-pointer group"
        onClick={() => setActiveSection(AppSection.HOME)}
      >
        STAYVCS <span className="text-gold italic group-hover:text-white transition-colors">LUX</span>
      </div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
        <button 
          onClick={() => setActiveSection(AppSection.HOME)}
          className={`${activeSection === AppSection.HOME ? 'text-gold' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          Home
        </button>
        <button 
          onClick={() => setActiveSection(AppSection.COLLECTION)}
          className={`${activeSection === AppSection.COLLECTION ? 'text-gold' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          Destinations
        </button>
        <button 
          onClick={() => setActiveSection(AppSection.CONCIERGE)}
          className={`${activeSection === AppSection.CONCIERGE ? 'text-gold' : 'text-gray-400 hover:text-white'} transition-colors`}
        >
          AI Concierge
        </button>
      </div>
      <a 
        href="https://www.expedia.com/shop/stayvcs-llc" 
        className="hidden md:block border border-gold text-gold hover:bg-gold hover:text-black px-6 py-2 transition-all text-xs font-bold uppercase tracking-widest"
      >
        Book Now
      </a>
    </nav>
  );
};

export default Navbar;
