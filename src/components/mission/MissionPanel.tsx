import React from 'react';
import { Target, CheckCircle2, Award, Zap } from 'lucide-react';
import type { Mission } from '../../types/game';
import { HintDrawer } from './HintDrawer';

interface MissionPanelProps {
  mission: Mission;
  attempts: number;
}

export const MissionPanel: React.FC<MissionPanelProps> = ({ mission, attempts }) => {
  let diffColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (mission.difficulty === 'Medium') diffColor = 'bg-amber-50 text-amber-700 border-amber-200';
  if (mission.difficulty === 'Hard') diffColor = 'bg-purple-50 text-purple-700 border-purple-200';

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4 overflow-y-auto">
      {/* Mission Meta Header */}
      <div className="space-y-2 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-600 tracking-wider">
            MISSION #{mission.id.toString().padStart(2, '0')}
          </span>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${diffColor}`}>
              {mission.difficulty}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center space-x-1">
              <Award className="w-3 h-3 text-cyan-600" />
              <span>+{mission.xpReward} XP</span>
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 leading-tight">{mission.title}</h2>
        <p className="text-xs font-mono text-slate-500">{mission.subtitle}</p>

        {/* Concept Pill */}
        <div className="pt-1">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-mono font-semibold">
            <Zap className="w-3 h-3 text-purple-600" />
            <span>CONCEPT: {mission.concept}</span>
          </span>
        </div>
      </div>

      {/* Primary Objective Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
        <div className="flex items-center space-x-2 text-slate-800">
          <Target className="w-4 h-4 text-cyan-600" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider">PRIMARY OBJECTIVE</h3>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">{mission.objective}</p>
      </div>

      {/* Expected Verification Test Cases */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">VERIFICATION CRITERIA</h4>
        <div className="space-y-1.5">
          {mission.testCases.map((tc) => (
            <div key={tc.id} className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs flex items-start space-x-2.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{tc.description}</p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">{tc.expectedOutcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attempts Tracker */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 bg-slate-100/70 p-2.5 rounded-lg border border-slate-200">
        <span>RUN ATTEMPTS:</span>
        <span className="font-bold text-slate-800">{attempts}</span>
      </div>

      {/* 3-Tier Progressive Hints Drawer */}
      <HintDrawer hints={mission.hints} />
    </div>
  );
};
