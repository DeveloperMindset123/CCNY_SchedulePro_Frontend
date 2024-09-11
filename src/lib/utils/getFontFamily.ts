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
      }
  }
};
