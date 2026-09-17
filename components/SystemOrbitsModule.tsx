
import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, BookOpen } from 'lucide-react';

const SystemOrbitsModule: React.FC = () => {
  const [angles, setAngles] = useState({ earth: 0, moon: 0, sun: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  // Generate static stars once with useMemo to eliminate background flickering/jitter
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${(i * 17.3 + 7) % 96}%`,
      left: `${(i * 23.9 + 11) % 96}%`,
      size: (i % 3) + 1.2,
      opacity: 0.25 + (i % 5) * 0.12,
    }));
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    let frame: number;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.08); // Delta time in seconds, clamped
      lastTime = currentTime;

      setAngles(prev => ({
        earth: (prev.earth + 14 * speed * dt) % 360,
        moon: (prev.moon + 168 * speed * dt) % 360,
        sun: (prev.sun + 7 * speed * dt) % 360,
      }));

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isAnimating, speed]);

  const resetSimulation = () => {
    setAngles({ earth: 0, moon: 0, sun: 0 });
    setIsAnimating(true);
  };

  return (
    <div className="h-full w-full relative overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 gap-4 sm:gap-6 select-none">
      {/* Background Static Stars (Fixed positions, no jitter) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map(star => (
          <div 
            key={star.id} 
            className="absolute bg-white rounded-full" 
            style={{ 
              top: star.top, 
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }} 
          />
        ))}
      </div>

      {/* Orbit Arena (Contained and hardware-accelerated to prevent layout shifts) */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] aspect-square flex items-center justify-center shrink-0">
        
        {/* SUN (Center) */}
        <div 
          className="z-30 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-600 shadow-[0_0_50px_rgba(234,179,8,0.5)] flex items-center justify-center border-2 border-yellow-200/30 will-change-transform"
          style={{ 
            transform: `rotate(${-angles.sun}deg) translateZ(0)`,
            backfaceVisibility: 'hidden'
          }}
        >
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-900 drop-shadow-md">GÜNEŞ</span>
          {/* Rotation Guide Ring */}
          <div className="absolute -inset-2 rounded-full border border-dashed border-yellow-500/30 pointer-events-none"></div>
        </div>

        {/* Earth Orbit Path (Static dashed ring) */}
        <div className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] md:w-[330px] md:h-[330px] rounded-full border border-slate-700/60 pointer-events-none"></div>

        {/* Earth System Orbiting Container (Fixed size, pure rotation) */}
        <div 
          className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] md:w-[330px] md:h-[330px] pointer-events-none will-change-transform"
          style={{ 
            transform: `rotate(${-angles.earth}deg) translateZ(0)`,
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Earth & Moon Anchor positioned at top of orbit */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            
            {/* Earth */}
            <div 
              className="z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-300/40 overflow-hidden flex items-center justify-center relative will-change-transform"
              style={{ 
                transform: `rotate(${angles.earth * 8}deg) translateZ(0)`,
                backfaceVisibility: 'hidden'
              }}
            >
              <span className="text-[7px] sm:text-[8px] font-bold text-white drop-shadow-sm z-10">DÜNYA</span>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-40"></div>
            </div>

            {/* Moon Orbit Path */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full border border-slate-700/70 pointer-events-none"></div>

            {/* Moon Orbit Container (Rotates counter-clockwise) */}
            <div 
              className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 pointer-events-none will-change-transform"
              style={{ 
                transform: `rotate(${-angles.moon}deg) translateZ(0)`,
                backfaceVisibility: 'hidden'
              }}
            >
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-slate-200 border border-slate-400 shadow-sm"
                title="Ay"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel: Controls & Movement Rules Side-by-Side */}
      <div className="z-40 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 shrink-0 px-2">
        {/* Controls Card */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAnimating(!isAnimating)}
              className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all font-black text-xs tracking-wider ${
                isAnimating 
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25' 
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
              }`}
            >
              {isAnimating ? <><Pause className="w-4 h-4 fill-current" /> DURDUR</> : <><Play className="w-4 h-4 fill-current ml-0.5" /> BAŞLAT</>}
            </button>
            <button 
              onClick={resetSimulation}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
              title="Simülasyonu Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Yörünge Hızı</span>
              <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/20">
                {speed.toFixed(1)}x
              </span>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="4.0" 
              step="0.1"
              value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-yellow-500"
            />
          </div>
        </div>

        {/* 5. Sınıf Hareket Kuralları Card (Side-by-side next to it) */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-yellow-500 font-bold text-[11px]">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
              5. Sınıf Hareket Kuralları
            </span>
            <span className="text-[10px] bg-yellow-500/15 text-yellow-400 px-2 py-0.5 rounded font-semibold">
              Saat Yönünün Tersi ↺
            </span>
          </div>
          <ul className="text-[11px] text-slate-300 space-y-1 leading-snug">
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1"></span>
              <span><strong>Güneş:</strong> Kendi ekseni etrafında döner.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1"></span>
              <span><strong>Dünya:</strong> Kendi ekseninde döner, Güneş etrafında dolanır.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1"></span>
              <span><strong>Ay:</strong> Kendi ekseninde, Dünya ve Güneş etrafında dolanır.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemOrbitsModule;
