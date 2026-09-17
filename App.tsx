
import React, { useState } from 'react';
import { LabModule } from './types';
import Sidebar from './components/Sidebar';
import SunStructureModule from './components/SunStructureModule';
import MoonPhasesModule from './components/MoonPhasesModule';
import SystemOrbitsModule from './components/SystemOrbitsModule';
import SizeComparisonModule from './components/SizeComparisonModule';
import AiAssistant from './components/AiAssistant';
import { Info } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<LabModule>(LabModule.SUN_STRUCTURE);

  const renderModule = () => {
    switch (activeModule) {
      case LabModule.SUN_STRUCTURE:
        return <SunStructureModule />;
      case LabModule.MOON_PHASES:
        return <MoonPhasesModule />;
      case LabModule.SYSTEM_ORBITS:
        return <SystemOrbitsModule />;
      case LabModule.SIZE_COMPARISON:
        return <SizeComparisonModule />;
      default:
        return <SunStructureModule />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Header */}
        <header className="p-4 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-xl font-bold text-yellow-500">
              {activeModule === LabModule.SUN_STRUCTURE && "Güneş'in Yapısı ve Özellikleri"}
              {activeModule === LabModule.MOON_PHASES && "Ay'ın Evreleri"}
              {activeModule === LabModule.SYSTEM_ORBITS && "Güneş, Dünya ve Ay Hareketleri"}
              {activeModule === LabModule.SIZE_COMPARISON && "Büyüklük Karşılaştırması"}
            </h1>
            <p className="text-xs text-slate-400">5. Sınıf Fen Bilimleri Simülasyonu</p>
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors" title="Yardım">
            <Info className="w-5 h-5" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative min-h-0 h-full overflow-hidden">
          {renderModule()}
        </div>
      </main>

      {/* Floating AI Assistant */}
      <AiAssistant />
    </div>
  );
};

export default App;
