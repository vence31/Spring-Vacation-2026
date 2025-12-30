
import React, { useState } from 'react';
import { AppSection } from './types';
import { DESTINATIONS } from './constants';
import Navbar from './components/Navbar';
import DestinationCard from './components/DestinationCard';
import AIConcierge from './components/AIConcierge';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === AppSection.HOME && (
        <>
          {/* Hero Section */}
          <header className="relative h-screen flex items-center justify-center text-center">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 group-hover:scale-100"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')" }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div className="relative z-10 px-6 max-w-5xl">
              <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-6 leading-none">
                Your Spring Break <br />
                <span className="text-gold-gradient italic">Vacation Starts Here</span>
              </h1>
              <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto mb-10 tracking-wide">
                Experience luxury at the world's most iconic destinations. 
                Exclusive 2025 deals powered by <span className="text-white font-bold">Expedia</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setActiveSection(AppSection.COLLECTION)}
                  className="bg-gold text-black px-12 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-2xl"
                >
                  Explore Destinations
                </button>
                <button 
                  onClick={() => setActiveSection(AppSection.CONCIERGE)}
                  className="border border-white/20 backdrop-blur-md text-white px-12 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:border-gold hover:text-gold transition-all"
                >
                  Talk to AI Concierge
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold animate-bounce">
              <span className="text-[10px] uppercase tracking-widest">Scroll</span>
              <div className="w-[1px] h-10 bg-gold"></div>
            </div>
          </header>

          {/* Featured Highlights */}
          <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-gold uppercase text-xs tracking-[0.4em] font-bold mb-4">Curated Selection</h2>
                <h3 className="text-4xl md:text-6xl font-serif font-bold">The 2025 Luxury Collection</h3>
              </div>
              <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                Hand-picked destinations offering unparalleled service and breathtaking views for your perfect getaway.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {DESTINATIONS.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>

            <div className="mt-32 text-center py-20 border-y border-white/5">
              <h4 className="text-gold uppercase text-[10px] tracking-[0.5em] font-bold mb-8">Unrivaled Access</h4>
              <h5 className="text-4xl md:text-5xl font-serif font-bold mb-12">Discover More Vacation Spots</h5>
              <a 
                href="https://www.expedia.com/shop/stayvcs-llc" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-gold text-gold hover:bg-gold hover:text-black px-16 py-6 font-bold uppercase tracking-[0.3em] transition-all text-sm"
              >
                Explore the Full Collection
              </a>
            </div>
          </section>
        </>
      )}

      {activeSection === AppSection.COLLECTION && (
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-bold mb-6 italic text-gold">The Portfolio</h2>
            <p className="text-gray-400 max-w-xl mx-auto uppercase tracking-widest text-xs">Exclusively curated stays across the globe</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {DESTINATIONS.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </section>
      )}

      {activeSection === AppSection.CONCIERGE && <AIConcierge />}

      {/* Footer */}
      <footer className="bg-luxury-black border-t border-white/5 py-20 px-6 text-center">
        <div className="mb-10 text-2xl font-bold tracking-tighter">
          STAYVCS <span className="text-gold italic">LUX</span>
        </div>
        <div className="flex justify-center gap-12 mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gold transition-colors">Press Inquiries</a>
          <a href="#" className="hover:text-gold transition-colors">Affiliates</a>
        </div>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
          &copy; 2025 STAYVCS LUX. All Rights Reserved. Luxury curated through Expedia.
        </p>
      </footer>
    </div>
  );
};

export default App;
