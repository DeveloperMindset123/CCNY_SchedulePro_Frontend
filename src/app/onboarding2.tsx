/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';
import { useRoute } from '@react-navigation/native';
import { validate } from 'uuid';

const OnboardingScreen2 = () => {
  // ! Majors should not be hardcoded
  // !NOTE : .map is a built in method for Arrays, not Objects
  // TODO : logic for retrieveing from database when screen loads
  // ? one potential appraoch, have the majors be arranged by the departments
  // ** For now, majors will be stored in alphabetical order
  // @see https://github.com/react-native-picker/picker
  // explains how react-native-picker works

  const DegreeType = [
    { label: 0, value: 'Bachelor of Arts (BA)' },
    { label: 1, value: 'Bachelor of Science (BS) ' },
    { label: 2, value: 'Bachelor of Engineering (BE)' },
    { label: 3, value: 'Bachelor of Science Education (BSED)' },
    { label: 4, value: 'Bachelor of Fine Arts (BFA)' },
    { label: 5, value: 'Master of Arts (MA)' },
    { label: 6, value: 'Master of Fine Arts (MFA)' },
    { label: 7, value: 'Master of Science (MS)' },
    { label: 8, value: 'Master of Landscape Architecture (MLA)' },
    { label: 9, value: 'Master of Urban Planning (MUP)' },
    { label: 10, value: 'Master of Engineering (ME)' },
    { label: 11, value: 'Master of Professional Studies (MPS)' },
    { label: 12, value: 'Master of International Affairs (MIA)' },
    { label: 13, value: 'Master of Music (MM)' },
    { label: 14, value: 'Master of Public Administration (MPA)' },
    { label: 15, value: 'Master of Architecture (MArch)' },
    { label: 16, value: 'Advanced Certificates' },
    { label: 17, value: 'Undecided' },
  ];

  const AllCollegeMajors = {
    A: [
      'Advertising and Public Relations',
      'Anthropology',
      'Architecture',
      'Art',
      'Art Education',
      'Art History',
      'Asian Studies Program',
      'Atmospheric Sciences',
    ],

    B: [
      'Bernard and Anne Spitzer School of Architecture',
      'BFA in Fim & Video',
      'Billingual Education & TESOL Programs',
      'Biochemistry',
      'Biology',
      'Biomedical Engineering',
      'Black Studies Program',
      'Branding + Integrated Communcation',
      'Business',
    ],

    C: [
      'CCNY Gaming Pathways',
      'Center for Worker Education',
      'Chemical Engineering',
      'Chemistry',
      'Childhood Education - Graduate',
      'Childhood Education - Undergraduate',
      'Cinema Studies',
      'Civil Engineering',
      'Classical and Modern Languages & Literatures',
      'Collin Powell School for Civic and Gloabl Leadership',
      'Computer Engineering Program',
      'Computer Science',
      'Continuing and Professional Studies',
      'Core Curriculum',
      'CUNY School of Medicine',
      'Cybersecurity',
    ],

    D: [
      'Data Science and Engineering',
      'Department of Mathematics',
      'Digital and Interdisciplinary Art Practice',
      'Division of Humanities & the Arts',
      'Division of Interdisciplinary Studies at the Center for Worker Education',
      'Division of Science',
    ],

    E: [
      'Early Childhood Education - Graduate',
      'Earth and Atmospheric Sciences',
      'Earth System Science & Environmental Engineering',
      'Economics and Business',
      'Education',
      'Educational Leadership',
      'Educational Theatre',
      'Electrical Engineering',
      'Electronic Design and Multimedia',
      'Engineering',
      'English',
      'English as a Second Language',
      'English Education',
      'Environmental Engineering',
    ],

    F: [
      'Film & Video - Graduate',
      'Film & Video - Undergraduate',
      'Foreign Languages',
      'Frances S. Patai Program in Holocaust, Genocide and Human Rights Studies',
    ],

    G: [
      'Gaming Pathways',
      'Gender Studies',
      'General Education Curriculum at City College',
      'Graduate Research Training Initiative for Student Enhancement',
      'Grove School of Engineering',
    ],

    H: [
      'Health Professions Preparation Certificate Program',
      'History',
      'Honors Center',
      'Honors Program in Legal Studies at the Collen Powell School',
      'Human Rights Forum',
      'Human Rights Studies',
      'Humanities & the Arts',
    ],

    I: ['Interdisciplinary Studies', 'International Studies'],

    J: ['Jewish Studies Program', 'Journalism'],

    L: ['Legal Studies'],

    M: [
      'Master in Public Administration',
      'Mathematics',
      'Mathematics Education',
      'Mechanical Engineering',
      'Media and Communication Arts',
      'Medicine',
      'MFA in Film Program',
      'Minor in Cinema Studies',
      'Multilingual Creative Writting Conference',
      'Museum Studies',
      'Music',
    ],

    N: ['NOAA-CESSRST', 'NSF Advance'],
    P: [
      'Percy Ellis Sutton SEEK Program',
      'Philosophy',
      'Physics',
      'Political Science',
      'Pre-Health Program',
      'Psychology',
      'Public Administration',
      'Public Relations',
    ],
    S: [
      'School of Architecture',
      'School of Education',
      'School of Medicine',
      'Science',
      'Science Education',
      'Science Learning and Public Engagement',
      'SEEK',
      'Skadden, Arps Honors Program in Legal Studies',
      'Social Justice and Urban Life',
      'Social Mobillity Lab',
      'Social Studies Education',
      'Sociology',
      'Special Education',
      'Sustainabillity un the Urban Environment',
    ],
    T: [
      'TESOL',
      'The Bernard and Anne Spitzer School of Architecture',
      'The Division of Science',
      'The General Education Curriculum at City College',
      'The Grove School of Engineering',
      'The Percy Ellis Sutton SEEK program',
      'Theatre and Speech',
      'Translational Medicine',
      'Trauma and Addiction Project',
    ],
    W: ["Women's Studies"],
  };

  const router = useRouter();
  //const [selectedMajor, setSelectedMjaor] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const selectedClassType = 'C';
  //const availableMajors = AllCollegeMajors[selectedClassType] || [];

  return (
    <View>
      <Text>What degree are you pursuing?</Text>

      <Picker
        className="text-black"
        selectedValue={selectedDegree}
        onValueChange={(currentDegreeSelected) => setSelectedDegree(currentDegreeSelected)}
      >
        {DegreeType.map((Degree, index) => (
          <Picker.Item key={Degree.label} label={Degree.value} value={Degree.value} />
        ))}
      </Picker>
    </View>
  );
};

