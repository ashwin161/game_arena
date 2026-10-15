import React, { useState } from 'react';
import { useGame } from '../context/useGame';
import { MISSIONS } from '../data/missions';
import { executeCode } from '../engine/interpreter';
import type { ExecutionResult, Language } from '../types/game';

// Visualizers
import { DoorVisualizer } from '../components/visualizers/DoorVisualizer';
import { ElevatorVisualizer } from '../components/visualizers/ElevatorVisualizer';
import { RobotVisualizer } from '../components/visualizers/RobotVisualizer';
import { PowerCoreVisualizer } from '../components/visualizers/PowerCoreVisualizer';

// Code Editor & Mission Panel
import { CodeEditor } from '../components/editor/CodeEditor';
import { ConsoleOutput } from '../components/editor/ConsoleOutput';
import { MissionPanel } from '../components/mission/MissionPanel';

// Modals
import { SuccessModal } from '../components/modals/SuccessModal';
import { FailureModal } from '../components/modals/FailureModal';

import { 
  ChevronRight, 
  Eye, 
  FileText
} from 'lucide-react';
import { sound } from '../utils/sound';

export const ArenaPage: React.FC = () => {
  const {
    currentMissionId,
    selectedLanguage,
    setSelectedLanguage,
    gameMode,
    nextMission,
    stats,
    settings,
    recordAttempt,
    completeMission
  } = useGame();

  const mission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];

  const getStartingCodeForMission = (mId: number, lang: Language): string => {
    const targetMission = MISSIONS.find(m => m.id === mId) || MISSIONS[0];
    return targetMission.startingCodes?.[lang] || targetMission.startingCode;
  };

  const [code, setCode] = useState<string>(() => getStartingCodeForMission(mission.id, selectedLanguage));
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'console'>('editor');
  const [leftTab, setLeftTab] = useState<'problem' | 'visualizer'>('problem');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [startTime] = useState<number>(() => Date.now());

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    setSelectedLanguage(newLang);
    setCode(getStartingCodeForMission(mission.id, newLang));
  };

  const handleRun = () => {
    sound.run();
    recordAttempt(mission.id);

    const execRes = executeCode(mission.id, code, selectedLanguage);
    setResult(execRes);

    if (execRes.success) {
      const duration = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      completeMission(mission.id, duration);
      setShowSuccessModal(true);
    } else {
      setShowFailureModal(true);
      setActiveEditorTab('console');
    }
  };

  const handleResetCode = () => {
    setCode(getStartingCodeForMission(mission.id, selectedLanguage));
    setResult(null);
    setShowSuccessModal(false);
    setShowFailureModal(false);
  };

  const attempts = stats.missionAttempts[mission.id] || 0;

  const renderSystemVisualizer = () => {
    const sysState = result?.systemState || {};
    switch (mission.id) {
      case 1:
        return <DoorVisualizer doorState={sysState.doorState || 'LOCKED'} />;
      case 2:
        return <ElevatorVisualizer elevatorFloor={sysState.elevatorFloor ?? 0} />;
      case 3:
        return <RobotVisualizer robotState={sysState.robotState || { calibrated: false, power: 0 }} />;
      case 4:
        return <PowerCoreVisualizer powerCoreState={sysState.powerCoreState || { status: 'WARNING', power: 40 }} />;
      default:
        return <DoorVisualizer doorState="LOCKED" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-3 sm:p-6 flex flex-col font-sans text-slate-900">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col space-y-4">
        
        {/* HackerRank-style Clean Top Bar */}
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-purple-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Mission Info & Breadcrumbs */}
          <div className="flex items-center space-x-3 overflow-x-auto">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              {gameMode === 'campaign' ? 'Campaign' : 'Random Mode'}
            </span>

            <span className="text-slate-300">/</span>

            <h1 className="text-base font-bold text-slate-900 whitespace-nowrap">
              Challenge #{mission.id}: {mission.title}
            </h1>

            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              {mission.difficulty}
            </span>
          </div>

          {/* Quick Selectors & Controls */}
          <div className="flex items-center space-x-3 justify-end">
            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 bg-purple-50/60 px-3 py-1 rounded-xl border border-purple-100">
              <label htmlFor="arena-lang" className="text-xs font-medium text-purple-900">Language:</label>
              <select
                id="arena-lang"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="clean-select text-xs font-semibold bg-transparent border-0 cursor-pointer text-purple-700 outline-none"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (ES6)</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>

            {/* Next Task Button */}
            <button
              onClick={() => {
                sound.click();
                nextMission();
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold border border-purple-200 flex items-center space-x-1 transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* HackerRank-style Clean 2-Column Split Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[580px]">
          
          {/* LEFT COLUMN: Problem Description & Live Hardware State */}
          <div className="lg:col-span-5 flex flex-col space-y-4 h-full">
            {/* Tab switch between Problem Statement & Hardware Visualizer */}
            <div className="flex items-center space-x-2 bg-white/80 p-1.5 rounded-xl border border-purple-100 shadow-2xs">
              <button
                onClick={() => setLeftTab('problem')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  leftTab === 'problem'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Problem Description</span>
              </button>

              <button
                onClick={() => setLeftTab('visualizer')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  leftTab === 'visualizer'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>System Visualizer</span>
              </button>
            </div>

            {/* Left Content Body */}
            <div className="flex-1">
              {leftTab === 'problem' ? (
                <div className="h-full">
                  <MissionPanel mission={mission} attempts={attempts} />
                </div>
              ) : (
                <div className="h-full">
                  {renderSystemVisualizer()}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Code Editor & Console Output */}
          <div className="lg:col-span-7 flex flex-col space-y-4 h-full">
            <div className="flex-1 min-h-[420px] flex flex-col">
              <CodeEditor
                code={code}
                setCode={setCode}
                onRun={handleRun}
                onReset={handleResetCode}
                activeTab={activeEditorTab}
                setActiveTab={setActiveEditorTab}
                fontSize={settings.fontSize}
                tabSize={settings.tabSize}
                logsCount={result?.logs.length || 0}
                hasErrors={result ? !result.success : false}
                language={selectedLanguage}
              />
            </div>

            {/* Console Output Drawer */}
            {activeEditorTab === 'console' && (
              <div className="min-h-[220px] flex flex-col">
                <ConsoleOutput result={result} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          mission={mission}
          onNextMission={() => {
            setShowSuccessModal(false);
            nextMission();
          }}
          onReplay={() => {
            setShowSuccessModal(false);
            handleResetCode();
          }}
        />
      )}

      {/* Failure Modal */}
      {showFailureModal && (
        <FailureModal
          failedTest={result?.failedTest}
          error={result?.error}
          onRetry={() => {
            setShowFailureModal(false);
          }}
          onViewConsole={() => {
            setShowFailureModal(false);
            setActiveEditorTab('console');
          }}
        />
      )}
    </div>
  );
};
