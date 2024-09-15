import { View, Text } from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import { AuthenticationMiddlewareIcon } from '@/lib/utils/getSvgs';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from '@/components/core/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
// TODO : Add more animations
// @see https://reactnative.dev/docs/animations
const authenticationMiddleware: React.FC = () => {
  const [loaded, error] = useFonts({
    PlaypenBold: require('src/assets/fonts/PlaypenSans-Bold.ttf'),
    PlaypenRegular: require('src/assets/fonts/PlaypenSans-Regular.ttf'),
  });
  if (!loaded && !error) {
    return null;
  }
  return (
    <View className="flex-1 bg-black text-white justify-center">
      <View className="h-80 -translate-y-44 mb-none">
        <Svg>
          <AuthenticationMiddlewareIcon
            dimensions={{
              width: 150,
              height: 150,
            }}
          />
        </Svg>
        <Text
          style={{
            fontFamily: 'PlaypenBold',
          }}
          className="text-white mx-auto justify-center items-center mt-10 text-4xl"
        >
          Class Scheduler
        </Text>
        <Text
          style={{
            fontFamily: 'PlaypenRegular',
          }}
          className="text-white mx-3 mt-3 text-center text-base"
        >
          Welcome to CCNY Class Schedule Pro, your go-to app for managing class schedules, course
          information and more at CCNY!
        </Text>
        <TouchableOpacity
          className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto mt-10 active:bg-gray-100 active:opacity-30"
          onPress={() => {
            router.replace('/signin');
          }}
        >
          <Text
            style={{
              fontFamily: 'PlaypenRegular',
            }}
            className="text-center text-black text-xl"
          >
            Sign In{'\t'}
            <AntDesign name="login" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto mt-2 active:bg-gray-100 active:opacity-30"
          onPress={() => {
            // TODO : Implement this screen
            router.replace('/signup');
          }}
        >
          <Text
            style={{
              fontFamily: 'PlaypenRegular',
            }}
            className="text-center text-black text-xl"
          >
            Sign Up {'\b'}
            <AntDesign name="user" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default authenticationMiddleware;
