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
    <div className="flex flex-col h-full items-center justify-between p-4 bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-purple-50">
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-purple-700" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Kinematic Manipulator
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-2xs ${
          isCalibrated 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isCalibrated ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <span>{status === 'ONLINE' ? 'CALIBRATED' : 'UNRESPONSIVE'}</span>
        </div>
      </div>

      {/* Arm Graphics */}
      <div className="relative w-full max-w-[280px] h-[200px] bg-gradient-to-b from-purple-50/40 to-slate-100 rounded-xl border border-purple-100 p-4 my-3 flex flex-col items-center justify-center overflow-hidden shadow-inner">
        {/* SVG Robot Arm Art */}
        <svg viewBox="0 0 200 160" className="w-44 h-44">
          {/* Base */}
          <rect x="65" y="130" width="70" height="16" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Joint 1 */}
          <circle 
            cx="100" cy="125" r="13" 
            fill={isCalibrated ? '#9333ea' : '#cbd5e1'} 
            className="transition-colors duration-500" 
          />
          
          {/* Lower Arm Segment */}
          <line 
            x1="100" y1="125" 
            x2={isCalibrated ? "130" : "100"} 
            y2={isCalibrated ? "75" : "70"} 
            stroke={isCalibrated ? "#a855f7" : "#94a3b8"} 
            strokeWidth="9" 
            strokeLinecap="round"
            className="transition-all duration-700 ease-in-out"
          />

          {/* Joint 2 */}
          <circle 
            cx={isCalibrated ? "130" : "100"} 
            cy={isCalibrated ? "75" : "70"} 
            r="11" 
            fill={isCalibrated ? '#7c3aed' : '#cbd5e1'} 
            className="transition-all duration-700 ease-in-out" 
          />

          {/* Upper Arm Segment */}
          <line 
            x1={isCalibrated ? "130" : "100"} 
            y1={isCalibrated ? "75" : "70"} 
            x2={isCalibrated ? "160" : "100"} 
            y2={isCalibrated ? "35" : "25"} 
            stroke={isCalibrated ? "#c084fc" : "#94a3b8"} 
            strokeWidth="7" 
            strokeLinecap="round"
            className="transition-all duration-700 ease-in-out" 
          />

          {/* End Effector Claws */}
          <circle 
            cx={isCalibrated ? "160" : "100"} 
            cy={isCalibrated ? "35" : "25"} 
            r="8" 
            fill={isCalibrated ? "#10b981" : "#e11d48"} 
            className="transition-all duration-700 ease-in-out" 
          />
        </svg>

        {isCalibrated && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-semibold">
            <Check className="w-3.5 h-3.5" />
            <span>Power: {robotState.power || 100}%</span>
          </div>
        )}
      </div>

      {/* Sub-status label */}
      <div className="w-full pt-2 border-t border-purple-50 flex items-center justify-between text-xs text-slate-500">
        <span>Routine: <strong>calibrateArm(100)</strong></span>
        <span className={isCalibrated ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
          {isCalibrated ? 'Locked In' : 'Needs Repair'}
        </span>
      </div>
    </div>
  );
};
