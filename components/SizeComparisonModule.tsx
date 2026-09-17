
import React from 'react';

const SizeComparisonModule: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center space-y-6 md:space-y-8">
      <div className="text-center max-w-2xl space-y-2">
        <h2 className="text-2xl font-bold text-yellow-500 uppercase tracking-wide">Hacimsel Büyüklük Karşılaştırması</h2>
        <p className="text-slate-400 text-sm">
          Güneş, Dünya ve Ay'ın büyüklüklerini anlamak için meyveleri model olarak kullanabiliriz.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-center gap-12 w-full max-w-5xl">
        {/* Sun - Watermelon */}
        <div className="flex flex-col items-center group">
          <div className="relative mb-4">
             <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-125 group-hover:bg-yellow-500/20 transition-all duration-500"></div>
             <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-green-800 via-green-600 to-green-400 border-4 border-green-900 shadow-2xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20"></div>
                <div className="text-white/20 font-black text-4xl opacity-10 select-none">KARPUZ</div>
             </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-yellow-500">GÜNEŞ</h3>
            <p className="text-xs text-slate-500 font-bold">Karpuz kadar olsaydı...</p>
          </div>
        </div>

        {/* Earth - Apple */}
        <div className="flex flex-col items-center group">
          <div className="relative mb-4">
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-red-500 to-red-800 border-2 border-red-900 shadow-xl relative overflow-hidden flex items-center justify-center">
                <div className="w-1 h-3 bg-green-950 absolute -top-1 rounded-full"></div>
             </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-blue-400">DÜNYA</h3>
            <p className="text-xs text-slate-500 font-bold">Bir elma...</p>
          </div>
        </div>

        {/* Moon - Plum */}
        <div className="flex flex-col items-center group">
          <div className="relative mb-4">
             <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-800 to-slate-900 border border-purple-950 shadow-md"></div>
          </div>
          <div className="text-center">
            <h3 className="text-md font-bold text-slate-300">AY</h3>
            <p className="text-xs text-slate-500 font-bold">...veya bir erik olurdu.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
          <div className="text-yellow-500 font-bold text-sm mb-2">Güneş vs Dünya</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Güneş'in içine yaklaşık <strong>1.300.000 (1.3 milyon)</strong> adet Dünya sığabilir!
          </p>
        </div>
        <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
          <div className="text-blue-400 font-bold text-sm mb-2">Dünya vs Ay</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dünya, Ay'dan yaklaşık <strong>4 kat</strong> daha geniştir (çap olarak). Hacimsel olarak ise 64 Ay bir Dünya eder.
          </p>
        </div>
        <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
          <div className="text-slate-300 font-bold text-sm mb-2">Görünür Büyüklük</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Güneş ve Ay gökyüzünde benzer boyutta görünür çünkü Güneş çok büyük ama çok uzaktadır, Ay ise küçük ama çok yakındır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeComparisonModule;
