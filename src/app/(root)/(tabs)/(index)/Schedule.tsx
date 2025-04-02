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

  // this is a wrapper around the modal, will ensure that modal is closed when the external area has been pressed
  TouchableWithoutFeedback,
  Platform,
  Button,
  NativeSyntheticEvent,
} from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggingEvent,
  DraggingEventProps,
  PackedEvent,
  LocaleConfigsProps,
} from '@howljs/calendar-kit';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Ionicon } from '@/components/core/icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { ShowerHeadIcon } from 'lucide-react-native';

// TODO : define the edit event and new event modal as seperate components and pass down data as a prop instead

interface ExistingEventModal {
  // input data for the current event related information the modal should render
  current_event: any;

  // useState variables that determines whether modal should be displayed or not
  visibillity_state: boolean;

  // this is based on the docs, added any just in case the previous two types fail to work
  // this prop is intended to handle what will happen when modal is selected to be closed
  onRequestClose: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;

  // this prop should be a useState hook that will handle whether the text input is edtiable
  // ideally the text input should be editable when the edit button has been selected
  isEditable: boolean;

  // deletes the current event upon selecting the delete icon
  // TODO : determine and filter out the event based on the id
  // the parameter that needs to be passed in is the current_event prop
  onRequestDelete: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;

  start_time: any;

  // This function will handle how the modal's data will be edited
  // when the edit icon is selected
  onRequestEdit: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;

  handleOnChangeTitle: any;
  handleOnChangeDescription: any;
  handleOnChangeStart: any;
  handleOnPressRecurring: any;
  dropdown_list: any;
  handleDropdownFunction: any;
  renderDropdownItem: any;

