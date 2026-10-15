import React from 'react';
import { useGame } from '../context/useGame';
import { MISSIONS } from '../data/missions';
import { sound } from '../utils/sound';
import { 
  Play, 
  Dices, 
  Layers, 
  ArrowRight, 
  Activity,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    profile, 
    stats, 
    skills, 
    currentMissionId, 
    navigateToMission, 
    launchRandomChallenge, 
    setCurrentPage 
  } = useGame();

  const activeMission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];
  const completedCount = stats.completedMissions.length;
  const levelProgressPercent = Math.min(100, Math.round(((stats.xp % 200) / 200) * 100));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Welcome Back, {profile.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
              Ready to code today?
            </h1>
            <p className="text-slate-600 text-sm max-w-xl">
              Track your debugging skills, resume your campaign level, or solve an adaptive random coding challenge.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-3">
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 text-center min-w-[100px]">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Level</span>
              <div className="text-2xl font-black text-purple-900 mt-0.5">LVL {stats.level}</div>
              <div className="w-full bg-purple-200/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${levelProgressPercent}%` }} />
              </div>
            </div>

            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 text-center min-w-[100px]">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Total XP</span>
              <div className="text-2xl font-black text-amber-600 mt-0.5">{stats.xp}</div>
              <span className="text-[10px] text-slate-400 block mt-1">Points</span>
            </div>

            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 text-center min-w-[100px]">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">Solved</span>
              <div className="text-2xl font-black text-emerald-600 mt-0.5">{completedCount}</div>
              <span className="text-[10px] text-slate-400 block mt-1">Challenges</span>
            </div>
          </div>
        </div>

        {/* 2 Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Resume Campaign */}
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide block">Structured Path</span>
                    <h3 className="text-xl font-bold text-slate-900">Campaign Mode</h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold">
                  {completedCount} / 100 Done
                </span>
              </div>

              <div className="p-4 bg-purple-50/40 border border-purple-100 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold uppercase">Next Challenge</span>
                  <span className="text-purple-700 font-bold">{activeMission.difficulty}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Mission #{activeMission.id}: {activeMission.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {activeMission.objective}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => navigateToMission(activeMission.id, 'campaign')}
                className="flex-1 py-3 px-5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Continue Challenge</span>
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setCurrentPage('campaign');
                }}
                className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all cursor-pointer"
              >
                All Levels
              </button>
            </div>
          </div>

          {/* Card 2: Random Challenge */}
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Dices className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide block">Quick Session</span>
                    <h3 className="text-xl font-bold text-slate-900">Random Practice</h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
                  Adaptive
                </span>
              </div>

              <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold uppercase">Simulation Pool</span>
                  <span className="text-indigo-700 font-bold">All Difficulties</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Dynamic Bug Injection
                </h4>
                <p className="text-xs text-slate-600">
                  Quick problem chosen across conditions, loops, and routines for rapid practice without campaign pressure.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => launchRandomChallenge('All')}
                className="flex-1 py-3 px-5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
              >
                <Dices className="w-4 h-4" />
                <span>Roll Random Problem</span>
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setCurrentPage('random');
                }}
                className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer"
              >
                Custom Roll
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Skill Proficiency Cards */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-purple-50 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Programming Skills Matrix</h3>
                <p className="text-xs text-slate-500">Calculated from actual debugging attempts and problem completions</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.click();
                setCurrentPage('progress');
              }}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center space-x-1 cursor-pointer"
            >
              <span>View Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map(skill => (
              <div key={skill.concept} className="bg-purple-50/30 border border-purple-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">{skill.name}</span>
                  <span className="text-xs font-bold text-purple-700">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-purple-100/70 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
