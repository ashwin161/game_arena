import React from 'react';
import { MISSIONS } from '../data/missions';
import { useGame } from '../context/useGame';
import { Lock, Play, Filter, Code2, Sparkles } from 'lucide-react';
import type { Difficulty, Language } from '../types/game';

export const MissionsPage: React.FC = () => {
  const {
    stats,
    navigateToMission,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedLanguage,
    setSelectedLanguage
  } = useGame();

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value as Difficulty | 'All');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value as Language);
  };

  const filteredMissions = selectedDifficulty === 'All'
    ? MISSIONS
    : MISSIONS.filter(m => m.difficulty === selectedDifficulty);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-100 pb-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-purple-700">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Problem Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
              Challenge Directory
            </h1>
            <p className="text-slate-600 text-sm max-w-xl">
              Browse available challenges. Choose difficulty and programming language, then open in the arena.
            </p>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-purple-600" />
              <label htmlFor="missions-diff-select" className="text-xs font-semibold text-slate-600">
                Difficulty:
              </label>
              <select
                id="missions-diff-select"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                className="clean-select text-xs font-semibold py-1 px-2 rounded-lg cursor-pointer text-purple-700"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Hard">Advanced</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
              <Code2 className="w-3.5 h-3.5 text-purple-600" />
              <label htmlFor="missions-lang-select" className="text-xs font-semibold text-slate-600">
                Language:
              </label>
              <select
                id="missions-lang-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="clean-select text-xs font-semibold py-1 px-2 rounded-lg cursor-pointer text-purple-700"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((m) => {
            const isCompleted = stats.completedMissions.includes(m.id);
            const isUnlocked = stats.unlockedMissions.includes(m.id);

            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isCompleted
                    ? 'bg-white border-emerald-200 shadow-sm'
                    : isUnlocked
                    ? 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700">
                      Problem #{m.id}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {m.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        +{m.xpReward} XP
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {m.objective}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-purple-50">
                  <span className="text-xs text-slate-400 font-medium">Concept: {m.concept}</span>

                  {isUnlocked ? (
                    <button
                      onClick={() => navigateToMission(m.id)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-2xs transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isCompleted ? 'Retry' : 'Solve'}</span>
                    </button>
                  ) : (
                    <span className="flex items-center space-x-1 text-slate-400 text-xs">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
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
