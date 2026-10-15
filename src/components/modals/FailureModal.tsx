import React, { useEffect } from 'react';
import { AlertOctagon, RotateCcw, XCircle, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';

interface FailureModalProps {
  failedTest?: string;
  error?: string;
  onRetry: () => void;
  onViewConsole: () => void;
}

export const FailureModal: React.FC<FailureModalProps> = ({
  failedTest,
  error,
  onRetry,
  onViewConsole
}) => {
  useEffect(() => {
    sound.failure();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/25 backdrop-blur-md animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="failure-modal-title">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl border border-rose-200/80 rounded-3xl shadow-2xl shadow-rose-950/10 overflow-hidden">
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <AlertOctagon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-rose-200 uppercase">ASSERTION ERROR</span>
              <h2 id="failure-modal-title" className="text-2xl font-black tracking-tight text-white">System Still Offline</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-sans text-slate-700">
          <div className="bg-rose-50/90 border border-rose-200/90 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-rose-700 font-bold font-mono">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>TEST ASSERTION FAILURE:</span>
            </div>
            <p className="text-rose-900 font-medium leading-relaxed">{failedTest || 'Expected output condition was not satisfied.'}</p>
          </div>

          {error && (
            <div className="bg-purple-50/60 border border-purple-100 p-4 rounded-2xl text-xs space-y-1">
              <span className="font-mono text-purple-700 font-bold text-[10px] uppercase">DIAGNOSTIC GUIDANCE:</span>
              <p className="text-slate-700 font-sans leading-relaxed">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => {
                sound.click();
                onViewConsole();
              }}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-mono text-xs font-bold transition-all border border-slate-200 flex items-center justify-center space-x-1.5"
            >
              <Terminal className="w-4 h-4 text-purple-600" />
              <span>INSPECT CONSOLE</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                onRetry();
              }}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-rose-500/25"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY CODE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
