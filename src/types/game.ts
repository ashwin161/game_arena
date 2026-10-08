export type SystemStatus = 'OFFLINE' | 'WARNING' | 'ONLINE';

export interface MissionHint {
  tier: 1 | 2 | 3;
  type: 'Observation' | 'Concept' | 'Specific Direction';
  text: string;
}

export interface TestCase {
  id: string;
  description: string;
  expectedOutcome: string;
}

export interface Mission {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  objective: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  concept: string;
  xpReward: number;
  startingCode: string;
  hints: MissionHint[];
  testCases: TestCase[];
  solutionExplanation: {
    whatWasWrong: string;
    whatWasFixed: string;
    conceptLearned: string;
  };
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
}

export interface UserSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: number;
  tabSize: number;
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
}
