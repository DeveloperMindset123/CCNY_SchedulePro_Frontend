import { useState } from 'react';
import { View, TextInput, Keyboard, Alert } from 'react-native';
import getWindowDimensions from '@/lib/utils/getWindowDimension';
import { getSignupStyles } from './getSignupStyles';
import { SignupButton } from '../signupButton';
//import { supabaseInstance } from '@/lib/database/supabase';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

// ! useRef can be used to store the session cookie for logged in users
export const TextInputComponent = () => {
  const { width, height } = getWindowDimensions();
  const currentStyles = getSignupStyles();

  const dimensions = {
    width: width * 0.9,
    height: height * 0.07,
  };
  const [emailInput, setEmailInput] = useState<any>();
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  //const [loading, setLoading] = useState<boolean>(false);
  // ! This isn't important on signup nor signin, since backend APIs are already handling this using compare
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

  // @see https://www.ifelsething.com/post/get-value-react-native-text-input/
  // proper input handling
  const handleEmailInput = (e: any) => {
    setEmailInput(e.nativeEvent.text);
  };

  const handlePasswordInput = (e: any) => {
    setPasswordInput(e.nativeEvent.text);
  };

  const handleConfirmPasswordInput = (e: any) => {
    setConfirmPasswordInput(e.nativeEvent.text);
  };

  const apiPayload = {
    email: emailInput,
    password: passwordInput,
  };

  // ! Regex Expression Check
  // TODO : Check if email already exists and warn user if it does, to get them to sign in instead
  const passwordValidation = (str: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(str);
    const hasLowerCase = /[a-z]/.test(str);
    const hasNumber = /[0-9]/.test(str);
    const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(str);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
  };

  const handleSignUp = () => {
    if (passwordInput !== confirmPasswordInput) {
      const showErrorToast = () => {
        setPasswordMatch(false);
        Toast.show({
          type: 'error',
          text1: 'Passwords Do Not Match!',
          text2: 'Please check to make sure your inputs are correct',
        });
      };
      showErrorToast();
    } else if (
      passwordInput.length === 0 ||
      (passwordInput.length < 8 && !passwordValidation(passwordInput))
    ) {
      // ! Toast doesn't allow me to present all the information needed, alert alternative
      Alert.alert(
        'Password Must contain the following : Minimum length of 8, one upper case letter, one lower case letter and one special character.'
      );
    } else {
      const showSuccessToast = () => {
        setPasswordMatch(true);
        Toast.show({
          type: 'success',
          text1: 'Successful Signup',
        });
      };
      showSuccessToast();
      const sendDataToDatabase = () => {
        fetch('http://localhost:4001/auth/register', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(apiPayload),
        })
          .then((res) => {
            if (res.ok) {
              console.log('User Successfully Registered!');
              console.log(res);
              return res;
            } else {
              console.log(res.json());
              throw new Error(`The HTTP status of the response: ${res.status} (${res.statusText})`);
            }
          })
          .then((res) => res.json())
          .then((json) => console.log(json))
          .catch((err) => console.log(err));
      };
      sendDataToDatabase();
      router.push('/onboardingGetStarted');
      // TODO : Need to make the appropriate API call with the information gathered
    }
  };

  const TextInputArray = [
    {
      id: 1,
      dimensions: dimensions,
      tailwindStyling: currentStyles.emailInputStyling,
      placeholderText: 'Enter Your Email',
      onChangeFunction: (newEmail: any) => handleEmailInput(newEmail),
      value: emailInput,
      isPassword: false,
      blur: true,
    },
    {
      id: 2,
      dimensions: dimensions,
      tailwindStyling: currentStyles.passwordInputStyling,
      placeholderText: 'Enter your password',
      onChangeFunction: (newPassword: any) => handlePasswordInput(newPassword),
      value: passwordInput,
      isPassword: true,
      blur: false,
    },
    {
      id: 3,
      dimensions: dimensions,
      tailwindStyling: currentStyles.passwordInputStyling,
      placeholderText: 'Retype your password',
      onChangeFunction: (confirmNewPassword: any) => handleConfirmPasswordInput(confirmNewPassword),
      value: confirmPasswordInput,
      isPassword: true,
      blur: false,
    },
  ];
  return (
    <View className="flex-1 items-center justify-center m-auto">
      {TextInputArray.map((TextInputIter) => (
        <TextInput
          key={TextInputIter.id}
          style={TextInputIter.dimensions}
          className={TextInputIter.tailwindStyling}
          // TODO : May require fixing
          onChange={TextInputIter.onChangeFunction}
          value={TextInputIter.value}
          autoCapitalize="none"
          keyboardType="default"
          placeholder={TextInputIter.placeholderText}
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={TextInputIter.isPassword}
          blurOnSubmit={TextInputIter.blur}
          placeholderTextColor="grey-500"
          autoCorrect={false}
        />
      ))}
      <SignupButton
        width={dimensions.width}
        height={dimensions.height}
        route="/onboardingGetStarted"
        handleOnPress={() => handleSignUp()}
        //handleOnPress={() => signUpWithEmail()}
      />
    </View>
  );
};
