/*
** Default code, use for reference, implementing the original code from before for the landing screen
import { Text } from '@/components/core/text';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { Link } from 'expo-router';

// Landing Screen, not sure why it doesn't render unless I name it index
export default function NewHome() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <Text>This should be the new home page</Text>
      <Link href="/(root)">Go to root</Link>
    </SafeAreaView>
  );
}
*/

import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Stack, Link } from 'expo-router';
import { SafeAreaView } from '@/components/core/safe-area-view';
import Svg, { Path } from 'react-native-svg';
import React from 'react';
import type { PropsWithChildren } from 'react';

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

export const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // opacity initial : 0
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};
const Landing: React.FC = () => {
  const imagePath = require('src/assets/images/Landing-Screen-Image-Updated.png');
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View className="flex-1 bg-black text-white">
      <FadeInView
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <Image
          // m-auto needed to be added to center object
          className="w-80 h-80 justify-center object-none object-center m-auto"
          source={imagePath}
          width={40}
          height={40}
        />
        <Text className="flex text-white font-Pacifico"> Image Not Rendering</Text>
      </FadeInView>
    </View>
  );
};

export default Landing;
