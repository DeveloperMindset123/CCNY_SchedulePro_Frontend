import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function Schedule() {
  const [items, setItems] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const tuesdayThursdayClasses = [
    { name: 'Programming Language Paradigms', time: '3:30 PM - 4:45 PM' },
    { name: 'Software Engineering', time: '2:00 PM - 3:15 PM' },
    { name: 'Senior Project II', time: '9:30 AM - 10:45 AM' },
    { name: 'Numerical Issues in Scientific Programming', time: '11:00 AM - 12:15 PM' }
  ];

  const loadItems = (day) => {
    const newItems = { ...items };

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const date = new Date(day.timestamp + i * 24 * 60 * 60 * 1000);
        const strDate = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();

        if (dayOfWeek === 2 || dayOfWeek === 4) {
          newItems[strDate] = tuesdayThursdayClasses;
        } else {
          newItems[strDate] = [{ name: 'No classes', time: '' }];
        }
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 20,
          marginBottom: 10,
          marginHorizontal: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
        {item.time ? (
          <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>{item.time}</Text>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={() => (
          <View style={{ height: 50, flex: 1, paddingTop: 20, paddingLeft: 10 }}>
            <Text>No classes today.</Text>
          </View>
        )}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
        }}
      />
    </View>
  );
}
