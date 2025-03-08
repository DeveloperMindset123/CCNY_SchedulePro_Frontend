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

  // handles hiding the icon image and pushing text upward
  // this function should only execute if the keyboard view is being displayed (while the input field is active)
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

  // this function should only execute if the keyboard is no longer visible
  const keyboardWillHide = () => {
    setKeyboardVisible(false);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // First ensure we're at the proper position before animating back
    // sequence accepts an array of animation to be displayed in order
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
            <Animated.View
              // I assume this follows a toggle behavior of some kind?
              style={{ opacity: fadeAnim }}
            >
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
