
import { createClient } from '@supabase/supabase-js';

// Using the correct Supabase URL and public anon key from src/integrations/supabase/client.ts
const supabaseUrl = 'https://ztswxqvquaxypxfzkwey.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0c3d4cXZxdWF4eXB4Znprd2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDYwMzIsImV4cCI6MjA1Nzk4MjAzMn0.sI0tqNiLd8X9exsw5ExshGeWmq4Rh9MaUF8jCYFI1oY';

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
