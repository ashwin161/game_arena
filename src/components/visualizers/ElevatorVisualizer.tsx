import React from 'react';
import { ArrowUp, Building2, CheckCircle2 } from 'lucide-react';
import type { SystemStatus } from '../../types/game';

interface ElevatorVisualizerProps {
  elevatorFloor: number;
}

export const ElevatorVisualizer: React.FC<ElevatorVisualizerProps> = ({ elevatorFloor }) => {
  const isTargetReached = elevatorFloor === 5;
  const status: SystemStatus = isTargetReached ? 'ONLINE' : (elevatorFloor > 0 ? 'WARNING' : 'OFFLINE');

  return (
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-purple-50">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-purple-700" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Transit Elevator
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-2xs ${
          isTargetReached 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isTargetReached ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span>{status === 'ONLINE' ? 'REACHED TARGET' : `FLOOR ${elevatorFloor}`}</span>
        </div>
      </div>

      {/* Elevator Shaft Display */}
      <div className="relative w-full max-w-[280px] h-[200px] bg-gradient-to-b from-purple-50/40 to-slate-100 rounded-xl border border-purple-100 p-3 my-3 flex justify-between shadow-inner">
        {/* Floor Indicators Column */}
        <div className="flex flex-col justify-between h-full font-mono text-xs font-bold text-slate-400 py-1">
          {[5, 4, 3, 2, 1, 0].map(floor => (
            <div 
              key={floor} 
              className={`flex items-center space-x-2 transition-all ${
                elevatorFloor === floor ? 'text-purple-700 font-extrabold translate-x-1' : 'text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full transition-colors ${elevatorFloor === floor ? 'bg-purple-600 shadow-sm' : 'bg-slate-300'}`} />
              <span>FL {floor}</span>
            </div>
          ))}
        </div>

        {/* Cable & Elevator Cab */}
        <div className="relative flex-1 ml-4 border-l-2 border-dashed border-purple-200 h-full flex items-end">
          {/* Moving Elevator Cab */}
          <div 
            className="absolute left-2 right-0 h-10 bg-white border border-purple-300 rounded-xl shadow-md flex items-center justify-between px-3 transition-all duration-500 ease-out"
            style={{
              bottom: `${(elevatorFloor / 5) * 80}%`
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-purple-900">CAB #{elevatorFloor}</span>
              {isTargetReached && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
            <div className="text-purple-600 font-bold text-xs flex items-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-status label */}
      <div className="w-full pt-2 border-t border-purple-50 flex items-center justify-between text-xs text-slate-500">
        <span>Target: <strong>Floor 5</strong></span>
        <span className={isTargetReached ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
          {isTargetReached ? 'Arrived' : 'In Transit'}
        </span>
      </div>
    </div>
  );
};
