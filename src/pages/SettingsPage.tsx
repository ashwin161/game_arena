import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Settings as SettingsIcon, Volume2, VolumeX, Eye, Code, Trash2, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/sound';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetProgress } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6 lg:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8 text-left">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs">
            <SettingsIcon className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-xs font-mono font-bold text-slate-600 uppercase">PREFERENCES & ACCESSIBILITY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            SYSTEM SETTINGS
          </h1>
          <p className="text-slate-600 text-sm">
            Customize editor controls, audio synthesizer preferences, and accessibility options.
          </p>
        </div>

        {/* Settings Sections Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs divide-y divide-slate-100">
          {/* Audio Synthesizer Toggle */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-slate-100 rounded-xl text-cyan-700">
                {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-mono">AUDIO SYNTHESIZER SFX</h3>
                <p className="text-xs text-slate-600 mt-0.5">Enable Web Audio API futuristic feedback sounds for code execution and clicks.</p>
              </div>
            </div>

            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                settings.soundEnabled ? 'bg-cyan-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-slate-100 rounded-xl text-purple-700">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-mono">REDUCED MOTION MODE</h3>
                <p className="text-xs text-slate-600 mt-0.5">Disables high-framerate animations and visual transitions for visual accessibility.</p>
              </div>
            </div>

            <button
              onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                settings.reducedMotion ? 'bg-cyan-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          {/* Code Editor Font Size */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-mono">EDITOR FONT SIZE</h3>
                <p className="text-xs text-slate-600 mt-0.5">Adjust line height and monospace font scaling in the code editor panel.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              {[12, 14, 16].map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`px-3 py-1.5 rounded-lg border font-bold ${
                    settings.fontSize === size
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor Tab Indentation Size */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-mono">TAB INDENTATION SPACES</h3>
                <p className="text-xs text-slate-600 mt-0.5">Set the number of spaces inserted when pressing Tab in the editor.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              {[2, 4].map((spaces) => (
                <button
                  key={spaces}
                  onClick={() => updateSettings({ tabSize: spaces })}
                  className={`px-3 py-1.5 rounded-lg border font-bold ${
                    settings.tabSize === spaces
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {spaces} Spaces
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Danger Zone: Reset Progress */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Trash2 className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-rose-900 font-mono">RESET ALL MISSION PROGRESS</h3>
              <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                Permanently wipes all local XP, unlocked missions, completion time records, and concept badges from localStorage.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.click();
              setShowResetConfirm(true);
            }}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-xs"
          >
            RESET CAREER DATA
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold font-mono text-lg text-slate-900">CONFIRM DATA RESET</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Are you completely sure you want to reset all CODEBREAK game progress? This action cannot be undone.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono font-bold transition-all border border-slate-200"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-sm"
              >
                YES, RESET ALL DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
