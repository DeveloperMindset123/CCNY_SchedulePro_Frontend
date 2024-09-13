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
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { useFonts } from 'expo-font';
import Svg, { Path, Use, Defs } from 'react-native-svg';

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
  const [loaded, error] = useFonts({
    Sofadi: require('src/assets/fonts/SofadiOne-Regular.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 bg-black text-white">
      <FadeInView
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <Image
          // m-auto needed to be added to center object
          className="w-80 h-80 justify-center object-none object-center m-auto mt-6"
          source={imagePath}
          width={40}
          height={40}
        />
        <Text
          style={{
            fontFamily: 'Sofadi',
          }}
          className="flex text-white font-Pacifico font-semibold text-5xl items-center justify-center mx-auto mt-12"
        >
          CCNY
        </Text>
        <Text
          style={{
            fontFamily: 'Sofadi',
          }}
          className="mx-auto flex items-center justify-center text-white text-2xl leading-8 mt-4"
        >
          Class Schedule Manager
        </Text>
        <TouchableOpacity>
          <Link
            href={{
              pathname: '/authenticationMiddleware',
            }}
            className="text-white"
          >
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}
              className=" bg-white rounded-full mb-5 py-4 px-4"
            >
              <Svg width={20} height={20} viewBox="0 0 448 512">
                <Use x="50%" y="50%">
                  <Defs>
                    <Path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></Path>
                  </Defs>
                </Use>
              </Svg>
            </View>
          </Link>
        </TouchableOpacity>
      </FadeInView>
    </View>
  );
};

export default Landing;
