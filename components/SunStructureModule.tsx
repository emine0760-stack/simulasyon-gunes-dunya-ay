
import React, { useState, useEffect } from 'react';
import { Lightbulb, RotateCw, Sparkles, Layers, Compass } from 'lucide-react';

interface LayerInfo {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  glowColor: string;
  badge: string;
  radiusPercent: number; // For responsive SVG rendering
  desc: string;
  temp: string;
}

const layers: LayerInfo[] = [
  { 
    id: 'cekirdek',
    name: 'Çekirdek', 
    color: '#FEF08A', // yellow-200
    borderColor: '#FACC15',
    glowColor: 'rgba(254, 240, 138, 0.6)',
    badge: '1. Merkez Katmanı',
    radiusPercent: 18,
    desc: 'Güneş’in merkezindeki en sıcak ve en yoğun katmandır.', 
    temp: '15 Milyon °C' 
  },
  { 
    id: 'isik-kure',
    name: 'Işık Küre', 
    color: '#FBBF24', // amber-400
    borderColor: '#F59E0B',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    badge: '2. Atmosfer Katmanı',
    radiusPercent: 42,
    desc: 'Gözümüzle gördüğümüz parlak yüzeydir. Güneş atmosferinin ilk katmanıdır.', 
    temp: '6.000 °C' 
  },
  { 
    id: 'renk-kure',
    name: 'Renk Küre', 
    color: '#F97316', // orange-500
    borderColor: '#EA580C',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    badge: '3. Atmosfer Katmanı',
    radiusPercent: 68,
    desc: 'Işık kürenin üzerindeki kırmızımsı renkli atmosfer tabakasıdır.', 
    temp: '10.000 °C' 
  },
  { 
    id: 'tac-kure',
    name: 'Taç Küre', 
    color: '#B45309', // amber-700
    borderColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.3)',
    badge: '4. Dış Atmosfer',
    radiusPercent: 94,
    desc: 'Atmosferin en dış katmanıdır. Tam Güneş tutulmasında taç gibi parlar.', 
    temp: '1 - 2 Milyon °C' 
  },
];

const SunStructureModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'layers' | 'surface'>('layers');
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.6) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <div className="h-full w-full overflow-y-auto p-3 sm:p-5 lg:p-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 max-w-7xl mx-auto">
      
      {/* Visual Simulation Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 w-full max-w-md lg:max-w-none">
        
        {/* Sun Canvas Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 xl:w-96 xl:h-96 flex items-center justify-center select-none">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-yellow-500/20 blur-2xl sm:blur-3xl rounded-full scale-105 animate-pulse"></div>
          
          {activeTab === 'layers' ? (
            /* Layers Mode - Interactive Scaled Rings */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Outer Glow Ring for Corona */}
              <div className="absolute inset-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 animate-pulse"></div>

              {/* Concentric Layers (Rendered Outside to Inside) */}
              {[...layers].reverse().map((layer) => {
                const isSelected = selectedLayer === layer.id;
                const isAnySelected = selectedLayer !== null;
                const sizePercent = `${layer.radiusPercent}%`;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayer(isSelected ? null : layer.id)}
                    className={`absolute rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg`}
                    style={{
                      width: sizePercent,
                      height: sizePercent,
                      backgroundColor: layer.color,
                      border: isSelected ? '3px solid #FFFFFF' : `2px solid ${layer.borderColor}`,
                      boxShadow: isSelected 
                        ? `0 0 25px ${layer.glowColor}, inset 0 0 15px rgba(255,255,255,0.5)`
                        : `0 0 10px ${layer.glowColor}`,
                      opacity: isAnySelected && !isSelected ? 0.45 : 1,
                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                    }}
                    title={`${layer.name} (${layer.badge}) - Tıklayarak inceleyin`}
                  >
                    {layer.id === 'cekirdek' && (
                      <span className="text-[10px] sm:text-xs font-black text-slate-900 tracking-tighter text-center pointer-events-none">
                        Çekirdek
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Surface & Rotation Mode */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Sun Body */}
              <div 
                className="w-4/5 h-4/5 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-red-600 shadow-2xl relative overflow-hidden transition-transform"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                {/* Sunspots (Güneş Lekeleri) */}
                <div className="absolute top-1/4 left-1/3 w-3 h-2.5 sm:w-4 sm:h-3 bg-red-950/70 rounded-full blur-[0.5px]"></div>
                <div className="absolute top-1/2 left-2/3 w-4 h-3 sm:w-5 sm:h-4 bg-red-950/70 rounded-full blur-[0.5px]"></div>
                <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2 sm:w-3 sm:h-2 bg-red-950/70 rounded-full blur-[0.5px]"></div>
                <div className="absolute bottom-1/3 left-1/4 w-3.5 h-2.5 sm:w-4 sm:h-3 bg-red-950/70 rounded-full blur-[0.5px]"></div>
                {/* Texture overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-black"></div>
              </div>

              {/* Rotation Direction Arrow Indicator */}
              <div className="absolute -bottom-2 flex items-center gap-1.5 bg-slate-900/90 border border-yellow-500/40 px-3 py-1 rounded-full text-[11px] text-yellow-400 shadow-lg">
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                <span className="font-semibold">Batıdan Doğuya Dönüş</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Helper / Interactive Guide under Visual */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          {activeTab === 'layers' ? (
            <span>💡 Katman halkalarına tıklayarak veya listeden seçerek inceleyebilirsiniz.</span>
          ) : (
            <button 
              onClick={() => setIsRotating(!isRotating)} 
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              {isRotating ? '⏸ Dönüşü Durdur' : '▶ Dönüşü Başlat'}
            </button>
          )}
        </div>
      </div>

      {/* Information & Cards Column */}
      <div className="w-full lg:w-[460px] xl:w-[500px] shrink-0 flex flex-col space-y-3 max-h-full">
        
        {/* Main Header & MEB Curriculum Definition Card */}
        <div className="bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg sm:text-xl font-black text-yellow-500 uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              {activeTab === 'layers' ? "Güneş'in Yapısı ve Katmanları" : "Güneş'in Özellikleri ve Yüzeyi"}
            </h2>
          </div>

          {/* Key MEB Statement Box - Changes based on activeTab */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-3.5 rounded-xl mb-3 transition-all duration-300">
            {activeTab === 'layers' ? (
              <p className="text-yellow-100 text-xs sm:text-sm leading-relaxed font-normal">
                Güneş'in de Dünya gibi katmanları ve atmosferi vardır. Güneş'in katmanları merkezinden dışarıya doğru <strong className="text-yellow-300 font-bold">çekirdek</strong>, <strong className="text-yellow-300 font-bold">ışık küre</strong>, <strong className="text-yellow-300 font-bold">renk küre</strong> ve <strong className="text-yellow-300 font-bold">taç küre</strong>dir. Işık küre, renk küre ve taç küre Güneş'in atmosferini oluşturur.
              </p>
            ) : (
              <p className="text-yellow-100 text-xs sm:text-sm leading-relaxed font-normal">
                Isı ve ışık yayan gök cisimlerine <strong className="text-yellow-300 font-bold">yıldız</strong> denir. Güneş, milyarlarca yıldız arasında bize en yakın olanıdır ve orta büyüklükte bir yıldızdır. Güneş, sıcak gazlardan oluşur ve içinde <strong className="text-amber-300 font-bold">%71 hidrojen</strong>, <strong className="text-amber-300 font-bold">%26,5 helyum</strong> ve <strong className="text-amber-300 font-bold">%2,5 diğer gazlar</strong> bulunur.
              </p>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2">
            <button 
              onClick={() => { setActiveTab('layers'); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'layers' 
                  ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20 font-black' 
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Katmanlar
            </button>
            <button 
              onClick={() => { setActiveTab('surface'); setSelectedLayer(null); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'surface' 
                  ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20 font-black' 
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Yüzey ve Dönme
            </button>
          </div>
        </div>

        {/* Tab Content 1: Layers List (Compact & Interactive) */}
        {activeTab === 'layers' && (
          <div className="bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Merkezden Dışa Sıralanış
              </span>
              <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold">
                İçten Dışa (1 ➔ 4)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {layers.map((l, index) => {
                const isSelected = selectedLayer === l.id;
                return (
                  <div 
                    key={l.id}
                    onClick={() => setSelectedLayer(isSelected ? null : l.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-yellow-500/15 border-yellow-400 shadow-md ring-1 ring-yellow-400/50' 
                        : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: l.color, border: `1px solid ${l.borderColor}` }}
                      ></div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs text-yellow-400 font-bold">{index + 1}.</span>
                          <h4 className="font-bold text-xs text-white uppercase tracking-tight">{l.name}</h4>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded border font-medium ${
                            l.id === 'cekirdek' 
                              ? 'bg-yellow-950/60 text-yellow-300 border-yellow-800' 
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}>
                            {l.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate sm:whitespace-normal">
                          {l.desc}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-1 rounded-lg shrink-0 ml-2 whitespace-nowrap">
                      {l.temp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 2: Surface & Rotation Info */}
        {activeTab === 'surface' && (
          <div className="bg-slate-900/60 p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-3">
            {/* Gas Composition Visual Breakdown */}
            <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">Güneş'in Gaz Dağılımı</span>
                <span className="text-[10px] text-slate-400">Sıcak Gaz Küresi</span>
              </div>
              
              {/* Stacked bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: '71%' }} className="bg-yellow-400" title="%71 Hidrojen"></div>
                <div style={{ width: '26.5%' }} className="bg-amber-500" title="%26,5 Helyum"></div>
                <div style={{ width: '2.5%' }} className="bg-rose-500" title="%2,5 Diğer Gazlar"></div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-1 pt-1 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-slate-200 font-semibold">%71 Hidrojen</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-slate-200 font-semibold">%26,5 Helyum</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span className="text-slate-200 font-semibold">%2,5 Diğer</span>
                </div>
              </div>
            </div>

            {/* Rotation & Sunspots */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Dönme Hareketi ve Güneş Lekeleri</h3>
                <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">~25 Gün</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Güneş kendi ekseni etrafında <strong>batıdan doğuya</strong> (saat yönünün tersine) döner.
              </p>
            </div>

            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/80">
              <h4 className="text-[11px] font-bold text-orange-400 mb-0.5">Güneş Lekeleri (Koyu Bölgeler):</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Güneş yüzeyinde diğer kısımlara göre daha soğuk olan bölgeler koyu renkte görünür. Bilim insanı <strong>Galileo Galilei</strong>, güneş lekelerinin hareket ettiğini gözlemleyerek Güneş'in döndüğünü kanıtlamıştır.
              </p>
            </div>
          </div>
        )}

        {/* Compact "Did you know?" card */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-3">
          <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-400 shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[10px] font-black text-yellow-400 uppercase tracking-wider">Biliyor muydunuz?</h4>
            <p className="text-[11px] text-slate-300 leading-tight">
              Güneş ışığının Dünya'ya ulaşması yaklaşık <strong>8 dakika 20 saniye</strong> sürer.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SunStructureModule;

