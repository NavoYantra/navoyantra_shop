import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthState {
  user: User | null;
  adminUser: AdminUser | null;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  user: null,
  adminUser: null,
  session: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      let currentAdminUser = null;
      if (session?.user?.email) {
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', session.user.email)
          .single();
          
        currentAdminUser = adminData;
      }
      
      set({ session, user: session?.user || null, adminUser: currentAdminUser, isLoading: false });

      supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
        let currentAdminUser = null;
        if (session?.user?.email) {
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', session.user.email)
            .single();
            
          currentAdminUser = adminData;
        }
        set({ session, user: session?.user || null, adminUser: currentAdminUser });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, adminUser: null, session: null });
  },
}));
