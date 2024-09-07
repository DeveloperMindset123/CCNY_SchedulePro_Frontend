/* --> old code, will be removed later once the nested routing logic is setup
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
// Modifications made here will be shown throughout all the screens

// ** naming the default value as Root layout doesn't make a difference

//SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  //TODO : Define all relevant routes for screens and tabs here, it's good practice to declare them here, can things like how the page UI looks like
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="(root)"
          options={{ headerShown: false, animation: "ios" }}
        />
    
        <Stack.Screen
          name="index"
          //TODO : Ensure that the title section is empty as we don't want to display anything unneccessarily
          options={{ title: "", headerShown: true }}
        />
        <Stack.Screen
          name="details"
          // TODO : Note, if headerShown isn't enabled, user won't have an option to navigate back
          options={{ title: "DetailsTest", headerShown: true }}
        />
        <Stack.Screen
          name="home/message"
          options={{ title: "Messagepage", headerShown: true }}
        />
      </Stack>
    </>
  );
}
*/

import { useEffect } from "react";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@react-navigation/native";
// TODO : Implement the component first
//import { ThemeToogle } from '@/components/core/toggle';
// ! Reference : https://docs.expo.dev/versions/latest/sdk/splash-screen/
// ? To help better understand how expo-splash-screen works
/**
 * @Reference https://docs.expo.dev/versions/latest/sdk/splash-screen/
 * @Detail Refer to the above link to better understand how expo-splash-screen works
 * @preventAutoHideAsync --> SplashScreen.preventAutohideAsync() --> keeps the splash screen visible and listens for when SplashScreen.hideAsync() is called and hides the screen immediately --> useful for doing background tasks such as some form of API call
 * @hideAsync --> SplashScreen.hideAsync() --> as the name implies, hides the splash screen, can be used to display content after background process is complete
 */
import * as SplashScreen from "expo-splash-screen";
import { NAV_THEME } from "@/theme";
import { useColorScheme } from "nativewind";
import "../global.css";
