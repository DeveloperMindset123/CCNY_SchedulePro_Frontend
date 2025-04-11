// Component to handle switching modes for the calendar
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * @CalendarModeSwitcher : A component to switch between different calendar events
 *
 * @param {Object} props
 * @param {string} props.currentNMode - Current View Mode ('day', '3day', '4day', 'week', 'month')
 * @param {Function} props.onModeChange - Callback when mode changes
 */
const CalendarModeSwitcher = ({ currentMode, onModeChange }) => {
  // lists out different modes that users can switch between
  const modes = [
    { id: 'day', label: 'Day', days: 1 },
    { id: '3day', label: '3 days', days: 3 },
    { id: '4day', label: '4 days', days: 4 },
    { id: 'week', label: 'Week', days: 7 },
    { id: 'month', label: 'Month', days: 30 },
  ];
  return (
    <View style={styles.container}>
      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.id}
          // conditional styling based on selected mode
          style={[styles.modeButton, currentMode === mode.id && styles.selectedMode]}
          // TODO : continue here
          onPress={() => onModeChange(mode.id, mode.days)}
        >
          <Text>{mode.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// TODO : replace the styling with tailwindcss during refactoring phase
// TODO : modify the starter code as needed if something looks off
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selectedMode: {
    backgroundColor: '#3498db',
  },
  modeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedModeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CalendarModeSwitcher;
