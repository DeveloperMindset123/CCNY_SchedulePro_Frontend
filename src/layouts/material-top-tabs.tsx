import {
  createMaterialTopTabNavigator,
  //MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
//import { withLayoutContext } from 'expo-router';
//import { NavigationState, EventMapBase } from '@react-navigation/native';
import ClassSchedule from '@/app/(root)/(tabs)/(index)';
import ClassLists from '@/app/(root)/(tabs)/(index)/feed';

//const { Navigator } = createMaterialTopTabNavigator();
const Tab = createMaterialTopTabNavigator();

/*
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  NavigationState,
  EventMapBase
>(Navigator);
*/

//@see https://reactnavigation.org/docs/material-top-tab-navigator/

export const MaterialTopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
      }}
    >
      <Tab.Screen name="Home" component={ClassSchedule} />
      <Tab.Screen name="Class Lists" component={ClassLists} />
    </Tab.Navigator>
  );
};
