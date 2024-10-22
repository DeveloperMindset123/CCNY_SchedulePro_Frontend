import {
  createMaterialTopTabNavigator,
  //MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
//import { withLayoutContext } from 'expo-router';
//import { NavigationState, EventMapBase } from '@react-navigation/native';
import ClassSchedule from '@/app/(root)/(tabs)/(index)';
import ClassLists from '@/app/(root)/(tabs)/(index)/feed';
import NewSettings from '@/app/(root)/(tabs)/(newsetting)/newSetting';
import CustomFeed from '@/app/(root)/(tabs)/(newsetting)/customFeed';
import DefaultSettings from '@/app/(root)/(tabs)/(settings)/settings';

//const { Navigator } = createMaterialTopTabNavigator();
const Tab = createMaterialTopTabNavigator();
const Tab2 = createMaterialTopTabNavigator();
const Tab3 = createMaterialTopTabNavigator();

/*
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  NavigationState,
  EventMapBase
>(Navigator);
*/

//@see https://reactnavigation.org/docs/material-top-tab-navigator/

// ** This will render the nested tabs within home
export const MaterialTopTabsHome = ({ tab1, tab2 }: { tab1: string; tab2: string }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        // ** Determines the width of the tab
        tabBarItemStyle: { width: 130 },
      }}
    >
      <Tab.Screen name={tab1} component={ClassSchedule} />
      <Tab.Screen name={tab2} component={ClassLists} />
    </Tab.Navigator>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MaterialTopTabsTest = ({
  tab1,
  tab2,
}: {
  tab1: string;
  tab2: string;
  //tab3: string;
}) => {
  return (
    <Tab2.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: 'white' },
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarItemStyle: {
          width: 150,
        },
      }}
    >
      <Tab2.Screen name={tab1} component={NewSettings} />
      <Tab2.Screen name={tab2} component={CustomFeed} />
    </Tab2.Navigator>
  );
};

export const MaterialTopTabsTest2 = ({
  tab1,
  //tab2,
}: {
  tab1: string;
  //tab2?: string;
  //tab3: string;
}) => {
  return (
    <Tab3.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: 'white' },
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarItemStyle: {
          width: 150,
        },
      }}
    >
      <Tab3.Screen name={tab1} component={DefaultSettings} />
    </Tab3.Navigator>
  );
};
