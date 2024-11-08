import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function TeachersList() {
  const teachers = [
    {
      name: 'Douglas Troeger',
      department: 'Computer Science',
      office: '7/116 North Academic Center',
      officeHours: 'Tue, Thu : 12:30 PM to 1:45 PM',
      email: 'dtroeger@ccny.cuny.edu',
    },
    {
      name: 'Jie Wei',
      department: 'Computer Science',
      office: '8/209A North Academic Center',
      officeHours: 'Tue, Thu : 3:30 PM to 4:45 PM',
      email: 'jwei@ccny.cuny.edu',
    },
    {
      name: 'Erik K. Grimmelmann',
      department: 'Computer Science',
      office: '8202 L NAC',
      officeHours: 'Tue, Thu : 12:00 PM to 1:15 PM',
      email: 'egrimmelmann@ccny.cuny.edu',
    },
    {
      name: 'Leonid Gurvits',
      department: 'Computer Science',
      office: '279 Shepard Hall',
      officeHours: 'Tue, Thu : 12:30 PM to 1:45 PM',
      email: 'lgurvits@ccny.cuny.edu',
    },
  ];

  /*const viewTeacherDetails = (teacherInfo) => {
    // full teacher details page here
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Professors</Text>
      <ScrollView>
        {teachers.map((teacher, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{teacher.name}</Text>
            <Text style={styles.text}>Department: {teacher.department}</Text>
            <Text style={styles.text}>Office: {teacher.office}</Text>
            <Text style={styles.text}>Office Hours: {teacher.officeHours}</Text>
            <Text style={styles.text}>Email: {teacher.email}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => viewTeacherDetails(teacher)}
            >
              <Text style={styles.buttonText}>View Full Teacher Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f5',
    padding: 20,
  },
  header: {
    fontSize: 18,
    color: '#899faf',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#f3f4f5',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
