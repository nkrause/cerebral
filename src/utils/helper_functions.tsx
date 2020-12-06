import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

// https://github.com/nirsky/react-native-scaling-example
/**
 * Scale a space horizontally for different screen sizes
 * @param {number} size The size to scale
 * @return {number} The scaled size based on the width
 */
const scale = (size: number): number => {
  const newSize = Math.round((screenWidth / guidelineBaseWidth) * size);
  return newSize;
};

export {
  scale
};
