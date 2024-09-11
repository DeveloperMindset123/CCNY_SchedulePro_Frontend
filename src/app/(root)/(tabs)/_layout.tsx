import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { TabBarIcon } from '@/components/core/icon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  const router = useRouter();
  const [currentColor, setColor] = useState('red');

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
      <Tabs.Screen
        name="newSetting"
        options={{
          title: 'newSetting',
          tabBarIcon: () => (
            <Ionicons
              name="key"
              color={currentColor}
              // TODO : Fix color Issue Not displaying As Intended
              onPress={() => {
                setColor('blue');
                // take the user back
                router.replace('/');
              }}
            />
          ),
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
