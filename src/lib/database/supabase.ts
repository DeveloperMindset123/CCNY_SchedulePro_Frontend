import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO : Remove hardcoded values prior to commit
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_KEY === undefined
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydHZtd3d3Y3NrcGpwd3dlbHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMTUwNjUsImV4cCI6MjA0MjU5MTA2NX0.3_tNMof29lx_PFVgWqpuNbZurzjStZGmTsfBavvfm9c'
    : process.env.EXPO_PUBLIC_KEY;
const supabaseProjectUrl =
  process.env.EXPO_PUBLIC_PROJECT_URL === undefined
    ? 'https://srtvmwwwcskpjpwwelzp.supabase.co'
    : process.env.EXPO_PUBLIC_PROJECT_URL;

export const supabaseClient = createClient(supabaseProjectUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabaseClient.auth.startAutoRefresh();
  } else {
    supabaseClient.auth.stopAutoRefresh();
  }
});
