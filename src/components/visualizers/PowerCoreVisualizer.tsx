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
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-cyan-600 animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">QUANTUM_REACTOR</span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 ${
          isOnline 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
            : 'bg-amber-50 text-amber-600 border border-amber-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
          <span>{powerCoreState.status}</span>
        </div>
      </div>

      {/* Reactor Graphics */}
      <div className="relative w-full max-w-[280px] h-[220px] bg-slate-50 rounded-lg border border-slate-200 p-4 my-4 flex flex-col items-center justify-center overflow-hidden shadow-inner">
        {/* Core Reactor Rings */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer ring */}
          <div 
            className={`absolute inset-0 rounded-full border-4 border-dashed transition-all duration-700 ${
              isOnline ? 'border-cyan-400 animate-spin-slow' : 'border-amber-300'
            }`} 
          />
          {/* Middle ring */}
          <div 
            className={`absolute inset-3 rounded-full border-2 transition-all duration-500 ${
              isOnline ? 'border-sky-400 animate-pulse' : 'border-slate-300'
            }`} 
          />
          {/* Core Energy Center */}
          <div 
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-md ${
              isOnline 
                ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-cyan-300/50 animate-float' 
                : 'bg-amber-100 text-amber-700 border border-amber-300'
            }`}
          >
            {isOnline ? (
              <Zap className="w-8 h-8 text-white fill-white" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-amber-600 animate-bounce" />
            )}
          </div>
        </div>

        {/* Power Level Bar */}
        <div className="w-full mt-3 bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-300">
          <div 
            className={`h-full transition-all duration-700 ${
              isOnline ? 'bg-gradient-to-r from-cyan-500 to-emerald-400' : 'bg-amber-500'
            }`}
            style={{ width: `${Math.min((currentPower / 100) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Readout */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono space-y-1 text-slate-600">
        <div className="flex justify-between">
          <span className="text-slate-400">TOTAL OUTPUT:</span>
          <span className={isOnline ? 'font-bold text-emerald-600' : 'font-bold text-amber-600'}>
            {currentPower} MW / 100 MW
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">REACTOR GRID:</span>
          <span className="font-semibold text-slate-700">
            {isOnline ? 'BALANCED & OPERATIONAL' : 'DEFICIT - REQUIRES CALIBRATION'}
          </span>
        </div>
      </div>
    </div>
  );
};
