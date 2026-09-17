
import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, Info, X, ChevronRight } from 'lucide-react';

const phases = [
  { 
    name: 'Yeni Ay', 
    shortDesc: 'Ay, Güneş ile Dünya arasındadır.', 
    fullDesc: 'Ay, Güneş ile Dünya arasında (Güneş tarafında) olduğunda gerçekleşir. Bu evrede Ay\'ın Dünya\'ya bakan yüzü güneş ışığı almadığı için Ay gökyüzünde görülmez.',
    features: ['En sol konum', 'Görülmez', 'Döngü başlangıcı'],
    baseAngle: 0
  },
  { 
    name: 'Hilal (Büyüyen)', 
    shortDesc: 'Yeni ay sonrasında ters "C" şekli.', 
    fullDesc: 'Yeni ay evresinden sonra görülür. Ay yörüngesinde aşağı doğru ilerledikçe sağ tarafından ince bir ışık almaya başlar.',
    features: ['Sol-Alt ara konum', 'Ters "C" görünümü', 'Sağdan aydınlanma'],
    baseAngle: 45
  },
  { 
    name: 'İlk Dördün', 
    shortDesc: 'Sağ yarısı aydınlık "D" şekli.', 
    fullDesc: 'Yeni ay evresinden yaklaşık bir hafta sonra görülür. Ay en alt konumdadır. Dünya\'dan bakıldığında sağ yarısı aydınlık, yani "D" harfi gibi görünür.',
    features: ['En alt konum', '"D" harfi görünümü', 'Ana evre'],
    baseAngle: 90
  },
  { 
    name: 'Şişkin Ay (Büyüyen)', 
    shortDesc: 'İlk dördün ile dolunay arası.', 
    fullDesc: 'İlk dördün ile dolunay evreleri arasında gerçekleşen ara evredir. Ay\'ın yarısından fazlası aydınlanmıştır.',
    features: ['Alt-Sağ ara konum', 'Yarısından fazlası parlak', 'Büyümeye devam eder'],
    baseAngle: 135
  },
  { 
    name: 'Dolunay', 
    shortDesc: 'Tam aydınlık parlak daire.', 
    fullDesc: 'Dünya, Güneş ile Ay arasında olduğunda gerçekleşir. Ay en sağ konumdadır. Bu konumda Ay\'ın Dünya\'ya bakan yüzü tamamen aydınlıktır.',
    features: ['En sağ konum', 'Tam daire', 'Güneş\'in tam karşısı'],
    baseAngle: 180
  },
  { 
    name: 'Şişkin Ay (Küçülen)', 
    shortDesc: 'Dolunay ile son dördün arası.', 
    fullDesc: 'Dolunay ile son dördün evreleri arasında gerçekleşen ara evredir. Ay yavaş yavaş küçülmeye başlar.',
    features: ['Sağ-Üst ara konum', 'Küçülme başlangıcı', 'Işık azalır'],
    baseAngle: 225
  },
  { 
    name: 'Son Dördün', 
    shortDesc: 'Sol yarısı aydınlık ters "D".', 
    fullDesc: 'Dolunay evresinden yaklaşık bir hafta sonra gerçekleşir. Ay en üst konumdadır. Dünya\'dan bakıldığında sol yarısı aydınlık, yani ters "D" gibi görünür.',
    features: ['En üst konum', 'Ters "D" görünümü', 'Ana evre'],
    baseAngle: 270
  },
  { 
    name: 'Hilal (Küçülen)', 
    shortDesc: 'Yeni ay öncesi "C" şekli.', 
    fullDesc: 'Yeni ay evresinden hemen önce görülür. Ay, gökyüzünde "C" harfi şeklinde görünür. Döngü tamamlanmak üzeredir.',
    features: ['Üst-Sol ara konum', '"C" harfi görünümü', 'Soldan ince ışık'],
    baseAngle: 315
  },
];

