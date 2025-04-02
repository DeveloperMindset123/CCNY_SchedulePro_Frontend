import { useEffect } from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeToggle } from '@/components/core/toggle';
// Providers
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

// @see https://stackoverflow.com/questions/68569844/react-native-expo-custom-fonts-not-loading-with-font-loadasync
/**
 * https://www.npmjs.com/package/react-native-keyboard-controller
 * import { KeyboardProvider } from 'react-native-keyboard-controller';
 *
 *  On Development build you can wrap the Stack into a KeyboardProvider to handle the keyboard avoiding the  screen to be pushed up by the keyboard.
 *
 *  NOTE: On Expo Go the KeyboardProvider is not working since you need to link it to native.
 *
 *  Install: pnpm add react-native-keyboard-controller
 *
 *  Wrap the Stack with the KeyboardProvider -
 * <KeyboardProvider statusBarTranslucent navigationBarTranslucent></KeyboardProvider>
 */

// Theme
import { NAV_THEME } from '@/theme';
import { useColorScheme } from 'nativewind';
import '../../global.css';
import { Platform } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('src/assets/fonts/spaceMono.ttf'),
    'SpaceMono-Regular': require('src/assets/fonts/spaceMono.ttf'),

    'PlaypenSans-Bold': require('src/assets/fonts/playpenBold.ttf'),
    'PlaypenSans-ExtraBold': require('src/assets/fonts/playpenExtraBold.ttf'),
    'PlaypenSans-ExtraLight': require('src/assets/fonts/playpenExtraLight.ttf'),
    'PlaypenSans-Light': require('src/assets/fonts/playpenLight.ttf'),
    'PlaypenSans-Medium': require('src/assets/fonts/playpenMedium.ttf'),
    'PlaypenSans-Regular': require('src/assets/fonts/playpenRegular.ttf'),
    'PlaypenSans-SemiBold': require('src/assets/fonts/playpenSemiBold.ttf'),
    'PlaypenSans-Thin': require('src/assets/fonts/playpenThin.ttf'),
    PlaypenSans: require('src/assets/fonts/playpenVariable.ttf'),

    'Sofadi-Regular': require('src/assets/fonts/sofadi.ttf'),
    Sofadi: require('src/assets/fonts/sofadi.ttf'),

    'Pacifico-Regular': require('src/assets/fonts/pacifico.ttf'),
    Pacifico: require('/Users/ayandas/Desktop/VS_Code_Projects/CCNY_SchedulePro/src/assets/fonts/pacifico.ttf'),

    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.log('Error occuring here : ', error);
      throw error;
    }
  }, [error]);

  // useEffect hooks to check if font loading is working
  useEffect(() => {
    if (error) {
      console.log('Font loading error:', error);
      throw error;
    }
  }, [error]);

  // console.log('Loaded fonts:', Object.keys(loaded));
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        key={`root-status-bar-${colorScheme === 'dark' ? 'light' : 'dark'}`}
      />
      <ThemeProvider value={NAV_THEME[colorScheme]}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              // animation: 'ios',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: '900',
                // TODO : Change Font here
                // fontFamily: 'pacifico',
                fontFamily: 'Pacifico-Regular',
                // fontFamily: Platform.OS === 'ios' ? 'Pacifico-Regular' : 'Pacifico',
                // fontFamily: '',
                fontSize: 24,
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{ title: 'Welcome', headerShown: true, headerBackVisible: false }}
            />
            <Stack.Screen
              name="authenticationMiddleware"
              options={{ title: '', headerShown: true }}
            />
            <Stack.Screen
              name="signin"
              options={{
                title: 'Sign In',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="signup"
              options={{
                title: 'Sign Up',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="onboarding1"
              options={{
                title: '',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="onboarding2"
              options={{
                title: '',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="onboarding3"
              options={{
                title: '',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="modal"
              options={{
                title: 'Modal',
                presentation: 'modal',
                animation: 'fade_from_bottom',
                headerRight: () => <ThemeToggle />,
                headerLeft: () => null,
              }}
            />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
      <Toast />
    </>
  );
}
