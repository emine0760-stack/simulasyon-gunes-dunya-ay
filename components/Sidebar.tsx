
import React from 'react';
import { LabModule } from '../types';
import { Sun, Moon, Orbit, Maximize, GraduationCap } from 'lucide-react';

interface SidebarProps {
  activeModule: LabModule;
  onModuleChange: (module: LabModule) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const navItems = [
    { id: LabModule.SUN_STRUCTURE, label: 'Güneş', icon: Sun },
    { id: LabModule.SIZE_COMPARISON, label: 'Büyüklükler', icon: Maximize },
    { id: LabModule.MOON_PHASES, label: 'Ay Evreleri', icon: Moon },
    { id: LabModule.SYSTEM_ORBITS, label: 'Hareketler', icon: Orbit },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <GraduationCap className="text-yellow-500 w-8 h-8" />
        <span className="font-bold text-base leading-tight">Güneş, Dünya ve Ay<br/><span className="text-yellow-500">Simülasyonu</span></span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onModuleChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeModule === item.id 
                ? 'bg-yellow-500 text-slate-950 font-bold shadow-lg shadow-yellow-500/20' 
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-800/50 m-4 rounded-lg">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Eğitmen Notu</p>
        <p className="text-xs text-slate-300 italic">"Gök cisimleri saatin tersi yönünde döner."</p>
      </div>
    </aside>
  );
};

export default Sidebar;
