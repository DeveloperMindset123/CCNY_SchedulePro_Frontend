import React from 'react';
import { View, Text } from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';

const signup: React.FC = () => {
  // TODO : add conditional to change the size of the image depending on the application window
  // @see https://reactnative.dev/docs/dimensions
  return (
    <View className="flex-1 bg-black text-white justify-center">
      <View className="items-center justify-center mx-auto mt-10">
        <Svg>
          <SignupIcon
            style={{
              width: 150,
              height: 150,
            }}
          />
        </Svg>
      </View>
      <Text className="text-white">This is the login screen</Text>
    </View>
  );
};

export default signup;
