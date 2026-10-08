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
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">DIAGNOSTIC HINTS</h4>
        </div>
        <span className="text-[11px] font-mono font-medium text-slate-500">
          {unlockedTier}/3 Unlocked
        </span>
      </div>

      {/* Unlock CTA Button */}
      {unlockedTier < 3 && (
        <button
          onClick={handleUnlockNext}
          className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-lg text-xs font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {unlockedTier === 0 ? 'Unlock Hint 1 (Observation)' : unlockedTier === 1 ? 'Unlock Hint 2 (Concept)' : 'Unlock Hint 3 (Specific Direction)'}
          </span>
        </button>
      )}

      {/* Accordion list of unlocked hints */}
      <div className="space-y-2 mt-2">
        {hints.map((hint) => {
          const isUnlocked = hint.tier <= unlockedTier;
          const isExpanded = expandedTier === hint.tier;

          if (!isUnlocked) return null;

          let badgeColor = 'bg-slate-100 text-slate-700';
          if (hint.tier === 1) badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';
          if (hint.tier === 2) badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
          if (hint.tier === 3) badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';

          return (
            <div 
              key={hint.tier}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleExpand(hint.tier)}
                className="w-full p-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeColor}`}>
                    TIER {hint.tier}: {hint.type}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-700 font-sans leading-relaxed">
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
