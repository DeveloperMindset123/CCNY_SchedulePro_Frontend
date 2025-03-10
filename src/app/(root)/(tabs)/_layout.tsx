import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Ionicon, TabBarIcon } from '@/components/core/icon';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useRouter } from 'expo-router';
// import { useState } from 'react';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  //const router = useRouter();
  //const [currentColor, setColor] = useState('red');

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        tabBarStyle: {
          backgroundColor: 'black',
        },
        // tabBarActiveTintColor: iconColor,
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: () => <TabBarIcon name="home" pathnames={['/', '/feed']} />,
          headerRight: HeaderRight,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: true,
          // tabBarIcon: () => <TabBarIcon name="chat" pathnames={['/two']} />,
          tabBarIcon: () => <Ionicon name="chatbubble-ellipses" color="white" size={28} />,
        }}
      />
      <Tabs.Screen
        name="(userAccount)"
        options={{
          title: 'Account',
          headerShown: true,
          tabBarIcon: () => <TabBarIcon name="user" pathnames={['/userAccount', '/customFeed']} />,
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
