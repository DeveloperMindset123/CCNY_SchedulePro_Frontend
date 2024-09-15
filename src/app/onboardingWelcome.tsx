import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const onboardingWelcome: React.FC = () => {
  const router = useRouter();
  const imagePath = require('../assets/images/Landing-Screen-Image-Updated.png');

  return (
    <View className="flex-1 bg-black text-white">
      <Image
        className="w-[270px] h-[270px] justify-center object-none m-auto mt-10"
        source={imagePath}
        contentFit="cover"
      />
        <Text
          style={{
            fontFamily: 'PlaypenRegular',
          }}
          className="text-white mx-3 mt-3 text-center text-base"
        >
          Thank you for signing up to CCNY Class Schedule Pro. Lets begin customizing your schedule.
        </Text>
      <TouchableOpacity
        className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto"
        style={{
          position: '',
          bottom: 300, 
        }}
        onPress={() => {
          router.push('/onboardingGetStarted');
        }}
      >
        <Text
          style={{
            fontFamily: 'PlaypenRegular',
          }}
          className="text-center text-black text-xl"
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default onboardingWelcome;
