import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider } from './config';

/**
 * Sign in or sign up using Google Auth popup
 */
export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign out current authenticated user
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
