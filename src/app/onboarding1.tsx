/* eslint-disable @typescript-eslint/no-unused-vars */
// @see https://www.telerik.com/blogs/usecallback-useref-two-react-hooks-you-should-learn --> to understand the importance of useCallback and useRef

// ! this screen was originally onboardingGetStarted
import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';

const OnboardingScreen1: React.FC = () => {
  const classTypes = [
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
    {
      id: 3,
      name: 'Electives',
      icon: require('src/assets/images/Electives.png'),
    },
    {
      id: 4,
      name: 'STEM',
      icon: 'src/assets/images/STEM.png',
    },
  ];

  const [selectedClassType, setSelectedClassType] = useState<number | null>(null);
  const router = useRouter();

  const currentSelectedType = (id: number) => {
    setSelectedClassType((prev) => (prev == id ? null : id));
  };
  // TODO : adjust as needed
  // ! The ratios may not be fully correct
  const sharedStyles =
    'rounded-lg p-5 my-5 items-center justify-center w-24 h-64 shadow-black shadow-xl';

  // ? Defining a local component within a component, I should take advantage of this technique more often
  // ! if the function body is wrapped around in (), then it expects to be returned HTML elements
  const renderItem = ({ item }: { item: (typeof classTypes)[0] }) => (
    <Pressable
      onPress={() => currentSelectedType(item.id)}
      className={selectedClassType == item.id ? `#555 ${sharedStyles}` : `#1A1A1A ${sharedStyles}`}
    >
      <Image
        // Image requires a height and width value to render using style
        // cannot use tailwindcss here
        source={item.icon}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <Text className="text-white mt-10 text-center">{item.name}</Text>
    </Pressable>
  );

  return (
    // TODO : adjust the css values as needed
    // ** originally raw css, converted to tailwind
    <View className="flex-1 bg-black p-20"></View>
  );
};

export default OnboardingScreen1;

//** old code, will be integrated to the default template for the guide being used
/* -->
const classes = [
  { id: 1, name: 'Physical Education', icon: require('src/assets/images/Icon dumbbell.png') },
  { id: 2, name: 'Literature Study', icon: require('src/assets/images/Icon book open.png') },
  { id: 3, name: 'Field Trips', icon: require('src/assets/images/Icon binoculars.png') },
  { id: 4, name: 'Schedule Planning', icon: require('src/assets/images/Icon clipboard check.png') },
  { id: 5, name: 'Early Morning Classes', icon: require('src/assets/images/Icon bed.png') },
  {
    id: 6,
    name: 'Music Appreciation',
    icon: require('src/assets/images/Icon headphones simple.png'),
  },
  { id: 7, name: 'Note-taking', icon: require('src/assets/images/Icon pen fancy.png') },
  { id: 8, name: 'Photography Breaks', icon: require('src/assets/images/Icon camera retro.png') },
];

const onboardingGetStarted: React.FC = () => {
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const router = useRouter();

  const toggleClassSelection = (id: number) => {
    setSelectedClasses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: (typeof classes)[0] }) => (
    <TouchableOpacity
      onPress={() => toggleClassSelection(item.id)}
      style={{
        backgroundColor: selectedClasses.includes(item.id) ? '#333' : '#1A1A1A',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
      }}
    >
      <Image source={item.icon} style={{ width: 50, height: 50 }} />
      <Text style={{ color: 'white', marginTop: 10 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 18, marginVertical: 20 }}>
        Select the classes you want to enroll in
      </Text>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ justifyContent: 'center' }}
      />

      {/** * Skip and Proceed Buttons
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
        <TouchableOpacity
          className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto"
          style={{ marginTop: 20 }}
          onPress={() => {
            router.push('/index');
          }}
        >
          <Text
            style={{
              fontFamily: 'PlaypenRegular',
            }}
            className="text-center text-black text-xl"
          >
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto"
          style={{ marginTop: 20 }}
          onPress={() => {
            router.push('/index');
          }}
        >
          <Text
            style={{
              fontFamily: 'PlaypenRegular',
            }}
            className="text-center text-black text-xl"
          >
            Finish
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default onboardingGetStarted; */
