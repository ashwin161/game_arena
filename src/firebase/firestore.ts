import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import type { UserStats, PlayerProfile } from '../types/game';
import type { User } from 'firebase/auth';

export interface FirestoreUserData {
  profile: {
    name: string;
    email: string | null;
    avatar: string;
    userId: string;
    preferredLanguage: string;
    preferredDifficulty: string;
    createdAt?: unknown;
    lastLoginAt?: unknown;
  };
  stats: UserStats;
  campaignProgress?: {
    completedMissions: number[];
  };
}

/**
 * Load user data from Firestore by UID
 */
export async function loadUserDataFromFirestore(uid: string): Promise<FirestoreUserData | null> {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as FirestoreUserData;
    }
    return null;
  } catch (error) {
    console.error('Failed to load user data from Firestore:', error);
    return null;
  }
}

/**
 * Persist user statistics and profile to Firestore
 */
export async function saveUserDataToFirestore(
  uid: string,
  user: User,
  stats: UserStats,
  profile: PlayerProfile
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      profile: {
        name: user.displayName || profile.name || 'Operative',
        email: user.email || null,
        avatar: user.photoURL || profile.avatar || '',
        userId: profile.userId,
        preferredLanguage: profile.selectedLanguage,
        preferredDifficulty: profile.selectedDifficulty,
        lastLoginAt: serverTimestamp(),
      },
      stats: {
        xp: stats.xp,
        level: stats.level,
        completedMissions: stats.completedMissions,
        unlockedMissions: stats.unlockedMissions,
        missionAttempts: stats.missionAttempts,
        missionTimes: stats.missionTimes,
        missionAccuracy: stats.missionAccuracy,
        unlockedConcepts: stats.unlockedConcepts,
        bestStreak: stats.bestStreak || 0,
        currentStreak: stats.currentStreak || 0,
      },
      campaignProgress: {
        completedMissions: stats.completedMissions,
      },
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Failed to save user data to Firestore:', error);
  }
}

/**
 * Sync guest data to Firestore when user logs in with Google for the first time
 */
export async function syncGuestDataToFirestore(
  user: User,
  guestStats: UserStats,
  guestProfile: PlayerProfile
): Promise<FirestoreUserData> {
  const existing = await loadUserDataFromFirestore(user.uid);

  if (existing) {
    // Merge stats: higher XP, union of completed missions, best streak
    const mergedCompleted = Array.from(new Set([...existing.stats.completedMissions, ...guestStats.completedMissions]));
    const mergedXP = Math.max(existing.stats.xp, guestStats.xp);
    const mergedLevel = Math.floor(mergedXP / 200) + 1;
    const mergedBestStreak = Math.max(existing.stats.bestStreak || 0, guestStats.bestStreak || 0);

    const mergedData: FirestoreUserData = {
      profile: {
        ...existing.profile,
        name: user.displayName || existing.profile.name,
        email: user.email,
        avatar: user.photoURL || existing.profile.avatar,
        lastLoginAt: serverTimestamp()
      },
      stats: {
        ...existing.stats,
        xp: mergedXP,
        level: mergedLevel,
        completedMissions: mergedCompleted,
        unlockedMissions: Array.from(new Set([...existing.stats.unlockedMissions, ...guestStats.unlockedMissions])),
        bestStreak: mergedBestStreak,
        unlockedConcepts: Array.from(new Set([...existing.stats.unlockedConcepts, ...guestStats.unlockedConcepts]))
      }
    };

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { ...mergedData, updatedAt: serverTimestamp() }, { merge: true });
    return mergedData;
  } else {
    // First time login - save guest progress as permanent user data
    const initialData: FirestoreUserData = {
      profile: {
        name: user.displayName || guestProfile.name || 'Operative',
        email: user.email,
        avatar: user.photoURL || '',
        userId: 'OP-' + user.uid.slice(0, 6).toUpperCase(),
        preferredLanguage: guestProfile.selectedLanguage,
        preferredDifficulty: guestProfile.selectedDifficulty,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      },
      stats: guestStats,
      campaignProgress: {
        completedMissions: guestStats.completedMissions
      }
    };

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { ...initialData, updatedAt: serverTimestamp() });
    return initialData;
  }
}
