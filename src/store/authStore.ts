import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check if we have a persisted user in localStorage on initial load
  const storedUser = localStorage.getItem('key_current_user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    login: (user: User) => {
      localStorage.setItem('key_current_user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('key_current_user');
      set({ user: null, isAuthenticated: false });
    },
  };
});
