import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BackButton } from '@/components/core/backButton';
import { FinishButton } from '@/components/core/finishButton';

const onboarding3: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const selectRole = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 14, marginRight: 10 }}>3/3</Text>
          <View
            style={{
              width: 100,
              height: 10,
              backgroundColor: '#555',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#888',
              }}
            />
          </View>
        </View>
      </View>

      <Text style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
        Are you a student or a professor?
      </Text>
      <Text style={{ color: 'gray', fontSize: 14, marginBottom: 20 }}>Choose a role</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <TouchableOpacity
          onPress={() => selectRole('Student')}
          style={{
            backgroundColor: selectedRole === 'Student' ? '#555' : '#1A1A1A',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '48%',
            height: 120,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Student 🧑‍🎓</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => selectRole('Professor')}
          style={{
            backgroundColor: selectedRole === 'Professor' ? '#555' : '#1A1A1A',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '48%',
            height: 120,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Professor 🧑‍🏫</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 475 }}>
        <BackButton
          width={'45%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => router.push('/onboarding2')}
        />
        <FinishButton
          width={'45%'}
          height={50}
          route="/authenticationMiddleware"
          handleOnPress={() => router.push('/authenticationMiddleware')}
        />
      </View>
    </View>
  );
};

export default onboarding3;
