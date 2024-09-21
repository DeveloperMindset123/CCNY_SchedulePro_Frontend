import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { ParallaxScrollView } from '@/components/core/parallax-scroll-view';
import { Ionicons } from '@expo/vector-icons';

// TODO : https://snack.expo.dev/@patriciamilou/react-native-paper-issue-with-textinput?platform=ios
// reference the above link to see how this issue can be fixed

const signup: React.FC = () => {
  // TODO : Convert the types
  const [titleFontStyling, setTitleFontStyling] = useState<string>('');
  const [secondaryTextStyling, setSecondaryTextStyling] = useState<string>('');
  const [imagePositionStyling, setImagePositionStyling] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string | any>('');
  const [emailInputStyling, setEmailInputStyling] = useState<string | any>('');
  const [passwordInput, setPasswordInput] = useState<string | any>('');
  const [buttonStyling, setButtonStyling] = useState<string>('');
  // same styling confirm password
  const [passwordInputStyling, setPasswordInputStyling] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string | any>('');
  const { width, height } = getWindowDimensions();

  // TODO : Convert to switch statement
  useEffect(() => {
    if (width > 600 && height > 700) {
      // ipad styling
      setTitleFontStyling('mt-14 text-white text-[55px] font-serif');
      setSecondaryTextStyling('text-white  text-[35px] text-center px-14 my-7');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-2xl p-[10px] rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-2xl p-[10px] rounded-full pl-10 mt-5'
      );
      setButtonStyling(
        'bg-white w-[700px] h-[60px] justify-center rounded-full items-center mx-auto mt-7 active:bg-gray-100 active:opacity-30'
      );
    } else if (height > 700 && width > 430) {
      // larger phones
      setTitleFontStyling('text-white text-3xl mt-8 font-serif');
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
    }
    // TODO : This is bootleg, see if there's a better way to fix this for older phones
    else if (width === 414) {
      setTitleFontStyling('text-white text-xl mt-4 font-serif text-center');
      setSecondaryTextStyling('text-white mt-1 text-md text-center px-10');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[38px] m-[12px] border-spacing-1 text-md rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-md rounded-full pl-10 mt-6'
      );
    } else {
      setTitleFontStyling('text-white text-2xl mt-6 font-serif');
      setImagePositionStyling('items-center justify-center mx-auto mt-3');
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
  }, [width, height]);

  // width can be static
  let inputBoxWidth = width * 0.9;

  // height needs to be adjusted based on different screen sizes
  let inputBoxHeight = height * 0.07;

  return (
    <ScrollView className="flex-1 bg-black text-white overflow-auto">
      <KeyboardAvoidingView
        className="items-center justify-center mx-auto mt-3"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <SignupIcon
          style={{
            width: width * 0.45,
            height: height * 0.25,
          }}
        />

        <Text className={titleFontStyling}>Join CCNY Schedule Pro!</Text>
        <Text className={secondaryTextStyling}>Explore and manage class schedules efficiently</Text>
      </KeyboardAvoidingView>
      <ScrollView>
        <View className="flex-1 items-center justify-center m-auto">
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
            onSubmitEditing={Keyboard.dismiss}
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
            onSubmitEditing={Keyboard.dismiss}
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
            onSubmitEditing={Keyboard.dismiss}
          ></TextInput>
          <Pressable
            className={buttonStyling}
            onPress={() => {
              // TODO : Implement this screen
              router.push('/onboardingGetStarted');
            }}
          >
            <Text className="text-center text-blue text-xl font-serif bg-white">Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default signup;
