import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';

const signup: React.FC = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <View className="flex-1 bg-black text-white justify-center">
      <View className="items-center justify-center mx-auto mt-10">
        <Svg>
          <SignupIcon
            style={{
              // occupy 1/4th of screen
              width: width * 0.55,
              height: height * 0.4,
            }}
          />
        </Svg>
      </View>
      <Text className="text-white">This is the login screen</Text>
    </View>
  );
};

export default signup;
