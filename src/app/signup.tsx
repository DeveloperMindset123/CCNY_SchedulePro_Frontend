import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

const signup: React.FC = () => {
  const [titleFontStyling, setTitleFontStyling] = useState<string>('');
  const [imagePositionStyling, setImagePositionStyling] = useState<string>('');
  const { width, height } = getWindowDimensions();

  useEffect(() => {
    if (width > 600 && height > 700) {
      // ipad styling
      setTitleFontStyling('mt-14 text-white text-[55px]');
      setImagePositionStyling(
        '-top-52 items-center justify-center mx-auto mb-20 bg-transparent pb-12'
      );
    } else {
      if (height > 700) {
        // larger phones
        setTitleFontStyling('text-white text-3xl mt-8');
        setImagePositionStyling('-top-52 items-center justify-center mx-auto mb-5');
      } else {
        setTitleFontStyling('text-white text-2xl mt-6');
        setImagePositionStyling('-top-32 items-center justify-center mx-auto pb-5');
      }
    }
  }, [width, height]);

  return (
    <View className="flex-1 bg-black text-white justify-center items-center">
      <View className={imagePositionStyling}>
        <SignupIcon
          style={{
            width: width * 0.45,
            height: height * 0.25,
          }}
        />

        <Text
          style={{
            fontFamily: 'playpenLight',
          }}
          // 2xl for screens of width < 600 but height < 700
          // 3xl for screens of width < 600 but height > 700
          // 5xl for screens of width > 600 and height > 700
          className={titleFontStyling}
        >
          Join CCNY Schedule Pro!
        </Text>
      </View>
    </View>
  );
};

export default signup;
