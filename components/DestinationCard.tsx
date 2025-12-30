
import React from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <a 
      href={destination.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group overflow-hidden rounded-sm border border-white/10 shadow-2xl transition-all duration-700 hover:-translate-y-2
        ${destination.featured ? 'w-full md:w-[48%]' : 'w-full md:w-[31%]'} h-[400px]`}
    >
      <img 
        src={destination.imageUrl} 
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
      
      <div className="absolute bottom-8 left-8 right-8">
        <h3 className="text-3xl font-serif font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {destination.name}
        </h3>
        <p className="text-gold uppercase text-[10px] tracking-[0.3em] font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {destination.description}
        </p>
        <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-gold transition-all duration-700"></div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs bg-gold text-black px-3 py-1 font-bold tracking-widest uppercase">Explore</span>
      </div>
    </a>
  );
};

export default DestinationCard;
