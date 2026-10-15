import React, { useState } from 'react';
import { useGame } from '../context/useGame';
import { sound } from '../utils/sound';
import { 
  Layers, 
  Lock, 
  CheckCircle2, 
  Play, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

export const CampaignPage: React.FC = () => {
  const { campaignOverview, navigateToMission, stats } = useGame();
  const [expandedLevel, setExpandedLevel] = useState<number>(1);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#faf8ff] via-[#ffffff] to-[#f4effe] p-4 sm:p-6 lg:p-10 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Campaign Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-purple-700">
              <Layers className="w-3.5 h-3.5" />
              <span>Structured Progression</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 tracking-tight">
              Campaign Roadmaps
            </h1>
            <p className="text-slate-600 text-sm max-w-xl">
              10 Levels • 100 System Tasks. Progress from foundational conditions to advanced system algorithms.
            </p>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-2xl border border-purple-100 shadow-sm text-right">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
              Overall Progress
            </span>
            <span className="text-lg font-bold text-purple-700">
              {stats.completedMissions.length} / 100 Tasks Completed
            </span>
          </div>
        </div>

        {/* 10-Level Visual Roadmap */}
        <div className="space-y-4">
          {campaignOverview.map((level) => {
            const isExpanded = expandedLevel === level.levelNumber;
            const completionPercent = Math.round((level.completedTasks / level.totalTasks) * 100);

            return (
              <div
                key={level.levelNumber}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  level.isUnlocked
                    ? isExpanded
                      ? 'bg-white border-purple-300 shadow-md shadow-purple-500/5'
                      : 'bg-white/80 border-purple-100 hover:border-purple-200'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                {/* Level Summary Header */}
                <div
                  onClick={() => {
                    if (level.isUnlocked) {
                      sound.click();
                      setExpandedLevel(isExpanded ? 0 : level.levelNumber);
                    }
                  }}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                    level.isUnlocked ? 'hover:bg-purple-50/30' : 'cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                      level.isUnlocked
                        ? completionPercent === 100
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {level.isUnlocked ? (
                        completionPercent === 100 ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          `0${level.levelNumber}`
                        )
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-purple-700">
                          {level.codename}
                        </span>
                        {!level.isUnlocked && (
                          <span className="px-2 py-0.2 rounded-full bg-slate-200 text-slate-600 text-[10px] font-semibold">
                            Locked
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {level.theme}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                        {level.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-6">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-medium text-slate-700">
                        {level.completedTasks} / {level.totalTasks} Done ({completionPercent}%)
                      </span>
                      <div className="w-28 bg-purple-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                    </div>

                    {level.isUnlocked && (
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Tasks List */}
                {isExpanded && level.isUnlocked && (
                  <div className="p-5 border-t border-purple-100 bg-purple-50/20 space-y-2.5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {level.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                            task.isCompleted
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : task.isUnlocked
                              ? 'bg-white border-purple-200 hover:border-purple-300'
                              : 'bg-slate-50 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              task.isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : task.isUnlocked
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              {task.isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : task.taskNumber}
                            </div>

                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-xs font-bold text-slate-900">
                                  {task.title}
                                </h4>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-medium border border-purple-100">
                                  {task.difficulty}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {task.subtitle}
                              </p>
                            </div>
                          </div>

                          <div>
                            {task.isUnlocked ? (
                              <button
                                onClick={() => navigateToMission(task.missionId, 'campaign')}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-2xs transition-all cursor-pointer"
                              >
                                <Play className="w-3 h-3 fill-white" />
                                <span>{task.isCompleted ? 'Retry' : 'Solve'}</span>
                              </button>
                            ) : (
                              <span className="p-1.5 text-slate-400">
                                <Lock className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
