import React from 'react';
import { Lock, Unlock, ShieldCheck } from 'lucide-react';
import type { SystemStatus } from '../../types/game';

interface DoorVisualizerProps {
  doorState: 'LOCKED' | 'OPEN';
}

export const DoorVisualizer: React.FC<DoorVisualizerProps> = ({ doorState }) => {
  const isOpen = doorState === 'OPEN';
  const status: SystemStatus = isOpen ? 'ONLINE' : 'OFFLINE';

  return (
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm relative overflow-hidden">
      {/* Visual Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">SYS_SEC_GATES</span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 ${
          isOpen 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
            : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span>{status}</span>
        </div>
      </div>

      {/* Main Door Graphic */}
      <div className="relative w-full max-w-[280px] h-[220px] bg-slate-100 rounded-lg border-2 border-slate-300 flex items-center justify-center overflow-hidden my-4 shadow-inner">
        {/* Interior Illuminated Corridor when open */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 to-sky-100 flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-full bg-cyan-200/60 flex items-center justify-center border border-cyan-400/30 animate-pulse">
            <ShieldCheck className="w-8 h-8 text-cyan-600" />
          </div>
          <span className="text-xs font-mono text-cyan-700 font-bold mt-2">SECURE SECTOR ACCESS GRANTED</span>
        </div>

        {/* Sliding Left Door Panel */}
        <div 
          className={`absolute top-0 bottom-0 left-0 w-1/2 bg-slate-200 border-r border-slate-300 transition-transform duration-700 ease-in-out flex items-center justify-end pr-2 z-10 ${
            isOpen ? '-translate-x-[85%]' : 'translate-x-0'
          }`}
        >
          <div className="w-1.5 h-16 bg-slate-400 rounded-full" />
        </div>

        {/* Sliding Right Door Panel */}
        <div 
          className={`absolute top-0 bottom-0 right-0 w-1/2 bg-slate-200 border-l border-slate-300 transition-transform duration-700 ease-in-out flex items-center justify-start pl-2 z-10 ${
            isOpen ? 'translate-x-[85%]' : 'translate-x-0'
          }`}
        >
          <div className="w-1.5 h-16 bg-slate-400 rounded-full" />
        </div>

        {/* Center Keypad & Lock Indicator */}
        <div className={`z-20 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-14 h-14 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center">
            {isOpen ? (
              <Unlock className="w-7 h-7 text-emerald-500" />
            ) : (
              <Lock className="w-7 h-7 text-rose-500 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Diagnostics Readout */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono space-y-1 text-slate-600">
        <div className="flex justify-between">
          <span className="text-slate-400">GATE ID:</span>
          <span className="font-semibold text-slate-700">GATE_ALPHA_01</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">LOCK PROTOCOL:</span>
          <span className={isOpen ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
            {isOpen ? 'UNLOCKED' : 'ENGAGED'}
          </span>
        </div>
      </div>
    </div>
  );
};
