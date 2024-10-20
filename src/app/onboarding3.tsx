import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Keyboard, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import * as ReactNatieHapticsFeedback from 'expo-haptics';

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
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  // ** set default value to 8 since that's the initial value
  const [studentYear, setStudentYear] = useState<number>(8);
  // TODO : wrap the textInput components around a map component as before as well
  const firstNamePlaceholder = useRef('First Name...');
  const lastNamePlaceholder = useRef('Last Name...');
  const { width, height } = getWindowDimensions();
  const inputBoxDimensions = {
    width: width * 0.35,
    height: height * 0.07,
  };
  const router = useRouter();
  // we also need to take into account phD and masters student
  const progress = useSharedValue(8);
  const min = useSharedValue(0);
  const max = useSharedValue(16);

  return (
    <View className="bg-black flex-1">
      <Text className="text-white text-xl mx-auto content-center mt-5 font-sans">
        Last Step 🥳! Please fill out the forms below
      </Text>
      <Text className="text-[#999] text-lg font-sans ml-16 mt-4">
        Please Enter Your First and Last Name
      </Text>
      <View className="flex-row px-5 py-3 mx-auto context-center">
        <TextInput
          style={inputBoxDimensions}
          className="bg-[#2f2f2f] text-white h-[40px] m-[12px] border-spacing-1 text-md rounded-full px-6"
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
          className="bg-[#2f2f2f] text-white h-[40px] m-[12px] border-spacing-1 text-md rounded-full px-6"
          onChangeText={(currLastName) => setLastName(currLastName)}
          autoCapitalize="words"
          keyboardType="default"
          placeholder={lastNamePlaceholder.current}
          onSubmitEditing={Keyboard.dismiss}
          placeholderTextColor="#94a3b8"
          autoCorrect={false}
        />
      </View>
      <View className="flex-col mx-auto">
        <Text className="text-[#999] my-1 mb-6 text-lg font-sans">Please Select Your Year</Text>
        <Slider
          // Does not support tailwind
          style={{
            height: height * 0.3,
            width: width * 0.7,
            alignContent: 'center',
            marginHorizontal: 'auto',
          }}
          theme={{
            disableMinTrackTintColor: 'purple',
            maximumTrackTintColor: 'white',
            minimumTrackTintColor: 'purple',
            cacheTrackTintColor: 'white',
            bubbleBackgroundColor: 'black',
            heartbeatColor: '#999',
          }}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          bubbleMaxWidth={width * 0.9}
          step={Math.round(16)}
          heartbeat={true}
          onSlidingComplete={(currSelectedNumber) => setStudentYear(currSelectedNumber)}
        />
      </View>
      <View className="flex-row my-5">
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
