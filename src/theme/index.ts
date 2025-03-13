import { Theme } from '@react-navigation/native';
import { COLORS } from './colors';

// add the custom fonts
// NOTE : needed to add fonts not loading due to nav theme
const NAV_THEME: { light: Theme; dark: Theme } = {
  light: {
    dark: false,
    colors: {
      background: COLORS.light.background,
      border: COLORS.light.grey5,
      card: COLORS.light.card,
      notification: COLORS.light.destructive,
      primary: COLORS.light.primary,
      text: COLORS.black,
    },
    // NOTE : this modification was needed after upgrading to expo 52
    // requires adding the specific fonts loaded within _layout.tsx at the topmost level
    // using useFonts, allowing for fonts of all kind regardless of the theme listed
    fonts: {
      regular: {
        fontFamily: 'SpaceMono-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'PlaypenSans-Medium',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'PlaypenSans-Bold',
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: 'PlaypenSans-ExtraBold',
        fontWeight: 'bold',
      },
    },
  },
  dark: {
    dark: true,
    colors: {
      background: COLORS.dark.background,
      border: COLORS.dark.grey5,
      card: COLORS.dark.grey6,
      notification: COLORS.dark.destructive,
      primary: COLORS.dark.primary,
      text: COLORS.white,
    },
    fonts: {
      regular: {
        fontFamily: 'SpaceMono-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'PlaypenSans-Medium',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'PlaypenSans-Bold',
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: 'PlaypenSans-ExtraBold',
        fontWeight: 'bold',
      },
    },
  },
};

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
      fontWeight: 'bold',
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
      fontWeight: 'bold',
      strokeWidth: 1.5,
    },
  },
};

export { NAV_THEME, TAB_THEME };
