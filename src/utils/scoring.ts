import { MISSIONS } from '../data/missions';
import type { SkillProficiency, UserStats } from '../types/game';

export const TRACKED_SKILLS = [
  { key: 'Conditions', label: 'Conditions & Logic' },
  { key: 'Loops', label: 'Loops & Iteration' },
  { key: 'Functions', label: 'Functions & Routines' },
  { key: 'Variables', label: 'Variables & State' },
  { key: 'Data Structures', label: 'Data Structures' },
  { key: 'Debugging', label: 'Diagnostics & Debugging' },
  { key: 'Algorithms', label: 'Algorithms & Optimizations' },
];

/**
 * Dynamically computes skill proficiency percentages from actual player attempts,
 * accuracy, and completions rather than static hardcoded numbers.
 */
export function calculateSkillsProficiency(stats: UserStats): SkillProficiency[] {
  return TRACKED_SKILLS.map(skill => {
    // Find missions involving this concept
    const relatedMissions = MISSIONS.filter(m => 
      m.concept.toLowerCase().includes(skill.key.toLowerCase()) ||
      (skill.key === 'Variables' && m.concept.includes('Variables')) ||
      (skill.key === 'Debugging' && stats.completedMissions.length > 0)
    );

    if (relatedMissions.length === 0) {
      // General algorithmic / system concepts scale with overall completed progress
      const basePercentage = Math.min(95, Math.max(15, Math.round((stats.completedMissions.length / MISSIONS.length) * 60) + 10));
      return {
        concept: skill.key,
        name: skill.label,
        percentage: stats.completedMissions.length > 0 ? basePercentage : 0,
        totalAttempts: stats.completedMissions.length,
        successfulAttempts: stats.completedMissions.length
      };
    }

    let totalAttempts = 0;
    let successfulMissions = 0;
    let totalAccuracySum = 0;

    relatedMissions.forEach(m => {
      const attempts = stats.missionAttempts[m.id] || 0;
      totalAttempts += attempts;
      if (stats.completedMissions.includes(m.id)) {
        successfulMissions++;
        const acc = stats.missionAccuracy[m.id] || (attempts > 0 ? Math.round((1 / attempts) * 100) : 100);
        totalAccuracySum += acc;
      }
    });

    let percentage = 0;
    if (successfulMissions > 0) {
      const avgAccuracy = Math.round(totalAccuracySum / successfulMissions);
      const completionRatio = successfulMissions / relatedMissions.length;
      percentage = Math.round((completionRatio * 0.6 + (avgAccuracy / 100) * 0.4) * 100);
    } else if (totalAttempts > 0) {
      percentage = 25; // Attempted but not yet solved
    }

    return {
      concept: skill.key,
      name: skill.label,
      percentage: Math.min(100, Math.max(0, percentage)),
      totalAttempts,
      successfulAttempts: successfulMissions
    };
  });
}

/**
 * Calculates XP reward with optional speed and attempt bonuses.
 */
export function calculateEarnedXP(
  baseXP: number,
  attempts: number,
  durationSeconds: number,
  usedHintsCount: number
): { totalXP: number; bonuses: { label: string; amount: number }[] } {
  const bonuses: { label: string; amount: number }[] = [];
  let totalXP = baseXP;

  if (attempts <= 1) {
    const firstAttemptBonus = Math.round(baseXP * 0.25);
    bonuses.push({ label: 'First Attempt Bonus', amount: firstAttemptBonus });
    totalXP += firstAttemptBonus;
  }

  if (durationSeconds > 0 && durationSeconds <= 30) {
    const speedBonus = 50;
    bonuses.push({ label: 'Speed Runner Bonus', amount: speedBonus });
    totalXP += speedBonus;
  }

  if (usedHintsCount === 0) {
    const noHintBonus = 35;
    bonuses.push({ label: 'Zero Hint Bonus', amount: noHintBonus });
    totalXP += noHintBonus;
  }

  return { totalXP, bonuses };
}
