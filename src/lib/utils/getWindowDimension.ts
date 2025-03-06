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

/**
 * Example usage for reference
 *
 * This reference has been tested on typescript playground:
 * const some_random_function = () => {
    const sample_string : String = "This is a string";
    const sample_string2 : String = "This is another string";

    // returns it in the form of an object
    // from which we can extract the specific properties that makes up the object
    return {
        sample_string,
        sample_string2
    }
}

const some_random_function_capture = () => {
    // capture the previous function
    const { sample_string, sample_string2 } = some_random_function();

    const output = some_random_function();

    console.log("output with {} : ", sample_string, "\n", sample_string2);
    console.log(output);        // direct printout
    console.log(output.sample_string)
}

some_random_function_capture();
 */
