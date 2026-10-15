import React, { useState } from 'react';
import { useGame } from '../context/useGame';
import type { Language, Difficulty, GameMode } from '../types/game';
import { sound } from '../utils/sound';
import { 
  ArrowRight, 
  Check, 
  ShieldAlert, 
  Dices, 
  Flame, 
  Cpu, 
  Layers
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { completeOnboarding, profile } = useGame();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(profile.name !== 'Operative' ? profile.name : '');
  const [language, setLanguage] = useState<Language>('python');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('Easy');
  const [mode, setMode] = useState<GameMode>('campaign');

  const languages: { id: Language; name: string; tag: string; description: string; icon: string }[] = [
    {
      id: 'python',
      name: 'Python',
      tag: 'Popular & Friendly',
      description: 'Clean syntax, dynamic typing, ideal for algorithmic debugging.',
      icon: '🐍'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      tag: 'Web & Runtime Focused',
      description: 'Standard modern ES6 syntax and event-driven patterns.',
      icon: '⚡'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      tag: 'Typed & Robust',
      description: 'Explicit type annotations and interfaces for robust coding.',
      icon: '🔷'
    }
  ];

  const difficulties: { id: Difficulty | 'All'; title: string; subtitle: string; icon: React.ElementType }[] = [
    {
      id: 'Easy',
      title: 'Easy',
      subtitle: 'Fundamentals and core conditional logic',
      icon: ShieldAlert
    },
    {
      id: 'Intermediate',
      title: 'Intermediate',
      subtitle: 'Multi-step debugging and routines',
      icon: Flame
    },
    {
      id: 'Hard',
      title: 'Advanced',
      subtitle: 'Complex state issues and nested logic',
      icon: Cpu
    },
    {
      id: 'All',
      title: 'Random',
      subtitle: 'Let the arena dynamically choose',
      icon: Dices
    }
  ];

  const modes: { id: GameMode; title: string; subtitle: string; description: string; icon: React.ElementType }[] = [
    {
      id: 'campaign',
      title: 'Campaign Mode',
      subtitle: 'Step-by-step progression',
      description: 'Progress through 10 structured levels with 100 curated coding tasks.',
      icon: Layers
    },
    {
      id: 'random',
      title: 'Random Practice',
      subtitle: 'Direct simulation mode',
      description: 'Instant dive into dynamic debugging challenges without linear constraints.',
      icon: Dices
    }
  ];

  const handleNext = () => {
    sound.click();
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      completeOnboarding(name, language, difficulty, mode);
    }
  };

  const handlePrev = () => {
    sound.click();
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) return name.trim().length > 0;
    return true;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 text-slate-900 font-sans">
      <div className="max-w-xl w-full mx-auto space-y-6 my-auto">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
            Setup • Step {step} of 4
          </span>

          <div className="flex items-center space-x-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-7 bg-purple-600'
                    : s < step
                    ? 'w-3.5 bg-purple-300'
                    : 'w-3.5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Main Card */}
        <div className="bg-white/95 backdrop-blur-md border border-purple-100 rounded-3xl p-6 sm:p-9 shadow-md shadow-purple-500/5 space-y-6">
          
          {/* STEP 1: Name */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
                  What should we call you?
                </h2>
                <p className="text-slate-500 text-sm">
                  Enter your name or preferred handle. You can play as a guest without creating an account.
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Your Name / Handle
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && isStepValid()) handleNext();
                    }}
                    placeholder="e.g. Ashwin"
                    autoFocus
                    maxLength={32}
                    className="w-full bg-slate-50 border border-purple-200 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 placeholder-slate-400 font-sans text-base px-4 py-3 rounded-xl outline-none transition-all"
                  />
                  {name.trim() && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Programming Language */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
                  Choose your programming language
                </h2>
                <p className="text-slate-500 text-sm">
                  Select the language for your code exercises. You can switch this at any time in the arena.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {languages.map(lang => {
                  const isSelected = language === lang.id;
                  return (
                    <div
                      key={lang.id}
                      onClick={() => {
                        sound.click();
                        setLanguage(lang.id);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-50/80 border-purple-500 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-purple-50/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <span className="text-2xl">{lang.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-sm text-slate-900">
                              {lang.name}
                            </h4>
                            <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-purple-100 text-purple-800">
                              {lang.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {lang.description}
                          </p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-slate-300 text-transparent'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Difficulty */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
                  Choose difficulty level
                </h2>
                <p className="text-slate-500 text-sm">
                  Pick your comfortable starting pace.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {difficulties.map(diff => {
                  const Icon = diff.icon;
                  const isSelected = difficulty === diff.id;
                  return (
                    <div
                      key={diff.id}
                      onClick={() => {
                        sound.click();
                        setDifficulty(diff.id);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-purple-50/80 border-purple-500 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 text-transparent'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900">
                          {diff.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {diff.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Mode */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
                  Choose your game mode
                </h2>
                <p className="text-slate-500 text-sm">
                  Select how you want to experience the CODEBREAK arena.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {modes.map(m => {
                  const Icon = m.icon;
                  const isSelected = mode === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        sound.click();
                        setMode(m.id);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-purple-50/80 border-purple-500 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 text-transparent'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900">
                          {m.title}
                        </h4>
                        <p className="text-xs text-purple-700 font-medium">
                          {m.subtitle}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-50">
            {step > 1 ? (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-6 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center space-x-1.5 transition-all ${
                isStepValid()
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{step === 4 ? 'Enter Arena' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
