import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { BackButton } from '@/components/core/backButton';
import { ProceedButton } from '@/components/core/proceedButton';

const majors = {
  1: ['History', 'Philosophy', 'Sociology','Psychology'
  ],
  2: ['Physics', 'Chemistry', 'Biology', 'Statistics', 'English',
    'Algebra', 'Geometry', 'Calculus'
  ],
  3: ['Music', 'Theater', 'Dance','Graphic Design','Public Speaking'
  ],
  4: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering',
    'Civil Engineering'
  ]
}; //exmaple majors


const onboarding2: React.FC = () => {
  const router = useRouter();
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const selectedClassType = 4; // preset it 4 so u can see the list of majors there are

  const availableMajors = majors[selectedClassType] || [];

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 14, marginRight: 10 }}>2/3</Text>
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
                width: '66%',
                height: '100%',
                backgroundColor: '#888',
              }}
            />
          </View>
        </View>
      </View>

      <Text style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
        Which of these majors suit you best?
      </Text>
      <Text style={{ color: 'gray', fontSize: 14, marginBottom: 20 }}>Choose one from the list below</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: '#888',
          borderRadius: 10,
          backgroundColor: '#1A1A1A',
          padding: 100,
          marginBottom: 10,
        }}
      >
        <Picker
          selectedValue={selectedMajor}
          onValueChange={(itemValue) => setSelectedMajor(itemValue)}
          style={{ color: 'white' }}
        >
          <Picker.Item label="Select a major" value={null} />
          {availableMajors.map((major, index) => (
            <Picker.Item key={index} label={major} value={major} />
          ))}
        </Picker>
      </View>
           {/* im having a lil bit of trouble with formatting and stuff, not sure how to consistently keep it one size instead of 
           having to change different values everywhere (like button/grid placements) */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 200 }}>
        <BackButton
          width={'45%'}
          height={50}
          route="/onboarding1"
          handleOnPress={() => router.push('/onboarding1')}
        />
        <ProceedButton
          width={'45%'}
          height={50}
          route="/onboarding3"
          handleOnPress={() => router.push('/onboarding3')}
        />
      </View>
    </View>
  );
};

export default onboarding2;
