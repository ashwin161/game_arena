import React, { useRef } from 'react';
import { Play, RotateCcw, Code2, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';

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
  hasErrors = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = code.split('\n');

  // Handle scroll sync between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Keyboard shortcut: Tab inserts spaces, Ctrl+Enter runs code
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
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        {/* Tab Selection */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('editor');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'editor'
                ? 'bg-white text-cyan-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>EDITOR.py</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setActiveTab('console');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all relative ${
              activeTab === 'console'
                ? 'bg-white text-cyan-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-600" />
            <span>CONSOLE</span>
            {logsCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                hasErrors ? 'bg-rose-100 text-rose-700' : 'bg-cyan-100 text-cyan-700'
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
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-mono font-medium transition-all"
            title="Reset code to mission starting state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              onRun();
            }}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-mono font-bold shadow-sm hover:shadow transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>RUN CODE</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === 'editor' ? (
        <div className="relative flex-1 flex bg-slate-50/50 overflow-hidden">
          {/* Line Numbers Gutter */}
          <div
            ref={lineNumbersRef}
            className="w-12 py-3 bg-slate-100/70 border-r border-slate-200 select-none text-right pr-3 font-mono text-xs text-slate-400 overflow-hidden"
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
              className="w-full h-full p-3 font-mono bg-transparent text-slate-800 resize-none focus:outline-none leading-relaxed"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
