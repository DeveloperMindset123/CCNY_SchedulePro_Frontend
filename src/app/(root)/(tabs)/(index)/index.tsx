/* --> old working changes
import { useColorScheme } from 'nativewind';

/** Components
import { Text } from '@/components/core/text';
import { SafeAreaView } from '@/components/core/safe-area-view';

export default function NewIndex() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <Text variant="largeTitle" color="primary">
        Hello World
      </Text>
      <Text variant="title2" color="quarternary">
        This is a Sandbox test environment with Expo Go.
      </Text>
      <Text variant="title2" color="quarternary">
        Current theme is{' '}
        <Text variant="title2" color="secondary">
          {colorScheme}
        </Text>
        .
      </Text>
    </SafeAreaView>
  );
} */

import React from 'react';
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '@/components/core/text';
//import { SafeAreaView } from '@/components/core/safe-area-view';
//import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
//import { StickyNote } from 'lucide-react-native';

const data = [
  { id: 1, title: 'Class notes' },
  { id: 2, title: 'Classroom humor' },
  { id: 3, title: 'Class projects' },
  { id: 4, title: 'Class recipes' },
  { id: 5, title: 'Class music' },
];

export default function ClassSchedule() {
  const bgColor = 'black';
  const cardColor = '#2c2c2e';
  const textColor = '#fff';

  return (
    <View className="bg-black flex-1" style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <View style={{ marginVertical: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#3a3a3c',
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Ionicons name="search" size={20} color="#ccc" />
            <TextInput
              placeholder="Search classes"
              placeholderTextColor="#ccc"
              style={{ marginLeft: 10, color: textColor, flex: 1 }}
            />
          </View>
        </View>

        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: cardColor,
                padding: 25,
                borderRadius: 10,
                margin: 10,
                width: '45%',
                height: 170,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: textColor, fontSize: 18 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          right: 80,
          backgroundColor: '#fff',
          borderRadius: 40,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="add" size={24} color="#444" />
      </TouchableOpacity>
    </View>
  );
}
