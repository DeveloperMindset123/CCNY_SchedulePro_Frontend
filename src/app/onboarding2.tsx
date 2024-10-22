/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';

const OnboardingScreen2 = () => {
  // ! Majors should not be hardcoded
  // !NOTE : .map is a built in method for Arrays, not Objects
  // TODO : logic for retrieveing from database when screen loads
  // ? one potential appraoch, have the majors be arranged by the departments
  // ** For now, majors will be stored in alphabetical order
  // @see https://github.com/react-native-picker/picker
  // explains how react-native-picker works

  const DegreeType = [
    // ** In this case, we have an array of objects
    // ! given that the outer layer is an array, we are still able to successfully map through it as needed
    { label: 0, value: 'Bachelor of Arts (BA)' },
    { label: 1, value: 'Bachelor of Science (BS)' },
    { label: 2, value: 'Bachelor of Engineering (BE)' },
    { label: 3, value: 'Bachelor of Science Education (BSED)' },
    { label: 4, value: 'Bachelor of Fine Arts (BFA)' },
    { label: 5, value: 'Bachelor of Music (BMUS)' },
    { label: 6, value: 'Bachelor of Science/Doctor of Medicine (BS/MD)' },
    { label: 7, value: 'Bachelor of Architecture (B.ARCH)' },
    { label: 8, value: 'Master of Arts (MA)' },
    { label: 9, value: 'Master of Fine Arts (MFA)' },
    { label: 10, value: 'Master of Science (MS)' },
    { label: 11, value: 'Master of Landscape Architecture (MLA)' },
    { label: 12, value: 'Master of Urban Planning (MUP)' },
    { label: 13, value: 'Master of Engineering (ME)' },
    { label: 14, value: 'Master of Professional Studies (MPS)' },
    { label: 15, value: 'Master of International Affairs (MIA)' },
    { label: 16, value: 'Master of Music (MM)' },
    { label: 17, value: 'Master of Public Administration (MPA)' },
    { label: 18, value: 'Master of Architecture (MArch)' },
    { label: 19, value: 'Certificate Programs' },
    { label: 20, value: 'Master of Landscape Architecture (MLA)' },
    { label: 21, value: 'Doctoral Degrees (Ph.D) at CCNY' },
    { label: 22, value: 'Doctoral Degrees (Ph.D) in consortium with the Graduate Center' },
    { label: 23, value: 'Advanced Certificates (AdvCert)' },
  ];

  const undegrad_grad_majors = {
    // ! when using map, the funciton body within JSX component should be wrapped using () rather than {}
    // ** key : degree type selected, value : list of majors corresponding to the particular dergee type
    // ? tested and worked as intended
    // we are accessing the values via the keys which was previous selected and ammping throguh the array of values
    Undecided: ['Not Available'],
    'Bachelor of Arts (BA)': [
      'Anthropology',
      'Asian Studies',
      'Latino American and Latino Studies',
      'Black Studies',
      'Jewish Studies',
      'Studio Art',
      'Art History',
      'Art Teacher, All Grades',
      'Advertising and Public Relations',
      'Journalism',
      'Comparative Literature',
      'Earth and Atmospheric Sceinces',
      'Economics (Combined BAMA Program Available)',
      'English',
      'English Teacher, Grades 7-12',
      'History (Combined BAMA program available)',
      'Interdisciplinary Arts and Science (Combined BAMA Program Available)',
      'International Studies',
      'Management and Administration',
      'Mathematics Teacher, Grades 7-12',
      'Philosophy',
      'Poltical Science',
      'Popular Music Studies (Combined BAMA Program Available)',
      'Psychology',
      'Romance Languages : French, Italian, Spanish',
      'Social Studies Teacher, Grades 7-12',
      'Sociology (Combined BAMA Program Available)',
      'Spanish Teacher, Grades 7-12',
      'Theatre',
      'Urban Studies and the Built Environment',
    ],
    'Bachelor of Science (BS)': [
      'Biochemistry',
      'Biology',
      'Biology Teacher, grades 7-12',
      'Biotechnology',
      'Chemistry',
      'Chemistry Teacher, Grades 7-12',
      'Computer Science',
      'Early Childhood Education',
      'Earth and Atmospheric Sciences',
      'Earth Science Teacher, Grades 7-12',
      'Environmental and Earth Systems Science',
      'Mathematics',
      'Physics',
      'Physics Teacher, Grades 7-12',
      'Science Learning & Public Engagement',
    ],
    'Bachelor of Engineering (BE)': [
      'Mechanical Engineering',
      'Biomedical Engineering',
      'Chemical Engineering',
      'Civil Engineering',
      'Computer Engineering',
      'Earth Systems Science and Environmental Engineering',
      'Electrical Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
    ],
    'Bachelor of Science Education (BSED)': [
      'Bilingual Childhood Education, Grades 1-6',
      'Childhood Education',
    ],
    'Bachelor of Science/Doctor of Medicine (BS/MD)': [
      'Biomedical Science (Sophie Davis School of Biomedical Education)',
    ],
    'Bachelor of Architecture (B.ARCH)': ['Architecture'],
    'Bachelor of Fine Arts (BFA)': ['Electronic Design and Multimedia', 'Film'],
    'Bachelor of Music (BMUS)': [
      'Jazz Studies (Vocal)',
      'Jazz Studies (Intrumental)',
      'Sonic Arts',
    ],
    'Certificate Programs': ['Health Professions Preparations (CERTGE30)', 'Publishing (CERTLT30)'],
    'Master of Arts (MA)': [
      'Art History',
      'Languages and Literacy',
      'English Literature',
      'Spanish',
      'History',
      'MA in Economics',
      'Mental Health Counseling',
      'Psychology',
      'Study of Americas',
      'English Education',
      'Science Education (Grades 5-9)',
      'Science Education (Grades 5-9)',
      'Science Education - BIOLOGY (Grades 7-12)',
      'Science Education - CHEMISTRY (Grades 7 - 12)',
      'Science Education - EARTH & ATMOSPHERIC SCIENCE (Grades 7-12)',
      'Social Studies Education',
    ],
    'Master of Science (MS)': [
      'Architecture',
      'Biology',
      'Biochemistry',
      'Biotechnology',
      'Biomedical Engineering',
      'Computer Science',
      'Computer Engineering',
      'Chemistry',
      'Cybersecurity',
      'Data Science and Engineering',
      'Earth and Atmospheric Science',
      'Earth Systems and Environmental Engineering',
      'Mathematics',
      'Physics',
      'Physician Assistant',
      'Sustainabillity in the Urban Environment',
    ],
    'Master of Science in Education (MSED)': [
      'Bilingual Childhood Education (Grades 1-6)',
      'Bilingual Special Education (Grades 1-6)',
      'Childhood Education (Grades 1-6)',
      'Early Childhood Education (Grades Birth - 2)',
      'Educational Leadership - School Building Leader',
      'Educational Theatre for Initial Certification (Online)',
      'Educational Theatre, Non Teacher Certification (Online)',
      'Literacy (Grades 5-12)',
    ],
    'Master of Fine Arts (MFA)': [
      'Creative Writting',
      'Digital and Interdisciplinary Art Practice',
      'Film',
      'Studio Art',
    ],
    'Master of Engineering (ME)': [
      'Chemical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
    ],
    'Master of Architecture (MArch)': ['Architecture I'],
    'Master of Landscape Architecture (MLA)': ['Landscape Architecture'],
    'Master of Urban Planning (MUP)': ['Urban Design'],
    'Master of Professional Studies (MPS)': ['Branding + Integrated Communications'],
    'Master of Public Administration (MPA)': ['Public Service Management'],
    'Master of International Affairs (MIA)': ['International Relations'],
    'Master of Music (MM)': ['Jazz Studies'],
    'Doctoral Degrees (Ph.D) at CCNY': [
      'Clinical Psychology',
      'Biomedical Engineering',
      'Chemical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
    ],
    'Doctoral Degrees (Ph.D) in consortium with the Graduate Center': [
      'Biology',
      'Biochemistry',
      'Chemistry',
      'Physics',
    ],
    'Advanced Certificates (AdvCert)': [
      'Art Education (Grades K-12)',
      'Billingual Extension Certificate',
      'Educational Leadership - Entry Level Leadership',
      'Educational Leadership - School District Leader',
      'Educational Theatre (Grades PK-12)',
      'English Education (Grades 7-12)',
      'Mathematics Education (Grades 5-9)',
      'Mathematics Education (Grades 7-12)',
      'Science Education - BIOLOGY (Grades 7-12)',
      'Science Education - CHEMISTRY (Grades 7-12)',
      'Science Education - EARTH & ATMOSPHERIC SCIENCE (Grades 7-12)',
      'Science Education - PHYSICS (Grades 7-12)',
      'Social Studies Education (Grades 7-12)',
      'Special Education (Grades 1-6)',
      'Special Education (Grades 7-12)',
      'TESOL Teaching English to Students of Other Languages',
    ],
  };

  const router = useRouter();
  const [selectedMajor, setSelectedMjaor] = useState<string>('Not Available');
  const [selectedDegree, setSelectedDegree] = useState<string>('Undecided');

  const degreeAndMajorFormData = {
    degree: selectedDegree,
    major: selectedMajor,
  };

  // API data
  const sendOnboarding_screen2Data = () => {
    fetch('http://localhost:4001/onboarding/onboarding2Data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(degreeAndMajorFormData),
    }).then((res) => {
      if (res.ok || res.status === 200) {
        console.log('Data Sent Successfully');
        console.log(`Response Status : ${res.status}`);
        return router.push('/onboarding3');
      } else {
        if (res.status === 404) {
          console.log('There was an issue sending your data');
        }
      }
    });
  };

  // TODO : wrap this around view component from before
  // TODO : too many duplicate view code, place it in a component that can pass in children component using the children prop for removing redundant styling --> later priority.
  return (
    <View className="flex-1 bg-black p-10">
      <View className="flex-row justify-between items-center mb-10">
        <View className="flex-1" />
        <View className="flex-row items-center" />
        <Text className="text-white text-base mr-8">2/3</Text>
        <View className="w-20 h-2 rounded-sm overflow-hidden">
          <View className="w-1/2 h-full bg-[#888]" />
        </View>
      </View>
      <Text className="text-white text-lg mb-5">Which of these majors suit you best?</Text>
      <View className="rounded-2xl text-white">
        <Text className="text-gray-400 text-sm text-left">
          Please Select Your Degree Type and Major
        </Text>
        <Picker
          itemStyle={{
            color: 'white',
          }}
          selectedValue={selectedDegree}
          onValueChange={(currentDegreeSelected) => setSelectedDegree(currentDegreeSelected)}
        >
          <Picker.Item value="Undecided" label="Undecided" color="white" />
          {DegreeType.map((Degree, index) => (
            <Picker.Item
              key={Degree.label}
              label={Degree.value}
              value={Degree.value}
              style={{
                color: 'white',
              }}
            />
          ))}
        </Picker>
        <Picker
          className="text-white bg-white"
          selectedValue={selectedMajor}
          onValueChange={(currentMajorSelected) => setSelectedMjaor(currentMajorSelected)}
        >
          {/**Ignore this, not causing any issues */}
          {undegrad_grad_majors[selectedDegree].map((Major: string, index: number) => (
            <Picker.Item key={index} label={Major} value={Major} color="white" />
          ))}
        </Picker>
      </View>
      <View className="flex-row mt-3 space-x-0 mx-3">
        <OnboardingButton
          width={'40%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => router.back()}
          buttonText={'Go Back'}
        />
        <OnboardingButton
          width={'40%'}
          height={50}
          route="/onboarding2"
          handleOnPress={() => sendOnboarding_screen2Data()}
          buttonText={'Proceed'}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen2;
