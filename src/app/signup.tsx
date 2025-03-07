// semi-working code (requires review)

// import React, { useEffect, useState } from 'react';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import {
//   Text,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   View,
//   Keyboard,
//   StyleSheet,

//   // Component to control the app's status bar.
//   // Status bar is the zone, typically at the top of the screen that displays the current time, wi-fi and cellular network information, battery level alongside other status icons.
//   // can be toggled on and off, and background color can also be modified as needed
//   StatusBar,
// } from 'react-native';
// import { SignupIcon } from '@/lib/utils/getSvgs';
// import getWindowDimensions from '@/lib/utils/getWindowDimension';
// //import { SignupButton } from '@/components/core/signupButton';
// import { TextInputComponent } from '@/components/core/textInputComponent';
// import { getSignupStyles } from '@/components/core/textInputComponent/getSignupStyles';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// // @see https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk --> for implementing authentication.
// // TODO : look into why react functional components needs to be named with lowercase letters
// // @NOTE : originally was named "register" but react components require uppercase naming characteristic.
// // return type --> : React.FC
// const Register = () => {
//   //const [passwordMatch, setPasswordMatch] = React.useState<boolean>(false);
//   const { width, height } = getWindowDimensions();

//   // TODO : set logic to include this styling after
//   const { titleFontStyling, secondaryTextStyling } = getSignupStyles();

//   // use state hook to keep track of whether keyboard ought to be visible or not
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [keyboardVisible, setKeyboardVisible] = useState(false);

//   // define events to check whether keyboard should be shown or remain hidden
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     // triggers when keyboard view pops up
//     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//       // toggle the keyboard visibillity hook
//       setKeyboardVisible(true);
//     });

//     // triggers when keyboard view closes
//     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//       // toggle the keyboard again back to the original value
//       setKeyboardVisible(false);
//     });

//     return () => {
//       // removes the subscription event
//       // similar to the process of mounting and unmounting
//       // this is to ensure memory leaks are prevented and avoiding unexpected behaviors
//       // follows the React's component lifecycle
//       // it also avoids running into multiple instance issue since each instance is closed at the end of the exeuction
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);
//   //let inputBoxWidth = width * 0.9;
//   //let inputBoxHeight = height * 0.07;
//   // @see https://www.npmjs.com/package/react-native-dotenv
//   //const public_key = process.env.EXPO_PUBLIC_KEY;
//   //console.log(process.env.EXPO_PUBLIC_KEY);

//   // ternary operator logic to determine whether icon size should shrink
//   // icon size should shrink if keyboard is currently visible since there will be less content to cover

//   const iconSize = {
//     width: keyboardVisible ? width * 0.25 : width * 0.45,
//     height: keyboardVisible ? height * 0.12 : height * 0.25,
//   };

//   return (
//     <SafeAreaProvider>
//       {/* <ScrollView className="flex-1 bg-black text-white overflow-none"> */}
//       <KeyboardAvoidingView
//         contentContainerStyle={{ flex: 1 }}
//         style={{
//           backgroundColor: 'black',
//           flex: 1,
//           height: '40%',

//           // tailwindcss equivalent css code (experimental)
//           // alignContent: 'center',
//           // alignItems: 'center',
//         }}
//         // className="items-center justify-center mx-auto mt-3"
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         // ternary logic to determine appropriate offset
//         keyboardVerticalOffset={Platform.OS == 'ios' ? 20 : 0}
//         // behavior="height"
//         // keyboardVerticalOffset={1}
//       >
//         {/** Moved scroll view within keyboard avoiding view instead
//          * Within scrollView exists a View of it's own
//          *
//          * scrollViews must have a bounded height in order to work since they contain unbounded-height children (otherwise, it will create the infinite scrolling behavior)
//          *
//          */}
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           /**
//            * Determines when keyboard should stay visible after a tap according to the documentaiton
//            *
//            * There's 5 options, 2 of whom are depecrated
//            * option 1 --> 'never' : tapping outside of the focused text input when keyboard is up dismisses the keyboard, when this happens, children won't recieve the tap --> this is the default prop value
//            *
//            * option 2 --> 'always' : the keyboard will not dismiss automatically, and the scroll view will not catch taps, but the children of the scroll view can catch taps.
//            *
//            * option 3 --> 'handled' : the keyboard will not dismiss automatically when the tap was handled by children of the scroll view (or captured by an ancestor)
//            *
//            * depecrated options:
//            * false -> use never instead
//            * true -> use always instead
//            */
//           keyboardShouldPersistTaps="handled"
//         >
//           <View
//             // @reference https://stackoverflow.com/questions/54635352/how-to-type-the-style-property-for-components-to-accept-arrays
//             //
//             // refer to the above link to understand how style property array acceptance works
//             //
//             // styles.content is always applied
//             // when keyboardVisible is true, styles.compactContent is added to the array (consider it similar to implementing ternary operator logic based styling)
//             //
//             // styles.compactContent should only be included as part of the styles if the keyboard is currently visible to control the behavior of the component
//             // This would be the same as writting
//             style={[styles.content, keyboardVisible && styles.compactContent]}
//           >
//             <SignupIcon
//               // replaced with iconSize ternary operator logic
//               style={[iconSize, keyboardVisible && { display: 'none' }]}
//               // style={{
//               //   width: width * 0.45,
//               //   height: height * 0.25,
//               // }}
//             />
//             <Text
//               // TODO : reintegrate this code later if needed
//               // className={titleFontStyling}
//               style={[
//                 {
//                   color: 'white', // specify text color
//                 },
//                 styles.titleText,