const MoonPhasesModule: React.FC = () => {
  const [angle, setAngle] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(true);
  const [speed, setSpeed] = useState(0.5); 
  const [selectedPhase, setSelectedPhase] = useState<typeof phases[0] | null>(null);

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (isAnimating) {
        // Kesintisiz artış (360'a gelince sıfırlamak yerine devam eder)
        setAngle(prev => prev + speed);
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isAnimating, speed]);

  // Mevcut açının 360 içindeki karşılığını hesapla
  const normalizedAngle = useMemo(() => {
    return ((angle % 360) + 360) % 360;
  }, [angle]);

  const currentPhaseIndex = Math.floor(((normalizedAngle + 22.5) % 360) / 45);
  const currentPhase = phases[currentPhaseIndex];

  // Ay'ın Dünya'dan görünümü (Gölge Mantığı)
  // Güneş SOLDAYKEN (Angle 0 = Sol):
  // 0° (Sol): Yeni Ay -> %100 Karanlık
  // 90° (Alt): İlk Dördün -> Sağ %50 Aydınlık (D)
  // 180° (Sağ): Dolunay -> %100 Aydınlık
  // 270° (Üst): Son Dördün -> Sol %50 Aydınlık (Ters D)
  const getMoonShadow = (ang: number) => {
    const norm = ((ang % 360) + 360) % 360;
    if (norm <= 180) {
      // 0 - 180: Sağ taraftan aydınlanma artar (D yönünde)
      const percent = (norm / 180) * 100;
      return `linear-gradient(to right, #1e293b ${100 - percent}%, #facc15 0%)`;
    } else {
      // 180 - 360: Sağ taraftan kararma artar (Ters D yönünde aydınlık solda kalır)
      const percent = ((norm - 180) / 180) * 100;
      return `linear-gradient(to right, #facc15 ${100 - percent}%, #1e293b 0%)`;
    }
  };

  return (
    <div className="h-full flex flex-col p-6 gap-6 animate-in fade-in duration-500 overflow-y-auto custom-scrollbar">
      <div className="flex-1 flex flex-col lg:flex-row gap-8 items-center justify-center">
        
        {/* Simülasyon Alanı */}
        <div className="relative w-full max-w-[500px] h-[400px] bg-slate-900/40 rounded-[2rem] border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden shrink-0">
          {/* Güneş Işığı (Soldan) */}
          <div className="absolute left-0 h-full w-40 bg-gradient-to-r from-yellow-500/15 via-yellow-500/5 to-transparent pointer-events-none"></div>
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-60">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="w-12 h-[1px] bg-yellow-400/50 rounded-full"></div>
             ))}
             <span className="text-[10px] text-yellow-500 font-black uppercase tracking-tighter" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>GÜNEŞ IŞIĞI</span>
          </div>

          {/* Dünya (Merkez) */}
          <div className="relative z-10">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] border-4 border-blue-400/20 overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-50 scale-150 animate-[spin_40s_linear_infinite]"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-900/20 px-2 py-0.5 rounded-full border border-blue-500/20">DÜNYA</div>
          </div>

          {/* Yörünge Çizgisi */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-700/40"></div>

          {/* Dönen Ay Sistemi (Saat yönünün tersine hareket için açıyı negatif kullanıyoruz) */}
          <div 
            className="absolute w-[300px] h-[300px] transition-transform duration-75 ease-linear"
            style={{ transform: `rotate(${-angle}deg)` }} 
          >
            {/* Ay (Angle 0 = Tam Sol, Güneş tarafı) */}
            <div 
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-help"
              style={{ transform: `rotate(${angle}deg)` }}
              onClick={() => { setSelectedPhase(currentPhase); setIsAnimating(false); }}
            >
              <div 
                className="w-14 h-14 rounded-full border-2 border-slate-700 shadow-2xl relative overflow-hidden transition-all duration-300 group-hover:scale-110"
                style={{ background: getMoonShadow(angle) }}
              >
                 <div className="absolute top-3 left-3 w-3 h-3 bg-black/5 rounded-full"></div>
                 <div className="absolute bottom-4 right-4 w-2 h-2 bg-black/5 rounded-full"></div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-bold text-yellow-500 bg-slate-900/90 px-2 py-1 rounded border border-yellow-500/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
                AY (EVRE GÖRÜNÜMÜ)
              </div>
            </div>
          </div>

          {/* Konum Etiketleri */}
          <div className="absolute inset-0 pointer-events-none text-[8px] font-bold text-slate-600 uppercase">
             <span className="absolute left-2 top-1/2 -translate-y-1/2">Yeni Ay</span>
             <span className="absolute bottom-2 left-1/2 -translate-x-1/2">İlk Dördün</span>
             <span className="absolute right-2 top-1/2 -translate-y-1/2">Dolunay</span>
             <span className="absolute top-2 left-1/2 -translate-x-1/2">Son Dördün</span>
          </div>
        </div>

        {/* Kontrol ve Bilgi Paneli */}
        <div className="w-full lg:w-[450px] flex flex-col gap-4">
          <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700 shadow-xl group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-black text-yellow-500 tracking-tighter uppercase">{currentPhase.name}</h3>
              <button 
                onClick={() => { setSelectedPhase(currentPhase); setIsAnimating(false); }}
                className="p-2 bg-yellow-500/10 text-yellow-500 rounded-xl hover:bg-yellow-500/20 transition-all"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 h-20 overflow-y-auto custom-scrollbar">
              {currentPhase.fullDesc}
            </p>
            
            <button 
              onClick={() => { setSelectedPhase(currentPhase); setIsAnimating(false); }}
              className="w-full py-3 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-2xl text-xs font-black text-yellow-500 flex items-center justify-center gap-2 transition-all border border-yellow-500/20"
            >
              DETAYLI İNCELE <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hızlı Gezinti */}
          <div className="grid grid-cols-4 gap-2">
            {phases.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAngle(p.baseAngle);
                  setIsAnimating(false);
                  setSelectedPhase(p);
                }}
                className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                  currentPhaseIndex === idx 
                    ? 'bg-yellow-500 text-slate-950 border-yellow-500 shadow-lg shadow-yellow-500/20 font-bold' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div 
                  className={`w-6 h-6 rounded-full border ${currentPhaseIndex === idx ? 'border-slate-950' : 'border-slate-700'}`} 
                  style={{ background: getMoonShadow(p.baseAngle) }}
                ></div>
                <span className="text-[8px] uppercase text-center leading-tight truncate w-full">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Kumanda Paneli */}
          <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 space-y-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAnimating(!isAnimating)}
                className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-black text-xs tracking-widest ${
                  isAnimating 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
                    : 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20'
                }`}
              >
                {isAnimating ? <><Pause className="w-4 h-4 fill-current" /> DURDUR</> : <><Play className="w-4 h-4 fill-current ml-0.5" /> BAŞLAT</>}
              </button>
              <button 
                onClick={() => { setAngle(0); setIsAnimating(true); }}
                className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-all shadow-md"
                title="Yörüngeyi Sıfırla"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dönüş Hızı (Zaman Akışı)</span>
                <span className="text-xs font-mono font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-lg border border-yellow-500/20">{speed.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="3.0" 
                step="0.1"
                value={speed} 
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-yellow-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detay Modalı */}
      {selectedPhase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-[3rem] shadow-2xl overflow-hidden">
            <button 
              onClick={() => setSelectedPhase(null)}
              className="absolute top-8 right-8 p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Görsel Bölüm */}
              <div className="w-full md:w-2/5 bg-slate-800/30 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-700/50">
                <div 
                  className="w-40 h-40 rounded-full border-4 border-slate-700 shadow-[0_0_60px_rgba(250,204,21,0.1)] mb-8 transition-all duration-500"
                  style={{ background: getMoonShadow(selectedPhase.baseAngle) }}
                ></div>
                <h4 className="text-yellow-500 font-black text-center text-2xl uppercase tracking-tighter mb-2">{selectedPhase.name}</h4>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 py-1 bg-slate-950/50 rounded-full border border-slate-800">
                   Açı: {selectedPhase.baseAngle}°
                </div>
              </div>

              {/* İçerik Bölümü */}
              <div className="flex-1 p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div>
                  <h3 className="text-[10px] font-black text-yellow-500/50 uppercase tracking-[0.2em] mb-3">Evre Bilgisi</h3>
                  <p className="text-slate-200 text-base leading-relaxed font-medium">
                    {selectedPhase.fullDesc}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-yellow-500/50 uppercase tracking-[0.2em]">Özellikler</h3>
                  <div className="grid gap-3">
                    {selectedPhase.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.4)]"></div>
                        <span className="text-sm text-slate-300 font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      setAngle(selectedPhase.baseAngle);
                      setSelectedPhase(null);
                    }}
                    className="w-full py-4 bg-yellow-500 text-slate-950 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-yellow-500/20 uppercase tracking-widest"
                  >
                    Simülasyonda Göster
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoonPhasesModule;
