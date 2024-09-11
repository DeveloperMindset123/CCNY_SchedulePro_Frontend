import { isIos } from './getPlatform';
export const fontFamilies = {
  // TODO : Add Android Fonts
  PACIFICO: {
    regular: isIos() ? 'pacifico' : '',
  },
  PLAYPEN: {
    thin: isIos() ? 'PlaypenSans-Thin' : '',
    extraLight: isIos() ? 'PlaypenSans-ExtraLight' : '',
    light: isIos() ? 'PlaypenSans-Light' : '',
    regular: isIos() ? 'PlaypenSans-Regular' : '',
    medium: isIos() ? 'PlaypenSans-Medium' : '',
    semiBold: isIos() ? 'PlaypenSans-SemiBold' : '',
    bold: isIos() ? 'PlaypenSans-Bold' : '',
    extraBold: isIos() ? 'PlaypenSans-ExtraBold' : '',
    variableFont: isIos() ? 'PlaypenSans-VariableFont_wdht' : '',
  },
  SOFADI: {
    regular: isIos() ? 'SofadiOne-Regular' : '',
  },
  SPACEMONO: {
    regular: isIos() ? 'SpaceMono-Regular' : '',
  },
};
