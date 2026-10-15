import React, { useRef } from 'react';
import { Play, RotateCcw, Code2, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';
import type { Language } from '../../types/game';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  activeTab: 'editor' | 'console';
  setActiveTab: (tab: 'editor' | 'console') => void;
  fontSize?: number;
  tabSize?: number;
  logsCount?: number;
  hasErrors?: boolean;
  language?: Language;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  onRun,
  onReset,
  activeTab,
  setActiveTab,
  fontSize = 14,
  tabSize = 4,
  logsCount = 0,
  hasErrors = false,
  language = 'python'
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = code.split('\n');

  const extMap: Record<Language, string> = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts'
  };

  const currentExt = extMap[language] || 'py';

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const spaces = ' '.repeat(tabSize);
      const newCode = code.substring(0, start) + spaces + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tabSize;
        }
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-purple-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-purple-50/50 border-b border-purple-100">
        {/* Tab Selection */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('editor');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-white text-purple-900 border border-purple-200 shadow-2xs'
                : 'text-slate-600 hover:text-purple-900 hover:bg-purple-100/40'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-purple-600" />
            <span>solution.{currentExt}</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setActiveTab('console');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative cursor-pointer ${
              activeTab === 'console'
                ? 'bg-white text-purple-900 border border-purple-200 shadow-2xs'
                : 'text-slate-600 hover:text-purple-900 hover:bg-purple-100/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>Console</span>
            {logsCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                hasErrors ? 'bg-rose-100 text-rose-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {logsCount}
              </span>
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.click();
              onReset();
            }}
            className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-medium border border-purple-200/80 transition-all cursor-pointer shadow-2xs"
            title="Reset code to starting state"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              onRun();
            }}
            className="flex items-center space-x-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm shadow-purple-500/20 transition-all cursor-pointer transform active:scale-98"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Code</span>
            <span className="hidden sm:inline text-[10px] opacity-80 font-normal">Ctrl+↵</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === 'editor' ? (
        <div className="relative flex-1 flex bg-[#161426] text-slate-100 overflow-hidden">
          {/* Line Numbers Gutter */}
          <div
            ref={lineNumbersRef}
            className="w-12 py-3 bg-[#110f1e] border-r border-purple-950/40 select-none text-right pr-3 font-mono text-xs text-purple-300/40 overflow-hidden"
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Textarea Area */}
          <div className="relative flex-1 h-full">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={e => setCode(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="w-full h-full p-3 font-mono bg-transparent text-purple-50 placeholder-slate-500 resize-none focus:outline-none leading-relaxed selection:bg-purple-600/40 selection:text-white"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
