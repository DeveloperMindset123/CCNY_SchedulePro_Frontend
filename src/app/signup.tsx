import React from 'react';
import { Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SignupIcon } from '@/lib/utils/getSvgs';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { SignupButton } from '@/components/core/signupButton';
import { TextInputComponent } from '@/components/core/textInputComponent';
import { getSignupStyles } from '@/components/core/textInputComponent/getSignupStyles';

const signup: React.FC = () => {
  const { width, height } = getWindowDimensions();
  const { titleFontStyling, secondaryTextStyling } = getSignupStyles();
  let inputBoxWidth = width * 0.9;
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
      <TextInputComponent />
      <SignupButton width={inputBoxWidth} height={inputBoxHeight} route="/onboardingGetStarted" />
    </ScrollView>
  );
};

export default signup;
