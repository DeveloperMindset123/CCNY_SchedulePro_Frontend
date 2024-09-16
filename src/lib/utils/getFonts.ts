import { useFonts } from 'expo-font';

// TODO : Figure out how to make the fonts globally accessible
const getFonts = () => {
  const [loaded, error] = useFonts({
    Sofadi: require('src/assets/fonts/SofadiOne-Regular.ttf'),
    Pacifico: require('src/assets/fonts/pacifico.ttf'),
    PlaypenBold: require(''),
  });
};

export default getFonts;
