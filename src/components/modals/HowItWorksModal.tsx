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
      title: 'INSPECT MISSION',
      desc: 'Read the system diagnostic report, primary objective, and targeted concept.',
      icon: Terminal
    },
    {
      num: '02',
      title: 'EDIT CODE',
      desc: 'Identify the logic flaw in the real code editor and write the clean fix.',
      icon: Code2
    },
    {
      num: '03',
      title: 'RUN & VALIDATE',
      desc: 'Execute code in the deterministic sandbox to run empirical test assertions.',
      icon: Play
    },
    {
      num: '04',
      title: 'SYSTEM REACTS',
      desc: 'Watch the physical system react in real-time as your code restores functionality.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-600" />
            <h2 className="text-lg font-bold font-mono text-slate-900">HOW CODEBREAK WORKS</h2>
          </div>
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            GAME LOOP: <span className="text-cyan-700 font-bold">MISSION → INSPECT CODE → EDIT → RUN → VALIDATE → SYSTEM REACTS → COMPLETE</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-600">{step.num}</span>
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <h4 className="font-mono text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-normal">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-sm"
            >
              GOT IT — ENTER ARENA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
