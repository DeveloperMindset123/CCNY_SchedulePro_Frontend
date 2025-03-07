/* eslint-disable @typescript-eslint/no-unused-vars */
// @see https://www.telerik.com/blogs/usecallback-useref-two-react-hooks-you-should-learn --> to understand the importance of useCallback and useRef

// ! this screen was originally onboardingGetStarted
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';
import { ChevronsDownUp, CloudUpload } from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { comparePassword } from '@/utils/passwordHash';
import { compare } from 'bcrypt-ts';

const OnboardingScreen1: React.FC = () => {
  const route = useRoute();
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // TODO : remove these console.log statements (they we used for testing)
  if (comparePassword('Fullcomic991!', route.params.apiPayload.password) == true) {
    console.log('THE PASSWORDS MATCH');
  } else {
    console.log("THE PASSWORDS DON'T MATCH");
  }

  const classTypesRow1 = [
    {
      id: 1,
      name: 'Liberal Arts',
      icon: require('src/assets/images/LiberalArts.png'),
    },
    {
      id: 2,
      name: 'Core Courses',
      icon: require('src/assets/images/CoreCourses.png'),
    },
  ];

  const classTypesRow2 = [
    {
      id: 3,
      name: 'Electives',
      icon: require('src/assets/images/Electives.png'),
    },
    {
      id: 4,
      name: 'STEM',
      icon: require('src/assets/images/STEM.png'),
    },
  ];

  const [selectedClassType, setSelectedClassType] = useState<number | null>(null);
  const router = useRouter();
  const [currentCheckedValues, setCurrentCheckedValues] = useState({
    LiberalArts: false,
    CoreCourses: false,
    Electives: false,
    STEM: false,
  });

  const currentSelectedType = (id: number) => {
    setSelectedClassType((prev) => (prev == id ? null : id));
  };

  const sharedStyles =
    'rounded-lg mx-10 my-8 items-center justify-center w-24 h-50 shadow-black shadow-xl';

  const sendOboarding_screen1Data = () => {
    fetch('http://localhost:4001/onboarding/onboarding1Data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(currentCheckedValues),
    }).then((res) => {
      if (res.ok || res.status === 200) {
        console.log('Successfully sent data to backend');
        console.log(`Response status : ${res.status}`);
        return router.push('/onboarding2');
      } else {
        if (res.status >= 400) {
          console.log('Error sending data');
        }
      }
    });
  };
  const renderItem = ({ item }: { item: (typeof classTypesRow1)[0] }) => (
    <Pressable
      key={item.id}
      onPress={() => currentSelectedType(item.id)}
      className={selectedClassType == item.id ? `#555 ${sharedStyles}` : `#1A1A1A ${sharedStyles}`}
    >
      <View className="hover:bg-gray-500">
        <Image
          source={item.icon}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
      <BouncyCheckbox
        className="w-32 mt-2 ml-6"
        size={20}
        fillColor="#9342f5"
        unFillColor="transparent"
        text={item.name}
        iconStyle={{
          borderColor: '#9342f5',
        }}
        textStyle={{
          fontSize: 12,
        }}
        // TODO : modify this
        onPress={(checked: boolean) => {
          switch (item.id) {
            // TODO : this looks kind of bloated, refactor this later
            case 1: {
              if (checked) {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  LiberalArts: true,
                }));
              } else {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  LiberalArts: false,
                }));
              }
              break;
            }
            case 2: {
              if (checked) {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  CoreCourses: true,
                }));
              } else {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  CoreCourses: false,
                }));
              }
              break;
            }
            case 3: {
              if (checked) {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  Electives: true,
                }));
              } else {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  Electives: false,
                }));
              }
              break;
            }
            case 4: {
              if (checked) {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  STEM: true,
                }));
              } else {
                setCurrentCheckedValues((prevState) => ({
                  ...prevState,
                  STEM: false,
                }));
              }
              break;
            }
            default: {
              // everything should be set to false by default
              // TODO : this might be redundant or unneccessary
              setCurrentCheckedValues((prevState) => ({
                ...prevState,
                LiberalArts: false,
                CoreCourses: false,
                Electives: false,
                STEM: false,
              }));
              break;
            }
          }
        }}
      />
    </Pressable>
  );

  return (
    // TODO : adjust the css values as needed
    // TODO : some of these view tags can be self-closing instead, after implementing everything, convert them to be self-closing tags
    // ** originally raw css, converted to tailwind
    <View className="flex-1 bg-black p-12">
      <View className="flex-row justify-between items-center mb-20">
        {/** Might be excessively redundant, may need to be removed */}
        <View className="flex-1" />
        <View className="flex-row items-center">
          <Text className="text-white text-base mr-8">1/3</Text>
          <View className="w-24 h-2.5 bg-onboardingBackgroundColor overflow-hidden rounded-md">
            <View className="w-1.5 h-full bg-[#888]" />
          </View>
        </View>
      </View>
      <Text className="text-white text-2xl mb-5">Which field of study are you looking into?</Text>
      <Text className="text-gray-400 text-base">Select One or More Below</Text>
      <View className="flex-row justify-center">
        {classTypesRow1.map((item) => renderItem({ item }))}
      </View>
      <View className="flex-row justify-center">
        {classTypesRow2.map((item) => renderItem({ item }))}
      </View>
      <OnboardingButton
        width={'45%'}
        height={50}
        route="/onboarding2"
        handleOnPress={() => router.push('/onboarding2')}
        buttonText={'Proceed'}
      />
    </View>
  );
};

export default OnboardingScreen1;
