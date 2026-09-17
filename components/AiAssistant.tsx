
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: 'Merhaba genç kaşif! Ben Astro. Güneş, Dünya ve Ay hakkında merak ettiğin her şeyi bana sorabilirsin. Hazır mısın?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Sen 'Astro' adında bir fen bilimleri öğretmen asistanısın. 5. sınıf öğrencilerine (10-11 yaş) Güneş, Dünya ve Ay konularını öğretiyorsun. 5. sınıf müfredatına göre şu bilgileri esas al: 'Güneş'in de Dünya gibi katmanları ve atmosferi vardır. Güneş'in katmanları merkezinden dışarıya doğru çekirdek, ışık küre, renk küre ve taç küredir. Işık küre, renk küre ve taç küre Güneş'in atmosferini oluşturur. Isı ve ışık yayan gök cisimlerine yıldız denir. Güneş, milyarlarca yıldız arasında bize en yakın olanıdır ve orta büyüklükte bir yıldızdır. Güneş, sıcak gazlardan oluşur ve içinde %71 hidrojen, %26,5 helyum ve %2,5 diğer gazlar bulunur.' Cevapların kısa, hevesli, bilimsel olarak doğru ama çok sade olmalı. Karmaşık terimlerden kaçın, örnekler ver. Her cevabında bir uzay emojisi kullan.",
        },
      });

      const assistantMsg = response.text || "Üzgünüm, galakside bir sinyal hatası oluştu. Tekrar sorar mısın?";
      setMessages(prev => [...prev, { role: 'assistant', text: assistantMsg }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Huston, bir problemimiz var! API bağlantısı kurulamadı. 🚀" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-tighter">Astro Asistan</h3>
                <p className="text-[10px] text-blue-100 font-bold uppercase opacity-80">Fen Rehberi</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-2 items-center">
                  <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Astro Düşünüyor...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Astro'ya bir soru sor..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-600/30 flex items-center gap-3 group transition-all hover:scale-110 active:scale-95"
        >
          <div className="relative">
             <MessageSquare className="w-6 h-6" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <span className="font-bold text-sm pr-2 hidden md:inline">Astro'ya Sor!</span>
        </button>
      )}
    </div>
  );
};

export default AiAssistant;
