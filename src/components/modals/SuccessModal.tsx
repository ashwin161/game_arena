import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
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
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const hasNextMission = mission.id < 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-100 uppercase">MISSION COMPLETED</span>
              <h2 className="text-2xl font-black tracking-tight">SYSTEM RESTORED</h2>
            </div>
          </div>
          <div className="px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full font-mono text-xs font-bold border border-white/30 flex items-center space-x-1">
            <Award className="w-4 h-4 text-cyan-200" />
            <span>+{mission.xpReward} XP</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-sans">
          {/* Post-Mortem Report */}
          <div className="space-y-3 bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs">
            <div className="space-y-1">
              <span className="font-mono text-rose-600 font-bold uppercase tracking-wider text-[10px]">What Was Wrong:</span>
              <p className="text-slate-700 font-medium">{mission.solutionExplanation.whatWasWrong}</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-200">
              <span className="font-mono text-emerald-600 font-bold uppercase tracking-wider text-[10px]">What Was Fixed:</span>
              <p className="text-slate-700 font-medium">{mission.solutionExplanation.whatWasFixed}</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-200">
              <span className="font-mono text-purple-600 font-bold uppercase tracking-wider text-[10px]">Concept Mastered:</span>
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
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY MISSION</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                onNextMission();
              }}
              className="flex-1 py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
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
