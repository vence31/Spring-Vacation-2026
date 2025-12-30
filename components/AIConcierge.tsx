
import React, { useState, useRef, useEffect } from 'react';
import { getConciergeResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const AIConcierge: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the STAYVCS LUX Private Concierge. How may I elevate your Spring Break 2025 plans today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getConciergeResponse(input, messages);
    setMessages(prev => [...prev, response]);
    setIsLoading(false);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto flex flex-col">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">AI Travel <span className="text-gold italic">Concierge</span></h2>
        <p className="text-gray-400 font-light tracking-widest uppercase text-xs">Powered by Gemini & Google Search</p>
      </div>

      <div className="flex-grow bg-luxury-black border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-2xl relative">
        {/* Chat History */}
        <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-8 scroll-smooth h-[500px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${m.role === 'user' ? 'bg-gold text-black' : 'bg-white/5 text-gray-200'} p-5 rounded-sm shadow-lg`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                {m.groundingLinks && m.groundingLinks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-gold mb-2 font-bold">Curated References:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.groundingLinks.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-white/10 hover:bg-gold hover:text-black transition-colors px-2 py-1 rounded-full truncate max-w-[200px]"
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 p-4 rounded-sm animate-pulse flex gap-2">
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/40">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., Suggest a luxury beach resort in Miami for late March..."
              className="flex-grow bg-white/5 border border-white/10 text-white p-4 rounded-sm focus:outline-none focus:border-gold transition-colors font-light placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gold text-black font-bold uppercase tracking-widest px-8 hover:bg-white transition-colors disabled:opacity-50"
            >
              Consult
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {["Dining Recommendations", "Hidden Excursions", "Flight Logistics"].map((tip) => (
          <button 
            key={tip}
            onClick={() => setInput(tip)}
            className="text-[10px] text-gray-500 hover:text-gold uppercase tracking-[0.2em] border border-white/5 p-3 hover:border-gold transition-all"
          >
            {tip}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AIConcierge;
