import { useState } from 'react';
import { View, TextInput, Keyboard, Alert } from 'react-native';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { getSignupStyles } from './getSignupStyles';
import { SignupButton } from '../signupButton';
//import { supabaseInstance } from '@/lib/database/supabase';
import { router } from 'expo-router';

// ! useRef can be used to store the session cookie for logged in users
export const TextInputComponent = () => {
  const { width, height } = getWindowDimensions();
  const currentStyles = getSignupStyles();

  const dimensions = {
    width: width * 0.9,
    height: height * 0.07,
  };
  const [emailInput, setEmailInput] = useState<any>();
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

  // @see https://www.ifelsething.com/post/get-value-react-native-text-input/
  // proper input handling
  const handleEmailInput = (e: any) => {
    setEmailInput(e.nativeEvent.text);
  };

  const handlePasswordInput = (e: any) => {
    setPasswordInput(e.nativeEvent.text);
  };

  const handleConfirmPasswordInput = (e: any) => {
    setConfirmPasswordInput(e.nativeEvent.text);
  };

  /*
  const signUpWithEmail = async () => {
    setLoading(true);
    if (passwordInput === confirmPasswordInput) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
      return null;
    }
    const {
      data: { session },
      error,
    } = await supabaseInstance.auth.signUp({
      email: emailInput,
      password: passwordInput,
    });

    console.log(session);
    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification');
    setLoading(false);
    router.push('/onboardingGetStarted');
  }; */

  //console.log(supabaseInstance.auth.getSession());

  const TextInputArray = [
    {
      id: 1,
      dimensions: dimensions,
      tailwindStyling: currentStyles.emailInputStyling,
      placeholderText: 'Enter Your Email',
      onChangeFunction: (newEmail: any) => handleEmailInput(newEmail),
      value: emailInput,
      isPassword: false,
      blur: true,
    },
    {
      id: 2,
      dimensions: dimensions,
      tailwindStyling: currentStyles.passwordInputStyling,
      placeholderText: 'Enter your password',
      onChangeFunction: (newPassword: any) => handlePasswordInput(newPassword),
      value: passwordInput,
      isPassword: true,
      blur: false,
    },
    {
      id: 3,
      dimensions: dimensions,
      tailwindStyling: currentStyles.passwordInputStyling,
      placeholderText: 'Retype your password',
      onChangeFunction: (confirmNewPassword: any) => handleConfirmPasswordInput(confirmNewPassword),
      value: confirmPasswordInput,
      isPassword: true,
      blur: false,
    },
  ];
  return (
    <View className="flex-1 items-center justify-center m-auto">
      {TextInputArray.map((TextInputIter) => (
        <TextInput
          key={TextInputIter.id}
          style={TextInputIter.dimensions}
          className={TextInputIter.tailwindStyling}
          // TODO : May require fixing
          onChange={TextInputIter.onChangeFunction}
          value={TextInputIter.value}
          autoCapitalize="none"
          keyboardType="default"
          placeholder={TextInputIter.placeholderText}
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={TextInputIter.isPassword}
          blurOnSubmit={TextInputIter.blur}
          placeholderTextColor="grey-500"
          autoCorrect={false}
        />
      ))}
      <SignupButton
        width={dimensions.width}
        height={dimensions.height}
        route="/onboardingGetStarted"
        handleOnPress={() => router.push('/signup')}
        //handleOnPress={() => signUpWithEmail()}
      />
    </View>
  );
};
