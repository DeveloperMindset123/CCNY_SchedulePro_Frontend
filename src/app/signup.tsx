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
  const [passwordInput, setPasswordInput] = useState<string | any>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string | any>('');
  const { width, height } = getWindowDimensions();

  // TODO : Continue this implementation
  useEffect(() => {
    if (width > 600 && height > 700) {
      // ipad styling
      setTitleFontStyling('mt-14 text-white text-[55px]');
      setImagePositionStyling('-top-[48px] items-center justify-center mx-auto  bg-transparent');
      setSecondaryTextStyling('text-white  text-[35px] text-center px-14');
    } else {
      if (height > 700) {
        // larger phones
        setTitleFontStyling('text-white text-3xl mt-8');
        setImagePositionStyling('-top-[62px] items-center justify-center mx-auto mb-5');
        setSecondaryTextStyling('text-white mt-2 text-lg text-center px-8');
      } else {
        setTitleFontStyling('text-white text-2xl mt-6');
        setImagePositionStyling('-top-24 items-center justify-center mx-auto pb-5');
        setSecondaryTextStyling('text-white mt-1 text-md text-center px-10');
      }
    }
  }, [width, height]);

  // width can be static
  let inputBoxWidth = width * 0.9;

  // height needs to be adjusted based on different screen sizes
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
          placeholder="Enter Your Email"
          value={emailInput}
          keyboardType="default"
        ></TextInput>
        <TextInput
          style={{
            width: inputBoxWidth,
            height: inputBoxHeight,
          }}
          className="bg-gray-500 text-white h-[40px] m-[12px] border-spacing-1 p-[10px] rounded-full"
          onChange={setPasswordInput}
          placeholder="Enter Your Password"
          value={passwordInput}
          keyboardType="default"
        ></TextInput>
        <TextInput
          style={{
            width: inputBoxWidth,
            height: inputBoxHeight,
          }}
          className="bg-gray-500 text-white h-[40px] m-[12px] border-spacing-1 p-[10px] rounded-full"
          onChange={setConfirmPasswordInput}
          placeholder="Confirm Your Password"
          value={confirmPasswordInput}
          keyboardType="default"
        ></TextInput>
      </View>
    </View>
  );
};

export default signup;
