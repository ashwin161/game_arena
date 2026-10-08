import React from 'react';
import { Bot, Check } from 'lucide-react';
import type { SystemStatus } from '../../types/game';

interface RobotVisualizerProps {
  robotState: { calibrated: boolean; power: number };
}

export const RobotVisualizer: React.FC<RobotVisualizerProps> = ({ robotState }) => {
  const isCalibrated = robotState.calibrated;
  const status: SystemStatus = isCalibrated ? 'ONLINE' : 'OFFLINE';

  return (
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">ROBOTIC_ARM_04</span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 ${
          isCalibrated 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
            : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isCalibrated ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span>{status}</span>
        </div>
      </div>

      {/* Arm Graphics */}
      <div className="relative w-full max-w-[280px] h-[220px] bg-slate-50 rounded-lg border border-slate-200 p-4 my-4 flex flex-col items-center justify-center overflow-hidden shadow-inner">
        {/* SVG Robot Arm Art */}
        <svg viewBox="0 0 200 160" className="w-44 h-44">
          {/* Base */}
          <rect x="70" y="130" width="60" height="15" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Joint 1 */}
          <circle cx="100" cy="125" r="12" fill={isCalibrated ? '#06b6d4' : '#64748b'} className="transition-colors duration-500" />
          
          {/* Lower Arm Segment */}
          <line 
            x1="100" y1="125" 
            x2={isCalibrated ? "130" : "100"} 
            y2={isCalibrated ? "75" : "70"} 
            stroke="#94a3b8" 
            strokeWidth="8" 
            strokeLinecap="round"
            className="transition-all duration-700 ease-in-out"
          />

          {/* Joint 2 */}
          <circle 
            cx={isCalibrated ? "130" : "100"} 
            cy={isCalibrated ? "75" : "70"} 
            r="10" 
            fill={isCalibrated ? '#8b5cf6' : '#64748b'} 
            className="transition-colors duration-500"
          />

          {/* Upper Arm & Claw */}
          <line 
            x1={isCalibrated ? "130" : "100"} 
            y1={isCalibrated ? "75" : "70"} 
            x2={isCalibrated ? "80" : "100"} 
            y2={isCalibrated ? "35" : "30"} 
            stroke="#64748b" 
            strokeWidth="6" 
            strokeLinecap="round"
            className="transition-all duration-700 ease-in-out"
          />

          {/* End Effector */}
          <circle 
            cx={isCalibrated ? "80" : "100"} 
            cy={isCalibrated ? "35" : "30"} 
            r="7" 
            fill={isCalibrated ? '#10b981' : '#f43f5e'} 
            className={isCalibrated ? 'animate-ping' : ''} 
          />
        </svg>

        {isCalibrated && (
          <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center space-x-1">
            <Check className="w-3 h-3" />
            <span>CALIBRATED</span>
          </div>
        )}
      </div>

      {/* Readout */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono space-y-1 text-slate-600">
        <div className="flex justify-between">
          <span className="text-slate-400">JOINT POWER:</span>
          <span className="font-bold text-slate-700">{robotState.power} %</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">CALIBRATION STATE:</span>
          <span className={isCalibrated ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
            {isCalibrated ? 'OPTIMAL' : 'UNINITIALIZED'}
          </span>
        </div>
      </div>
    </div>
  );
};
