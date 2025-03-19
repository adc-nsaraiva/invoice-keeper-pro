
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase, UserRole, Profile, getCurrentUserProfile } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  isLoading: boolean;
  user: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const profile = await getCurrentUserProfile();
        setUser(profile);
        
        // If user is logged in and on the login page, redirect to dashboard
        if (profile && (location.pathname === '/login' || location.pathname === '/')) {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const profile = await getCurrentUserProfile();
        setUser(profile);
        
        // Redirect to dashboard on sign in
        navigate('/dashboard', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/login', { replace: true });
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      const profile = await getCurrentUserProfile();
      setUser(profile);
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
      
      // Redirect will be handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      
      // Redirect will be handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        signIn,
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
