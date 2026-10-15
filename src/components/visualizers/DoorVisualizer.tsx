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
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Visual Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-purple-50">
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-purple-600'}`} />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Laboratory Access Gate
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-2xs ${
          isOpen 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <span>{status === 'ONLINE' ? 'UNLOCKED' : 'LOCKED'}</span>
        </div>
      </div>

      {/* Main Door Graphic Frame */}
      <div className="relative w-full max-w-[280px] h-[200px] bg-gradient-to-b from-purple-50/50 to-slate-100 rounded-xl border border-purple-100 flex items-center justify-center overflow-hidden my-3 shadow-inner">
        {/* Interior Corridor when open */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/40 via-white to-purple-50 flex flex-col items-center justify-center text-center p-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center border border-purple-200 shadow-sm">
            <ShieldCheck className="w-7 h-7 text-purple-700" />
          </div>
          <span className="text-[11px] font-semibold text-purple-900 mt-2 tracking-wide">
            ACCESS GRANTED
          </span>
        </div>

        {/* Sliding Left Door Panel */}
        <div 
          className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-slate-200 to-purple-100 border-r border-purple-300 transition-transform duration-700 ease-in-out flex items-center justify-end pr-2 z-10 ${
            isOpen ? '-translate-x-[88%]' : 'translate-x-0'
          }`}
        >
          <div className="w-1.5 h-16 bg-purple-400 rounded-full" />
        </div>

        {/* Sliding Right Door Panel */}
        <div 
          className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-slate-200 to-purple-100 border-l border-purple-300 transition-transform duration-700 ease-in-out flex items-center justify-start pl-2 z-10 ${
            isOpen ? 'translate-x-[88%]' : 'translate-x-0'
          }`}
        >
          <div className="w-1.5 h-16 bg-purple-400 rounded-full" />
        </div>

        {/* Center Lock Icon indicator */}
        <div className="absolute z-20 w-10 h-10 rounded-xl bg-white border border-purple-200 shadow-md flex items-center justify-center transition-all duration-300">
          {isOpen ? (
            <Unlock className="w-5 h-5 text-emerald-600" />
          ) : (
            <Lock className="w-5 h-5 text-purple-700" />
          )}
        </div>
      </div>

      {/* Sub-status label */}
      <div className="w-full pt-2 border-t border-purple-50 flex items-center justify-between text-xs text-slate-500">
        <span>Required Level: <strong>&gt;= 7</strong></span>
        <span className={isOpen ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
          {isOpen ? 'Pass' : 'Awaiting Fix'}
        </span>
      </div>
    </div>
  );
};
