import React from 'react';
import { Terminal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { ExecutionResult } from '../../types/game';

interface ConsoleOutputProps {
  result: ExecutionResult | null;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="flex-1 p-6 bg-white border border-purple-100 rounded-2xl text-slate-500 font-sans text-xs flex flex-col items-center justify-center space-y-3 select-none">
        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center">
          <Terminal className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-slate-500 text-center max-w-sm">
          Console standing by. Click <strong className="text-purple-700">Run Code</strong> to compile and evaluate your code.
        </p>
      </div>
    );
  }

  const { success, logs, failedTest, error } = result;

  return (
    <div className="flex-1 p-4 bg-white border border-purple-100 rounded-2xl text-slate-800 font-mono text-xs overflow-y-auto space-y-3 leading-relaxed shadow-sm">
      {/* Result Status Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center space-x-3 ${
        success 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
          : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}>
        {success ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
        )}
        <div className="flex-1">
          <p className="font-bold text-sm">
            {success ? 'Test Passed — System Restored Successfully' : 'Test Failed — Logic Condition Not Met'}
          </p>
          {!success && failedTest && (
            <p className="text-[11px] text-rose-700 mt-0.5">{failedTest}</p>
          )}
        </div>
      </div>

      {/* Trace Logs */}
      <div className="mt-2 space-y-1 pt-2 border-t border-purple-50">
        <div className="flex items-center justify-between text-[11px] text-purple-700 font-semibold mb-2">
          <span>Execution Output & Trace</span>
        </div>
        <div className="bg-[#181424] text-slate-100 rounded-xl p-3 space-y-1 font-mono text-[11px]">
          {logs.map((log, idx) => {
            let logColor = 'text-slate-300';
            if (log.includes('[ERROR]') || log.includes('[FAIL]')) logColor = 'text-rose-400 font-bold';
            if (log.includes('[SUCCESS]') || log.includes('[STATUS]')) logColor = 'text-emerald-400 font-bold';
            if (log.includes('[ACTION]')) logColor = 'text-purple-300 font-semibold';
            return (
              <div key={idx} className={`${logColor} leading-relaxed`}>
                {log}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Details */}
      {!success && error && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start space-x-2 text-[11px]">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Debugging Hint:</span>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
