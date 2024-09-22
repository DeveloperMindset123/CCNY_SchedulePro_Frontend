import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO : Remove hardcoded values prior to commit
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_KEY === undefined
    ? 'REPLACE WITH EXPO PUBLIC KEY FROM .ENV'
    : process.env.EXPO_PUBLIC_KEY;
const supabaseProjectUrl =
  process.env.EXPO_PUBLIC_PROJECT_URL === undefined
    ? 'REPLACE WITH PUBLIC PROJECT URL'
    : process.env.EXPO_PUBLIC_PROJECT_URL;

export const supabaseInstance = createClient(supabaseProjectUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabaseInstance.auth.startAutoRefresh();
  } else {
    supabaseInstance.auth.stopAutoRefresh();
  }
});
