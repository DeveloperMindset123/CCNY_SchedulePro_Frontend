import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

const signup: React.FC = () => {
  const [titleFontStyling, setTitleFontStyling] = useState<string>('');
  const [secondaryTextStyling, setSecondaryTextStyling] = useState<string>('');
  const [imagePositionStyling, setImagePositionStyling] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string | any>('');
  const { width, height } = getWindowDimensions();

  useEffect(() => {
    if (width > 600 && height > 700) {
      // ipad styling
      setTitleFontStyling('mt-14 text-white text-[55px]');
      setImagePositionStyling(
        '-top-44 items-center justify-center mx-auto mb-20 bg-transparent pb-12'
      );
      setSecondaryTextStyling('text-white  text-[35px] text-center px-14');
    } else {
      if (height > 700) {
        // larger phones
        setTitleFontStyling('text-white text-3xl mt-8');
        setImagePositionStyling('-top-40 items-center justify-center mx-auto mb-5');
        setSecondaryTextStyling('text-white mt-2 text-lg text-center px-8');
      } else {
        setTitleFontStyling('text-white text-2xl mt-6');
        setImagePositionStyling('-top-24 items-center justify-center mx-auto pb-5');
        setSecondaryTextStyling('text-white mt-1 text-md text-center px-10');
      }
    }
  }, [width, height]);

  // TODO : Adjust based on different screen sizes
  let inputBoxWidth = width * 0.9;
  let inputBoxHeight = height * 0.07;

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
          className={titleFontStyling}
        >
          Join CCNY Schedule Pro!
        </Text>
        <Text
          style={{
            fontFamily: 'playpenExtraLight',
          }}
          className={secondaryTextStyling}
        >
          Explore and manage class schedules efficiently
        </Text>
        <TextInput
          style={{
            width: inputBoxWidth,
            height: inputBoxHeight,
          }}
          className="bg-gray-500 text-white h-[40px] m-[12px] border-spacing-1 p-[10px] rounded-full"
          onChange={setEmailInput}
          value={emailInput}
          keyboardType="default"
        ></TextInput>
      </View>
    </View>
  );
};

export default signup;
