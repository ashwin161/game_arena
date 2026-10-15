import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { loginWithGoogle, logoutUser, subscribeToAuth } from '../firebase/auth';
import { syncGuestDataToFirestore, saveUserDataToFirestore } from '../firebase/firestore';
import { useGame } from './useGame';
import { sound } from '../utils/sound';

import { AuthContext } from './useAuth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { stats, profile, updateProfile } = useGame();
  const statsRef = React.useRef(stats);
  const profileRef = React.useRef(profile);

  useEffect(() => {
    statsRef.current = stats;
    profileRef.current = profile;
  }, [stats, profile]);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Sync existing guest achievements & XP with Firestore database
          const syncedData = await syncGuestDataToFirestore(currentUser, statsRef.current, profileRef.current);
          updateProfile({
            name: currentUser.displayName || syncedData.profile.name,
            nickname: currentUser.displayName || syncedData.profile.name,
            avatar: currentUser.photoURL || syncedData.profile.avatar,
            userId: syncedData.profile.userId
          });
        } catch (err) {
          console.error('Failed to sync user data with Firestore:', err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [updateProfile]);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      sound.click();
      const signedInUser = await loginWithGoogle();
      setUser(signedInUser);
      // Sync guest progress to Firestore
      const syncedData = await syncGuestDataToFirestore(signedInUser, stats, profile);
      updateProfile({
        name: signedInUser.displayName || syncedData.profile.name,
        nickname: signedInUser.displayName || syncedData.profile.name,
        avatar: signedInUser.photoURL || syncedData.profile.avatar,
        userId: syncedData.profile.userId
      });
    } catch (err: unknown) {
      console.error('Google Sign-in failed:', err);
      const message = err instanceof Error ? err.message : 'Google authentication failed';
      setError(message);
    }
  };

  const signOut = async () => {
    try {
      sound.click();
      // Save current progress before logging out
      if (user) {
        await saveUserDataToFirestore(user.uid, user, stats, profile);
      }
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGoogle,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
