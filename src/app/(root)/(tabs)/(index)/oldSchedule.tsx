import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggingEvent,
  DraggingEventProps,
} from '@howljs/calendar-kit';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function OldSchedule() {
  // Define the theme we will need
  // relevant css styling
  const customTheme = {
    colors: {
      primary: '#3498db',
      onPrimary: '#ffffff',
      background: '#f5f5f5',
      onBackground: '#333333',
      border: '#e0e0e0',
      text: '#333333',
      surface: '#ffffff',
      onSurface: '#666666',
    },
    textStyle: {
      fontFamily: 'Roboto',
    },
    hourTextStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    dayName: {
      fontSize: 14,
      color: '#666666',
    },
    dayNumber: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    todayNumberContainer: {
      backgroundColor: '#3498db',
    },
    todayNumber: {
      color: '#ffffff',
    },
    eventContainerStyle: {
      borderRadius: 4,
    },
    eventTitleStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    // Additional properties to enhance header display
    headerContainerStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      paddingVertical: 8,
    },
    monthYearStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
    },
  };

  // this is to identify the user who is creating the event
  // needed to store the event related data within the database.
  // as well as adding/deleting/modifying the events related data.
  const { email } = useLocalSearchParams();

  // State for current event being edited
  // initial values for the event to be created
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: 'New Event',
    start: '',
    end: '',
    color: '#4285F4',
    description: '',

    // TODO : by default, location should be either be not specified or based on user input
    location: 'not specified',

    // NOTE : need to set logic regarding how recurring data should be rendered
    // ternary operator logic should suffice in this regard, as in if isRecurring checkbox is selected
    // a dropdown should pop up that will allow users to determine whether the event should take place
    // daily, weekly, biweekly, monthly (these 4 modes should suffice and the appropriate calculations needs to be done)
    isRecurring: false,
  });

  // Events data state
  const [eventsData, setEventsData] = useState([]);
  const [eventCreationComplete, setEventCreationComplete] = useState(false);
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    now.toLocaleString('default', { month: 'long', year: 'numeric' })
  );

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // Experiment with current time and an hour later
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const eventStartTime = now.toISOString();
  const eventEndTime = oneHourLater.toISOString();

  // TODO : in terms of the id logic, it should be in the form of a set
  // to be able to delete a particular event, I need to be able to determin what the current event that has been selected
  // and retrieve information about the particular event.
  //
  // Sample static event
  const sampleEvent = {
    id: '1',
    title: 'Sample Event',
    start: { dateTime: eventStartTime },
    end: { dateTime: eventEndTime },
    color: '#e74c3c',
  };

  // Event handlers
  const handleDragCreateStart = (start_time: any) => {
    setCurrentEvent((prevState: any) => ({
      ...prevState,
      id: `event-${Date.now()}`,
      start: start_time,
    }));
    setEventCreationComplete(false);
  };

  const handleDragCreateEnd = (end_time: any) => {
    setCurrentEvent((prevState) => ({
      ...prevState,
      end: end_time,
    }));
    setEventCreationComplete(true);
    // Show modal for editing the newly created event
    setModalVisible(true);
  };

  const LeftAreaComponentFunction = () => (
    <TouchableOpacity
      style={styles.todayButton}
      onPress={() => {
        console.log('Go to today'); // placeholder text
      }}
    >
      <Text style={styles.todayButtonText}>Today</Text>
    </TouchableOpacity>
  );

  const NowIndicatorComponentFunction = () => (
    <View style={styles.nowIndicator}>
      <View style={styles.nowIndicatorCircle} />
      <View style={styles.nowIndicatorLine} />
    </View>
  );

  // Save the event from modal
  const handleSaveEvent = () => {
    if (currentEvent.id && currentEvent.start && currentEvent.end) {
      // Check if we're editing an existing event
      const existingEventIndex = eventsData.findIndex((e) => e.id === currentEvent.id);

      if (existingEventIndex >= 0) {
        // Update existing event
        const updatedEvents = [...eventsData];
        updatedEvents[existingEventIndex] = currentEvent;
        setEventsData(updatedEvents);
      } else {
        // Add new event
        setEventsData([...eventsData, currentEvent]);
      }
    }

    // Reset and close modal
    setEventCreationComplete(false);
    setModalVisible(false);
  };

  // Create a new empty event
  const handleCreateNewEvent = () => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    setCurrentEvent({
      id: `event-${Date.now()}`,
      title: 'New Event',
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      color: '#4285F4',
    });

    setModalVisible(true);
  };

  // Update UI when event creation is complete
  useEffect(() => {
    if (eventCreationComplete) {
      console.log('Event creation completed:', currentEvent);
    }
  }, [eventCreationComplete, currentEvent]);

  // Function to format events for the calendar
  const formatEventsForCalendar = () => {
    // Filter out any invalid events (no id, start or end time)
    const validEvents = eventsData.filter((event) => event.id && event.start && event.end);

    const formattedEvents = validEvents.map((event) => ({
      id: event.id,
      title: event.title || 'Untitled Event',
      start: { dateTime: event.start },
      end: { dateTime: event.end },
      color: event.color || '#4285F4',
      // Add additional properties that may be useful
      editable: true,
      // You can add custom data to be used in event rendering
      meta: {
        description: event.description || '',
        location: event.location || '',
        isRecurring: event.isRecurring || false,
      },
    }));

    return [sampleEvent, ...formattedEvents];
  };

  // Handle edit of existing events
  const handleDragEditStart = (event) => {
    console.log('Started editing event:', event);
  };

  const handleDragEditEnd = async (event: any, newStart, newEnd: any) => {
    const new_start_time = await newStart;
    const new_end_time = await newEnd;

    console.log(`New event times are : ${new_start_time}, ${new_end_time}`);
    // console.log('End of event drag:', event);
    // console.log('End of event drag edit : ', newStart, newEnd);
    // console.log(event.start);
    // console.log(eventsData);

    // Update the event in our state
    const updatedEvents = eventsData.map((e) => {
      if (e.id === event.id) {
        return {
          ...e,
          start: newStart,
          end: newEnd,
        };
      }
      return e;
    });

    setEventsData(updatedEvents);
  };

  // Render dragging event component
  const renderDraggingEvent = useCallback((props) => {
    return (
      <DraggingEvent
        {...props}
        TopEdgeComponent={
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: '#3498db',
              position: 'absolute',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 10, color: 'white' }}>Drag</Text>
          </View>
        }
        BottomEdgeComponent={
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: '#3498db',
              bottom: 0,
              position: 'absolute',
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 10, color: 'white' }}>Drag</Text>
          </View>
        }
      />
    );
  }, []);

  // Format date for display in the modal
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {/* Add event button */}
      <TouchableOpacity style={styles.addButton} onPress={handleCreateNewEvent}>
        <Ionicons name="add-circle" size={24} color="white" />
      </TouchableOpacity>

      <CalendarContainer
        timeZone="America/New_York"
        theme={customTheme}
        numberOfDays={3}
        scrollByDay={true}
        allowDragToCreate={false}
        allowDragToEdit={true}
        onDragEventStart={handleDragEditStart}
        onDragEventEnd={handleDragEditEnd}
        dragStep={15}
        // onDragCreateEventStart={handleDragCreateStart}
        // onDragCreateEventEnd={handleDragCreateEnd}
        minDate="2024-01-01"
        maxDate="2025-12-31"
        initialDate={now.toISOString().split('T')[0]}
        events={formatEventsForCalendar()}
        onPressEvent={(event) => {
          // TODO : remove after, this is to be able to determine if I can retrieve information about the current event
          // console.log(`Currently selected event : ${JSON.stringify(event)}`);
          console.log(`Events related data : ${eventsData}`);
          // Open modal to edit the pressed event
          setCurrentEvent({
            id: event.id,
            title: event.title,
            start: event.start.dateTime,
            end: event.end.dateTime,
            color: event.color,
          });
          setModalVisible(true);
        }}
        firstDay={0} // Start week on Sunday (0) or Monday (1)
        showAllDayEventCell={true}
        scrollToNow={true}
        useHaptic={true}
        allowPinchToZoom={true}
        timeInterval={60} // 60 minute intervals
        spaceFromTop={20}
        spaceFromBottom={20}
        onChange={(visibleRange) => console.log('Visible range changed:', visibleRange)}
        onDateChanged={(date) => console.log('Date changed:', date)}
        onPressBackground={(date, timeString) =>
          console.log('Background pressed:', date, timeString)
        }
      >
        <CalendarHeader
          // Enhanced header configuration
          showWeekNumber={true}
          showCurrentTime={true}
          headerContainerStyle={customTheme.headerContainerStyle}
          monthYearStyle={customTheme.monthYearStyle}
          dayBarHeight={70} // Increase height for better visibility
          headerBottomHeight={25} // Add space at bottom of header
          collapsedItems={3} // Show 3 items when collapsed
          LeftAreaComponent={LeftAreaComponentFunction}
        />
        <CalendarBody
          renderDraggingEvent={renderDraggingEvent}
          hourFormat="HH:mm" // 24-hour format
          showNowIndicator={true}
          NowIndicatorComponent={NowIndicatorComponentFunction}
        />
      </CalendarContainer>

      {/* Event editing modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalTitle}>
              Event Details
              <AntDesign
                style={{
                  marginLeft: 24,
                  position: 'fixed',
                  // display: 'flex',
                  // flex: 1,
                  // justifyContent: 'flex-end',
                }}
                name="delete"
                size={24}
                color="black"
              />
            </Text> */}

            {/* <Text style={styles.modalTitle}>
              Event Details
              <AntDesign
                style={{
                  marginLeft: 24,
                  position: 'fixed',
                }}
                name="delete"
                size={24}
                color="black"
              />
            </Text>

            {} */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Event Details</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  console.log('Delete event:', currentEvent.id);
                  setModalVisible(false);
                }}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={styles.input}
                value={currentEvent.title || ''}
                onChangeText={(text) => setCurrentEvent((prev) => ({ ...prev, title: text }))}
                placeholder="Enter event title"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={currentEvent.description || ''}
                onChangeText={(text) => setCurrentEvent((prev) => ({ ...prev, description: text }))}
                placeholder="Enter event description"
                multiline={true}
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location:</Text>
              <TextInput
                style={styles.input}
                value={currentEvent.location || ''}
                onChangeText={(text) => setCurrentEvent((prev) => ({ ...prev, location: text }))}
                placeholder="Enter event location"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Time:</Text>
              <Text style={styles.timeText}>{formatDateForDisplay(currentEvent.start)}</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>End Time:</Text>
              <Text style={styles.timeText}>{formatDateForDisplay(currentEvent.end)}</Text>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.checkboxRow}>
                <Text style={styles.label}>Recurring Event:</Text>
                <TouchableOpacity
                  style={[styles.checkbox, currentEvent.isRecurring && styles.checkboxChecked]}
                  onPress={() =>
                    setCurrentEvent((prev) => ({ ...prev, isRecurring: !prev.isRecurring }))
                  }
                >
                  {currentEvent.isRecurring && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.colorSection}>
              <Text style={styles.label}>Color:</Text>
              <View style={styles.colorOptions}>
                {['#4285F4', '#0F9D58', '#F4B400', '#DB4437', '#7B1FA2'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      currentEvent.color === color && styles.selectedColor,
                    ]}
                    onPress={() => setCurrentEvent((prev) => ({ ...prev, color }))}
                  />
                ))}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSave]}
                onPress={handleSaveEvent}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    backgroundColor: '#3498db',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  todayButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 10,
    marginTop: 5,
  },
  todayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  nowIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  nowIndicatorCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginLeft: 2,
  },
  nowIndicatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'red',
    opacity: 0.7,
  },

  // this ensures that the modal remains within the centermost portion of the screen
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // css styling for the modal view itself
  modalView: {
    width: '85%',
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
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalHeader: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // styling for the delete button icon
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    // paddingHorizontal: 2,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#3498db',
  },
  timeText: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  colorSection: {
    marginBottom: 15,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#3498db',
  },
  buttonCancel: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
