
import { createClient } from '@supabase/supabase-js';

// Using the correct Supabase URL and public anon key from src/integrations/supabase/client.ts
const supabaseUrl = 'https://ztswxqvquaxypxfzkwey.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0c3d4cXZxdWF4eXB4Znprd2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDYwMzIsImV4cCI6MjA1Nzk4MjAzMn0.sI0tqNiLd8X9exsw5ExshGeWmq4Rh9MaUF8jCYFI1oY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'manager' | 'freelancer' | 'finance';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role?: UserRole;
}

// Auth helper functions
export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUp(email: string, password: string, fullName: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
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
  
  // Get the user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (!profile) return null;
  
  // Get the user's roles
  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id);
  
  // If user has roles, add the first one to the profile
  // In a more complex app, you might want to handle multiple roles differently
  const role = userRoles && userRoles.length > 0 ? userRoles[0].role as UserRole : undefined;
  
  return {
    ...profile,
    role
  } as Profile;
}
