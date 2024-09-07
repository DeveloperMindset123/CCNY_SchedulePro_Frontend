// TODO : Set the logic for the colors here
import { Theme } from "@react-navigation/native";
import { COLORS } from "./color";

// we are declaring the types
// we can also replace this with a interface to improve readabillity, we are essentially defining the types of the parameters being passed in
/**
 * @detail Understanding the difference between inference and types
 * @Reference https://www.sitepoint.com/typescript-type-vs-interface/#:~:text=Types%20in%20TypeScript%20are%20more,keyword%20for%20declaring%20an%20interface.
 */

/**
 * A parallel use would be the following:
 * type colorThemeTypes = {
 * light : Theme;
 * dark : Theme; }
 *
 * @NOTE Interfaces are better in regards to performance than type
 */
interface colorThemeTypes {
  light: Theme;
  dark: Theme;
}
// defines the theme for the navigation bar
const NAV_THEME: colorThemeTypes = {
  // set the colors for light mode
  light: {
    // dark should be toggled to false in this case, since we will need to check this to determine what color to set it to
    dark: false,
    colors: {
      background: COLORS.light.background,
      border: COLORS.light.grey5,
      card: COLORS.light.card,
      notification: COLORS.light.destructive,
      primary: COLORS.light.primary,
      text: COLORS.black,
    },
  },
  dark: {
    dark: true,
    colors: {
      // sets the background to the background defined within the nested object
      background: COLORS.dark.background,
      border: COLORS.dark.grey5,
      card: COLORS.dark.grey6,
      notification: COLORS.dark.destructive,
      primary: COLORS.dark.primary,
      text: COLORS.white,
    },
  },
};

// defines the theme for the nested tab view (as needed on the top)
const TAB_THEME = {
  light: {
    activeTintColor: COLORS.light.primary,
    inactiveTintColor: COLORS.light.grey3,
    activeBackgroundColor: COLORS.light.background,
    inactiveBackgroundColor: COLORS.light.background,
    labelStyle: {
      fontSize: 14,
      strokeWidth: 1,
    },
    activeLabelStyle: {
      fontSize: 15,
      fontWeight: "bold",
      strokeWidth: 1.5,
    },
  },
  dark: {
    activeTintColor: COLORS.dark.primary,
    inactiveTintColor: COLORS.dark.grey3,
    activeBackgroundColor: COLORS.dark.background,
    inactiveBackgroundColor: COLORS.dark.background,
    labelStyle: {
      fontSize: 14,
      strokeWidth: 1,
    },
    activeLabelStyle: {
      fontSize: 15,
      fontWeight: "bold",
      strokeWidth: 1.5,
    },
  },
};

export { NAV_THEME, TAB_THEME };
