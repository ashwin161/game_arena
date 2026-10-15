export type SystemStatus = 'OFFLINE' | 'WARNING' | 'ONLINE';

export type Difficulty = 'Easy' | 'Intermediate' | 'Hard';

export type Language = 'python' | 'javascript' | 'typescript';

export type GameMode = 'campaign' | 'random';

export type PageType = 
  | 'landing' 
  | 'onboarding' 
  | 'home' 
  | 'campaign' 
  | 'random' 
  | 'arena' 
  | 'missions' 
  | 'progress' 
  | 'profile' 
  | 'settings';

export interface MissionHint {
  tier: 1 | 2 | 3;
  type: 'Observation' | 'Concept' | 'Specific Direction';
  text: string;
}

export interface TestCase {
  id: string;
  description: string;
  expectedOutcome: string;
  passed?: boolean;
}

export interface Mission {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  objective: string;
  difficulty: Difficulty;
  concept: string;
  xpReward: number;
  startingCode: string;
  startingCodes: Record<Language, string>;
  hints: MissionHint[];
  testCases: TestCase[];
  solutionExplanation: {
    whatWasWrong: string;
    whatWasFixed: string;
    conceptLearned: string;
  };
  level?: number;
  taskIndex?: number;
  estimatedTime?: string;
}

export interface CampaignTask {
  id: number;
  missionId: number;
  taskNumber: number;
  title: string;
  subtitle: string;
  concept: string;
  difficulty: Difficulty;
  xpReward: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface CampaignLevel {
  levelNumber: number;
  codename: string;
  theme: string;
  description: string;
  concepts: string[];
  tasks: CampaignTask[];
  totalTasks: number;
  completedTasks: number;
  isUnlocked: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  completedMissions: number[];
  unlockedMissions: number[];
  missionAttempts: Record<number, number>;
  missionTimes: Record<number, number>; // in seconds
  missionAccuracy: Record<number, number>; // percentage
  unlockedConcepts: string[];
  bestStreak?: number;
  currentStreak?: number;
}

export interface PlayerProfile {
  name: string;
  userId: string;
  nickname: string;
  avatar: string;
  isOnboarded: boolean;
  selectedLanguage: Language;
  selectedDifficulty: Difficulty | 'All';
  gameMode: GameMode;
  createdAt: number;
}

export interface SkillProficiency {
  concept: string;
  name: string;
  percentage: number;
  totalAttempts: number;
  successfulAttempts: number;
}

export interface UserSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: number;
  tabSize: number;
  selectedLanguage: Language;
  selectedDifficulty: Difficulty | 'All';
}

export interface ExecutionEvent {
  type: 'DOOR_UNLOCKED' | 'ELEVATOR_MOVED' | 'ROBOT_REPAIRED' | 'POWER_CORE_ACTIVATED' | 'SYSTEM_FAILURE' | 'SYSTEM_RESTORED';
  data?: Record<string, unknown>;
}

export interface ExecutionResult {
  success: boolean;
  logs: string[];
  systemState: {
    doorState?: 'LOCKED' | 'OPEN';
    elevatorFloor?: number;
    robotState?: { calibrated: boolean; power: number };
    powerCoreState?: { status: SystemStatus; power: number };
  };
  failedTest?: string;
  error?: string;
  events?: ExecutionEvent[];
  testResults?: { name: string; passed: boolean; expected?: string; actual?: string }[];
  score?: number;
}
