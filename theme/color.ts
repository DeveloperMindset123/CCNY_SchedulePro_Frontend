import { Platform } from "react-native";

// ** Intended to define the theme based on the platform being viewed
// Add colors for different theme as needed
// ** Understanding the purpose of "as const" in typescript
// ? https://stackoverflow.com/questions/66993264/what-does-the-as-const-mean-in-typescript-and-what-is-its-use-case --> understanding the purpose of "as const" in typescript
// TODO : Modify the colors as needed, maybe for unique color schemes that just red, blue, white and grey
const IOS_SYSTEM_COLOR = {
  white: "rgb(255,255,255)",
  black: "rgb(0,0,0)",
  // The following are the list of colors that are currently avaialable within light mode
  light: {
    /**
     * @purpoe different layers of color intensity for grey
     * @grey6 lowest intensity for gray
     * @grey highest intensity for grey
     */
    grey6: "rgb(242,242,247)",
    grey5: "rgb(230, 230, 235)",
    grey4: "rgb(210, 210, 215)",
    grey3: "rgb(199, 199, 204)",
    grey2: "rgb(175,176,180)",
    grey: "rgb(142, 142, 147",
    background: "rgb(242,242,247)",
    foreground: "rgb(0,0,0)",
    root: "rgb(255,255,255)",
    card: "rgb(255,255,255)",
    destructive: "rgb(255,56,43)",
    primary: "rgb(0,123,254)",
  },
  // The following are the list of colors available for dark mode
  // the reverse of the color scheme holds true for the dark, grey6 being the darkest shade whereas grey would be the lighest shade
  dark: {
    grey6: "rgb(21,21,24)",
    grey5: "rgb(40,40,42)",
    grey4: "rgb(55,55,57)",
    grey3: "rgb(70,70,73)",
    grey2: "rgb(99,99,102)",
    grey: "rgb(142,142,147)",
    background: "rgb(0,0,0)",
    foreground: "rgb(255,255,255)",
    root: "rgb(0,0,0)",
    card: "rgb(28,28,30)",
    destructive: "rgb(254,67,54)",
    primary: "rgb(3,133,255)",
  },
} as const;

const ANDROID_COLORS = {
  white: "rgb(255,255,255)",
  black: "rgb(0,0,0)",
  light: {
    grey6: "rgb(249,249,255)",
    grey5: "rgb(215,217,228)",
    grey4: "rgb(193,198,215)",
    grey3: "rgb(113,119,134)",
    grey2: "rgb(65.71,84)",
    grey: "rgb(24,28,35)",
    background: "rgb(249,249,255)",
    foreground: "rgb(0,0,0)",
    root: "rgb(255,255,255)",
    card: "rgb(255,255,255)",
    destructive: "rgb(186,26,26)",
    primary: "rgb(0,112,233)",
  },
  dark: {
    grey6: "rgb(16, 19, 27)",
    grey5: "rgb(39, 42, 50)",
    grey4: "rgb(49, 53, 61)",
    grey3: "rgb(54, 57, 66)",
    grey2: "rgb(139, 144, 160)",
    grey: "rgb(193, 198, 215)",
    background: "rgb(0, 0, 0)",
    foreground: "rgb(255, 255, 255)",
    root: "rgb(0, 0, 0)",
    card: "rgb(16, 19, 27)",
    destructive: "rgb(147, 0, 10)",
    primary: "rgb(3, 133, 255)",
  },
} as const;

// if the platform is ios, set it to the IOS_SYSTEM_COLOR or otherwise, set it to ANDROID_SYSTEM_COLOR
console.log(`Current Detected Platform : ${Platform.OS}`);
const COLORS = Platform.OS === "ios" ? IOS_SYSTEM_COLOR : ANDROID_COLORS;
export { COLORS };
