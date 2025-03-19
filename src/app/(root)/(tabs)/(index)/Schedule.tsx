import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback, // this is a wrapper around the modal, will ensure that modal is closed when the external area has been pressed
  Platform,
} from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggingEvent,
  DraggingEventProps,
} from '@howljs/calendar-kit';
// import { Ionicon, AntDesign } from '@/components/core/icon';
import { AntDesign } from '@expo/vector-icons';
import { Ionicon } from '@/components/core/icon';
import CalendarModal from '@/components/core/calendarModal';
export default function Schedule() {
  const [newEventModal, setNewEventModal] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  // TODO : event object should also contain a description tag (alongside location, start, end and whether or not it's a recurring event, which if set to true, should have a dropdown pop up specifying how often this event ought to be recurring.)
  // TODO : the classes should automatically be added to the schedule (although that's something to consider later) but this should be an unique standout feature of it's own
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
        visible={newEventModal} // meaning as long as this useState hook is true, the modal will be displayed
        onRequestClose={() => {
          Alert.alert('This modal has been closed');
          setNewEventModal(false);
        }}
      >
        <TouchableWithoutFeedback>
          {/**define the css for the modal */}
          <View
            // styling to ensure that content within the modal is positioned at the center of the page
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)', // this creates a background dimming effect once the modal pops up
            }}
          >
            <View
              // styling for modalView
              style={{
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
              }}
            >
              <View
                // styling for the header of the modal
                style={{
                  position: 'relative',
                  width: '100%',
                  // paddingBottom: 15,
                  marginBottom: 15, // adding paddingBottom and marginBottom does not yield the same result
                  // paddingBottom: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/**Render the text that will display the modal's title itself */}
                <Text
                  // styling for the header title that is to be rendered at the top of the modal
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 15,
                    textAlign: 'center',
                    color: '#333',

                    // conditional rendering of fonts
                    // the fonts are quite generic
                    fontFamily: Platform.OS == 'ios' ? 'AppleSDGothicNeo-Bold' : 'Roboto',
                  }}
                >
                  Event Details
                </Text>
                {/**add the delete button to be positioned to the right hand side of the modal at the same level as the modal header*/}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: -2,
                  }}
                  // upon clicking on the delete button, modal should close
                  // no data should be saved in reagrds to this modal
                  // in this case, no eventhas been created so we simply need to discard the data by closing the modal
                  onPress={() => {
                    setNewEventModal(false);
                  }}
                >
                  <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* )} */}
    </View>
  );
}
