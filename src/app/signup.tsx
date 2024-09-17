import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

const signup: React.FC = () => {
  // TODO : Convert the types
  const [titleFontStyling, setTitleFontStyling] = useState<string>('');
  const [secondaryTextStyling, setSecondaryTextStyling] = useState<string>('');
  const [imagePositionStyling, setImagePositionStyling] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string | any>('');
  const [emailInputStyling, setEmailInputStyling] = useState<string | any>('');
  const [passwordInput, setPasswordInput] = useState<string | any>('');
  const [buttonStyling, setButtonStyling] = useState<string>('');
  // same styling for confirm password
  const [passwordInputStyling, setPasswordInputStyling] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string | any>('');
  const { width, height } = getWindowDimensions();

  // TODO : Continue this implementation
  useEffect(() => {
    if (width > 600 && height > 700) {
      // ipad styling
      setTitleFontStyling('mt-14 text-white text-[55px]');
      setImagePositionStyling('-top-[48px] items-center justify-center mx-auto  bg-transparent');
      setSecondaryTextStyling('text-white  text-[35px] text-center px-14');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-2xl p-[10px] rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-2xl p-[10px] rounded-full pl-10 mt-5'
      );
      setButtonStyling(
        'bg-white w-[700px] h-[60px] justify-center rounded-full items-center mx-auto mt-7 active:bg-gray-100 active:opacity-30'
      );
    } else {
      if (height > 700) {
        // larger phones
        setTitleFontStyling('text-white text-3xl mt-8');
        setImagePositionStyling('-top-[40px] items-center justify-center mx-auto mb-5');
        setSecondaryTextStyling('text-white mt-2 text-lg text-center px-8');
        setPasswordInputStyling(
          'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-lg p-[10px] rounded-full pl-10'
        );
        setEmailInputStyling(
          'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-lg p-[10px] rounded-full pl-10 mt-8'
        );
        setButtonStyling(
          'bg-white w-96 h-12 justify-center rounded-full items-center mx-auto mt-6 active:bg-gray-100 active:opacity-30'
        );
      } else {
        setTitleFontStyling('text-white text-2xl mt-6');
        setImagePositionStyling('-top-2 items-center justify-center mx-auto');
        setSecondaryTextStyling('text-white mt-1 text-md text-center px-10');
        setPasswordInputStyling(
          'bg-[#2f2f2f] text-[#94a3b8] h-[38px] m-[12px] border-spacing-1 text-md rounded-full pl-10'
        );
        setEmailInputStyling(
          'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-md  rounded-full pl-10 mt-6'
        );
        setButtonStyling(
          'bg-white w-80 h-12 justify-center rounded-full items-center mx-auto mt-4 active:bg-gray-100 active:opacity-30'
        );
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
        {/**TODO : Implement a map to iteraete and implement the inputs as needed, abstract it or make it dynamic */}
        <TextInput
          style={{
            width: inputBoxWidth,
            height: inputBoxHeight,
          }}
          className={emailInputStyling}
          onChange={setEmailInput}
          placeholder="Enter Your Email"
          value={emailInput}
          placeholderTextColor="black"
          keyboardType="default"
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={{
            width: inputBoxWidth,
            height: inputBoxHeight,
          }}
          className={passwordInputStyling}
          onChange={setPasswordInput}
          placeholder="Enter Your Password"
          placeholderTextColor="black"
          value={passwordInput}
          autoCapitalize="none"
          secureTextEntry={true}
          blurOnSubmit={false}
          keyboardType="default"
          onSubmitEditing={() => Keyboard.dismiss()}
        ></TextInput>
        <TextInput
          style={{
            width: inputBoxWidth,
            height: inputBoxHeight,
          }}
          autoCapitalize="none"
          className={passwordInputStyling}
          onChange={setConfirmPasswordInput}
          placeholder="Confirm Your Password"
          placeholderTextColor="black"
          value={confirmPasswordInput}
          blurOnSubmit={false}
          secureTextEntry={true}
          keyboardType="default"
          onSubmitEditing={() => Keyboard.dismiss()}
        ></TextInput>
        <TouchableOpacity
          className={buttonStyling}
          onPress={() => {
            // TODO : Implement this screen
            router.push('/onboardingGetStarted');
          }}
        >
          <Text
            style={{
              fontFamily: 'playpenLight',
            }}
            className="text-center text-black text-xl"
          >
            Sign Up {'\b'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signup;
