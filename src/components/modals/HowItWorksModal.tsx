import React from 'react';
import { X, Play, Code2, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';

interface HowItWorksModalProps {
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  const steps = [
    {
      num: '01',
      title: 'Inspect Mission',
      desc: 'Read the system diagnostic report, primary objective, and targeted concept.',
      icon: Terminal
    },
    {
      num: '02',
      title: 'Choose Language & Difficulty',
      desc: 'Select Python, JavaScript, or TypeScript, and adjust your challenge difficulty.',
      icon: Code2
    },
    {
      num: '03',
      title: 'Run & Validate',
      desc: 'Execute code in the deterministic sandbox to run empirical test assertions.',
      icon: Play
    },
    {
      num: '04',
      title: 'System Reacts',
      desc: 'Watch the physical system react in real-time as your code restores functionality.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/25 backdrop-blur-md animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="how-it-works-title">
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl shadow-2xl shadow-purple-950/15 overflow-hidden font-sans text-slate-700">
        {/* Header */}
        <div className="p-6 bg-white border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 id="how-it-works-title" className="text-lg font-bold font-mono text-slate-900">How CODEBREAK Works</h2>
          </div>
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-purple-700 font-mono bg-purple-50/70 border border-purple-100 p-3 rounded-xl leading-relaxed">
            GAME LOOP: <span className="text-slate-900 font-bold">MISSION → SELECT LANG/DIFF → EDIT CODE → RUN → VALIDATE → SYSTEM REACTS</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="p-4 bg-purple-50/40 border border-purple-100/80 rounded-2xl space-y-1.5 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-600">{step.num}</span>
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="font-mono text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-purple-100 flex justify-end">
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-md shadow-purple-500/25"
            >
              GOT IT — ENTER ARENA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
