import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { OnboardingButton } from '@/components/core/button/onboarding-buttons';

const OnboardingScreen2: React.FC = () => {
  // ! Majors should not be hardcoded
  // TODO : logic for retrieveing from database when screen loads
  // ** For now, majors will be stored in alphabetical order
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
  return (
    <View>
      <Text>To Be Implemented</Text>
    </View>
  );
};

export default OnboardingScreen2;
