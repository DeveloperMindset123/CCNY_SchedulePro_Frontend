import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  Text,
  Platform,
  Pressable,
  StyleSheet,
  Button,
} from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
// @see https://www.npmjs.com/package/@react-native-community/datetimepicker/v/5.0.0
// ** link to official documentation for react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 *
 * @input1 First name --> basic input box should suffice
 * @input2 last Name --> basic input box should suffice
 * @NOTE First and last name should be in row-format
 * @CollegeYear Can use a slider for this
 * @DOB --> can use a calendar based view for this
 * @Pronouns --> can use a dropdown for this
 */
const OnboardingScreen3: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  // ** set default value to 8 since that's the initial value
  const [studentYear, setStudentYear] = useState<number>(8);

  // relevant useState values for dates
  // set this to the current date
  // TODO : the mode state may be redundant, as it will be a static value
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [mode, setMode] = useState<string | any>('date');
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

  // ** This is the only function that's relevant
  const onChange = (event: any, selectedDate: Date | any) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
    console.log(`Current Selected Date : ${dateOfBirth}`);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const collectedData = {
      firstName: firstName,
      lastName: lastName,
      studentYear: studentYear,
      DOB: dateOfBirth,
      // TODO : add more fields as needed
      // TODO : this is the data that will be sent when API call is made
      // **@see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      // above link will help better explain how the POSt method for APi works
    };
  }, [firstName, lastName, studentYear, dateOfBirth]);

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
      <Text className="text-[#999] ml-16 text-lg font-sans mt-6">
        Please Provide Your Date of Birth
      </Text>
      {/**This view is exclusive for dateTimePicker only */}
      <View className="text-start w-44 my-5 rounded-full ">
        <DateTimePicker
          className="rounded-full"
          testID="dateTimePicker"
          value={dateOfBirth}
          mode="date"
          is24Hour={false}
          display="default"
          onChange={onChange}
          textColor="red"
          themeVariant="dark"
        />
      </View>
      <View className="flex-row space-x-0 mx-10">
        <OnboardingButton
          width={'40%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => router.back()}
          buttonText={'Go Back'}
        />
        <OnboardingButton
          width={'40%'}
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
