import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  event: string;
  created_at: string;
};

export type RegistrationInput = Omit<Registration, 'id' | 'created_at'>;
