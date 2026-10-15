import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle } from 'lucide-react';
import { useGame } from '../context/useGame';
import { HowItWorksModal } from '../components/modals/HowItWorksModal';
import { sound } from '../utils/sound';

export const LandingPage: React.FC = () => {
  const { profile, setCurrentPage } = useGame();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleEnterCodebreak = () => {
    sound.click();
    if (profile.isOnboarded) {
      setCurrentPage('home');
    } else {
      setCurrentPage('onboarding');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#faf8ff] via-[#ffffff] to-[#f5efff] flex flex-col justify-between p-4 sm:p-6 lg:p-12 text-slate-900">
      <main className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto py-8">
        {/* Left Section */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200/80 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-xs font-semibold text-purple-900 tracking-wide">
              Interactive System Debugging Platform
            </span>
          </div>

          {/* Heading with dark-to-purple gradient */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-800">
              The world is broken. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800">
                Your code fixes it.
              </span>
            </h1>
          </div>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            Step into malfunctioning systems. Inspect broken code, identify bugs, and repair doors, elevators, and robotic joints in <span className="text-purple-700 font-semibold">Python</span>, <span className="text-purple-700 font-semibold">JavaScript</span>, or <span className="text-purple-700 font-semibold">TypeScript</span>.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              onClick={handleEnterCodebreak}
              className="px-7 py-3.5 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center space-x-2.5 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Enter CODEBREAK</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                setShowHowItWorks(true);
              }}
              className="px-7 py-3.5 bg-white hover:bg-purple-50/70 text-slate-700 border border-purple-200/90 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Simple 3-Column Highlights */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-purple-100 max-w-lg">
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Levels</span>
              <span className="text-base font-bold text-slate-800">10 Levels</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Languages</span>
              <span className="text-base font-bold text-purple-700">Python • JS • TS</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Execution</span>
              <span className="text-base font-bold text-emerald-700">100% Safe</span>
            </div>
          </div>
        </div>

        {/* Right Section: HackerRank-style Minimal Problem Preview Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl p-6 shadow-xl shadow-purple-500/5 space-y-4 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-purple-50 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-xs font-semibold text-slate-700">Challenge Preview</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Mission 01 • Easy
              </span>
            </div>

            {/* Problem card */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Security Door Logic</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The access credential is level 7, but the guard requires &gt; 10. Update the condition to unlock the door.
              </p>
            </div>

            {/* Code Box */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs space-y-1 shadow-inner">
              <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800 flex justify-between">
                <span>security_door.py</span>
                <span className="text-purple-300">Python 3</span>
              </div>
              <p className="pt-1"><span className="text-purple-400">access_level</span> = <span className="text-amber-400">7</span></p>
              <p className="text-rose-300">
                <span className="text-purple-400">if</span> access_level &gt; <span className="line-through text-rose-400 font-bold">10</span>:
              </p>
              <p className="pl-4 text-emerald-300">door.open()</p>
              <p><span className="text-purple-400">else</span>:</p>
              <p className="pl-4 text-slate-400">door.lock()</p>
            </div>

            {/* Expected Result */}
            <div className="p-3 bg-purple-50/80 border border-purple-100 rounded-xl flex items-center space-x-2.5 text-xs text-purple-900">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="font-medium">Change to <code className="bg-white px-1.5 py-0.5 rounded border border-purple-200 text-purple-700 font-bold">access_level &gt;= 7</code> to repair system.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>CODEBREAK © 2026 — Clean, Minimal Coding Game</p>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0 text-slate-400">
          <span>Python • JS • TS</span>
          <span>•</span>
          <span>Google Sign-In Ready</span>
        </div>
      </footer>

      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}
    </div>
  );
};
