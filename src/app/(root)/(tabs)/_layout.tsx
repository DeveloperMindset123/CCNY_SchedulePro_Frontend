import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { TabBarIcon } from '@/components/core/icon';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: iconColor,
      }}
    >
      {/**Have the path of this point to the landing screen and then make it invisible later on */}
      <Tabs.Screen
        name="(index)"
        options={{
          title: 'Home',
          tabBarIcon: () => <TabBarIcon name="code" pathnames={['/', '/feed']} />,
          headerRight: HeaderRight,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          headerShown: false,
          tabBarIcon: () => <TabBarIcon name="code" pathnames={['/two']} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <TabBarIcon name="cog" pathnames={['/settings']} />,
        }}
      />
      {/**experimentation, on click, will render the content of the screen */}
      <Tabs.Screen
        name="newSetting"
        options={{
          title: 'newSetting',
          tabBarIcon: () => <TabBarIcon name="home" pathnames={['../../newHome']} />,
        }}
      />
    </Tabs>
  );
}

const HeaderRight = () => {
  return (
    <Link className="mr-3" href="/modal" asChild>
      <Pressable>{() => <TabBarIcon name="rocket" />}</Pressable>
    </Link>
  );
};
