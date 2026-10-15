import React from 'react';
import { useGame } from '../context/useGame';
import { LEARNING_PATH } from '../data/missions';
import { CheckCircle2, Lock, Compass, BookOpen } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { stats } = useGame();

  const totalMissions = 4;
  const completedCount = stats.completedMissions.length;
  const completionPercent = Math.round((completedCount / totalMissions) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto space-y-8 text-left">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-purple-700">
            <Compass className="w-3.5 h-3.5" />
            <span>Skill Diagnostics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
            Learning Progress & Analytics
          </h1>
          <p className="text-slate-600 text-sm max-w-xl">
            Detailed breakdown of your completed challenges, concept mastery, and skill progression.
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Total XP</span>
            <div className="text-2xl font-bold text-slate-900">{stats.xp}</div>
            <span className="text-xs text-purple-700 font-medium">Level {stats.level} Player</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Completed</span>
            <div className="text-2xl font-bold text-slate-900">{completedCount} / {totalMissions}</div>
            <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-purple-600 h-full transition-all duration-500" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Concepts</span>
            <div className="text-2xl font-bold text-slate-900">{stats.unlockedConcepts.length}</div>
            <span className="text-xs text-purple-700 font-medium">Mastered</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Streak</span>
            <div className="text-2xl font-bold text-purple-700">{stats.bestStreak || 0}</div>
            <span className="text-xs text-slate-500">Consecutive Solves</span>
          </div>
        </div>

        {/* Learning Roadmap Modules */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 border-b border-purple-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Curriculum Skill Track</h3>
              <p className="text-xs text-slate-500">Core software engineering concepts covered in challenges</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {LEARNING_PATH.map((concept, idx) => {
              const isUnlocked = stats.unlockedConcepts.includes(concept.name) || concept.unlocked;
              return (
                <div
                  key={concept.name}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-purple-50/40 border-purple-200'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-purple-700">MODULE 0{idx + 1}</span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{concept.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{concept.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
