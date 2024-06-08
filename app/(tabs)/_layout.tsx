import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LandingView from ".";
import { Stack } from "expo-router";

// TODO : Implement logic for when navbar should be displayed, important to note that we are using expo-router, which is different from react-navigation

export interface TabLayoutProps {
  displayTabBar: boolean;
}

export default function TabLayout({ displayTabBar }: TabLayoutProps) {
  const colorScheme = useColorScheme();

  return <Stack />;
}
