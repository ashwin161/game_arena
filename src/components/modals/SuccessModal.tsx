import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import type { Mission } from '../../types/game';
import { sound } from '../../utils/sound';

interface SuccessModalProps {
  mission: Mission;
  onNextMission: () => void;
  onReplay: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ mission, onNextMission, onReplay }) => {
  useEffect(() => {
    sound.success();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#6366f1', '#06b6d4', '#10b981']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const hasNextMission = mission.id < 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/25 backdrop-blur-md animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl shadow-2xl shadow-purple-950/15 overflow-hidden">
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-purple-200 uppercase flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-300 inline" /> MISSION COMPLETED
              </span>
              <h2 id="success-modal-title" className="text-2xl font-black tracking-tight text-white">System Restored</h2>
            </div>
          </div>
          <div className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-xl font-mono text-xs font-bold border border-white/30 flex items-center space-x-1.5 shadow-sm text-white">
            <Award className="w-4 h-4 text-amber-300" />
            <span>+{mission.xpReward} XP</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-sans text-slate-700">
          {/* Post-Mortem Report */}
          <div className="space-y-3 bg-purple-50/40 border border-purple-100/80 p-4 rounded-2xl text-xs">
            <div className="space-y-1">
              <span className="font-mono text-rose-600 font-bold uppercase tracking-wider text-[10px]">What Was Wrong:</span>
              <p className="text-slate-700 font-medium leading-relaxed">{mission.solutionExplanation.whatWasWrong}</p>
            </div>

            <div className="space-y-1 pt-2.5 border-t border-purple-100">
              <span className="font-mono text-emerald-600 font-bold uppercase tracking-wider text-[10px]">What Was Fixed:</span>
              <p className="text-slate-700 font-medium leading-relaxed">{mission.solutionExplanation.whatWasFixed}</p>
            </div>

            <div className="space-y-1 pt-2.5 border-t border-purple-100">
              <span className="font-mono text-purple-700 font-bold uppercase tracking-wider text-[10px]">Concept Mastered:</span>
              <p className="text-purple-900 font-semibold">{mission.solutionExplanation.conceptLearned}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => {
                sound.click();
                onReplay();
              }}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all border border-slate-200"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>REPLAY MISSION</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                onNextMission();
              }}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-purple-500/25"
            >
              <span>{hasNextMission ? 'NEXT MISSION' : 'VIEW PROGRESS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
