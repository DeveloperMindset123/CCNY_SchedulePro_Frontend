// old text input component
// import { useState } from 'react';
// import { View, TextInput, Keyboard, Alert } from 'react-native';
// import getWindowDimensions from '@/lib/utils/getWindowDimension';
// import { getSignupStyles } from './getSignupStyles';
// import { SignupButton } from '../signupButton';
// import { router } from 'expo-router';
// import Toast from 'react-native-toast-message';

// /**
//  * @reminder useRef can be used to store the session cookie for logged in users
//  * @see https://www.ifelsething.com/post/get-value-react-native-text-input/
//  * @TODO Check if email already exists and warn user if it does, to get them to sign in instead
//  * @TODO see if the callback functions are neccessary within the handle sign up function
//  */
// export const TextInputComponent = () => {
//   const { width, height } = getWindowDimensions();
//   const currentStyles = getSignupStyles();

//   const dimensions = {
//     width: width * 0.9,
//     height: height * 0.07,
//   };
//   const [emailInput, setEmailInput] = useState<any>();
//   const [passwordInput, setPasswordInput] = useState<string>('');
//   const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

//   const handleEmailInput = (e: any) => {
//     setEmailInput(e.nativeEvent.text);
//   };

//   const handlePasswordInput = (e: any) => {
//     setPasswordInput(e.nativeEvent.text);
//   };

//   const handleConfirmPasswordInput = (e: any) => {
//     setConfirmPasswordInput(e.nativeEvent.text);
//   };

//   const apiPayload = {
//     email: emailInput,
//     password: passwordInput,
//   };

//   const passwordValidation = (str: string): boolean => {
//     const hasUpperCase = /[A-Z]/.test(str);
//     const hasLowerCase = /[a-z]/.test(str);
//     const hasNumber = /[0-9]/.test(str);
//     const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(str);

//     return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
//   };

