import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserStats, UserSettings } from '../types/game';
import { MISSIONS } from '../data/missions';
import { sound } from '../utils/sound';

export type PageType = 'landing' | 'arena' | 'missions' | 'progress' | 'settings';

interface GameContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  currentMissionId: number;
  setCurrentMissionId: (id: number) => void;
  stats: UserStats;
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  recordAttempt: (missionId: number) => void;
  completeMission: (missionId: number, durationSeconds: number) => void;
  resetProgress: () => void;
  navigateToMission: (missionId: number) => void;
}

const DEFAULT_STATS: UserStats = {
  xp: 0,
  level: 1,
  completedMissions: [],
  unlockedMissions: [1],
  missionAttempts: { 1: 0, 2: 0, 3: 0, 4: 0 },
  missionTimes: {},
  missionAccuracy: {},
  unlockedConcepts: ['Variables']
};

const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  reducedMotion: false,
  fontSize: 14,
  tabSize: 4
};

const STATS_KEY = 'codebreak_user_stats_v1';
const SETTINGS_KEY = 'codebreak_user_settings_v1';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [currentMissionId, setCurrentMissionId] = useState<number>(1);

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Sync settings with Sound Engine and body class for reduced motion
  useEffect(() => {
    sound.enabled = settings.soundEnabled;
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Save stats to localStorage on change
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    sound.click();
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const recordAttempt = (missionId: number) => {
    setStats(prev => ({
      ...prev,
      missionAttempts: {
        ...prev.missionAttempts,
        [missionId]: (prev.missionAttempts[missionId] || 0) + 1
      }
    }));
  };

  const completeMission = (missionId: number, durationSeconds: number) => {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission) return;

    setStats(prev => {
      const isAlreadyCompleted = prev.completedMissions.includes(missionId);
      const newCompleted = isAlreadyCompleted ? prev.completedMissions : [...prev.completedMissions, missionId];
      const newXP = isAlreadyCompleted ? prev.xp : prev.xp + mission.xpReward;
      const newLevel = Math.floor(newXP / 200) + 1;

      // Unlock next mission if available
      const nextId = missionId + 1;
      const newUnlocked = prev.unlockedMissions.includes(nextId) || nextId > 4
        ? prev.unlockedMissions
        : [...prev.unlockedMissions, nextId];

      const attempts = prev.missionAttempts[missionId] || 1;
      const accuracy = Math.round((1 / attempts) * 100);

      const newConcepts = Array.from(new Set([...prev.unlockedConcepts, mission.concept]));

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedMissions: newCompleted,
        unlockedMissions: newUnlocked,
        missionTimes: { ...prev.missionTimes, [missionId]: durationSeconds },
        missionAccuracy: { ...prev.missionAccuracy, [missionId]: accuracy },
        unlockedConcepts: newConcepts
      };
    });
  };

  const resetProgress = () => {
    sound.click();
    setStats(DEFAULT_STATS);
    localStorage.removeItem(STATS_KEY);
    setCurrentMissionId(1);
  };

  const navigateToMission = (id: number) => {
    sound.click();
    setCurrentMissionId(id);
    setCurrentPage('arena');
  };

  const handlePageChange = (page: PageType) => {
    sound.click();
    setCurrentPage(page);
  };

  return (
    <GameContext.Provider
      value={{
        currentPage,
        setCurrentPage: handlePageChange,
        currentMissionId,
        setCurrentMissionId,
        stats,
        settings,
        updateSettings,
        recordAttempt,
        completeMission,
        resetProgress,
        navigateToMission
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
