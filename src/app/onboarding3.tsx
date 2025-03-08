import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Keyboard, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';
/**
 * @TODO_1 : wrap the textInput components around a map component as before as well
 * @TODO_2 :
 * @input1 First name --> basic input box should suffice
 * @input2 last Name --> basic input box should suffice
 * @NOTE First and last name should be in row-format
 * @CollegeYear Can use a slider for this
 * @DOB --> can use a calendar based view for this
 * @Pronouns --> can use a dropdown for this
 * @see https://react.dev/learn/conditional-rendering --> to better understand how conditional rendering works based on react-documentation
 * @see https://www.npmjs.com/package/@react-native-community/datetimepicker/v/5.0.0 --> react-community-datetimepicker docs
 */

const OnboardingScreen3: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [studentYear, setStudentYear] = useState<number>(8);
  const [currentPronounDropdownValue, setCurrentPronounDropdownValue] = useState('');
  const [currentPronounFocus, setCurrentPronounFocus] = useState(false); // experimental hook
  const [currentGenderDropdownValue, setCurrentGendeDropdownValue] = useState('');
  const [currentGenderFocus, setCurrentGenderFocus] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const firstNamePlaceholder = useRef('First Name...');
  const lastNamePlaceholder = useRef('Last Name...');
  const { width, height } = getWindowDimensions();
  const inputBoxDimensions = {
    width: width * 0.35,
    height: height * 0.07,
  };
  const router = useRouter();
  const progress = useSharedValue(8);
  const min = useSharedValue(0);
  const max = useSharedValue(16);

  const onChange = (event: any, selectedDate: Date | any) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
  };

  const pronounDropDownData = [
    { label: 'he/him', value: '1', search: 'he/him' },
    { label: 'she/her', value: '2', search: 'she/her' },
    { label: 'they/them', value: '3', search: 'they/them' },
    { label: 'he/they', value: '4', search: 'he/they' },
    { label: 'she/they', value: '5', search: 'she/they' },
    { label: 'he/she/they', value: '6', search: 'he/she/they' },
    { label: 'any/all pronouns', value: '7', search: 'any/all pronouns' },
    { label: 'other/custom pronouns', value: '8', search: 'other/custom pronouns' },
  ];

  const genderDropDownData = [
    { label: 'male', value: '1', search: 'male' },
    { label: 'female', value: '2', search: 'female' },
    { label: 'non-binary', value: '3', search: 'non-binary' },
    { label: 'transgender', value: '4', search: 'transgender' },
    { label: 'Prefer Not To Say', value: '5', search: 'Prefer Not To Say' },
  ];

  // experimental code to test a different dropdown menu
  const data = [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
    {
      label: 'Option 4',
      value: 'option4',
    },
  ];

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text className="pl-8 font-serif" style={styles.textItem}>
          {item.label}
        </Text>
        {/**This is what is causing the potential error with the values not rendering as it should
         *
         * error was occuring here since the comparison check wasn't originally working due to mismatch of comparison that was being done
         */}
        {item.label === currentPronounDropdownValue && (
          <AntDesign style={styles.icon} color="black" name="checkcircle" />
        )}
      </View>
    );
  };

  // This code has been taken from the dropdown example
  const renderLabel = () => {
    if (currentPronounDropdownValue || currentPronounFocus) {
      return (
        <Text style={[styles.label, currentPronounFocus && { color: 'blue' }]}>Dropdown label</Text>
      );
    }
    return null;
  };

  const collectedData = {
    firstName: firstName,
    lastName: lastName,
    studentYear: studentYear,
    DOB: dateOfBirth,
    pronouns: currentPronounDropdownValue,
    Gender: currentGenderDropdownValue,
    // TODO : add more fields as needed
    // TODO : this is the data that will be sent when API call is made
    // ** @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // above link will help better explain how the POSt method for APi works
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // upon clicking proceed at this point, all the information collected from the user should be passed.
  // const sendOnboarding_screen3Data = () => {
  //   fetch('http://localhost:4001/onboarding/onboarding3Data', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //     body: JSON.stringify(collectedData),
  //   }).then((res) => {
  //     if (res.ok || res.status === 200) {
  //       console.log('Data Sent Successfully');
  //       console.log(`Response Status : ${res.status}`);
  //       return router.push('/(root)/(tabs)/(index)/');
  //     } else {
  //       if (res.status === 400) {
  //         console.log('There was an error sending your data');
  //       }
  //     }
  //   });
  // };

  // test to check if the changes being made to the dropdown are being detected or not
  console.log(currentPronounDropdownValue);
  console.log(currentGenderDropdownValue);

  // TODO : set the focus logic as well for the second dropdown (aka the gender dropdown)
  return (
    <View className="bg-black flex-1 px-2">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-1" />
        <View className="flex-row items-center" />
        <Text className="text-white text-base mr-8">3/3</Text>
        <View className="mr-4 w-20 h-2 rounded-sm overflow-hidden">
          <View className="w-full h-full bg-[#888]" />
        </View>
      </View>
      <Text className="text-white text-xl content-center mt-2 ml-4 font-sans">Last Step 🥳!</Text>
      <Text className="text-[#999] text-lg font-sans ml-4 mt-0.5">
        Please fill out the forms below
      </Text>
      <View className="flex-row py-3 mx-auto context-center">
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
      <View className="flex-col ml-4">
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
          steps={1}
          forceSnapToStep={true}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          bubbleMaxWidth={width * 0.9}
          step={Math.round(16)}
          heartbeat={true}
          onSlidingComplete={(currSelectedNumber) => setStudentYear(currSelectedNumber)}
        />
      </View>
      <Text className="text-[#999] ml-4 text-lg font-sans mt-6">
        Please Provide Your Date of Birth
      </Text>
      {/**This view is exclusive for dateTimePicker only */}
      <View className="text-start justify-start -mx-2 w-36 my-3 rounded-full">
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
      <View className="flex-col w-[350px]">
        {/* {renderLabel()}
         * displays the name of the label itself, which isn't something I want at the moment.
         */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={pronounDropDownData}
          search
          maxHeight={180}
          // labelField="label"
          labelField="label"
          valueField="value"
          searchField="search"
          onFocus={() => setCurrentPronounFocus(true)}
          onBlur={() => setCurrentPronounFocus(false)}
          // placeholder="Select Your Pronouns..."    // old placeholder, did not update the user selected choices correctly
          placeholder={currentPronounFocus ? 'Select Your Pronouns' : currentPronounDropdownValue}
          searchPlaceholder="Search..."
          value={currentPronounDropdownValue}
          onChange={(item: string | any) => {
            // changed from value to label
            setCurrentPronounDropdownValue(item.label);
            setCurrentPronounFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              className="pr-4"
              style={styles.icon}
              color={currentPronounFocus ? 'blue' : 'black'}
              name="checkcircle"
              size={20}
            />
          )}
          renderItem={renderItem}
          dropdownPosition="bottom"
          // onChange={function (): void {
          //   return;
          // }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={genderDropDownData}
          search
          maxHeight={180}
          labelField="label"
          // placeholder="Select Your Gender..."    // old placeholder
          placeholder={currentPronounFocus ? 'Select Your Pronouns' : currentGenderDropdownValue}
          searchPlaceholder="Search..."
          value={currentGenderDropdownValue}
          onChange={(item: any) => {
            setCurrentGendeDropdownValue(item.label);
            setCurrentGenderFocus(false);
          }}
          onFocus={() => setCurrentGenderFocus(true)}
          onBlur={() => setCurrentGenderFocus(false)}
          // onChangeText={(item: any) => {
          //   setCurrentGendeDropdownValue(item.label);
          // }}
          renderLeftIcon={() => (
            <AntDesign
              className="pr-4"
              style={styles.icon}
              color="black"
              name="checkcircle"
              size={20}
            />
          )}
          renderItem={renderItem}
          valueField="value"
          dropdownPosition="top"
        />
        {/* <SelectProvider>
          <Select options={data} />
        </SelectProvider> */}
        <Text>Content 2</Text>
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
          //handleOnPress={() => sendOnboarding_screen3Data()}
          handleOnPress={() => router.push('/(root)/(tabs)/(index)/Schedule')}
          buttonText={'Proceed'}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen3;

// Component only accepts vanilla CSS
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'sans',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  // TODO : remove (since it's experimental)
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