//                 // override the text content with styles.compactText if keyboard view is currently available
//                 keyboardVisible && styles.compactText,
//               ]}
//             >
//               Join CCNY Schedule Pro!
//             </Text>
//             <Text
//               // className={secondaryTextStyling}
//               style={[
//                 { color: 'white' },
//                 styles.secondaryText,
//                 keyboardVisible && styles.compactText,
//               ]}
//             >
//               Explore and manage class schedules efficiently
//             </Text>
//             <TextInputComponent />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//       {/*
//       <SignupButton width={inputBoxWidth} height={inputBoxHeight} route="/onboardingGetStarted" /> */}
//       {/* </ScrollView> */}
//     </SafeAreaProvider>
//   );
// };

// export default Register;

// // experimental css code
// // TODO : convert to appropriate tailwindcss code
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   content: {
//     width: '100%',
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   compactContent: {
//     paddingTop: 20,
//     justifyContent: 'flex-start',
//   },
//   titleText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   secondaryText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   compactText: {
//     marginTop: 10,
//     marginBottom: 5,
//     fontSize: 18,
//   },
// });

import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  View,
  Keyboard,
  StyleSheet,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  StatusBar,
  Animated,
} from 'react-native';
import { SignupIcon } from '@/lib/utils/getSvgs';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { TextInputComponent } from '@/components/core/textInputComponent';
import { getSignupStyles } from '@/components/core/textInputComponent/getSignupStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Register = () => {
  const { width, height } = getWindowDimensions();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { titleFontStyling, secondaryTextStyling } = getSignupStyles();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Create animated value for fade effect
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Create animated value for content position
  const contentPosition = useRef(new Animated.Value(0)).current;

  // Handle keyboard events
  useEffect(() => {
    const keyboardWillShowListener =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillShow', keyboardWillShow)
        : Keyboard.addListener('keyboardDidShow', keyboardWillShow);

    const keyboardWillHideListener =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillHide', keyboardWillHide)
        : Keyboard.addListener('keyboardDidHide', keyboardWillHide);

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const keyboardWillShow = (event: any) => {
    setKeyboardVisible(true);

    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Move content position up immediately
    Animated.timing(contentPosition, {
      toValue: -180, // Modify to change how much the screen should move up
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const keyboardWillHide = () => {
    setKeyboardVisible(false);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // First ensure we're at the proper position before animating back
    Animated.sequence([
      // First go to starting position to avoid jumping
      Animated.timing(contentPosition, {
        toValue: -20,
        duration: 0,
        useNativeDriver: true,
      }),
      // Then animate back down properly
      Animated.timing(contentPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconSize = {
    width: width * 0.45,
    height: height * 0.25,
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" // NOTE : if this is set to "never", signup button fails to work
          scrollEnabled={false} // statically set to false since if enable, it allows content to go outside of screen, bad user experience
        >
          <Animated.View
            style={[
              styles.content,
              keyboardVisible && styles.compactContent,
              { transform: [{ translateY: contentPosition }] },
            ]}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              <SignupIcon style={iconSize} />
            </Animated.View>

            <Text
              style={[{ color: 'white' }, styles.titleText, keyboardVisible && styles.compactText]}
            >
              Join CCNY Schedule Pro!
            </Text>

            <Text
              style={[
                { color: 'white' },
                styles.secondaryText,
                keyboardVisible && styles.compactText,
              ]}
            >
              Explore and manage class schedules efficiently
            </Text>

            <TextInputComponent />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  compactContent: {
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  secondaryText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  compactText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
  },
});

export default Register;
