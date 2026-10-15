import React, { useState } from 'react';
import { useGame } from '../context/useGame';
import { getRandomMission, generateRandomScenario } from '../utils/random';
import { sound } from '../utils/sound';
import type { Difficulty, Language, Mission } from '../types/game';
import { 
  Dices, 
  Play, 
  Flame, 
  RotateCw, 
  ArrowRight,
  Code2,
  AlertTriangle
} from 'lucide-react';

export const RandomPage: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, navigateToMission } = useGame();
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [candidateMission, setCandidateMission] = useState<Mission>(() => getRandomMission('All'));
  const [scenario, setScenario] = useState(() => generateRandomScenario(candidateMission));
  const [isRolling, setIsRolling] = useState(false);

  const handleReroll = () => {
    sound.click();
    setIsRolling(true);
    setTimeout(() => {
      const nextM = getRandomMission(difficulty, candidateMission.id);
      setCandidateMission(nextM);
      setScenario(generateRandomScenario(nextM));
      setIsRolling(false);
    }, 200);
  };

  const handleLaunch = () => {
    sound.run();
    navigateToMission(candidateMission.id, 'random');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 text-slate-900 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-purple-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-purple-700">
              <Dices className="w-3.5 h-3.5" />
              <span>Random Simulator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
              Adaptive Practice
            </h1>
            <p className="text-slate-600 text-sm">
              Practice solving unpredictable logic issues and algorithm bugs on demand.
            </p>
          </div>

          <button
            onClick={handleReroll}
            className="px-4 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold flex items-center space-x-2 shadow-2xs transition-all cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
            <span>Re-Roll Problem</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Runtime Selector */}
          <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-2 shadow-sm">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center space-x-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Runtime Language</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['python', 'javascript', 'typescript'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-purple-200'
                  }`}
                >
                  {lang === 'javascript' ? 'JS' : lang === 'typescript' ? 'TS' : 'Python'}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-2 shadow-sm">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Difficulty Pool</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['All', 'Easy', 'Intermediate', 'Hard'] as (Difficulty | 'All')[]).map(d => (
                <button
                  key={d}
                  onClick={() => {
                    sound.click();
                    setDifficulty(d);
                    const nextM = getRandomMission(d);
                    setCandidateMission(nextM);
                    setScenario(generateRandomScenario(nextM));
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    difficulty === d
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-purple-200'
                  }`}
                >
                  {d === 'Intermediate' ? 'Med' : d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Random Target Card */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-50 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Dices className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide block">
                  Simulated Problem
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Mission #{candidateMission.id}: {candidateMission.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-800">
                {candidateMission.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                +{candidateMission.xpReward} XP
              </span>
            </div>
          </div>

          {/* Fault Scenario Notice */}
          <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-start space-x-3 text-xs text-purple-900">
            <AlertTriangle className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">{scenario.modifier}</span>
              <span className="text-slate-600">{scenario.alertText}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">
              Objective
            </span>
            <p className="text-slate-700 text-sm leading-relaxed">
              {candidateMission.objective}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex items-center space-x-4">
            <button
              onClick={handleLaunch}
              className="flex-1 py-3.5 px-8 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center space-x-2 shadow-sm shadow-purple-500/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Problem in Arena</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
