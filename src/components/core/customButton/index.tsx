import { DimensionValue, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface CustomButtonType {
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  button_content: string;
  handleOnPress?: () => void | any;
}
// component should start with captial letter
export const CustomButton = ({
  width,
  height,
  handleOnPress,
  button_content,
}: CustomButtonType) => {
  return (
    <Pressable
      style={{
        width: width,
        height: height,
      }}
      className="bg-white w-full h-12 justify-center rounded-full items-center mx-auto mt-2 active:bg-gray-100 active:opacity-30"
      onPress={handleOnPress}
    >
      <Text className="text-center text-black text-xl font-normal">
        {button_content} {'\b'}
        <AntDesign name="user" size={24} color="black" />
      </Text>
    </Pressable>
  );
};
