import { MISSIONS } from '../data/missions';
import type { Difficulty, Mission, Language } from '../types/game';

export interface RandomChallengeConfig {
  language: Language;
  difficulty: Difficulty | 'All';
  concept?: string;
}

export function getRandomMission(difficulty: Difficulty | 'All' = 'All', excludeMissionId?: number): Mission {
  let pool = MISSIONS;

  if (difficulty !== 'All') {
    const diffPool = MISSIONS.filter(m => m.difficulty === difficulty);
    if (diffPool.length > 0) pool = diffPool;
  }

  if (pool.length > 1 && excludeMissionId !== undefined) {
    const nonCurrent = pool.filter(m => m.id !== excludeMissionId);
    if (nonCurrent.length > 0) pool = nonCurrent;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || MISSIONS[0];
}

export function generateRandomScenario(_mission: Mission, seed?: number): { modifier: string; alertText: string } {
  const modifiers = [
    { modifier: 'Critical Low Power Alert', alertText: 'Auxiliary grid fluctuating at 32% efficiency.' },
    { modifier: 'Corrupted Gate Signal', alertText: 'Checksum mismatch detected on security bridge.' },
    { modifier: 'Quantum Thermal Spike', alertText: 'Containment temperature rising +14°C per cycle.' },
    { modifier: 'Desynchronized Joint Arm', alertText: 'Kinematic motor offset observed on axis gamma.' },
    { modifier: 'Overload Hazard Warning', alertText: 'Surge dampener disabled in high-voltage core.' }
  ];

  const index = seed ? Math.abs(seed) % modifiers.length : Math.floor(Math.random() * modifiers.length);
  return modifiers[index];
}
