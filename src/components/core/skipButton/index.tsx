import { DimensionValue, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';

interface SkippButton {
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  route: Href<string>;
  handleOnPress?: () => void | any;
}
// component should start with captial letter
export const SkipButton = ({ width, height, route, handleOnPress }: SkippButton) => {
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
        Skip {'\b'}
      </Text>
    </Pressable>
  );
};
