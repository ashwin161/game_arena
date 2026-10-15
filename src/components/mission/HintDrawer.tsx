import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import type { MissionHint } from '../../types/game';
import { sound } from '../../utils/sound';

interface HintDrawerProps {
  hints: MissionHint[];
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ hints }) => {
  const [unlockedTier, setUnlockedTier] = useState<number>(0);
  const [expandedTier, setExpandedTier] = useState<number | null>(null);

  const handleUnlockNext = () => {
    if (unlockedTier < 3) {
      sound.hint();
      const nextTier = unlockedTier + 1;
      setUnlockedTier(nextTier);
      setExpandedTier(nextTier);
    }
  };

  const toggleExpand = (tier: number) => {
    sound.click();
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  return (
    <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3.5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-purple-700" />
          <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wide">Helpful Hints</h4>
        </div>
        <span className="text-[11px] font-medium text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-200">
          {unlockedTier}/3 Unlocked
        </span>
      </div>

      {/* Unlock CTA Button */}
      {unlockedTier < 3 && (
        <button
          onClick={handleUnlockNext}
          className="w-full py-2 px-3 bg-white hover:bg-purple-100/60 border border-purple-200 text-purple-800 rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>
            {unlockedTier === 0 ? 'Reveal Hint 1 (Observation)' : unlockedTier === 1 ? 'Reveal Hint 2 (Concept)' : 'Reveal Hint 3 (Exact Direction)'}
          </span>
        </button>
      )}

      {/* Accordion list of unlocked hints */}
      <div className="space-y-2 mt-2">
        {hints.map((hint) => {
          const isUnlocked = hint.tier <= unlockedTier;
          const isExpanded = expandedTier === hint.tier;

          if (!isUnlocked) return null;

          return (
            <div key={hint.tier} className="bg-white border border-purple-100 rounded-lg overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleExpand(hint.tier)}
                className="w-full p-2.5 flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:bg-purple-50/40 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-800 text-[11px] font-bold flex items-center justify-center">
                    {hint.tier}
                  </span>
                  <span>{hint.type}</span>
                </div>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {isExpanded && (
                <div className="p-3 pt-0 text-xs text-slate-600 leading-relaxed border-t border-purple-50">
                  {hint.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
