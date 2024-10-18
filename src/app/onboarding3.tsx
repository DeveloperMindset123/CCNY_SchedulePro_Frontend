import React, { useState, useRef } from 'react';
import { View, TextInput, Keyboard, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

/**
 *
 * @input1 First name --> basic input box should suffice
 * @input2 last Name --> basic input box should suffice
 * @NOTE First and last name should be in row-format
 * @CollegeYear Can use a slider for this
 * @DOB --> can use a calendar based vew for this
 * @Pronouns --> can use a dropdown for this
 */
const OnboardingScreen3: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [firstName, setFirstName] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastName, setLastName] = useState<string>('');
  // TODO : This might be somewhat redundant, for learning new hooks, because this is just excessive use of hooks at the end of the day that leads to performance degradation
  const firstNamePlaceholder = useRef('First Name...');
  const lastNamePlaceholder = useRef('Last Name...');
  const { width, height } = getWindowDimensions();
  const inputBoxDimensions = {
    width: width * 0.35,
    height: height * 0.07,
  };
  const router = useRouter();

  return (
    <View className="bg-black flex-1">
      <Text className="text-white text-xl mx-auto context-center mt-5 font-serif">
        Last Step 🥳! Please fill out the forms below
      </Text>
      <View className="flex-row p-5 mx-auto context-center">
        <TextInput
          style={inputBoxDimensions}
          className="bg-[#2f2f2f] text-white h-[40px] m-[12px] border-spacing-1 text-md rounded-full px-6 mt-6"
          onChangeText={(currFirstName) => setFirstName(currFirstName)}
          //value={TextInputIter.value}
          autoCapitalize="words"
          keyboardType="default"
          placeholder={firstNamePlaceholder.current}
          onSubmitEditing={Keyboard.dismiss}
          //secureTextEntry={TextInputIter.isPassword}
          //blurOnSubmit={TextInputIter.blur}
          placeholderTextColor="#94a3b8"
          autoCorrect={false}
        />
        <TextInput
          style={inputBoxDimensions}
          className="bg-[#2f2f2f] text-white h-[40px] m-[12px] border-spacing-1 text-md rounded-full px-6 mt-6"
          onChangeText={(currLastName) => setLastName(currLastName)}
          autoCapitalize="words"
          keyboardType="default"
          placeholder={lastNamePlaceholder.current}
          onSubmitEditing={Keyboard.dismiss}
          placeholderTextColor="#94a3b8"
          autoCorrect={false}
        />
      </View>
      <View className="flex-row">
        <OnboardingButton
          width={'45%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => router.back()}
          buttonText={'Go Back'}
        />
        <OnboardingButton
          width={'45%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => router.push('/(root)/(tabs)/(index)/')}
          buttonText={'Proceed'}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen3;

/**
 * @NOTE The following is a sample text input that I used for signup screen
 * <TextInput
          key={TextInputIter.id}
          style={TextInputIter.dimensions}
          className={TextInputIter.tailwindStyling}
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
 */
