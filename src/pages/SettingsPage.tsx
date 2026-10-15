import React, { useState } from 'react';
import { useGame } from '../context/useGame';
import { Settings as SettingsIcon, Volume2, VolumeX, Eye, Code, Trash2, Filter, Code2 } from 'lucide-react';
import type { Language, Difficulty } from '../types/game';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetProgress,
    selectedLanguage,
    setSelectedLanguage,
    selectedDifficulty,
    setSelectedDifficulty
  } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto space-y-8 text-left">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-purple-700">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
            Settings & Editor Controls
          </h1>
          <p className="text-slate-600 text-sm">
            Customize editor controls, default runtime language, difficulty mode, and audio feedback.
          </p>
        </div>

        {/* Settings Sections Card */}
        <div className="bg-white border border-purple-100 rounded-3xl shadow-sm divide-y divide-purple-50 overflow-hidden">
          {/* Default Programming Language */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Default Programming Language</h3>
                <p className="text-xs text-slate-500 mt-0.5">Select your default coding environment language for challenges.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              {(['python', 'javascript', 'typescript'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl border font-semibold capitalize transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  {lang === 'javascript' ? 'JavaScript' : lang === 'typescript' ? 'TypeScript' : 'Python'}
                </button>
              ))}
            </div>
          </div>

          {/* Default Difficulty Preference */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Default Challenge Difficulty</h3>
                <p className="text-xs text-slate-500 mt-0.5">Filter the difficulty level of challenges shown in directories.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              {(['All', 'Easy', 'Intermediate', 'Hard'] as (Difficulty | 'All')[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Feedback Toggle */}
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700">
                {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Sound Effects</h3>
                <p className="text-xs text-slate-500 mt-0.5">Procedural feedback on run, test success, and failure.</p>
              </div>
            </div>

            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.soundEnabled ? 'bg-purple-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Reduced Motion</h3>
                <p className="text-xs text-slate-500 mt-0.5">Minimize CSS animations for increased comfort.</p>
              </div>
            </div>

            <button
              onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.reducedMotion ? 'bg-purple-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Editor Font Size and Tab Size */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Editor Typography</h3>
                <p className="text-xs text-slate-500 mt-0.5">Adjust code editor font size and indentation width.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-xs text-slate-500 font-medium">Font:</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                  className="clean-select text-xs font-semibold py-1 px-2.5 rounded-lg border cursor-pointer"
                >
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs text-slate-500 font-medium">Tab:</label>
                <select
                  value={settings.tabSize}
                  onChange={(e) => updateSettings({ tabSize: Number(e.target.value) })}
                  className="clean-select text-xs font-semibold py-1 px-2.5 rounded-lg border cursor-pointer"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset All Progress Option */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Reset Local Session</h3>
                <p className="text-xs text-slate-500 mt-0.5">Erase local attempts, XP, and restart as a new player.</p>
              </div>
            </div>

            {showResetConfirm ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3.5 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                Reset Progress
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
