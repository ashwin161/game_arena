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
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">ELEVATOR_CORE</span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 ${
          isTargetReached 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
            : 'bg-amber-50 text-amber-600 border border-amber-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isTargetReached ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
          <span>{status}</span>
        </div>
      </div>

      {/* Elevator Shaft Display */}
      <div className="relative w-full max-w-[280px] h-[220px] bg-slate-50 rounded-lg border border-slate-200 p-2 my-4 flex justify-between shadow-inner">
        {/* Floor Indicators Column */}
        <div className="flex flex-col justify-between h-full font-mono text-xs font-bold text-slate-400 py-1">
          {[5, 4, 3, 2, 1, 0].map(floor => (
            <div 
              key={floor} 
              className={`flex items-center space-x-1.5 transition-colors ${
                elevatorFloor === floor ? 'text-cyan-600 font-extrabold' : 'text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${elevatorFloor === floor ? 'bg-cyan-500' : 'bg-slate-300'}`} />
              <span>FL {floor}</span>
            </div>
          ))}
        </div>

        {/* Cable & Elevator Cab */}
        <div className="relative flex-1 ml-4 border-l-2 border-dashed border-slate-300 h-full flex items-end">
          {/* Moving Elevator Cab */}
          <div 
            className="absolute left-2 right-0 h-9 bg-white border-2 border-cyan-500 rounded-md shadow-md flex items-center justify-between px-3 transition-all duration-500 ease-out"
            style={{
              bottom: `${(elevatorFloor / 5) * 82}%`
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-extrabold text-cyan-700">CAB #{elevatorFloor}</span>
              {isTargetReached && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </div>
            <ArrowUp className={`w-4 h-4 text-cyan-600 ${elevatorFloor > 0 && !isTargetReached ? 'animate-bounce' : ''}`} />
          </div>
        </div>
      </div>

      {/* Readout */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono space-y-1 text-slate-600">
        <div className="flex justify-between">
          <span className="text-slate-400">CURRENT POSITION:</span>
          <span className="font-bold text-cyan-700">FLOOR {elevatorFloor} / 5</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">TARGET FLOOR:</span>
          <span className="font-semibold text-slate-700">FLOOR 5</span>
        </div>
      </div>
    </div>
  );
};
