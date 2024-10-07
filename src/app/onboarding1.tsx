import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SkipButton } from '@/components/core/skipButton';
import { ProceedButton } from '@/components/core/proceedButton';

const classTypes = [
  { id: 1, name: 'Liberal Arts', icon: require('src/assets/images/5040661.png') },
  { id: 2, name: 'Core Courses', icon: require('src/assets/images/1588293.png') },
  { id: 3, name: 'Electives', icon: require('src/assets/images/2287006.png') },
  { id: 4, name: 'STEM', icon: require('src/assets/images/6901689.png') },
];

const onboarding1: React.FC = () => {
  const [selectedClassType, setSelectedClassType] = useState<number | null>(null);
  const router = useRouter();

  const selectClassType = (id: number) => {
    setSelectedClassType((prev) => (prev === id ? null : id));
  };

  const renderItem = ({ item }: { item: (typeof classTypes)[0] }) => (
    <TouchableOpacity
      onPress={() => selectClassType(item.id)}
      style={{
        backgroundColor: selectedClassType === item.id ? '#555' : '#1A1A1A',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        height: 275,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image source={item.icon} style={{ width: 40, height: 40 }} />
      <Text style={{ color: 'white', marginTop: 10, textAlign: 'center' }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 14, marginRight: 10 }}>1/3</Text>
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
                width: '33%',
                height: '100%',
                backgroundColor: '#888',
              }}
            />
          </View>
        </View>
      </View>

      <Text style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
        Which field of study are you looking into?
      </Text>
      <Text style={{ color: 'gray', fontSize: 14, marginBottom: 20 }}>Select one below</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {classTypes.map((item) => renderItem({ item }))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
        <SkipButton
          width={'45%'}
          height={50}
          route="/authenticationMiddleware" // index not working
          handleOnPress={() => router.push('/authenticationMiddleware')}
        />
        <ProceedButton
          width={'45%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => router.push('/onboarding2')}
        />
      </View>
    </View>
  );
};

export default onboarding1;
