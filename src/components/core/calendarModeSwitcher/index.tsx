// Component to handle switching modes for the calendar
import { DayItem } from '@howljs/calendar-kit';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { custom } from 'zod';
import { Ionicon } from '../icon';
import { Button } from '../button/button-default';
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

// seperate modal component for custom event recurrence logic

export const CustomRecurrenceModal = ({
  visible,
  onClose,
  onSave,
  initialSelection,
}: {
  visible: boolean; // useState hook boolean type variable that will handle whether a modal should be displayed or not

  // unsure of the types of these
  onClose: any;
  onSave: any;
  initialSelection: string[] | any;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const days_of_week = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
  ];

  const [selectedDays, setSelectedDays] = useState(initialSelection || []);

  /**
   *
   * @param dayId (a number from 0-6 representing the day of the week, with 0 representing sunday and 6 representing saturday)
   * First it checks if the day is already selected using selectedDays.includes(dayId)
   * If the day is already selected, it calls setSelectedDate to update the state.
   * It uses the .filter() method to create a new array that excludes the clicked dayId
   * This effectively deselects/removes the from the selected days list
   * @returns
   */
  const toggleDay = (dayId: number | any) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter((id: any) => id !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }

    // TODO : continue here
    // reference link : https://claude.ai/chat/ca41a962-0577-44af-987d-9e4320d828eb

    // component rendering logic
    return (
      <Modal
        animationType="slide"
        transparent={true} // sets background as transparent for the modal
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={customRecurrenceStyles.centeredView}>
          <View style={customRecurrenceStyles.modalView}>
            <Text style={customRecurrenceStyles.modalTitle}>Custom:</Text>
            <Text style={customRecurrenceStyles.modalSubtitle}>
              Select days of the week you want the event to repeat
            </Text>
            {days_of_week.map((currentDay) => (
              <TouchableOpacity
                key={currentDay.id}
                style={[customRecurrenceStyles.dayItem, selectedDays.includes(currentDay.id)]}
                onPress={() => toggleDay(currentDay.id)}
              >
                <Text
                  style={[
                    customRecurrenceStyles.dayText,
                    selectedDays.includes(currentDay.id) && customRecurrenceStyles.selectedDayText,
                  ]}
                >
                  {currentDay.name}
                </Text>
                {selectedDays.includes(currentDay.id) && (
                  <Ionicon name="checkmark" size={18} color="white" />
                )}
              </TouchableOpacity>
            ))}
            <View style={customRecurrenceStyles.buttonContainer}>
              <TouchableOpacity
                style={[ButtonStyling.button, ButtonStyling.buttonCancel, { width: '48%' }]}
                onPress={onClose} // logic same as any other modal, just set from true -> false using the setter
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ButtonStyling.button, ButtonStyling.buttonSave, { width: '48%' }]}
                onPress={() => onSave(selectedDays)}
              >
                <Text style={ButtonStyling.buttonSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
};

// define styles for the view component
const customRecurrenceStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedDay: {
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

// TODO : delete later, this has been copied from Schedule.tsx:

const ButtonStyling = StyleSheet.create({
  // general style for button that is shared between the "save" and "cancel" button
  button: {
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },

  // styling for the save button (only the background color varies)
  buttonSave: {
    backgroundColor: '#3498db',
  },

  // styling for the cancel button
  buttonCancel: {
    backgroundColor: '#e74c3c',
  },

  // styling for text within the button itself
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
