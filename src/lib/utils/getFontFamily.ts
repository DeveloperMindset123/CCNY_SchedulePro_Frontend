import { fontFamilies } from './fonts';

export const getFontFamily = (
  fontFamily: string,
  // defaults to regular
  weight?: string
) => {
  //TODO : add switch statements
  switch (fontFamily) {
    case 'PLAYPEN':
      if (!weight) {
        return fontFamilies.PLAYPEN.regular;
      } else if (weight === 'thin') {
        return fontFamilies.PLAYPEN.thin;
      } else if (weight === 'extralight') {
        return fontFamilies.PLAYPEN.extraLight;
      } else if (weight === 'light') {
        return fontFamilies.PLAYPEN.light;
      } else if (weight === 'regular') {
        return fontFamilies.PLAYPEN.regular;
      } else if (weight === 'medium') {
        return fontFamilies.PLAYPEN.medium;
      } else if (weight === 'semibold') {
        return fontFamilies.PLAYPEN.semiBold;
      } else if (weight === 'bold') {
        return fontFamilies.PLAYPEN.bold;
      } else if (weight === 'extrabold') {
        return fontFamilies.PLAYPEN.extraBold;
      } else {
        return fontFamilies.PLAYPEN.variableFont;
      }
  }
};
