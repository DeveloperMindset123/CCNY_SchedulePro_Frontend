import { useWindowDimensions } from 'react-native';

const getWindowDimensions = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width, height, scale, fontScale } = useWindowDimensions();
  return {
    width,
    height,
    scale,
    fontScale,
  };
};

export default getWindowDimensions;
