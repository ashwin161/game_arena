import React from 'react';
import { Zap, AlertTriangle } from 'lucide-react';
import type { SystemStatus } from '../../types/game';

interface PowerCoreVisualizerProps {
  powerCoreState: { status: SystemStatus; power: number };
}

export const PowerCoreVisualizer: React.FC<PowerCoreVisualizerProps> = ({ powerCoreState }) => {
  const isOnline = powerCoreState.status === 'ONLINE';
  const currentPower = powerCoreState.power;

  return (
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-purple-50">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-purple-700" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Energy Reactor Grid
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-2xs ${
          isOnline 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span>{isOnline ? 'NOMINAL' : `${currentPower}/100 MW`}</span>
        </div>
      </div>

      {/* Reactor Graphics */}
      <div className="relative w-full max-w-[280px] h-[200px] bg-gradient-to-b from-purple-50/40 to-slate-100 rounded-xl border border-purple-100 p-4 my-3 flex flex-col items-center justify-center overflow-hidden shadow-inner">
        {/* Core Reactor Rings */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer ring */}
          <div 
            className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-700 ${
              isOnline ? 'border-purple-500 animate-spin-slow' : 'border-amber-400'
            }`} 
          />
          {/* Middle ring */}
          <div 
            className={`absolute inset-3 rounded-full border-2 transition-all duration-500 ${
              isOnline ? 'border-purple-300' : 'border-slate-300'
            }`} 
          />
          {/* Core Energy Center */}
          <div 
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-md ${
              isOnline 
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-purple-500/30' 
                : 'bg-white text-amber-600 border border-amber-200'
            }`}
          >
            {isOnline ? (
              <Zap className="w-7 h-7 text-white fill-white" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            )}
          </div>
        </div>

        {/* Real-time Power Output Bar */}
        <div className="w-full mt-3 space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>GRID LOAD</span>
            <span className={isOnline ? 'text-purple-700 font-bold' : 'text-amber-700 font-bold'}>
              {currentPower} MW / 100 MW
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 rounded-full ${
                isOnline ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, (currentPower / 100) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sub-status label */}
      <div className="w-full pt-2 border-t border-purple-50 flex items-center justify-between text-xs text-slate-500">
        <span>Target: <strong>100 MW</strong></span>
        <span className={isOnline ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
          {isOnline ? 'Synchronized' : 'Underpowered'}
        </span>
      </div>
    </div>
  );
};