  handleChangeEventColor: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;
  handleSaveEditedEvent: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;
  handleCancelEditedEvent: any;
}
const ExistingEventModal = ({
  // TODO : define the relevant props needed to be rendered
  current_event,
  visibillity_state,
  onRequestClose,
  isEditable,
  onRequestDelete,
  onRequestEdit,
  handleOnChangeTitle,
  handleOnChangeDescription,
  handleOnChangeStart,
  handleOnPressRecurring,
  dropdown_list,
  handleDropdownFunction,
  renderDropdownItem,
  handleChangeEventColor,
  handleSaveEditedEvent,
  handleCancelEditedEvent,
  start_time,
}: ExistingEventModal) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibillity_state}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback>
        <View
          // styling for modalView (reused)
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
              style={{
                position: 'relative',
                width: '100%',
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                // TODO : continue implementation logic here
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
              {/*
              * TODO : figure out how to place the two items side by side next to one another

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  // top: -2,
                }}
                onPress={onRequestDelete}
              >
                <AntDesign name="delete" size={20} color="red" />
              </TouchableOpacity> */}
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -2,
                  flexDirection: 'row', // so that 2 items can be placed side by side
                }}
              >
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                  }}
                  // this should simply result in !isEditable (although a function that asynchronous changes the isEditable value to true would be ideal)
                  onPress={onRequestEdit} // we simply want isEditable state to be set to true if this button is pressed
                >
                  {/** Change it such that instead of delete icon, there's instead edit icon available */}
                  <AntDesign name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    {
                      // marginRight: 15,
                    }
                  }
                  // this should simply result in !isEditable (although a function that asynchronous changes the isEditable value to true would be ideal)
                  onPress={onRequestDelete} // we simply want isEditable state to be set to true if this button is pressed
                >
                  {/** Change it such that instead of delete icon, there's instead edit icon available */}
                  <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
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
                editable={isEditable}
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
                value={current_event.title || ''}
                // placeholder="Enter event title"    // placeholder not needed atp
                // NOTE : we only want to update the title portion of the currentEvent state
                // all the other fields will remain unchanged
                // onChangeText={(newUserInputTitle) =>
                //   setCurrentEventData((prev) => ({
                //     ...prev,
                //     title: newUserInputTitle,
                //   }))
                // }

                onChangeText={handleOnChangeTitle}
              />
            </View>
            <View
              style={{
                marginBottom: 15,
              }}
            >
              <Text
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
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 12,
                  backgroundColor: '#f9f9f9',
                  height: 80,
                  textAlignVertical: 'bottom',
                }}
                // placeholder='Should not be neccessary'

                // current_event prop should contain a property
                // named description
                value={current_event.description}
                onChangeText={handleOnChangeDescription}
                multiline={true}
                numberOfLines={3}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 7,
                    color: '#555',
                    fontWeight: 'bold',
                  }}
                >
                  Start:
                </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  // NOTE : not entirely sure if this would work
                  value={start_time}
                  // value={startDate}
                  // conditionally renders mode based on platform, setMode isn't being used
                  mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                  is24Hour={true}
                  onChange={handleOnChangeStart} // another prop to handle update in time
                />
              </View>
            </View>
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
                    current_event.isRecurring && checkboxStyling.checkboxChecked,
                  ]}
                  onPress={handleOnPressRecurring}
                >
                  {
                    // render a checkmark if isRecurring is set to true
                    current_event.isRecurring && (
                      <Ionicon name="checkmark" size={16} color="white" />
                    )
                  }
                </TouchableOpacity>
              </View>
              {current_event.isRecurring && (
                <Dropdown
                  // TODO : continue here
                  style={dropdownStyles.dropdown}
                  placeholderStyle={dropdownStyles.placeholderStyle}
                  selectedTextStyle={dropdownStyles.selectedTextStyle}
                  inputSearchStyle={dropdownStyles.inputSearchStyle}
                  iconStyle={dropdownStyles.iconStyle}
                  // TODO : input the correct prop value
                  data={dropdown_list}
                  search
                  maxHeight={180}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  searchPlaceholder="Search..."
                  // this should come from the recurrence_frequency specified
                  value={current_event.recurrence_frequency}
                  onChange={handleDropdownFunction}
                  renderLeftIcon={() => (
                    <AntDesign style={dropdownStyles.icon} color="black" name="Safety" size={20} />
                  )}
                  // TODO : implement the appropriate reference function here
                  renderItem={renderDropdownItem}
                  dropdownPosition="top" // to prevent content from going outside of screen
                />
              )}
            </View>
            <View style={eventColorStyling.colorSection}>
              <Text style={eventColorStyling.label}>Color:</Text>
              <View style={eventColorStyling.colorOptions}>
                {['#4285F4', '#0F9D58', '#F4B400', '#DB4437', '#7B1FA2'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      eventColorStyling.colorOption,
                      { backgroundColor: color },
                      current_event.color === color && eventColorStyling.selectedColor,
                    ]}
                    // onFocus={}
                    onPress={handleChangeEventColor}
                  />
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={[ButtonStyling.button, ButtonStyling.buttonSave]}
                onPress={handleSaveEditedEvent}
              >
                <Text style={ButtonStyling.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ButtonStyling.button, ButtonStyling.buttonCancel]}
                onPress={handleCancelEditedEvent}
              >
                <Text style={ButtonStyling.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

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

  // define the function to render events
  const renderEvent = useCallback(
    (event: PackedEvent) => (
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: 4,
        }}
      >
        <Ionicons name="calendar" size={10} color="white" />
        <Text style={{ color: 'white', fontSize: 10 }}>{event.title}</Text>
      </View>
    ),
    []
  );

  const [newEventModal, setNewEventModal] = useState<boolean>(false);

  // this hook will determine whether to show the current existing event in the form of a modal
  const [showExistingEventModal, setShowExistingEventModal] = useState(false);
  const [isModalEditable, setIsModalEditable] = useState(false);
  // this will determine the event that has been currently selected
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dropdownValue, setDropdownValue] = useState(null);

  // TODO : you will need 2 modals here --> the first to pick the starting date and the second for the ending date
  // modal to handle the date and time picker logic
  const [startDate, setStartDate] = useState(new Date()); // default should be current date
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(true); // determines whether the datetime-picker modal should open or remain closed

  // this is just an example of how to add hours to the current time
  // this variable is intended to be a reference, it is not being used
  const _four_hours_delay = new Date().getHours() + 4;

  // TODO : This is something to consider later, but retrieve the user-locate and adjust according to the locale of the user
  // this should be part of the feature that implements multilingual support in terms of languages to attract users from different location.
  const initialLocales: Record<string, Partial<LocaleConfigsProps>> = {
    en: {
      weekDayShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
      meridiem: { ante: 'am', post: 'pm' },
      more: 'more',
    },
    ja: {
      weekDayShort: '日_月_火_水_木_金_土'.split('_'),
      meridiem: { ante: '午前', post: '午後' },
      more: 'もっと',
    },
    vi: {
      weekDayShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
      meridiem: { ante: 'sa', post: 'ch' },
      more: 'Xem thêm',
    },
  };

  const onChangeStart = async (event: any, selectedDate: any) => {
    // we want a delay for the selected date
    const currentDate = await selectedDate;
    // setShow(false); // turn the modal view off (the "modal" is inline and always rendered, therefore not needed)

    console.log(`current date that has been detected based on user input : ${currentDate}`);

    // NOTE : needs to be converted into ISO string
    const updatedDatetime = {
      dateTime: currentDate,
    };

    // NOTE : it may not be ideal to set two states within a single function
    setStartDate(currentDate); // there is not really a need for this useState hook
    setCurrentEventData((previousEventData) => ({
      ...previousEventData,
      start: updatedDatetime,
    }));
  };

  // mirror of onChangeStart (a bit on the repetitive end)
  const onChangeEnd = async (event: any, selectedDate: any) => {
    const currentDate = await selectedDate;

    const updatedDatetime = {
      dateTime: currentDate,
    };
    // console.log(`Current available events : ${event}`);
    setEndDate(currentDate);
    setCurrentEventData((previousEventData) => ({
      ...previousEventData,
      end: updatedDatetime, // update the endDate (experimental)
    }));
  };

  const [currentEventData, setCurrentEventData] = useState({
    id: -1,
    title: '',
    description: '',

    start: { dateTime: '' },
    end: { dateTime: '' },
    color: '#4285F4', // default event color set to blue

    // TODO : this isn't really being used, could be ideal to remove altogether
    location: 'Not Specified',
    isRecurring: false, // TODO : determine appropriate calculation logic for recurring events
    recurrence_frequency: null, // this value should only be modified if isRecurring is set to true
  });

  const [retrieveUserLocation, setRetrieveUserLocation] = useState<boolean>(false);
  // TODO : Reference to this useState hook --> this array should be updated in the following conditions:
  // 1. once a new event has been created (meaning the save button within the modal has been clicked)
  // 2. once an existing event has been modified (a seperate modal will be used for this)
  // 3. once an event has been deleted (the same modal that has been used for editing an event can be reused)
  const [eventsList, setEventList] = useState<any>([]);

  // define the function for saving newly created event
  // assign a new random id for the current event
  // this function handles determining and assigning a new unique id to a calendar event
  // due to the asynchronous nature of state updates, it is ideal to only update one state at a time.
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
      const updatedEvent = {
        ...currentEventData,
        id: random_generated_id,
      };

      setEventList([...eventsList, updatedEvent]);
      setNewEventModal(false);
      return;
    } else {
      // make a recursive call onto the function (this is experimental, not entirely sure if it will work)
      handleCreateSaveNewEvent();
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
    // reset all the previous relevant data (so that the modal doesn't render old data that was previously entered by user)
    setCurrentEventData({
      id: -1,
      title: '',
      description: '',
      start: { dateTime: '' },
      end: { dateTime: '' },
      color: '#4285F4',
      location: 'Not Specified',
      isRecurring: false,
      recurrence_frequency: null,
    });
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

  // useCallback hook is being used as a wrapper around this reference function
  const handlePressEvent = useCallback((event) => {
    console.log(`Pressed event : ${JSON.stringify(event)}`); // TODO : delete this statement, this is just to check if the event update is working as intended
    setSelectedEvent(event);
    setShowExistingEventModal(true);
  }, []);

  // prototype of the data that needs to be sent out to the datbase
  const events_payload = {
    email: 'user email goes here',
    events_data: 'information regarding new events goes here',
  };
  // useEffect hook to test if sample event is working as intended
  // TODO : delete this useState hooks (and console.log statements within it)
  useEffect(() => {
    console.log(`List of available events : ${JSON.stringify(eventsList)}`);
    console.log('Detected changes to start date : ', startDate.toISOString());
    console.log('Detected changes to end date : ', endDate.toISOString());

    console.log(`current selected event : ${JSON.stringify(selectedEvent)}`);
    console.log(`current status of event modal display : ${showExistingEventModal}`);
    // console.log(currentEventData);
    // console.log(`current start and end date : \n${startDate}\n ${endDate}`);
  }, [eventsList, startDate, endDate, selectedEvent, showExistingEventModal]);
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
        // TODO : define a function that will dynamically, this will require adjustment to the initialLocales variable.
        locale="en"
        initialLocales={initialLocales}
        timeZone="America/New_York"
        minDate="2025-01-01"
        maxDate="2026-12-31"
        initialDate={new Date().toISOString().split('T')[0]}
        numberOfDays={3}
        scrollByDay={true}
        events={eventsList}
        overlapType="overlap" // events should overlap, similar to google calendar
        // defines the minimum start time difference in minutes for events to be considered overlapping
        minStartDifference={15}
        // to prevent unneccessary re-renders
        // the event handler function will be memoized using useCallback hook
        // refer to the function definition
        onPressEvent={handlePressEvent}
      >
        {showExistingEventModal && (
          <ExistingEventModal
            start_time={startDate} // pass in the start and end date for the date time picker
            current_event={selectedEvent}
            visibillity_state={showExistingEventModal}
            onRequestClose={() => setShowExistingEventModal(false)}
            isEditable={isModalEditable}
            onRequestEdit={() => setIsModalEditable(true)}
            // NOTE : this can be changed to be reused as a reference function insted
            handleOnChangeTitle={(newUserInputTitle: any) =>
              setCurrentEventData((prev) => ({
                ...prev,
                title: newUserInputTitle,
              }))
            }
            // TODO : change to a reference function for reusabillity
            handleOnChangeDescription={(newUserInputTitle: any) =>
              setCurrentEventData((prev) => ({
                ...prev,
                title: newUserInputTitle,
              }))
            }
            handleOnChangeStart={onChangeStart} // we can reuse the same function
            // TODO : change this to a reference function instead
            handleOnPressRecurring={() =>
              setCurrentEventData((previousData) => ({
                ...previousData,
                isRecurring: !previousData.isRecurring, // toggle logic
              }))
            }
            dropdown_list={dropdownData}
            handleDropdownFunction={() => {
              console.log('Do something');
            }}
            renderDropdownItem={renderDropdownItem}
            handleChangeEventColor={(selectedColor: any) => {
              setCurrentEventData((prev) => ({
                ...prev,
                selectedColor, // TODO : fix this
              }));
            }}
            handleSaveEditedEvent={() => {
              // ideally, we would have to do less work
              setEventList([...eventsList, currentEventData]);
            }}
            handleCancelEditedEvent={() => setShowExistingEventModal(false)}
            onRequestDelete={() => {
              // remove the event within the list whose current id matches the id of the currently selected event
              const updatedEvents = eventsList.filter((event) => event.id === selectedEvent.id);

              // set the newly updated event
              setEventList(updatedEvents);
              setShowExistingEventModal(false); // close the event
            }}
          />
        )}
        <CalendarHeader />
        <CalendarBody hourFormat="hh:mm a" renderEvent={renderEvent} />
      </CalendarContainer>
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
                  // we don't need to make additional modficaitions here, since the event's data hasn't been saved in the first place
                  // we do however need to make this modification on the existing modal where the data needs to be deleted based on the id specified
                  onPress={() => {
                    setNewEventModal(false);
                  }}
                >
                  <AntDesign name="delete" size={20} color="red" />
                  {/* <AntDesign name="edit" size={20} color={'black'} /> */}
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
                  <DateTimePicker
                    // style={{}}
                    testID="dateTimePicker"
                    // if value prop doesn't recieve a useState hook
                    // will throw an error
                    value={startDate}
                    // value={startDate}
                    // conditionally renders mode based on platform, setMode isn't being used
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
                        currentEventData.color === color && eventColorStyling.selectedColor,
                      ]}
                      // onFocus={}
                      onPress={() => {
                        console.log(`currently selected color : ${color}`);
                        setCurrentEventData((prev) => ({ ...prev, color }));
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
                  style={[ButtonStyling.button, ButtonStyling.buttonSave]}
                  onPress={handleCreateSaveNewEvent}
                >
                  <Text style={ButtonStyling.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[ButtonStyling.button, ButtonStyling.buttonCancel]}
                  onPress={() => setNewEventModal(false)}
                >
                  <Text style={ButtonStyling.buttonText}>Cancel</Text>
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
