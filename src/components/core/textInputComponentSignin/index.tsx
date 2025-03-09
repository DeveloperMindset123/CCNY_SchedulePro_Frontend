// Text input component for the signin button

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TODO : implement logic for passing data inbetween screens (should be starting from the signup screen to the 3rd onboarding screen where all relevant user information will be collected)
// custom hook to retrieve the height and width of the current device
// function wrapper around useWindowDimension() hook that comes from react-native
import getWindowDimensions from '@/lib/utils/getWindowDimension';

// router that uses stack data structure to keep track of current screen, previous screen(s) and future
import { router } from 'expo-router';

// renders toast messages based on a pre-built react-native library (to indicate whether or not user has successfully signed up or not)
import Toast from 'react-native-toast-message';

// Signup button component
// import { SignupButton } from '../customButton';
import { CustomButton } from '../customButton';
// import { hashPassword } from '@/utils/passwordHash';
import { hashPassword } from '@/utils/passwordHash';

// define the prop type for the input component
interface TextInputArrayType {
  id: number;
  placeholderText: string;
  onChangeText: (text: any) => void;
  value: string;
  isPassword: boolean;
  blur: boolean;
}

export const TextInputComponentSignin = () => {
  // returns 4 values in total in the form of an object
  // this syntax can help retrieve the first 2 properties of the object
  const { width, height } = getWindowDimensions();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // This hook will not be used for sign-in component
  // const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigation = useNavigation();

  const handleEmailInput = (text: any) => {
    setEmailInput(text);
  };

  const handlePasswordInput = (text: any) => {
    setPasswordInput(text);
  };

  // const handleConfirmPasswordInput = (text: React.SetStateAction<string>) => {
  //   setConfirmPasswordInput(text);
  // };

  // const test_password_match = async;
  // data that needs to be included for as part of retrieving information about a particular user
  const apiPayload = {
    email: emailInput,
    password: hashPassword(passwordInput),
  };

  // TODO : use compare password here

  // Function to make sure that password meets all the relevant requirements
  // 4 requirements must be met for the password to match
  const passwordValidation = (str: string) => {
    const hasUpperCase = /[A-Z]/.test(str);
    const hasLowerCase = /[a-z]/.test(str);
    const hasNumber = /[0-9]/.test(str);
    const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(str);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
  };

  // use the following struct for reference
  // pub struct UserLogin {
  //   pub email : String,
  //   pub password : String
  // }

  // TODO : implement logic for comparing and checking to see if password matches
  // we need to reference the database to check if the user by this specific email and password exists or not
  // meaning we need to retrieve not only the email but also the password as well
  // the password that the user inserts needs to be hashed and compared against what has been stored within the database to determine if the user's input is valid

  const handleSignIn = async () => {
    if (emailInput.length == 0) {
      Alert.alert(
        'Email Requirement',
        'The email input Field cannot be empty. Please type in the email you used for registration.'
      );
    }
    if (
      passwordInput.length === 0 ||
      (passwordInput.length < 8 && !passwordValidation(passwordInput))
    ) {
      // if (passwordInput !== confirmPasswordInput) {
      //   setPasswordMatch(false);
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Passwords Do Not Match!',
      //     text2: 'Please check to make sure your inputs are correct',
      //   });
      //   return;
      // }

      // specify that password requirement is not met
      Alert.alert(
        'Password Requirements',
        'Password must contain the following: Minimum length of 8, one upper case letter, one lower case letter and one special character.'
      );
      return;
    }

    // setPasswordMatch(true);
    // Toast.show({
    //   type: 'success',
    //   text1: 'Successful Signup',
    // });

    // make the api call to the signin route
    try {
      const response = await fetch('http://127.0.0.1:5000/signin', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(apiPayload),
      });

      console.log('Recieved response with statis:', response.status);

      if (response.ok || response.status == 200) {
        const data = await response.json();
        console.log('Success response data:', data);

        // render a toast to indicate successful signin
        Toast.show({
          type: 'success',
          text1: 'Sign In Successful !',
          text2: 'Logging you back in',
        });
        // navigate to the Schedule tab
        router.push('/(root)/(tabs)/(index)/Schedule'); // point the user to the correct path
      } else {
        const errorData = await response.text();
        // render the toast message in the case that the user's input is incorrect
        Toast.show({
          type: 'error',
          text1: 'Passwords Do Not Match!',
          text2: 'Please check to make sure your inputs are correct',
        });
        console.error('Error response:', response.status, errorData);
      }
    } catch (error) {
      console.error('Network error : ', error);
    }

    // For testing purposes
    // router.push('/onboarding1');

    // replaced with useNavigation hook instead
    // navigation.navigate('onboarding1', { apiPayload });
    // users should be sent to the Schedule tab

    // Uncomment for actual API implementation
    /*
    try {
      const response = await fetch('http://localhost:4001/auth/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(apiPayload),
      });

      if (response.ok || response.status === 200) {
        console.log('User Successfully Registered!');
        router.push('/onboarding1');
      } else if (response.status === 404) {
        Toast.show({
          type: 'info',
          text1: 'This email is already registered, please login instead',
        });
      } else {
        throw new Error(`The HTTP status of the response: ${response.status} (${response.statusText})`);
      }
    } catch (err) {
      console.log(err);
    }
    */
  };

  const TextInputArray: TextInputArrayType[] = [
    {
      id: 1,
      placeholderText: 'Enter Your Email',
      onChangeText: handleEmailInput,
      value: emailInput,
      isPassword: false,
      blur: true,
    },
    {
      id: 2,
      placeholderText: 'Enter your password',
      onChangeText: handlePasswordInput,
      value: passwordInput,
      isPassword: true,
      blur: false,
    },
    // {
    //   id: 3,
    //   placeholderText: 'Retype your password',
    //   onChangeText: handleConfirmPasswordInput,
    //   value: confirmPasswordInput,
    //   isPassword: true,
    //   blur: false,
    // },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={styles.container}>
        {TextInputArray.map((input) => (
          <TextInput
            key={input.id}
            style={styles.input}
            onChangeText={input.onChangeText}
            value={input.value}
            autoCapitalize="none"
            keyboardType={input.isPassword ? 'default' : 'email-address'}
            placeholder={input.placeholderText}
            onSubmitEditing={input.blur ? Keyboard.dismiss : undefined}
            secureTextEntry={input.isPassword}
            blurOnSubmit={input.blur}
            placeholderTextColor="#808080"
            autoCorrect={false}
          />
        ))}
        <View style={styles.buttonContainer}>
          <CustomButton
            width={width * 0.9}
            height={height * 0.06}
            handleOnPress={handleSignIn}
            button_content="Sign In"
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 100,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
});
