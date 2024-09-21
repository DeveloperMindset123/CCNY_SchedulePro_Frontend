import React, { useEffect, useState } from 'react';
import { TextInputChangeEventData } from 'react-native';
import { View, TextInput, DimensionValue, NativeSyntheticEvent, Keyboard } from 'react-native';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { getSignupStyles } from './getSignupStyles';

// ! useRef can be used to store the session cookie for logged in users
export const TextInputComponent = () => {
  const { width, height } = getWindowDimensions();
  const currentStyles = getSignupStyles();
  // TODO : remove later
  console.log(JSON.stringify(currentStyles));

  const dimensions = {
    width: width * 0.45,
    height: height * 0.25,
  };
  const [emailInput, setEmailInput] = useState<string>('');
  const [emailInputStyling, setEmailInputStyling] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');

  const handleEmailInput = (e: any) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordInput = (e: any) => {
    setPasswordInput(e.target.value);
  };

  const handleConfirmPasswordInput = (e: any) => {
    setConfirmPasswordInput(e.target.value);
  };
  // array of objects
  const TextInputArray = [
    {
      id: 1,
      dimensions: dimensions,
      tailwindStyling: currentStyles.emailInputStyling,
      onChangeFunction: handleEmailInput,
      value: emailInput,
      isPassword: false,
      blur: true,
    },
    {
      id: 2,
      dimensions: dimensions,
      tailwindStyling: currentStyles.passwordInputStyling,
      // TODO : Define them seperately
      onChangeFunction: handlePasswordInput,
      value: passwordInput,
      isPassword: true,
      blur: false,
    },
    {
      id: 3,
      dimensions: dimensions,
      tailwindStyling: currentStyles.passwordInputStyling,
      onChangeFunction: handleConfirmPasswordInput,
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
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={TextInputIter.isPassword}
          blurOnSubmit={TextInputIter.blur}
          // TODO : Replace after setting up a proper design system in figma
          // based on colors determined
          placeholderTextColor="black"
        />
      ))}
    </View>
  );
};
