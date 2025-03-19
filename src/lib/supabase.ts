
import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and public anon key (safe to use in browser)
const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'manager' | 'freelancer' | 'finance';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
}

// Auth helper functions
export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user;
}

export async function getCurrentUserProfile() {
  const user = await getCurrentUser();
  
  if (!user) return null;
  
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return data as Profile | null;
}
