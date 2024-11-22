import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook for easy access to auth state
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {

    // Check for an existing session on page load
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // Listen for changes to the auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session changed:", _event, session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
};