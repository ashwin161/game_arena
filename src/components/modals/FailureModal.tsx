import React, { useEffect } from 'react';
import { AlertOctagon, RotateCcw, XCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="p-6 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <AlertOctagon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-rose-100 uppercase">TEST FAILED</span>
              <h2 className="text-2xl font-black tracking-tight">SYSTEM STILL OFFLINE</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-sans">
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-rose-800 font-bold font-mono">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>TEST ASSERTION FAILURE:</span>
            </div>
            <p className="text-rose-900 font-medium">{failedTest || 'Expected output condition was not satisfied.'}</p>
          </div>

          {error && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-1">
              <span className="font-mono text-slate-500 font-bold text-[10px] uppercase">DIAGNOSTIC GUIDANCE:</span>
              <p className="text-slate-700 font-sans">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => {
                sound.click();
                onViewConsole();
              }}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-mono text-xs font-bold transition-all border border-slate-200"
            >
              INSPECT CONSOLE LOGS
            </button>

            <button
              onClick={() => {
                sound.click();
                onRetry();
              }}
              className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md"
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
