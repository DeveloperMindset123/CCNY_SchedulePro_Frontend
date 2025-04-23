/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO : use react-native async storage instead to analyze the data
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggingEvent,
  DraggingEventProps,
  PackedEvent,
  LocaleConfigsProps,
  CalendarKitHandle,
  EventItem,
} from '@howljs/calendar-kit';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Ionicon } from '@/components/core/icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import CalendarModeSwitcher, {
  CustomRecurrenceModal,
} from '@/components/core/calendarModeSwitcher';
import CalendarNavigation from '@/components/core/calendarNavigation';
import { useLocalSearchParams } from 'expo-router';
import DeleteSingleEvent, { DeleteRecurringEvents } from '@/components/core/deleteModals';
import { Delete } from 'lucide-react-native';

// TODO : define the edit event and new event modal as seperate components and pass down data as a prop instead
// TODO : add an interface referencing the event useState hook
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: { dateTime: string };
  end: { dateTime: string };
  color: string;
  location: string;
  isRecurring: boolean;
  recurrence_frequency: any | string | undefined; // not entirely sure of the type
  isRecurringInstance?: boolean;
  parentEventId?: string | any;
}
// experiment with the extension logic alongside a seperate independent interface to see which raises errors

interface ExistingEventModal {
  // input data for the current event related information the modal should render
  current_event: any;

  // useState variables that determines whether modal should be displayed or not
  visibillity_state: boolean;
  delete_event_modal: boolean;
  delete_event_modal_recurring: boolean;
  isEditable: boolean;
  onRequestClose: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;
  onRequestDelete: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;

  start_time: any;
  end_time: any;
  onRequestEdit: ((event: NativeSyntheticEvent<any>) => void) | undefined | any;

  handleOnChangeTitle: any;
  handleOnChangeDescription: any;
  handleOnChangeStart: any;
  handleOnChangeEnd: any;
  handleOnPressRecurring: any;
  dropdown_list: any;
  handleDropdownFunction: any;
  renderDropdownItem: any;

  handleChangeEventColor: ((event: NativeSyntheticEvent<CalendarEvent>) => void) | undefined | any;
  handleSaveEditedEvent: ((event: NativeSyntheticEvent<CalendarEvent>) => void) | undefined | any;
  handleCancelEditedEvent: any;
  handleOnPressDeleteConfirmation:
    | ((event: NativeSyntheticEvent<CalendarEvent>) => void)
    | undefined
    | any;
  handleOnPressDeleteCancellation:
    | ((event: NativeSyntheticEvent<CalendarEvent>) => void)
    | undefined
    | any;
  handleCloseRecurringDeleteModal:
    | ((event: NativeSyntheticEvent<CalendarEvent>) => void)
    | undefined
    | any;
}

