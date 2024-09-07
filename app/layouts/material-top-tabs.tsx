// Helper function to allow for added navigation functionaltieis
/**
 * @Reference https://reactnavigation.org/docs/material-top-tab-navigator
 * @Purpose creates a custom navigator
 */
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { NavigationState, EventMapBase } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  NavigationState,
  EventMapBase
>(Navigator);
