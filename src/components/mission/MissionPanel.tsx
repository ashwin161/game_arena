import React from 'react';
import { Target, CheckCircle2, Award, Zap, ShieldCheck } from 'lucide-react';
import type { Mission } from '../../types/game';
import { HintDrawer } from './HintDrawer';

interface MissionPanelProps {
  mission: Mission;
  attempts: number;
}

export const MissionPanel: React.FC<MissionPanelProps> = ({ mission, attempts }) => {
  let diffBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (mission.difficulty === 'Intermediate') diffBadge = 'bg-amber-50 text-amber-700 border-amber-200';
  if (mission.difficulty === 'Hard') diffBadge = 'bg-purple-50 text-purple-700 border-purple-200';

  return (
    <div className="flex flex-col h-full bg-white border border-purple-100 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4 overflow-y-auto">
      {/* Mission Meta Header */}
      <div className="space-y-2 pb-3 border-b border-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
              Problem #{mission.id.toString().padStart(2, '0')}
            </span>
            {attempts > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                Try #{attempts}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${diffBadge}`}>
              {mission.difficulty}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center space-x-1">
              <Award className="w-3 h-3 text-purple-600" />
              <span>+{mission.xpReward} XP</span>
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
          {mission.title}
        </h2>
        <p className="text-xs text-slate-500">{mission.subtitle}</p>

        {/* Concept Pill */}
        <div className="pt-1">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-lg text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span>Concept: {mission.concept}</span>
          </span>
        </div>
      </div>

      {/* Primary Objective Card */}
      <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
        <div className="flex items-center space-x-2 text-purple-900">
          <Target className="w-4 h-4 text-purple-700" />
          <h3 className="text-xs font-bold uppercase tracking-wide">Problem Description</h3>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">{mission.objective}</p>
      </div>

      {/* Expected Verification Test Cases */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>Expected Test Criteria</span>
        </div>
        <div className="space-y-2">
          {mission.testCases.map((tc) => (
            <div 
              key={tc.id} 
              className="p-3 bg-slate-50 hover:bg-purple-50/40 border border-slate-200/80 rounded-xl space-y-1 text-xs transition-colors"
            >
              <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                <span>{tc.description}</span>
              </div>
              <div className="text-[11px] text-slate-500 pl-5 font-mono">
                Outcome: {tc.expectedOutcome}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tiered Hints Drawer */}
      <div className="pt-2">
        <HintDrawer hints={mission.hints} />
      </div>
    </div>
  );
};
