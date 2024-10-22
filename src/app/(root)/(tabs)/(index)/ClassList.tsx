import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';

const availableClasses = [
  {
    id: 1,
    title: 'Calculus 1',
    section: 'A',
    time: 'Mon/Wed 10:00 AM - 11:30 AM',
  },
  {
    id: 2,
    title: 'Physics ',
    section: 'B',
    time: 'Mon/Wed 12:00 PM - 1:45 PM',
  },
  {
    id: 3,
    title: 'Discrete Math',
    section: 'C',
    time: 'Mon/Wed 10:00 AM - 11:30 AM',
  },
  {
    id: 4,
    title: 'Chemistry ',
    section: 'D',
    time: 'Tue/Thu 9:00 AM - 9:50 AM',
  },
  {
    id: 5,
    title: 'Linear Algebra',
    section: 'E',
    time: 'Tue/Thu 11:00 AM - 12:45 PM',
  },
];

export default function ClassManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  const filteredClasses = availableClasses.filter((classItem) =>
    classItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const addClass = (classItem: any) => {
    if (selectedClasses.length >= 8) {
      Alert.alert('Maximum classes reached', 'You can only select up to 8 classes.');
      return;
    }

    if (selectedClasses.some((item) => item.id === classItem.id)) {
      Alert.alert('Class already added', 'This class is already in your list.');
      return;
    }

    setSelectedClasses((prev) => [...prev, classItem]);
  };

  const removeClass = (classId: number) => {
    setSelectedClasses((prev) => prev.filter((item) => item.id !== classId));
  };

  return (
    <View>
      <TextInput
        placeholder="Search for classes"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 5 }}
      />

      {selectedClasses.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No classes have been added to your list.
        </Text>
      ) : (
        <FlatList
          data={selectedClasses}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>
                {item.title} - {item.section}
              </Text>
              <Text>Time: {item.time}</Text>
              <TouchableOpacity onPress={() => removeClass(item.id)}>
                <Text style={{ color: 'red' }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <FlatList
        data={filteredClasses}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => addClass(item)}
            style={{ padding: 20, borderBottomWidth: 1 }}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ maxHeight: 800 }}
      />
    </View>
  );
}
