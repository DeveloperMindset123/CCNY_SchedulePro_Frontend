// @see https://docs.flyer.chat/react-native/chat-ui/basic-usage --> library for chat UI

import { View, Text, TouchableOpacity, Image, Animated, ViewStyle } from 'react-native';
import { Link } from 'expo-router';
import React, { useRef, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import Svg, { Path } from 'react-native-svg';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

// TODO : ! https://blog.logrocket.com/react-native-push-notifications-complete-guide/ --> notification system guide
const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity initial : 0
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
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
  const [currentImageStyling, setCurrentImageStyling] = useState<string>('');
  const [titleFont, setTitleFont] = useState<string>('');
  const [secondaryTextFont, setSecondaryTextFont] = useState<string>('');
  const [svgDimensions, setSvgDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = getWindowDimensions();
  useEffect(() => {
    if (width > 600) {
      setCurrentImageStyling('w-[600px] h-[600px] justify-center object-none m-auto mt-1');
      setTitleFont(
        'flex text-white font-Pacifico font-bold text-8xl items-center justify-center mx-auto mt-6 font-mono'
      );
      setSecondaryTextFont(
        'mx-auto flex items-center justify-center text-white text-4xl leading-8 mt-4 font-sans'
      );
      // ipads and tablets
      setSvgDimensions({
        width: 70,
        height: 70,
      });
    } else {
      setCurrentImageStyling('w-80 h-80 justify-center object-none object-center m-auto mt-1');
      setTitleFont(
        'flex text-white font-Pacifico font-bold text-5xl items-center justify-center mx-auto mt-6 font-mono'
      );
      if (height > 700) {
        // large phones
        setSecondaryTextFont(
          'mx-auto flex items-center justify-center text-white text-3xl leading-8 mt-4 font-sans'
        );
        setSvgDimensions({
          width: 45,
          height: 45,
        });
      } else {
        setSecondaryTextFont(
          'mx-auto flex items-center justify-center text-white text-2xl leading-8 mt-4 font-sans'
        );
        setSvgDimensions({
          width: 35,
          height: 35,
        });
      }
    }
  }, [width, height]);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const imagePath = require('src/assets/images/Landing-Screen-Image-Updated.png');

  return (
    <View className="flex-1 bg-black text-white">
      <FadeInView
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <Image
          className={currentImageStyling}
          source={imagePath}
          // placeholder val, image won't render otherwise
          width={40}
          height={40}
        />
        <Text
          // TODO : Convert to a function call
          className={titleFont}
        >
          CCNY
        </Text>
        <Text className={secondaryTextFont}>Class Schedule Manager</Text>
      </FadeInView>
      <TouchableOpacity className="flex-1 justify-center items-center">
        <Link
          href={{
            pathname: '/authenticationMiddleware',
          }}
          className="text-white"
        >
          <View className="w-15 bg-white rounded-full mb-4 py-4 px-4">
            <Svg width={svgDimensions.width} height={svgDimensions.height} viewBox="0 0 448 512">
              <Path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></Path>
            </Svg>
          </View>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;
