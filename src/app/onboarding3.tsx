import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';

const OnboardingScreen3: React.FC = () => {
  const router = useRouter();
  return (
    <View>
      <OnboardingButton
        width={'45%'}
        height={50}
        route="/onboarding2"
        handleOnPress={() => router.back()}
        buttonText={'Go Back'}
      />
      <OnboardingButton
        width={'45%'}
        height={50}
        route="/onboarding2"
        handleOnPress={() => router.push('/(root)/(tabs)/(index)/Schedule')}
        buttonText={'Proceed'}
      />
    </View>
  );
};

export default OnboardingScreen3;
