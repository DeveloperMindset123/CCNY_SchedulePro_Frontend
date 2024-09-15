import { useWindowDimensions } from 'react-native';

const getWindowDimensions = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();
  return {
    width,
    height,
    scale,
    fontScale,
  };
};

export default getWindowDimensions;
