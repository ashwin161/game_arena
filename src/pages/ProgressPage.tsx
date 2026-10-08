import React from 'react';
import { useGame } from '../context/GameContext';
import { LEARNING_PATH } from '../data/missions';
import { Award, Zap, CheckCircle2, Lock, Target, Compass, BookOpen } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { stats } = useGame();

  const totalMissions = 4;
  const completedCount = stats.completedMissions.length;
  const completionPercent = Math.round((completedCount / totalMissions) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6 lg:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8 text-left">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-xs font-mono font-bold text-slate-600 uppercase">CAREER & SKILL DIAGNOSTICS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            SYSTEM ENGINEER PROGRESS
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl">
            Track your XP, level rank, concept mastery, and algorithmic repair timeline.
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold uppercase">TOTAL XP</span>
              <Award className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">{stats.xp}</div>
            <span className="text-[11px] font-mono text-cyan-700 font-semibold">Level {stats.level} Engineer</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold uppercase">MISSIONS RESTORED</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">{completedCount} / {totalMissions}</div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold uppercase">CONCEPTS MASTERED</span>
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">{stats.unlockedConcepts.length}</div>
            <span className="text-[11px] font-mono text-purple-700 font-semibold">Active Protocols</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold uppercase">REPAIR ACCURACY</span>
              <Target className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              {completedCount > 0 ? '92%' : 'N/A'}
            </div>
            <span className="text-[11px] font-mono text-slate-500">Deterministic Evaluation</span>
          </div>
        </div>

        {/* Learning Path Timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <BookOpen className="w-5 h-5 text-cyan-600" />
            <h2 className="text-lg font-bold font-mono text-slate-900 uppercase">CURRICULUM LEARNING PATH</h2>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
            {LEARNING_PATH.map((item, idx) => {
              const isMastered = stats.unlockedConcepts.includes(item.name);
              const isCurrent = !isMastered && idx === stats.unlockedConcepts.length;

              return (
                <div key={item.name} className="relative flex items-start space-x-4 group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 bg-white transition-all ${
                    isMastered
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                      : isCurrent
                      ? 'border-cyan-500 text-cyan-600 animate-pulse'
                      : 'border-slate-300 text-slate-400'
                  }`}>
                    {isMastered ? '✓' : idx + 1}
                  </div>

                  {/* Content Node */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold font-mono text-sm text-slate-900">{item.name}</h4>
                        {isMastered && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-full">
                            UNLOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-sans mt-0.5">{item.description}</p>
                    </div>

                    {!isMastered && !item.unlocked && (
                      <span className="flex items-center space-x-1 text-slate-400 text-xs font-mono">
                        <Lock className="w-3.5 h-3.5" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
