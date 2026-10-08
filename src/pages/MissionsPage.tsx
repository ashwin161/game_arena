import React from 'react';
import { MISSIONS } from '../data/missions';
import { useGame } from '../context/GameContext';
import { Lock, CheckCircle2, Award, ArrowRight, Play, Sparkles } from 'lucide-react';

export const MissionsPage: React.FC = () => {
  const { stats, navigateToMission } = useGame();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-xs font-mono font-bold text-slate-600 uppercase">MISSION DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            SYSTEM REPAIR MISSIONS
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl font-sans">
            Select an operational system repair mission below to enter the diagnostic arena and fix broken system code.
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MISSIONS.map((mission) => {
            const isCompleted = stats.completedMissions.includes(mission.id);
            const isUnlocked = stats.unlockedMissions.includes(mission.id);
            const attempts = stats.missionAttempts[mission.id] || 0;

            let diffBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            if (mission.difficulty === 'Medium') diffBadge = 'bg-amber-50 text-amber-700 border-amber-200';
            if (mission.difficulty === 'Hard') diffBadge = 'bg-purple-50 text-purple-700 border-purple-200';

            return (
              <div
                key={mission.id}
                className={`bg-white border rounded-2xl p-6 transition-all shadow-xs flex flex-col justify-between relative overflow-hidden ${
                  isUnlocked
                    ? 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    : 'border-slate-200/60 opacity-60 bg-slate-50/50'
                }`}
              >
                {/* Status Overlay Ribbon */}
                {isCompleted && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>RESTORED</span>
                  </div>
                )}

                {!isUnlocked && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-500 border border-slate-200 rounded-full font-mono text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>LOCKED</span>
                  </div>
                )}

                <div className="space-y-4 text-left">
                  {/* Meta badges */}
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-600">
                      MISSION #{mission.id.toString().padStart(2, '0')}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${diffBadge}`}>
                      {mission.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {mission.concept}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{mission.title}</h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{mission.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{mission.objective}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-mono text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-700 font-bold">
                      <Award className="w-4 h-4 text-cyan-600" />
                      <span>+{mission.xpReward} XP</span>
                    </div>
                    {attempts > 0 && (
                      <span className="text-slate-400">Attempts: {attempts}</span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                  {isUnlocked ? (
                    <button
                      onClick={() => navigateToMission(mission.id)}
                      className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isCompleted ? 'REPLAY MISSION' : 'LAUNCH ARENA'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full py-3 px-4 bg-slate-100 text-slate-400 rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 border border-slate-200 cursor-not-allowed">
                      <Lock className="w-3.5 h-3.5" />
                      <span>COMPLETE PREVIOUS MISSION TO UNLOCK</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
