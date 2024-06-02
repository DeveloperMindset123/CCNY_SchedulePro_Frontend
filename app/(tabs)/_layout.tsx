import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LandingView from ".";

// TODO : Implement logic for when navbar should be displayed, important to note that we are using expo-router, which is different from react-navigation

export interface TabLayoutProps {
  displayTabBar: boolean;
}

export default function TabLayout({ displayTabBar }: TabLayoutProps) {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: "none" },
          title: "Not",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarStyle: { display: "none" },
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

/*
const BottomTabNavigator = CreateBottomTabNavigator({
  LandingView: {
    screen: LandingView,
    navigationOptions: () => {
      return (
        tabBarVisible: false,
      );
    }
  },

  // add additonal screens here
})
*/
