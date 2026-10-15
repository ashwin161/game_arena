import { createContext } from 'react';
import type { 
  UserStats, 
  UserSettings, 
  Language, 
  Difficulty, 
  GameMode, 
  PageType, 
  PlayerProfile,
  SkillProficiency 
} from '../types/game';
import { getCampaignOverview } from '../data/campaign';

export interface GameContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  currentMissionId: number;
  setCurrentMissionId: (id: number) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  selectedDifficulty: Difficulty | 'All';
  setSelectedDifficulty: (diff: Difficulty | 'All') => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  stats: UserStats;
  settings: UserSettings;
  profile: PlayerProfile;
  skills: SkillProficiency[];
  campaignOverview: ReturnType<typeof getCampaignOverview>;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateProfile: (newProfile: Partial<PlayerProfile>) => void;
  completeOnboarding: (name: string, lang: Language, diff: Difficulty | 'All', mode: GameMode) => void;
  recordAttempt: (missionId: number) => void;
  completeMission: (missionId: number, durationSeconds: number) => void;
  resetProgress: () => void;
  navigateToMission: (missionId: number, mode?: GameMode) => void;
  launchRandomChallenge: (difficulty?: Difficulty | 'All') => void;
  nextMission: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);
