import { DimensionValue, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';

interface SignUpButton {
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  route: Href<string>;
  handleOnPress?: any;
}
// component should start with captial letter
export const SignupButton = ({ width, height, route, handleOnPress }: SignUpButton) => {
  const router = useRouter();
  return (
    <Pressable
      style={{
        width: width,
        height: height,
      }}
      className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto mt-2 active:bg-gray-100 active:opacity-30"
      // TODO : Needs fixing
      onPress={handleOnPress}
    >
      <Text className="text-center text-black text-xl font-normal">
        Sign Up {'\b'}
        <AntDesign name="user" size={24} color="black" />
      </Text>
    </Pressable>
  );
};
