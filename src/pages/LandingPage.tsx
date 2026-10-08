import React, { useState } from 'react';
import { Play, Sparkles, ArrowRight, Cpu } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { HowItWorksModal } from '../components/modals/HowItWorksModal';
import { sound } from '../utils/sound';

export const LandingPage: React.FC = () => {
  const { navigateToMission } = useGame();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-radial-lab bg-lab-grid flex flex-col justify-between p-6 lg:p-12 relative overflow-hidden">
      {/* Background Subtle Lab Glow Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-100/40 blur-3xl rounded-full pointer-events-none -z-10" />

      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
        {/* Left Copy Section */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-600 tracking-wider">SYSTEM DIAGNOSTIC ARENA v2.0</span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none">
              CODEBREAK
            </h1>
            <p className="text-xl sm:text-2xl font-mono font-bold text-cyan-700">
              “The world is broken. Your code fixes it.”
            </p>
          </div>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
            Enter the arena. Find the problem. Fix the code. Change the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={() => navigateToMission(1)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl font-mono font-bold text-sm tracking-wider flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>ENTER ARENA</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                setShowHowItWorks(true);
              }}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-2xl font-mono font-bold text-sm tracking-wider flex items-center justify-center space-x-2 shadow-2xs hover:shadow transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>HOW IT WORKS</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
            <div>
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">MISSIONS</span>
              <span className="font-mono text-lg font-extrabold text-slate-800">4 REAL LABS</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">SANDBOX</span>
              <span className="font-mono text-lg font-extrabold text-slate-800">100% SAFE</span>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">THEME</span>
              <span className="font-mono text-lg font-extrabold text-cyan-700">WHITE LAB</span>
            </div>
          </div>
        </div>

        {/* Right Futuristic Laboratory Graphic Preview Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden group">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">LAB_REPAIR_SIMULATOR</span>
            </div>

            {/* Interactive Preview Element */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between items-center text-slate-500 text-[11px]">
                <span>SECURITY DOOR LOGIC</span>
                <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">FAILING</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 text-slate-700 space-y-1">
                <p><span className="text-purple-600">access_level</span> = <span className="text-cyan-700">7</span></p>
                <p className="text-rose-600"><span className="text-purple-600">if</span> access_level &gt; <span className="text-rose-600 font-bold underline">10</span>:</p>
                <p className="pl-4 text-slate-500">door.open()</p>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-cyan-700 font-bold pt-1">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                <span>Fix condition to access_level &gt;= 7</span>
              </div>
            </div>

            {/* System Status Visual Indicator */}
            <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/60 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-900">QUANTUM KERNEL</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Status: Awaiting Code Fix</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white text-cyan-700 border border-cyan-200 font-mono text-[10px] font-bold rounded-full">
                READY
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="max-w-6xl mx-auto w-full pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400">
        <p>CODEBREAK © 2026 — Clean White Futuristic IDE</p>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <span>Keyboard Ready</span>
          <span>•</span>
          <span>Deterministic Sandbox</span>
        </div>
      </footer>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}
    </div>
  );
};