// TODO : requires lots of refactoring, badly written composition code
const ExistingEventModal = ({
  current_event,
  visibillity_state,
  onRequestClose,
  isEditable,
  onRequestDelete,
  onRequestEdit,
  handleOnChangeTitle,
  handleOnChangeDescription,
  handleOnChangeStart,
  handleOnChangeEnd,
  handleOnPressRecurring,
  dropdown_list,
  handleDropdownFunction,
  renderDropdownItem,
  handleChangeEventColor,
  handleSaveEditedEvent,
  handleCancelEditedEvent,
  start_time,
  end_time,

  // additional props to handle the confirmation/deletion of a particular event
  handleOnPressDeleteConfirmation,
  handleOnPressDeleteCancellation,
  delete_event_modal,
  delete_event_modal_recurring,
  handleCloseRecurringDeleteModal, // this will handle the closing of the modal after recurring events have been chosen to be deleted or saved.
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
                  onPress={onRequestDelete}
                >
                  <AntDesign name="delete" size={20} color="red" />
                  {current_event.isRecurring ? (
                    <DeleteRecurringEvents
                      visible={delete_event_modal_recurring}
                      onPressDeleteConfirmation={handleOnPressDeleteConfirmation}
                      onPressDeleteCancellation={handleOnPressDeleteCancellation}
                      buttonStyling={ButtonStyling}
                      recurrenceEventStyles={recurrenceEventStyling}
                      list_of_events={[]}
                      handleOnRequestModalClose={handleCloseRecurringDeleteModal}
                      selectedEvent={current_event} // seems repetitive
                    />
                  ) : (
                    <DeleteSingleEvent
                      // Important NOTE : delete_event_modal (prop for single event, and should only display the modal with specific content.)
                      visibillity={delete_event_modal}
                      onPressDeleteConfirmation={handleOnPressDeleteConfirmation}
                      onPressDeleteCancellation={handleOnPressDeleteCancellation}
                      buttonStyling={ButtonStyling}
                    />
                  )}
                  {/* <Modal animationType="slide" transparent={true} visible={delete_event_modal}>
                    <View
                      style={{
                        flex: 1,

                        // to ensure that the modal is located within the middle of the screen
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      <View
                        style={{
                          width: '65%',
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
                          justifyContent: 'center',
                          alignItems: 'center',
                          elevation: 5,
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 20,
                            fontSize: 16,
                          }}
                        >
                          Are You Sure You Want to Delete This Event?
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              ButtonStyling.button,
                              ButtonStyling.buttonSave,
                              {
                                marginRight: 10,
                              },
                            ]}
                            onPress={handleOnPressDeleteConfirmation}
                          >
                            <Text style={ButtonStyling.buttonText}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[ButtonStyling.button, ButtonStyling.buttonCancel]}
                            onPress={handleOnPressDeleteCancellation}
                          >
                            <Text style={ButtonStyling.buttonText}>No</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal> */}
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

                  // gray out is isEditable is set to false
                  backgroundColor: isEditable ? '#ffffff' : '#f5f5f5',
                  color: isEditable ? '#000000' : '#888888',
                  shadowOffset: { width: 10, height: 10 },
                  // shadowRadius: 20,
                }}
                value={current_event.title || ''}
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
                  backgroundColor: isEditable ? '#ffffff' : '#f5f5f5',
                  color: isEditable ? '#000000' : '#888888',
                  height: 80,
                  textAlignVertical: 'bottom',
                }}
                // placeholder='Should not be neccessary'

                // current_event prop should contain a property
                // named description
                editable={isEditable}
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
                  // should only be editable if the edit icon has been pressed
                  testID="dateTimePicker"
                  disabled={isEditable ? false : true}
                  // NOTE : not entirely sure if this would work
                  value={start_time}
                  // value={startDate}
                  // conditionally renders mode based on platform, setMode isn't being used
                  mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                  is24Hour={true}
                  onChange={handleOnChangeStart} // another prop to handle update in time
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  // padding: -10,
                  marginTop: 10,
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
                  disabled={isEditable ? false : true}
                  // NOTE : not entirely sure if this would work
                  value={end_time}
                  // value={startDate}
                  // conditionally renders mode based on platform, setMode isn't being used
                  mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                  is24Hour={true}
                  onChange={handleOnChangeEnd} // another prop to handle update in time
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
                  placeholder={current_event.recurrence_frequency || 'Select item'}
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
  // function to improve json syntax highlighting for debugging purpose
  // copied from stack overflow
  function syntaxHighlight(json: any) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match: any) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }
  const route_params = useLocalSearchParams();

  // extract email (for payload)
  const { email } = route_params;
  // supporting variables for the calendar mode switcher
  // NOTE : useRef allows us to persist values between renders
  /**
   * @Documentation regarding the differentiation between some of the core react hooks
   * @useMemo : is to memoize a calculation result between a function's calls and between renders
   * @useCallback : is to memoize a callback itself (referential equality) between renders
   * @useRef : is to keep data between renders (updating does not fire re-rendering) --> this is helpful for persisitng data
   * @useState : is to keep data between renders (updating does fire re-rendering)
   *
   * Additional information:
   * @param {Callback} - a callback is a function passed as an argument to another function (this is the most basic definition)
   *
   *
   */

  const calendarRef = useRef<CalendarKitHandle>(null);

  // by default, the mode should be set to 3 days
  const [calendarMode, setCalendarMode] = useState('3day');
  const [numberOfDays, setNumberOfDays] = useState(3);

  // useState hook for AcitivityIndicator
  // AcitivityIndicator is intended to display circular loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // function to handle different calendar modes
  // the function should be wrapped around an useCallback hook
  const handleModeChange = useCallback((mode: string, days: number) => {
    setIsLoading(true); // start loading animation

    // update state values to adjust mode and days
    setCalendarMode(mode);
    setNumberOfDays(days);

    // Handle month view special case
    if (mode === 'month') {
      Alert.alert('Month View', 'Month View is not supported yet.');
      setCalendarMode('week');
      setNumberOfDays(7);
    }

    // a js native api
    // tells the browser that I wish to perform an animation
    // accepts a callback function (aka the animation logic)
    requestAnimationFrame(() => {
      calendarRef.current?.goToDate({
        date: new Date().toISOString(),
        animatedDate: true,
        hourScroll: true,
      });

      // add a small delay to finish the transition before stopping the loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    });
  }, []);

  // dropdown data for recurring events
  const dropdownData = [
    { label: 'Daily', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Annually', value: '3' },
    { label: 'Every Weekday', value: '4' },
    { label: 'Every Weekend', value: '5' },
    { label: 'Custom', value: '6' },
  ];

  // function to calculate recurring events based on recurrence frequency
  const calculateRecurringEvents = useCallback((event: any) => {
    // handle the edge cases in which the event does not recur
    // simply return an array containing a single element
    // the element being the event itself
    if (!event.isRecurring || !event.recurrence_frequency) {
      return [event];
    }

    // otherwise, use spread operator to copy the original event
    // and store it within originalEvent variable
    const originalEvent = { ...event };

    const additionalEvents = [];
    const startDate = new Date(event.start.dateTime);
    const endDate = new Date(event.end.dateTime);
    const duration = endDate.getTime() - startDate.getTime();
    console.log(
      `value of duration : ${duration}, value of start time : ${startDate}, value of end date : ${endDate}`
    );

    // switch statement to handle the cases for event recurrence
    switch (event.recurrence_frequency) {
      // since we want the date to repeat each day
      // NOTE : i = 1 so that the same event doesn't repeat twice
      case 'Daily':
        for (let i = 1; i <= 120; i++) {
          // calculate the start
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);

          // calculate the end
          const newEnd = new Date(newStart.getTime() + duration);
          // const newEnd = new Date(endDate);
          endDate.setDate(endDate.getDate() + duration);

          // add the events to the additional events array
          // NOTE : observe the 2 new properties being added here [and the other switch statement cases] (isRecurringInstance, parentEventId)
          additionalEvents.push({
            ...originalEvent,
            id: `${originalEvent.id}_recurring_${i}`,
            start: { dateTime: newStart.toISOString() },
            end: { dateTime: newEnd.toISOString() },
            isRecurringInstance: true,
            parentEventId: originalEvent.id,
          });
        }
        break;

      // similar logic to daily
      // primary differentiation is that i is being multiplied by 7
      // for the newStart date calculation
      case 'Weekly':
        for (let i = 1; i <= 112; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i * 7);
          const newEnd = new Date(newStart.getTime() + duration);

          additionalEvents.push({
            ...originalEvent,
            id: `${originalEvent.id}_recurring_${i}`,
            start: { dateTime: newStart.toISOString() },
            end: { dateTime: newEnd.toISOString() },
            isRecurringInstance: true,
            parentEventId: originalEvent.id,
          });
        }
        break;

      case 'Every Weekday':
        // last for 4 months (since each semester spans 4 month timeframe)
        for (let i = 1; i <= 120; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);
          if (newStart.getDay() === 0 || newStart.getDay() === 6) {
            continue;
          }

          const newEnd = new Date(newStart.getTime() + duration);

          additionalEvents.push({
            ...originalEvent,
            id: `${originalEvent.id}_recurring_${i}`,
            start: { dateTime: newStart.toISOString() },
            end: { dateTime: newEnd.toISOString() },
            isRecurringInstance: true,
            parentEventId: originalEvent.id,
          });
        }
        break;

      case 'Every Weekend':
        // let weekendCount = 0
        for (let i = 1; i <= 120; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);

          // avoid weekdays?
          // not entirely sure of this logic
          if (newStart.getDay() !== 0 && newStart.getDay() !== 6) {
            continue;
          }

          const newEnd = new Date(newStart.getTime() + duration); // observe the recurring logic

          additionalEvents.push({
            ...originalEvent,
            id: `${originalEvent.id}_recurring_${i}`,
            start: { dateTime: newStart.toISOString() },
            end: { dateTime: newEnd.toISOString() },
            isRecurringInstance: true,
            parentEventId: originalEvent.id,
          });
        }
        break;

      case 'Annually':
        for (let i = 1; i <= 5; i++) {
          const newStart = new Date(startDate);
          newStart.setFullYear(startDate.getFullYear() + i);

          console.log('new start value (annually) : ', JSON.stringify(newStart));
          const newEnd = new Date(newStart.getTime() + duration);
          additionalEvents.push({
            ...originalEvent,
            id: `${originalEvent.id}_recurring_${i}`,
            start: { dateTime: newStart.toISOString() },
            end: { dateTime: newEnd.toISOString() },
            isRecurringInstance: true,
            parentEventId: originalEvent.id,
          });
        }
        break;

      // add logic for rendering custom event modal
      case 'Custom':
        // get selected days from custom recurrence
        // TODO : the original event may need customRecurrenceDays field added to it
        // eslint-disable-next-line no-case-declarations
        const customDays = event.customRecurrenceDays || [];
        if (customDays.length === 0) break; // if no custom days has been provided, nothing to repeat

        // create events for next 52 weeks
        // TODO : adjust this value accordingly
        for (let i = 1; i <= 365; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);

          // only create events for selected days of the week
          if (!customDays.includes(newStart.getDay())) {
            continue;
          }

          const newEnd = new Date(newStart.getTime() + duration);
          additionalEvents.push({
            ...originalEvent,
            id: `${originalEvent.id}_recurring_${i}`,
            start: { dateTime: newStart.toISOString() },
            end: { dateTime: newEnd.toISOString() },
            isRecurringInstance: true,
            parentEventId: originalEvent.id,
          });
        }
        break;

      default:
        break; // do nothing
    }

    return [originalEvent, ...additionalEvents];
  }, []);

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
        {event.isRecurringInstance && (
          <Ionicon
            name="repeat"
            size={8}
            color={'white'}
            style={{
              position: 'absolute',
              right: 2,
              top: 2,
            }}
          />
        )}
      </View>
    ),
    [] // no dependencies required
  );

  const [newEventModal, setNewEventModal] = useState<boolean>(false);

  // this hook will determine whether to show the current existing event in the form of a modal
  const [showExistingEventModal, setShowExistingEventModal] = useState(false);
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [isModalEditable, setIsModalEditable] = useState(false);
  // this will determine the event that has been currently selected
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dropdownValue, setDropdownValue] = useState(null);

  // TODO : you will need 2 modals here --> the first to pick the starting date and the second for the ending date
  // modal to handle the date and time picker logic
  const [startDate, setStartDate] = useState(new Date()); // default should be current date
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(true); // determines whether the datetime-picker modal should open or remain closed

  // hook to handle displaying custom recurrence modals
  const [showCustomRecurrenceModal, setShowCustomRecurrenceModal] = useState(false);
  const [customSelectedDays, setCustomSelectedDays] = useState([]); // stores the custom days the event should be repeated

  // useState hook variable for currentCalendarDate
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date().toISOString());

  // modal to handle rendering of recurrence modal
  const [recurrenceDeleteModal, setRecurrenceDeleteModal] = useState(false);

  const handleCalendarDateChange = useCallback((newDate: string | any) => {
    setCurrentCalendarDate(newDate);
    calendarRef.current?.goToDate({
      date: newDate,
      animatedDate: true,
      hourScroll: true,
    });
  }, []);

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

  // TODO : check if this needs to be used in the first place, otherwise, remove as part of cleanup
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
  const handleCreateSaveNewEvent = useCallback(async () => {
    // implement logic for handling empty user input
    // for title and time (description for event should be optional)
    /**
     * @param {Alert} defintiion
     * @param {title} - Missing Information (represents the title of this particular alert in the event that title input is empty)
     * @param {message} - Corresponding message to be rendered in accordance to the particular alert
     */
    if (!currentEventData.title) {
      Alert.alert('Missing Information', 'Please select title for your event.');
      return;
    }

    if (!currentEventData.start.dateTime || !currentEventData.end.dateTime) {
      Alert.alert(
        'Missing Information',
        'Please select appropriate start and end times for your event.'
      );
      return;
    }

    const uniqueId = `event_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    // replaced with string based value for easier identification
    // const random_generated_id = Math.floor(Math.random() * 100 + 1);
    // console.log(random_generated_id);

    // check if the newly generated id happens to exist within the current event list
    // TODO : Handle issue regarding existence of potential duplicate generated events as well
    const id_existence = eventsList.findIndex(
      (current_event: any) => current_event.id === uniqueId
    );

    const newEvent = {
      ...currentEventData,
      id: uniqueId,
    };

    let eventsToAdd = [];

    // if user wants an event to be recurring based on a specific selected frequency
    if (newEvent.isRecurring && newEvent.recurrence_frequency) {
      eventsToAdd = calculateRecurringEvents(newEvent); // append recurring events to eventsList
    } else {
      // otherwise, simply add a single instance copy of the particular event
      eventsToAdd = [newEvent];
    }

    // double spread opearator
    // since eventsToAdd can be more than one depending on recurrence frequency
    setEventList([...eventsList, ...eventsToAdd]);
    setNewEventModal(false);

    // reset current state data so we don't have to worry about it later
    // NOTE : this would replace the logic for the handleCreateNewEvent function
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
  }, [currentEventData, calculateRecurringEvents, eventsList]);

  // TODO : event object should also contain a description tag (alongside location, start, end and whether or not it's a recurring event, which if set to true, should have a dropdown pop up specifying how often this event ought to be recurring.)
  // TODO : the classes should automatically be added to the schedule (although that's something to consider later) but this should be an unique standout feature of it's own
  // define the function that will handle the creation of new events
  // note that the modal for this should be different from the existing event modal
  // NOTE : it would be more appropriate to call this functon "renderNewEventModal"

  // TLDR : this function gets triggered when the "+" icon gets selected
  const handleCreateNewEvent = () => {
    // for now the only behavior we want is for the useState hook variable
    // when this modal view is set to true, the modal will be displayed
    // reset all the previous relevant data (so that the modal doesn't render old data that was previously entered by user)
    // TODO : issue with DRY, fix this
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

  const renderDropdownItem = (item: any) => {
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
  // simple logic for handling recurring ev
  const handlePressEvent = useCallback(
    (event: CalendarEvent | any) => {
      // NOTE : the properties isRecurringInstance and parentEventId comes from the calculateRecurringEvents function
      // refer to the defintition of calculateRecurringEvents definition for reference
      if (event.isRecurringInstance && event.parentEventId) {
        // parentEvent : simply the original event set to be recurring
        const parentEvent = eventsList.find((e: CalendarEvent) => e.id === event.parentEventId);

        if (parentEvent) {
          setSelectedEvent(parentEvent);
        } else {
          setSelectedEvent(event); // otherwise, the original event should be set to selected
        }
      } else {
        // TODO : this seems somewhat repetitive, find a fix for this
        setSelectedEvent(event);
      }
      // console.log(`Pressed event : ${JSON.stringify(event)}`); // TODO : delete this statement, this is just to check if the event update is working as intended
      // setSelectedEvent(event);
      setShowExistingEventModal(true);
    },
    [eventsList]
  );

  // prototype of the data that needs to be sent out to the datbase
  const events_payload = {
    email: email,
    events_data: eventsList,
  };

  // console.log('Events Payload Data Retrieved : ', events_payload);

  // TODO : fix this implementation
  useEffect(() => {
    // console.log(`List of events : ${syntaxHighlight(JSON.stringify(eventsList))}`);
    console.log(`List of events : ${JSON.stringify(eventsList)}`);
  }, [eventsList]);
  return (
    <View
      style={{
        // this ensures that calendar view still gets rendered insted of a blank screen display
        flex: 1,
        position: 'relative',
      }}
    >
      <CalendarModeSwitcher currentMode={calendarMode} onModeChange={handleModeChange} />

      <CalendarNavigation
        currentDate={currentCalendarDate}
        onDateChange={handleCalendarDateChange}
      />

      {/*
       * insert acitivity Indicator animation loading logic here
       * through conditional rendering
       */}
      {isLoading && (
        <View style={calendarStyling.loadingOverlay}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
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
        // TODO : this requires some additioanl modifications
        onPress={handleCreateNewEvent}
      >
        <Ionicon name="add-circle-sharp" size={32} color={'white'} />
      </TouchableOpacity>
      <CalendarContainer
        // TODO : define a function that will dynamically, this will require adjustment to the initialLocales variable.
        locale="en"
        allowPinchToZoom={true}
        initialLocales={initialLocales}
        timeZone="America/New_York"
        minDate="2025-01-01"
        maxDate="2026-12-31"
        // initialDate={new Date().toISOString().split('T')[0]}

        // this essentially represents the "current date", don't be confused by the prop name
        initialDate={currentCalendarDate.split('T')[0]}
        numberOfDays={numberOfDays} // changed from 3 (static value)
        // scrollByDay={numberOfDays <= 4} // should only hold true for smaller values
        scrollByDay={true}
        events={eventsList}
        overlapType="overlap" // events should overlap, similar to google calendar
        rightEdgeSpacing={1} // supporting prop related to event overlappping
        // defines the minimum start time difference in minutes for events to be considered overlapping
        minStartDifference={15}
        // to prevent unneccessary re-renders
        // the event handler function will be memoized using useCallback hook
        // refer to the function definition
        onPressEvent={handlePressEvent}
        ref={calendarRef}
      >
        {showExistingEventModal && (
          // TODO : fix the issue with text input not working and changing the current functions into reusable reference functions
          <ExistingEventModal
            handleOnPressDeleteCancellation={() => {
              setDeleteEventModal(false);
            }}
            handleOnPressDeleteConfirmation={async () => {
              // logic for deleting a particular event
              const updatedEvents = await eventsList.filter(
                (event: any) => event.id !== selectedEvent.id
              );
              // TODO : delete later, this is to experiment to check if the current event has been deleted or not
              console.log(`The updated events are : ${updatedEvents}`);
              // set the newly updated event
              setEventList(updatedEvents);
              setDeleteEventModal(false);
              setShowExistingEventModal(false); // close the event
            }}
            // handles visibillity of single event modal
            delete_event_modal={deleteEventModal}
            // handles visibillity of multiple event modal
            delete_event_modal_recurring={recurrenceDeleteModal}
            end_time={endDate}
            start_time={startDate} // pass in the start and end date for the date time picker
            current_event={selectedEvent}
            visibillity_state={showExistingEventModal}
            onRequestClose={() => setShowExistingEventModal(false)}
            isEditable={isModalEditable}
            onRequestEdit={() => setIsModalEditable(true)}
            // NOTE : this can be changed to be reused as a reference function insted
            handleOnChangeTitle={(newUserInputTitle: any) => {
              // we only want the edit to take place if the modal happens to be editable
              if (isModalEditable) {
                console.log(`Detected changes to user input : ${newUserInputTitle}`);
                setSelectedEvent((prev: CalendarEvent) => ({
                  ...prev,
                  title: newUserInputTitle,
                }));

                // this wouldn't work due to asynchronous nature of the code
                // setSelectedEvent(currentEventData);
              }
            }}
            // TODO : change to a reference function for reusabillity
            // TODO : fix this, the incorrect state is being updated here
            // change from setCurrentEventData -> setSelectedEvent(prev => ...prev, { title : newUserInputTitle}) instead
            handleOnChangeDescription={(newUserInputDescription: any) => {
              if (isModalEditable) {
                setSelectedEvent((prevData: CalendarEvent) => ({
                  ...prevData,
                  description: newUserInputDescription,
                }));
                // setCurrentEventData((prev) => ({
                //   ...prev,
                //   title: newUserInputTitle,
                // }));
              }
            }}
            // the function logic for the datetimepicker needs to be slighlyt different
            // rather than updating the currentEventsData useState hook
            // instead the setSelectedEvent useState hook needs to be updated
            handleOnChangeStart={async (_event: any, selectedDate: any) => {
              const currentDate = await selectedDate;
              const updatedDatetime = {
                dateTime: currentDate,
              };

              setStartDate(currentDate);
              setSelectedEvent((previousEventData: CalendarEvent) => ({
                ...previousEventData,
                start: updatedDatetime,
              }));
            }}
            handleOnChangeEnd={async (_event: any, selectedDate: any) => {
              const currentDate = await selectedDate;
              const updatedDatetime = {
                dateTime: currentDate,
              };

              setEndDate(currentDate);
              setSelectedEvent((previousEventData: CalendarEvent) => ({
                ...previousEventData,
                end: updatedDatetime,
              }));
            }}
            // TODO : change this to a reference function instead
            // TODO : replace setCurrentEventData with setSelectedEvent state
            handleOnPressRecurring={() =>
              setSelectedEvent((previousData: CalendarEvent) => ({
                ...previousData,
                isRecurring: !previousData.isRecurring, // toggle logic
              }))
            }
            dropdown_list={dropdownData}
            // TODO : figure out why this isn't working
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
            handleSaveEditedEvent={async () => {
              // first we remove the old data by matching based on id
              const updatedEventList = await eventsList.filter(
                (event) => event.id !== selectedEvent.id
              );
              console.log(`Updated event list is : ${JSON.stringify(updatedEventList)}`);
              // then set the current selectedEvent related data to the updatedEventList instead
              setEventList([...updatedEventList, selectedEvent]);
              setShowExistingEventModal(false);
            }}
            handleCancelEditedEvent={() => {
              // change the modal back to not being editable
              setIsModalEditable(false);
              setShowExistingEventModal(false);
            }}
            onRequestDelete={() => {
              setDeleteEventModal(true);
              // correct logic below for deleting a particular event
              // // remove the event within the list whose current id matches the id of the currently selected event
              // // include all other events except the current event containing matching id
              // const updatedEvents = await eventsList.filter(
              //   (event) => event.id !== selectedEvent.id
              // );
              // // TODO : delete later, this is to experiment to check if the current event has been deleted or not
              // console.log(`The updated events are : ${updatedEvents}`);
              // // set the newly updated event
              // setEventList(updatedEvents);
              // setShowExistingEventModal(false); // close the event
            }}
            handleCloseRecurringDeleteModal={() => setRecurrenceDeleteModal(false)}
          />
        )}
        <CalendarHeader dayBarHeight={60} />
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

                      // TODO : delete later, just to check if dropdown value is being selected correctly
                      console.log('Dropdown changed to : ', item.label);
                      setDropdownValue(item.value);

                      // modified slightly to add a conditional check to handle custom days
                      if (item.label === 'Custom') {
                        console.log(
                          'This function is being triggered, should display the custom modal.'
                        );
                        setShowCustomRecurrenceModal(true);
                      } else {
                        // note the syntax
                        // update the recurrence frequency
                        setCurrentEventData((previousStateData) => ({
                          ...previousStateData,
                          recurrence_frequency: item.label,
                        }));
                      }
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
            {/**Conditionally render the custom recurrence modal component */}
            {showCustomRecurrenceModal && (
              <CustomRecurrenceModal
                visible={showCustomRecurrenceModal}
                onClose={() => setShowCustomRecurrenceModal(false)}
                initialSelection={customSelectedDays}
                onSave={(selectedDays: any) => {
                  setCustomSelectedDays(selectedDays);
                  setCurrentEventData((prev: any) => ({
                    ...prev,
                    recurrence_frequency: 'Custom',
                    customRecurrenceDays: selectedDays, // this is a new field being added?
                  }));
                  setShowCustomRecurrenceModal(false);
                }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const calendarStyling = StyleSheet.create({
  // styling for the loading animation
  // to be displayed when there's a switch in the calendar
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

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

const recurrenceEventStyling = StyleSheet.create({
  eventsOptionStyle: {
    padding: 2,
    borderRadius: 4,
    width: '20%',
    alignItems: 'center',
    marginBottom: 3,
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modifiedButtonStyling: {
    padding: 10,
    borderRadius: 5,
    width: '42%',
    alignItems: 'center',
  },
});
