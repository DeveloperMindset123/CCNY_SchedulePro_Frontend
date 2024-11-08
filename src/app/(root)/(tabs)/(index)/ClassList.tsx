import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function ClassList() {
  const classes = [
    {
      title: 'CSC 33500 - Programming Language Paradigms',
      degreeType: 'Computer Science',
      schedule: 'Tue, Thu : 3:30 PM to 4:45 PM',
      room: 'Marshak Science Building Rm 408',
      professor: 'Douglas Troeger',
    },
    {
      title: 'CSC 32200 - Software Engineering',
      degreeType: 'Computer Science',
      schedule: 'Tue, Thu : 2:00 PM to 3:15 PM',
      room: 'Steinman Hall Rm 161',
      professor: 'Jie Wei',
    },
    {
      title: 'CSC 59867 - Senior Project II',
      degreeType: 'Computer Science',
      schedule: 'Tue, Thu : 9:30 AM to 10:45 AM',
      room: 'North Academic Center Rm 6/307',
      professor: 'Erik K. Grimmelmann',
    },
    {
      title: 'CSC 30100 - Numerical Issues in Scientific Programming',
      degreeType: 'Computer Science',
      schedule: 'Tue, Thu : 11:00 AM to 12:15 PM',
      room: 'North Academic Center Rm 5/110',
      professor: 'Leonid Gurvits',
    },
  ];

 /* const viewClassDetails = (classInfo) => {
    // Implement navigation to class details page 
    
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Classes</Text>
      <ScrollView>
        {classes.map((classInfo, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{classInfo.title}</Text>
            <Text style={styles.text}>Degree Type: {classInfo.degreeType}</Text>
            <Text style={styles.text}>Schedule Time: {classInfo.schedule}</Text>
            <Text style={styles.text}>Room: {classInfo.room}</Text>
            <Text style={styles.text}>Professor: {classInfo.professor}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => viewClassDetails(classInfo)}
            >
              <Text style={styles.buttonText}>View Full Class Details</Text>
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
  title: {
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
