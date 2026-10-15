import React from 'react';
import { useGame } from '../context/useGame';
import { useAuth } from '../context/useAuth';
import { 
  Activity, 
  KeyRound, 
  RotateCcw,
  LogOut,
  ShieldCheck,
  User
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, stats, skills, resetProgress } = useGame();
  const { user, signInWithGoogle, signOut } = useAuth();

  const totalAttempts = Object.values(stats.missionAttempts).reduce((acc, curr) => acc + curr, 0);
  const completedCount = stats.completedMissions.length;
  const overallSuccessRate = totalAttempts > 0 
    ? Math.min(100, Math.round((completedCount / totalAttempts) * 100)) 
    : 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              {/* Avatar Icon */}
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || profile.name}
                  className="w-18 h-18 rounded-2xl border border-purple-200 shadow-sm object-cover"
                />
              ) : (
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                  <User className="w-9 h-9" />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {user?.displayName || profile.name}
                  </h1>
                  {user ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                      Guest Player
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  {user?.email && (
                    <>
                      <span className="text-purple-700 font-semibold">{user.email}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>ID: <strong className="text-slate-700">{profile.userId}</strong></span>
                  <span>•</span>
                  <span>Language: <strong className="text-purple-700 uppercase">{profile.selectedLanguage}</strong></span>
                  <span>•</span>
                  <span>Level: <strong className="text-amber-600">LVL {stats.level}</strong></span>
                </div>
              </div>
            </div>

            {/* Persistence & Authentication Action Box */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col justify-between space-y-2.5 max-w-xs shadow-2xs">
              <div className="flex items-center space-x-1.5 text-xs text-purple-900 font-bold">
                <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                <span>Cloud Account Sync</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {user 
                  ? 'Your progress and XP are safely saved in Cloud Firestore.' 
                  : 'Playing as a guest. Sign in with Google to keep your progress across devices.'}
              </p>
              {user ? (
                <button
                  onClick={signOut}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-purple-200 flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-purple-200 flex items-center justify-center space-x-2 shadow-2xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Total XP</span>
            <div className="text-2xl font-bold text-slate-900">{stats.xp}</div>
            <span className="text-xs text-purple-700 mt-0.5 block">Points Earned</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Solved</span>
            <div className="text-2xl font-bold text-emerald-700">{completedCount}</div>
            <span className="text-xs text-slate-500 mt-0.5 block">Challenges Fixed</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Accuracy</span>
            <div className="text-2xl font-bold text-amber-700">{overallSuccessRate}%</div>
            <span className="text-xs text-slate-500 mt-0.5 block">{totalAttempts} Attempts</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Best Streak</span>
            <div className="text-2xl font-bold text-purple-700">{stats.bestStreak || 0}</div>
            <span className="text-xs text-slate-500 mt-0.5 block">In a row</span>
          </div>
        </div>

        {/* Programming Skills Breakdown */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 border-b border-purple-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Skill Proficiency Matrix</h3>
              <p className="text-xs text-slate-500">Calculated live from problem completion accuracy</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map(skill => (
              <div key={skill.concept} className="bg-purple-50/30 border border-purple-100 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{skill.name}</span>
                  <span className="font-bold text-purple-700">{skill.percentage}%</span>
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

        {/* Reset Progress Button */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            <strong className="text-slate-800 block">Reset Guest Progress</strong>
            <span>Clear your local attempt history and start fresh.</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all local progress?')) {
                resetProgress();
              }
            }}
            className="px-3.5 py-2 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
