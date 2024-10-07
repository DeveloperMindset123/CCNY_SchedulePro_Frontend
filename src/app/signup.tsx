import React from 'react';
import { Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SignupIcon } from '@/lib/utils/getSvgs';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
//import { SignupButton } from '@/components/core/signupButton';
import { TextInputComponent } from '@/components/core/textInputComponent';
import { getSignupStyles } from '@/components/core/textInputComponent/getSignupStyles';

// @see https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk --> for implementing authentication.
const register: React.FC = () => {
  //const [passwordMatch, setPasswordMatch] = React.useState<boolean>(false);
  const { width, height } = getWindowDimensions();
  const { titleFontStyling, secondaryTextStyling } = getSignupStyles();
  //let inputBoxWidth = width * 0.9;
  //let inputBoxHeight = height * 0.07;
  // @see https://www.npmjs.com/package/react-native-dotenv
  //const public_key = process.env.EXPO_PUBLIC_KEY;
  //console.log(process.env.EXPO_PUBLIC_KEY);

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
      {/*
      <SignupButton width={inputBoxWidth} height={inputBoxHeight} route="/onboarding1" /> */}
    </ScrollView>
  );
};

export default register;
