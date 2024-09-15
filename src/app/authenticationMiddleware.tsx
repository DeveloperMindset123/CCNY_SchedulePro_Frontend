import { View, Text } from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import { AuthenticationMiddlewareIcon } from '@/lib/utils/getSvgs';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from '@/components/core/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
// TODO : Add more animations
// @see https://reactnative.dev/docs/animations
const authenticationMiddleware: React.FC = () => {
  const { width, height } = getWindowDimensions();
  const [loaded, error] = useFonts({
    PlaypenBold: require('src/assets/fonts/PlaypenSans-Bold.ttf'),
    PlaypenRegular: require('src/assets/fonts/PlaypenSans-Regular.ttf'),
  });

  const handleImagePosition = () => {
    if (width > 600) {
      return {
        currentClassname: 'w-92 items-center justify-center -translate-y-60 mx-auto',
      };
    } else {
      return {
        currentClassname: 'w-auto items-center justify-center mx-auto',
        currentWidth: width * 0.95,
        height: 340,
      };
    }
  };

  if (!loaded && !error) {
    return null;
  }
  const retrievedStyling = handleImagePosition();
  console.log(retrievedStyling);
  return (
    <View className="flex-1 bg-black text-white justify-center">
      <View className="h-80 mb-10 -translate-y-44 mb-none">
        <View className={retrievedStyling.currentClassname}>
          <Svg>
            <AuthenticationMiddlewareIcon
              style={{
                width: width > 600 ? width * 0.97 : width * 0.95,
                height: width > 600 ? height * 0.5 : 340,
              }}
            />
          </Svg>
        </View>
        <Text
          style={{
            fontFamily: 'PlaypenBold',
          }}
          className="text-white mx-auto justify-center items-center mt-12 text-4xl"
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
            router.push('/signin');
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
            router.push('/signup');
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
