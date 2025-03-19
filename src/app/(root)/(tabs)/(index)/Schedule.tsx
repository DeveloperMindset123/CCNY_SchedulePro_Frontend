import { useCallback, useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggingEvent,
  DraggingEventProps,
} from '@howljs/calendar-kit';
import { Ionicon, AntDesign } from '@/components/core/icon';
import CalendarModal from '@/components/core/calendarModal';
export default function Schedule() {
  const [newEventModal, setNewEventModal] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  // define the function that will handle the creation of new events
  // note that the modal for this should be different from the existing event modal
  const handleCreateNewEvent = () => {
    // for now the only behavior we want is for the useState hook variable
    // when this modal view is set to true, the modal will be displayed
    setNewEventModal(true);
  };
  return (
    <View
      style={{
        // this ensures that calendar view still gets rendered insted of a blank screen display
        flex: 1,
        position: 'relative',
      }}
    >
      <TouchableOpacity
        // TODO : convert this into tailwindcss based styling for uniformity
        // the css here ensures that the button is positioned within the bottom right portion of the screen
        style={{
          position: 'absolute', // ensures that the element is positioned exactly where it has been specified
          bottom: 10, // ensures that elements are placed on the bottom right portion of the screen
          right: 10, // ensures that elements are positioned at the right hand side of the screen
          zIndex: 1000, // determines the ordering of the elements toward which they should appear
          backgroundColor: '#3498db', // skyblue hexademical code
          borderRadius: 20, // creates a circular outline of the background color
          width: 40,
          height: 40,
          justifyContent: 'center', // ensures that the background and the content is aligned within the center
          alignItems: 'center',
          shadowColor: '#000',

          // responsible for setting the drop shadow offset (native to IOS)
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3, // determines the visibillity of the shadow to be rendered
          shadowRadius: 3, // sets the drop shadow blur radius
          elevation: 5, // sets the elevation of android
        }}
        onPress={handleCreateNewEvent}
      >
        <Ionicon name="add-circle-sharp" size={32} color={'white'} />
      </TouchableOpacity>
      <CalendarContainer
        numberOfDays={3}
        scrollByDay={true}
        events={[
          {
            id: '1',
            title: 'Meeting with Team',
            start: { dateTime: '2024-03-15T10:00:00Z' },
            end: { dateTime: '2024-03-15T11:00:00Z' },
            color: '#4285F4',
          },
        ]}
      >
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>

      {/**if newEventModal is set to true, render the content of the modal*/}
      {/* {newEventModal && ( */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={newEventModal}
        onRequestClose={() => setNewEventModal(false)}
      >
        {/**define the css for the modal */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '85%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text>This is a modal</Text>
          </View>
        </View>
      </Modal>
      {/* )} */}
    </View>
  );
}
