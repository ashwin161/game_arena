import React from 'react';
import { Terminal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { ExecutionResult } from '../../types/game';

interface ConsoleOutputProps {
  result: ExecutionResult | null;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="flex-1 p-4 bg-slate-900 text-slate-300 font-mono text-xs flex flex-col items-center justify-center space-y-2 select-none">
        <Terminal className="w-8 h-8 text-slate-600 mb-1" />
        <p className="text-slate-500">Execution console ready. Click "RUN CODE" to test your solution.</p>
      </div>
    );
  }

  const { success, logs, failedTest, error } = result;

  return (
    <div className="flex-1 p-4 bg-slate-900 text-slate-200 font-mono text-xs overflow-y-auto space-y-2 leading-relaxed">
      {/* Result Status Banner */}
      <div className={`p-3 rounded-lg border flex items-center space-x-2.5 ${
        success 
          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
          : 'bg-rose-950/40 border-rose-500/30 text-rose-400'
      }`}>
        {success ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <div>
          <p className="font-bold text-sm">
            {success ? 'SYSTEM RESTORED — ALL TESTS PASSED' : 'SYSTEM STILL OFFLINE — TEST FAILURE'}
          </p>
          {!success && failedTest && (
            <p className="text-[11px] text-rose-300 mt-0.5">{failedTest}</p>
          )}
        </div>
      </div>

      {/* Detailed Trace Logs */}
      <div className="mt-3 space-y-1 pt-2 border-t border-slate-800">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">--- EXECUTION TRACE LOG ---</p>
        {logs.map((log, idx) => {
          let logColor = 'text-slate-300';
          if (log.includes('[ERROR]') || log.includes('[FAIL]')) logColor = 'text-rose-400 font-bold';
          if (log.includes('[SUCCESS]') || log.includes('[STATUS]')) logColor = 'text-emerald-400 font-bold';
          if (log.includes('[WARN]')) logColor = 'text-amber-400';
          if (log.includes('[EXEC]') || log.includes('[VAR]')) logColor = 'text-cyan-300';

          return (
            <div key={idx} className={`flex items-start space-x-2 ${logColor}`}>
              <span className="text-slate-600 select-none text-[10px]">{`>`}</span>
              <span>{log}</span>
            </div>
          );
        })}
      </div>

      {/* Error Details block if failed */}
      {!success && error && (
        <div className="mt-3 p-3 bg-rose-900/20 border border-rose-800/40 rounded text-rose-300 text-[11px] flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Diagnostic Guidance: </span>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
