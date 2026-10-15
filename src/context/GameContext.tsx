import React, { useState, useEffect, useMemo } from 'react';
import type { 
  UserStats, 
  UserSettings, 
  Language, 
  Difficulty, 
  GameMode, 
  PageType,
  PlayerProfile 
} from '../types/game';
import { MISSIONS } from '../data/missions';
import { getCampaignOverview } from '../data/campaign';
import { getRandomMission } from '../utils/random';
import { calculateSkillsProficiency } from '../utils/scoring';
import { sound } from '../utils/sound';
import { GameContext } from './GameContextDefinition';

const DEFAULT_STATS: UserStats = {
  xp: 0,
  level: 1,
  completedMissions: [],
  unlockedMissions: [1],
  missionAttempts: { 1: 0, 2: 0, 3: 0, 4: 0 },
  missionTimes: {},
  missionAccuracy: {},
  unlockedConcepts: ['Variables'],
  bestStreak: 0,
  currentStreak: 0
};

const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  reducedMotion: false,
  fontSize: 14,
  tabSize: 4,
  selectedLanguage: 'python',
  selectedDifficulty: 'All'
};

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Operative',
  userId: 'OP-' + Math.floor(1000 + Math.random() * 9000),
  nickname: 'Guest Operative',
  avatar: 'terminal',
  isOnboarded: false,
  selectedLanguage: 'python',
  selectedDifficulty: 'All',
  gameMode: 'campaign',
  createdAt: Date.now()
};

const STATS_KEY = 'codebreak_user_stats_v2';
const SETTINGS_KEY = 'codebreak_user_settings_v2';
const PROFILE_KEY = 'codebreak_user_profile_v2';

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    return profile.isOnboarded ? 'home' : 'landing';
  });

  const [currentMissionId, setCurrentMissionId] = useState<number>(1);
  const [gameMode, setGameModeState] = useState<GameMode>(profile.gameMode || 'campaign');

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [selectedLanguage, setSelectedLanguageState] = useState<Language>(
    profile.selectedLanguage || settings.selectedLanguage || 'python'
  );
  const [selectedDifficulty, setSelectedDifficultyState] = useState<Difficulty | 'All'>(
    profile.selectedDifficulty || settings.selectedDifficulty || 'All'
  );

  const setSelectedLanguage = (lang: Language) => {
    sound.click();
    setSelectedLanguageState(lang);
    updateSettings({ selectedLanguage: lang });
    updateProfile({ selectedLanguage: lang });
  };

  const setSelectedDifficulty = (diff: Difficulty | 'All') => {
    sound.click();
    setSelectedDifficultyState(diff);
    updateSettings({ selectedDifficulty: diff });
    updateProfile({ selectedDifficulty: diff });

    if (diff !== 'All') {
      const matchingMission = MISSIONS.find(m => m.difficulty === diff && stats.unlockedMissions.includes(m.id))
        || MISSIONS.find(m => m.difficulty === diff);
      if (matchingMission) {
        setCurrentMissionId(matchingMission.id);
      }
    }
  };

  const setGameMode = (mode: GameMode) => {
    sound.click();
    setGameModeState(mode);
    updateProfile({ gameMode: mode });
  };

  // Sync settings with Sound Engine and body class
  useEffect(() => {
    sound.enabled = settings.soundEnabled;
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Persist stats
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Persist profile
  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    sound.click();
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateProfile = (newProfile: Partial<PlayerProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const completeOnboarding = (name: string, lang: Language, diff: Difficulty | 'All', mode: GameMode) => {
    sound.click();
    const updated: PlayerProfile = {
      ...profile,
      name: name.trim() || 'Operative',
      nickname: name.trim() || 'Operative',
      selectedLanguage: lang,
      selectedDifficulty: diff,
      gameMode: mode,
      isOnboarded: true
    };
    setProfile(updated);
    setSelectedLanguageState(lang);
    setSelectedDifficultyState(diff);
    setGameModeState(mode);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));

    if (mode === 'random') {
      launchRandomChallenge(diff);
    } else {
      setCurrentMissionId(1);
      setCurrentPage('arena');
    }
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
      const newUnlocked = prev.unlockedMissions.includes(nextId) || nextId > MISSIONS.length
        ? prev.unlockedMissions
        : [...prev.unlockedMissions, nextId];

      const attempts = prev.missionAttempts[missionId] || 1;
      const accuracy = Math.round((1 / attempts) * 100);
      const newConcepts = Array.from(new Set([...prev.unlockedConcepts, mission.concept]));
      const newCurrentStreak = (prev.currentStreak || 0) + 1;
      const newBestStreak = Math.max(prev.bestStreak || 0, newCurrentStreak);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedMissions: newCompleted,
        unlockedMissions: newUnlocked,
        missionTimes: { ...prev.missionTimes, [missionId]: durationSeconds },
        missionAccuracy: { ...prev.missionAccuracy, [missionId]: accuracy },
        unlockedConcepts: newConcepts,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak
      };
    });
  };

  const resetProgress = () => {
    sound.click();
    setStats(DEFAULT_STATS);
    setProfile(prev => ({ ...prev, isOnboarded: false }));
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(PROFILE_KEY);
    setCurrentMissionId(1);
    setCurrentPage('landing');
  };

  const navigateToMission = (id: number, mode: GameMode = 'campaign') => {
    sound.click();
    setGameModeState(mode);
    setCurrentMissionId(id);
    setCurrentPage('arena');
  };

  const launchRandomChallenge = (difficulty: Difficulty | 'All' = selectedDifficulty) => {
    sound.click();
    setGameModeState('random');
    const randomMission = getRandomMission(difficulty, currentMissionId);
    setCurrentMissionId(randomMission.id);
    setCurrentPage('arena');
  };

  const nextMission = () => {
    sound.click();
    if (gameMode === 'random') {
      launchRandomChallenge(selectedDifficulty);
    } else {
      // In campaign, advance to next unlocked mission or next id
      const nextId = currentMissionId < MISSIONS.length ? currentMissionId + 1 : 1;
      setCurrentMissionId(nextId);
      setCurrentPage('arena');
    }
  };

  const handlePageChange = (page: PageType) => {
    sound.click();
    setCurrentPage(page);
  };

  const skills = useMemo(() => calculateSkillsProficiency(stats), [stats]);
  const campaignOverview = useMemo(() => getCampaignOverview(stats.completedMissions), [stats.completedMissions]);

  return (
    <GameContext.Provider
      value={{
        currentPage,
        setCurrentPage: handlePageChange,
        currentMissionId,
        setCurrentMissionId,
        selectedLanguage,
        setSelectedLanguage,
        selectedDifficulty,
        setSelectedDifficulty,
        gameMode,
        setGameMode,
        stats,
        settings,
        profile,
        skills,
        campaignOverview,
        updateSettings,
        updateProfile,
        completeOnboarding,
        recordAttempt,
        completeMission,
        resetProgress,
        navigateToMission,
        launchRandomChallenge,
        nextMission
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
