/**
 * @note to reference link, use @see from now on
 * @see https://nativewindui.com/
 */

import { Pressable, View } from "react-native";
import Animated, {
  LayoutAnimationConfig,
  ZoomInRotate,
} from "react-native-reanimated";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/cn";
// TODO : Implement the list of icons within one file, for easier accessibillity
import { FontAwesomeIcon } from "@/components/core/icon";

type sizeType = {
  size: Number;
};

// TODO : Continue the implementation after finishing all the relevant implementation for icon/index.tsx
// ! If you don't like the type declaration value, you can define the type directly within, this is my personal preference
// ? This componet is used to toggle between light and dark mode
export const ThemeToggle = ({ size = 28 }: sizeType) => {
  /**
   * @Detail useColorScehem().colorScheme, useColorScheme().setColorScheme are two methods within useColorScheme
   * @Detail Shows object and array destructuring methods available in typescript
   * @see https://basarat.gitbook.io/typescript/future-javascript/destructuring
   * */
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View
        className="items-center justify-center"
        key={`toggle-${colorScheme}`}
        entering={ZoomInRotate}
      >
        <Pressable
          // if current color scheme is light, change to dark, and vice versa, logic can be implemented using simple ternary operator
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          className="opacity-80"
        >
          {/**on click, we toggle the colorScheme state. Next, we check if it's dark mode and change the icon based on the color scheme, meaning  */}
          {colorScheme === "dark" ? (
            <p>Do something else</p>
          ) : (
            <p>Do something</p>
          )}
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  );
};
