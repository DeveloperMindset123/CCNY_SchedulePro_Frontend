/**
 * @detail Icon component using various libraries (Fontawesome, AntDesign, Entypo, etc.)
 * @detail Icons are dynamically updated via the props values specified
 * @param className - optional class name, used for tailwindcss styling
 * @param size - optional size, used to specify the size of the icon to be displayed
 * @param name - name of the icon, used to determine the approrpriate icon to be rendered
 * @param color - color of the icon, optional
 * @param onPress - optional onPress function, used to determine what happens when the button is clicked
 * @see https://icons.expo.fyi/Index --> link to expo based vector icons available for uses
 * @see https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#:~:text=write%20your%20code.-,.,are%20only%20used%20for%20typechecking. --> explains the purpose of .d.ts type files
 * @see https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#:~:text=Namespaces%20are%20a%20TypeScript%2Dspecific,can%20be%20concatenated%20using%20outFile%20. --> to understand differences between namespaces and modules
 * @detail Refer below for example uses
 *
 * @example
 * @code <FontAwesomeIcon name="home" size={24} color="black" />
 * @code <Icon name="home" size={24} color="black" className="text-white" />
 */

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
// @see https://docs.fontawesome.com/web/setup/upgrade/#:~:text=The%20new%20Thin%20icon%20style,Tons%20of%20new%20icons --> to understand the difference between font awesome 5 and 6
import { FontAwesome6 } from "@expo/vector-icons";
// must explictly point to the right path
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons";
// allows us to use specific types available within react-native for type declaration
import { ColorValue, StyleProp, TextStyle, StyleSheet } from "react-native";
// usePathname is a hook
// @see https://docs.expo.dev/router/reference/hooks/ --> expo-router hooks api
// usePathname --> returns the currently selected route location without search parameters.
// for example, /acme?foo=bar --> /acme segment will be returned
// for dynamic routes such as /[id]?id=normal will return /normal since that is the value being passed into the route in this case
import { usePathname } from "expo-router";

// @ee https://www.nativewind.dev/api/use-color-scheme
// colorScheme -- getter method that returns the current device's color scheme
// setColorScheme --> setter method that helps override the current color scheme, accepts three values light || dark || system
// toggleColorSheme --> changes the color scheme between light and dark mode
import { useColorScheme } from "nativewind";
import { TAB_THEME } from "@/theme";

// @see https://lucide.dev/guide/installation
import { icons, LucideProps } from "lucide-react-native";

interface IconTypes {
  // @see https://react-typescript-cheatsheet.netlify.app/docs/react-types/componentprops/ --> to better understand how ComponetProps work
  name: React.ComponentProps<typeof FontAwesome>["name"];
  // ? means that the prop is optional
  color?: ColorValue;
  className?: string;
  size?: number;
  // onPress expects a void function without any parameters
  onPress?: () => void;
  // determines the font to be displayed relevant to the platform
  style?: StyleProp<TextStyle>;
}

export const FontAwesomeIcon = ({
  name,
  color,
  className,
  size,
  onPress,
  style,
}: IconTypes) => {
  return (
    // Now all we have to do is pass in the props from the parameters here into the FontAwesome tag
    <FontAwesome
      name={name}
      color={color}
      className={className}
      size={size}
      onPress={onPress}
      style={style}
    />
  );
};

// TODO : Implement the same logic for Entypo and AntDesign icons, allows for added options
// TODO : Implement for FontAwesome5 and FontAwesome6 as well

// define the prop based compoent for LucideIcons
interface LucideIconTypes {
  name: keyof typeof icons;
  color?: ColorValue;
  // retrieves the prop type of LucideIcons
  // the value is either a string or a number type
  // click on LucideProps to see it's declaration to get a better idea
  size?: LucideProps["size"];
  className?: string;
  strokeWidth?: LucideProps["strokeWidth"];
  // similar to before, expects a void function without any kind of parameters
  onPress?: () => void;
}
export const LucideIcon = ({
  name,
  color,
  size,
  className,
  strokeWidth = 1,
  onPress,
}: LucideIconTypes) => {
  // @see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/ --> to better understand react's functional components
  const LucideIcon: React.FC<LucideProps & { color?: ColorValue }> =
    icons[name];
  return (
    // pass in the props as before, it accepts the same props as FontAwesome, except name which is not included
    <LucideIcon
      onPress={onPress}
      strokeWidth={strokeWidth}
      className={className}
      color={color}
      size={size}
    />
  );
};

// define the IoniIcons
interface IoniIconsTypes {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: ColorValue;
  size?: number;
  className?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}
export const IoniIcons: React.FunctionComponent<IoniIconsTypes> = ({
  name,
  color,
  size,
  className,
  style,
  onPress,
}) => {
  return (
    <IoniIcons
      name={name}
      color={color}
      size={size}
      className={className}
      style={style}
      onPress={onPress}
    />
  );
};
// define the TabBarIcons, meaning the icons to be displayed for the tabs
interface TabBarIconTypes {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  pathnames?: string[];
  className?: string;
}

// ! NOTE : this is the same as normally declaring functional component
// newwer method of defining functional component
// @see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/
// ! Will raise an error because FunctionComponent expects an output
export const TabBarIcon: React.FunctionComponent<TabBarIconTypes> = ({
  name,
  pathnames = [],
  className,
}) => {
  const currentPath: string = usePathname();
  const { colorScheme } = useColorScheme();
  // the includes method is used to determine if a certain element exists within an array
  // returns a boolean
  const isActive: boolean = pathnames.includes(currentPath);
  // chooses between light or dark
  // type is implicitly object, unable to explictly declare types here
  const color = TAB_THEME[colorScheme || "light"];
  return (
    <FontAwesomeIcon
      className={className}
      name={name}
      // we want to toggle the size (make it bigger slightly) if the current icon has been selected, otherwise, keep it small
      // TODO : play around to find out what matches this the best during functionality/testing
      size={isActive ? 32 : 28}
      // we also want to change the color based on whether the icon has been clicked or not
      color={isActive ? color.activeTintColor : color.inactiveTintColor}
      style={styles.tabBarIconStyles}
    />
  );
};

// @see https://reactnative.dev/docs/style
// defining css in React-Native as recommended
const styles = StyleSheet.create({
  tabBarIconStyles: {
    marginBottom: -3,
  },
});
