import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserWithRole extends User {
  user_metadata: {
    role?: 'admin';
  };
}

interface AuthState {
  user: UserWithRole | null;
  loading: boolean;
  error: Error | null;
  isAdmin: boolean;
  checkAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  isAdmin: false,
  checkAuth: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      set({ 
        user: user as UserWithRole,
        isAdmin: user?.user_metadata?.role === 'admin',
        loading: false 
      });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ 
        user: data.user as UserWithRole,
        isAdmin: data.user?.user_metadata?.role === 'admin',
        error: null 
      });
    } catch (error) {
      set({ error: error as Error });
      throw error;
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false });
  },
}));