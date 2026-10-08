import React from 'react';
import { Terminal, Award, Volume2, VolumeX, Flag, Settings as SettingsIcon, Home, Compass } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { PageType } from '../../context/GameContext';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, stats, settings, updateSettings } = useGame();

  const navItems: { id: PageType; label: string; icon: React.ElementType }[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'arena', label: 'Arena', icon: Terminal },
    { id: 'missions', label: 'Missions', icon: Flag },
    { id: 'progress', label: 'Progress', icon: Compass },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentPage('landing')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow transition-all">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="font-mono font-black text-lg tracking-tight text-slate-900">CODEBREAK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 -mt-1 hidden sm:inline">SYS_REPAIR_LAB</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-100 text-cyan-700 border border-slate-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: XP Pill + Sound Toggle */}
        <div className="flex items-center space-x-3">
          {/* XP Pill */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full font-mono text-xs shadow-2xs">
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            <span className="font-bold text-slate-800">{stats.xp} XP</span>
            <span className="text-slate-300">|</span>
            <span className="text-purple-600 font-bold">LVL {stats.level}</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition-all"
            title={settings.soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
