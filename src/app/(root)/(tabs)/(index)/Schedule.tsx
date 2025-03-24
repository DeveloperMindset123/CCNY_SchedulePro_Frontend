/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Button,
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
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

// TODO : conditioanlly render dropdown component based on user's selection

export default function Schedule() {
  const dropdownData = [
    { label: 'Daily', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Annually', value: '3' },
    { label: 'Every Weekday', value: '4' },
    { label: 'Every Weekend', value: '5' },

    // TODO : this should be a feature post-mvp (as it would be more work to implement atm)
    // { label : 'custom', value : '6' }
  ];

  const [newEventModal, setNewEventModal] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);

  // TODO : you will need 2 modals here --> the first to pick the starting date and the second for the ending date
  // modal to handle the date and time picker logic
  const [startDate, setStartDate] = useState(new Date()); // default should be current date
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(true); // determines whether the datetime-picker modal should open or remain closed
  const [mode, setMode] = useState('date');
  // TODO : 3 types of mode : date, time, datetime

  const onChangeStart = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    // setShow(false); // turn the modal view off (the "modal" is inline and always rendered, therefore not needed)
    setStartDate(currentDate);
    setCurrentEventData((previousEventData) => ({
      ...previousEventData,
      start: startDate.toString(),
    }));
  };

  // mirror of onChangeStart (a bit on the repetitive end)
  const onChangeEnd = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    // console.log(`Current available events : ${event}`);
    setEndDate(currentDate);
    setCurrentEventData((previousEventData) => ({
      ...previousEventData,
      end: endDate.toString(), // update the endDate (experimental)
    }));
  };

  // function that renders the current mode that the user has selected (i.e. date, time, or datetime)
  // the below functions can be reused for both the start and end date
  const showMode = (currentMode: string) => {
    // setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  // NOTE : IOS Only has the datetime feature
  const showDateTimePicker = () => {
    showMode('datetime');
  };

  const [currentEventData, setCurrentEventData] = useState({
    // we want the id to be a random generated unsigned integer
    // id should be randomly genereated once the save button at the bottom of the modal has been pressed
    id: -1,

    // event title, should originally be empty
    // the title tag should be the first to be updated on the event modal (but discarded if modal is deleted)
    title: '',

    // description of the event
    // the description tag should be the second to be updated
    description: '',

    start: '', // start time (should be set to ISO string format)
    end: '', // end time, should also be set to ISO string format
    event_color: '#4285F4', // users should have various choices to select from
    location: 'Not Specified', // specifies the location where the event should take place
    isRecurring: false,
    // eventColor: '#4285F4', // default event color should be blue
    recurrence_frequency: null, // this value should only be modified if isRecurring is set to true
  });

  const [retrieveUserLocation, setRetrieveUserLocation] = useState<boolean>(false);
  // TODO : Reference to this useState hook --> this array should be updated in the following conditions:
  // 1. once a new event has been created (meaning the save button within the modal has been clicked)
  // 2. once an existing event has been modified (a seperate modal will be used for this)
  // 3. once an event has been deleted (the same modal that has been used for editing an event can be reused)
  const [eventsList, setEventList] = useState([]);

  // define the function for saving newly created event
  // assign a new random id for the current event
  const handleCreateSaveNewEvent = () => {
    const random_generated_id = Math.floor(Math.random() * 100 + 1);
    console.log(random_generated_id);

    // check if the newly generated id happens to exist within the current event list
    const id_existence = eventsList.findIndex(
      (current_event) => current_event.id === random_generated_id
    );

    console.log(`id_existence value : ${id_existence}`);

    // in the event that this conditional is true, that means the id doesn't exist
    // that means we can attach the current event's data with the new id that has been found
    // save it into the list (which will then be sent to the database based on the email of the user)
    // treating this also as a form of base case
    if (id_existence === -1) {
      setCurrentEventData((previousEventdata) => ({
        ...previousEventdata,
        id: random_generated_id,
      }));

      // id doesn't seem to be updating
      console.log(currentEventData);

      // add the newly created event to the list
      setEventList((previousEventList) => ({
        ...previousEventList,
        currentEventData,
      }));
      // TODO : set modal to close after
      setNewEventModal(false);
      // return;
      // } else {
      //   // make a recursive call onto the function (this is experimental, not entirely sure if it will work)
      //   handleCreateSaveNewEvent();
    }
  };

  // TODO : event object should also contain a description tag (alongside location, start, end and whether or not it's a recurring event, which if set to true, should have a dropdown pop up specifying how often this event ought to be recurring.)
  // TODO : the classes should automatically be added to the schedule (although that's something to consider later) but this should be an unique standout feature of it's own
  // define the function that will handle the creation of new events
  // note that the modal for this should be different from the existing event modal
  // NOTE : it would be more appropriate to call this functon "renderNewEventModal"
  const handleCreateNewEvent = () => {
    // for now the only behavior we want is for the useState hook variable
    // when this modal view is set to true, the modal will be displayed
    setNewEventModal(true);
  };

  const renderDropdownItem = (item) => {
    return (
      <View style={dropdownStyles.item}>
        <Text style={dropdownStyles.textItem}>{item.label}</Text>
        {item.value === dropdownValue && (
          <AntDesign style={dropdownStyles.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  // useEffect hook to test if sample event is working as intended
  useEffect(() => {
    console.log(`List of available events : ${JSON.stringify(eventsList)}`);
    // console.log(currentEventData);
    // console.log(`current start and end date : \n${startDate}\n ${endDate}`);
  }, [eventsList]);

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
                  // specifying position to be absolute ensures that the icon can be positioned within the top/bottom right/left overriding the parent code of content being placed within center
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

              {/** Define the text input component for the title of the new event, this will be a single line component */}
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    // styling for the event title text-input
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    color: '#555',
                  }}
                >
                  Title:
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1, // forms a square outline surrounding the text input
                    borderColor: '#ddd', // determines the color of the outline
                    borderRadius: 5, // determines the curvature of the edges around the squares
                    padding: 10, // determines how much extra space should be added to push out the borders
                    fontSize: 14, // determines how large the text should appear within the input box
                    backgroundColor: '#f9f9f9', // determines the color within the input box itself
                    shadowOffset: { width: 10, height: 10 },
                    // shadowRadius: 20,
                  }}
                  value={currentEventData.title || ''}
                  placeholder="Enter event title"
                  // NOTE : we only want to update the title portion of the currentEvent state
                  // all the other fields will remain unchanged
                  onChangeText={(newUserInputTitle) =>
                    setCurrentEventData((prev) => ({
                      ...prev,
                      title: newUserInputTitle,
                    }))
                  }
                />
              </View>

              {/* component that implements the description text input (multiline component implementation) */}
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text
                  // styling for the text that appears above the text input placeholder
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    color: '#555',
                  }}
                >
                  Event Description
                </Text>
                <TextInput
                  // some of the styling here is reusable as it's part of the title input as well (the portion that remains unchanged has been marked via comments)
                  style={{
                    // start of similar styling to previous title input
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 12, // this is the only modification for the input styling compared to the previous one
                    backgroundColor: '#f9f9f9',
                    // end of similar styling to previous title input

                    // styling exclusive to multiline input
                    height: 80,
                    textAlignVertical: 'bottom',
                  }}
                  placeholder="Enter Event Description"
                  value={currentEventData.description || ''}
                  onChangeText={(newEventDescription) =>
                    setCurrentEventData((previousEventData) => ({
                      ...previousEventData, // copy the data that is currently within the object

                      // update the description based on the user input
                      description: newEventDescription,
                    }))
                  }
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
              <View
                style={{
                  // flex: 3,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    // padding: -10,
                    // marginRight: 10,
                    // backgroundColor: 'red',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 7,
                      color: '#555',
                      fontWeight: 'bold',
                      // marginLeft: -2,
                    }}
                  >
                    Start:
                  </Text>
                  {/* {/* <Button title="open" onPress={() => setOpen(true)} />
                   * conditionally render the date and time picker

                  {Platform.OS === 'ios' ? (
                    <Button onPress={showDateTimePicker} title="Show datetime picker!" />
                  ) : (
                    <View>
                      <Button onPress={showDatePicker} title="Show date picker!" />
                      <Button onPress={showDatePicker} title="Show date picker!" />
                    </View>
                  )}
                   <Button onPress={showDatePicker} title="Show date picker!" />
                  <Button onPress={showTimePicker} title="Show time picker!" />

                  {/**Text that dynamically renders the date and time that has been selected by the user
                  <Text>selected: {date.toLocaleString()}</Text> */}
                  <DateTimePicker
                    // style={{}}
                    testID="dateTimePicker"
                    value={startDate}
                    mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                    is24Hour={true}
                    onChange={onChangeStart}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // padding: -10,
                    marginTop: 10,
                    // backgroundColor: 'green',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#555',
                      marginTop: 8,
                      marginRight: 7.5,
                    }}
                  >
                    End:
                  </Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                    is24Hour={true}
                    onChange={onChangeEnd}
                  />
                </View>
              </View>
              {/**This section determines whether the event should be recurring or not
               *
               * NOTE : a dropdown should be displayed if event happens to be recurring
               *
               */}
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginBottom: 5,
                      color: '#666',
                    }}
                  >
                    Is this event recurring?
                  </Text>
                  <TouchableOpacity
                    // checkbox styling
                    // the checkboxChecked styling should only render
                    // if isRecurring is set to true
                    style={[
                      checkboxStyling.checkbox,
                      currentEventData.isRecurring && checkboxStyling.checkboxChecked,
                    ]}
                    onPress={() =>
                      setCurrentEventData((previousData) => ({
                        ...previousData,
                        isRecurring: !previousData.isRecurring, // toggle logic
                      }))
                    }
                  >
                    {
                      // render a checkmark if isRecurring is set to true
                      currentEventData.isRecurring && (
                        <Ionicon name="checkmark" size={16} color="white" />
                      )
                    }
                  </TouchableOpacity>
                </View>
                {currentEventData.isRecurring && (
                  <Dropdown
                    style={dropdownStyles.dropdown}
                    placeholderStyle={dropdownStyles.placeholderStyle}
                    selectedTextStyle={dropdownStyles.selectedTextStyle}
                    inputSearchStyle={dropdownStyles.inputSearchStyle}
                    iconStyle={dropdownStyles.iconStyle}
                    data={dropdownData}
                    search
                    maxHeight={180}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={dropdownValue}
                    onChange={(item) => {
                      // this is a bit confusing since it's updating the value which is an integer digit
                      // but we want to update the label instead
                      setDropdownValue(item.value);

                      // note the syntax
                      // update the recurrence frequency
                      setCurrentEventData((previousStateData) => ({
                        ...previousStateData,
                        recurrence_frequency: item.label,
                      }));
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={dropdownStyles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                      />
                    )}
                    renderItem={renderDropdownItem}
                    dropdownPosition="top" // to prevent content from going outside of screen
                  />
                )}
              </View>
              {/**determine choice of color for the event (default is lightblue) */}
              <View style={eventColorStyling.colorSection}>
                <Text style={eventColorStyling.label}>Color:</Text>
                <View style={eventColorStyling.colorOptions}>
                  {['#4285F4', '#0F9D58', '#F4B400', '#DB4437', '#7B1FA2'].map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        eventColorStyling.colorOption,
                        { backgroundColor: color },
                        currentEventData.event_color === color && eventColorStyling.selectedColor,
                      ]}
                      // onFocus={}
                      onPress={() => {
                        console.log(`currently selected color : ${color}`);
                        setCurrentEventData((prev) => ({ ...prev, event_color: color }));
                      }}
                    />
                  ))}
                </View>
              </View>
              <View
                // TODO : implement the logic for this
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                {/* <Button title="Save" />
                <Button title="Cancel" /> */}
                <TouchableOpacity
                  // onPress={handleCreateSaveNewEvent}
                  onPress={() => {
                    const id = Math.floor(Math.random() * 100 + 1);
                    const id_existence = eventsList.findIndex((e: any) => e.id === id);

                    // TODO : look into why the id value isn't updating here
                    // if (id_existence === -1) {
                    setCurrentEventData((prev) => ({
                      ...prev,
                      id,
                    }));
                    // }

                    console.log(`current event related data : ${JSON.stringify(currentEventData)}`);
                    // possible fix to the current issue
                    setEventList([...eventsList, currentEventData]);
                    console.log(JSON.stringify(eventsList));
                    setNewEventModal(false); // close modal at the end of the function execution
                  }}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNewEventModal(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
              {/**Anchor point to determine where the actual content should be positioned */}
              <Text>Testing</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* )} */}
    </View>
  );
}

const checkboxStyling = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3498db',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#3498db', // adjust background color to the border color if it has been selected (meaning status set to true)
  },
});

// this styling has been copied from the documentation example provided
const dropdownStyles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const eventColorStyling = StyleSheet.create({
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  // styling to fill in the radio button
  // based on the color for the event that has been selected
  selectedColor: {
    borderWidth: 3,
    borderColor: '#333',
  },
  colorSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
});