//   // TODO : fix this
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const handleSignUp = async () => {
//     if (passwordInput !== confirmPasswordInput) {
//       const showErrorToast = () => {
//         setPasswordMatch(false);
//         Toast.show({
//           type: 'error',
//           text1: 'Passwords Do Not Match!',
//           text2: 'Please check to make sure your inputs are correct',
//         });
//       };
//       return showErrorToast();
//     } else if (
//       passwordInput.length === 0 ||
//       (passwordInput.length < 8 && !passwordValidation(passwordInput))
//     ) {
//       return Alert.alert(
//         'Password Must contain the following : Minimum length of 8, one upper case letter, one lower case letter and one special character.'
//       );
//     } else {
//       const showSuccessToast = () => {
//         setPasswordMatch(true);
//         Toast.show({
//           type: 'success',
//           text1: 'Successful Signup',
//         });
//       };
//       showSuccessToast();
//       const sendDataToDatabase = () => {
//         fetch('http://localhost:4001/auth/register', {
//           headers: { 'Content-Type': 'application/json' },
//           method: 'POST',
//           body: JSON.stringify(apiPayload),
//         })
//           .then((res) => {
//             if (res.ok || res.status === 200) {
//               console.log('User Successfully Registered!');
//               console.log(`response status : ${res.status}`);
//               // only instance where user should be re-directed
//               return router.push('/onboarding1');
//             } else {
//               // check if the status code is 404
//               if (res.status === 404) {
//                 // in this case, user should not be re-routerd
//                 // this means the user is already registered
//                 const showInfoMessage = () => {
//                   Toast.show({
//                     type: 'info',
//                     text1: 'This email is already registered, please login instead',
//                   });
//                 };
//                 return showInfoMessage();
//               }
//               console.log(res.json());
//               throw new Error(`The HTTP status of the response: ${res.status} (${res.statusText})`);
//             }
//           })
//           .then((json) => console.log(json))
//           .catch((err) => console.log(err));
//       };
//       sendDataToDatabase();
//     }
//   };

//   const TextInputArray = [
//     {
//       id: 1,
//       dimensions: dimensions,
//       tailwindStyling: currentStyles.emailInputStyling,
//       placeholderText: 'Enter Your Email',
//       onChangeFunction: (newEmail: any) => handleEmailInput(newEmail),
//       value: emailInput,
//       isPassword: false,
//       blur: true,
//     },
//     {
//       id: 2,
//       dimensions: dimensions,
//       tailwindStyling: currentStyles.passwordInputStyling,
//       placeholderText: 'Enter your password',
//       onChangeFunction: (newPassword: any) => handlePasswordInput(newPassword),
//       value: passwordInput,
//       isPassword: true,
//       blur: false,
//     },
//     {
//       id: 3,
//       dimensions: dimensions,
//       tailwindStyling: currentStyles.passwordInputStyling,
//       placeholderText: 'Retype your password',
//       onChangeFunction: (confirmNewPassword: any) => handleConfirmPasswordInput(confirmNewPassword),
//       value: confirmPasswordInput,
//       isPassword: true,
//       blur: false,
//     },
//   ];
//   return (
//     <View className="flex-1 items-center justify-center m-auto">
//       {TextInputArray.map((TextInputIter) => (
//         <TextInput
//           key={TextInputIter.id}
//           style={TextInputIter.dimensions}
//           className={TextInputIter.tailwindStyling}
//           // TODO : May require fixing
//           onChange={TextInputIter.onChangeFunction}
//           value={TextInputIter.value}
//           autoCapitalize="none"
//           keyboardType="default"
//           placeholder={TextInputIter.placeholderText}
//           onSubmitEditing={Keyboard.dismiss}
//           secureTextEntry={TextInputIter.isPassword}
//           blurOnSubmit={TextInputIter.blur}
//           placeholderTextColor="grey-500"
//           autoCorrect={false}
//         />
//       ))}
//       <SignupButton
//         // TODO : route isn't being properly used
//         width={dimensions.width}
//         height={dimensions.height}
//         // TODO : originally working backend, but I don't want this logic to execute at the moment given taht I am working on frontend
//         //handleOnPress={() => handleSignUp()}
//         handleOnPress={() => router.push('/onboarding1')}
//       />
//     </View>
//   );
// };

// experimental text input component
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

// custom hook to retrieve the height and width of the current device
// function wrapper around useWindowDimension() hook that comes from react-native
import getWindowDimensions from '@/lib/utils/getWindowDimension';

// router that uses stack data structure to keep track of current screen, previous screen(s) and future
import { router } from 'expo-router';

// renders toast messages based on a pre-built react-native library (to indicate whether or not user has successfully signed up or not)
import Toast from 'react-native-toast-message';

// Signup button component
import { SignupButton } from '../signupButton';

export const TextInputComponent = () => {
  // returns 4 values in total in the form of an object
  // this syntax can help retrieve the first 2 properties of the object
  const { width, height } = getWindowDimensions();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleEmailInput = (text: any) => {
    setEmailInput(text);
  };

  const handlePasswordInput = (text: any) => {
    setPasswordInput(text);
  };

  const handleConfirmPasswordInput = (text: React.SetStateAction<string>) => {
    setConfirmPasswordInput(text);
  };

  // api data that needs to be included when logging in an user
  const apiPayload = {
    email: emailInput,
    password: passwordInput,
  };

  const passwordValidation = (str) => {
    const hasUpperCase = /[A-Z]/.test(str);
    const hasLowerCase = /[a-z]/.test(str);
    const hasNumber = /[0-9]/.test(str);
    const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(str);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
  };

  const handleSignUp = async () => {
    if (passwordInput !== confirmPasswordInput) {
      setPasswordMatch(false);
      Toast.show({
        type: 'error',
        text1: 'Passwords Do Not Match!',
        text2: 'Please check to make sure your inputs are correct',
      });
      return;
    }

    if (
      passwordInput.length === 0 ||
      (passwordInput.length < 8 && !passwordValidation(passwordInput))
    ) {
      Alert.alert(
        'Password Requirements',
        'Password must contain the following: Minimum length of 8, one upper case letter, one lower case letter and one special character.'
      );
      return;
    }

    setPasswordMatch(true);
    Toast.show({
      type: 'success',
      text1: 'Successful Signup',
    });

    // For testing purposes
    router.push('/onboarding1');

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

  const TextInputArray = [
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
    {
      id: 3,
      placeholderText: 'Retype your password',
      onChangeText: handleConfirmPasswordInput,
      value: confirmPasswordInput,
      isPassword: true,
      blur: false,
    },
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
          <SignupButton width={width * 0.9} height={height * 0.06} handleOnPress={handleSignUp} />
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
