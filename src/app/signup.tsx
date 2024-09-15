import React from 'react';
import { View, Text } from 'react-native';
import Svg from 'react-native-svg';
import { SignupIcon } from '@/lib/utils/getSvgs';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from '@/components/core/button';
import { router } from 'expo-router';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

const signup: React.FC = () => {
  const { width, height } = getWindowDimensions();

  return (
    <View className="flex-1 bg-black text-white justify-center">
      {/**TODO : Make this reponsive depending on the screen */}
      <View className="-top-28 items-center justify-center mx-auto">
        <SignupIcon
          style={{
            width: width * 0.55,
            height: height * 0.4,
          }}
        />
        <Text className="text-white">Test Text</Text>
      </View>
    </View>
  );
};

export default signup;