export default OnboardingScreen2;
{
  /*
    <View className="flex-1 bg-black p-10">
      <View className="flex-row justify-between items-center mb-10">
        <View className="flex-1" />
        <View className="flex-row items-center" />
        <Text className="text-white text-base mr-8">2/3</Text>
        <View className="w-20 h-2 bg-[#555] rounded-sm overflow-hidden">
          {/**This is the part that deals with the filling animation
          <View className="w-2/3 h-full bg-[#888]" />
        </View>
      </View>
      <Text className="text-white text-lg mb-5">Which of these majors suit you best?</Text>
      <Text className="text-gray-400 text-sm mb-10">Choose one from the list below</Text>
      <View className="border-2 border-[#888] p-16 mb-5 rounded-2xl bg-[#1A1A1A]">
        <Text>What degree are you pursuing?</Text>
        <Picker
          className="text-white"
          selectedValue={selectedDegree}
          onValueChange={(currentDegreeSelected) => setSelectedDegree(currentDegreeSelected)}
        >
          {DegreeType.map((degreeKey: any, degreeValue: any) => {
            <Picker.Item key={degreeKey} label={degreeValue} value={degreeValue} />;
          })}
        </Picker>
      </View>
      <View className="flex-row">
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
          handleOnPress={() => router.push('/onboarding3')}
          buttonText={'Proceed'}
        />
      </View>
    </View >
      */
}
