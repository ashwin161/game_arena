import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { MISSIONS } from '../data/missions';
import { executeCode } from '../engine/interpreter';
import type { ExecutionResult } from '../types/game';

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

import { Cpu, Flag, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

export const ArenaPage: React.FC = () => {
  const { currentMissionId, setCurrentMissionId, stats, settings, recordAttempt, completeMission } = useGame();

  const mission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];

  const [code, setCode] = useState<string>(mission.startingCode);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'console'>('editor');
  const [activeMobileTab, setActiveMobileTab] = useState<'system' | 'code' | 'mission'>('code');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Reset code when switching missions
  useEffect(() => {
    setCode(mission.startingCode);
    setResult(null);
    setShowSuccessModal(false);
    setShowFailureModal(false);
    setStartTime(Date.now());
    setActiveEditorTab('editor');
  }, [currentMissionId, mission]);

  // Handle Run Code Execution
  const handleRun = () => {
    sound.run();
    recordAttempt(mission.id);

    const execRes = executeCode(mission.id, code);
    setResult(execRes);

    if (execRes.success) {
      const duration = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      completeMission(mission.id, duration);
      setShowSuccessModal(true);
    } else {
      setShowFailureModal(true);
    }
  };

  // Reset starting code for current mission
  const handleResetCode = () => {
    setCode(mission.startingCode);
    setResult(null);
    setShowSuccessModal(false);
    setShowFailureModal(false);
  };

  const attempts = stats.missionAttempts[mission.id] || 0;

  // Render proper system visualizer component
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
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-3 sm:p-6 flex flex-col font-sans">
      {/* Top Mission Selector Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-2">MISSION ARENA:</span>
          {MISSIONS.map((m) => {
            const isSelected = m.id === currentMissionId;
            const isCompleted = stats.completedMissions.includes(m.id);
            const isUnlocked = stats.unlockedMissions.includes(m.id);

            return (
              <button
                key={m.id}
                disabled={!isUnlocked}
                onClick={() => {
                  sound.click();
                  setCurrentMissionId(m.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : isUnlocked
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-50 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                <span>#{m.id}</span>
                <span className="hidden md:inline">{m.title}</span>
                {isCompleted && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile / Tablet Tab Selector Header */}
      <div className="lg:hidden flex items-center justify-around bg-white border border-slate-200 rounded-xl p-1.5 mb-3 shadow-2xs font-mono text-xs">
        <button
          onClick={() => setActiveMobileTab('system')}
          className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center space-x-1 ${
            activeMobileTab === 'system' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'text-slate-500'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>SYSTEM</span>
        </button>

        <button
          onClick={() => setActiveMobileTab('code')}
          className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center space-x-1 ${
            activeMobileTab === 'code' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'text-slate-500'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>CODE</span>
        </button>

        <button
          onClick={() => setActiveMobileTab('mission')}
          className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center space-x-1 ${
            activeMobileTab === 'mission' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'text-slate-500'
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>MISSION</span>
        </button>
      </div>

      {/* Main 3-Column Desktop Grid Area */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[580px]">
        {/* Column 1: SYSTEM VISUALIZER */}
        <div className={`lg:col-span-3 flex flex-col h-full ${activeMobileTab === 'system' ? 'block' : 'hidden lg:flex'}`}>
          {renderSystemVisualizer()}
        </div>

        {/* Column 2: CODE EDITOR & CONSOLE */}
        <div className={`lg:col-span-6 flex flex-col h-full min-h-[460px] ${activeMobileTab === 'code' ? 'block' : 'hidden lg:flex'}`}>
          <div className="flex-1 flex flex-col">
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
            />
            {activeEditorTab === 'console' && (
              <div className="flex-1 flex flex-col mt-2 min-h-[220px] rounded-xl overflow-hidden border border-slate-200">
                <ConsoleOutput result={result} />
              </div>
            )}
          </div>
        </div>

        {/* Column 3: MISSION PANEL */}
        <div className={`lg:col-span-3 flex flex-col h-full ${activeMobileTab === 'mission' ? 'block' : 'hidden lg:flex'}`}>
          <MissionPanel mission={mission} attempts={attempts} />
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          mission={mission}
          onNextMission={() => {
            setShowSuccessModal(false);
            if (mission.id < 4) {
              setCurrentMissionId(mission.id + 1);
            }
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
            setActiveMobileTab('code');
          }}
        />
      )}
    </div>
  );
};
