/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  NativeSyntheticEvent,
  ActivityIndicator,
} from 'react-native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  PackedEvent,
  LocaleConfigsProps,
  CalendarKitHandle,
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

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: { dateTime: string };
  end: { dateTime: string };
  color: string;
  location: string;
  isRecurring: boolean;
  recurrence_frequency: any | string | undefined;
  isRecurringInstance?: boolean;
  parentEventId?: string | any;
}

interface ExistingEventModal {
  current_event: any;
  setEventListUseStateSetter: any;
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
  radioButtonChangeHandler: (() => void) | any;
  handleChangeEventColor: ((event: NativeSyntheticEvent<CalendarEvent>) => void) | undefined | any;
  handleSaveEditedEvent: ((event: NativeSyntheticEvent<CalendarEvent>) => void) | undefined | any;
  handleCancelEditedEvent: any;
  handleOnPressDeleteConfirmationSingleEvent:
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
  listOfEvents: any[];
  currentSelectedRadioButton: string;
  setListOfEventsSecondChild: any;
  set_delete_event_modal_recurring: any;
  handleOnPressRecurringDeletionCallback: any;
}

const ExistingEventModal = ({
  current_event,
  setEventListUseStateSetter,
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
  handleOnPressDeleteConfirmationSingleEvent,
  handleOnPressDeleteCancellation,
  delete_event_modal,
  delete_event_modal_recurring,
  set_delete_event_modal_recurring,
  handleCloseRecurringDeleteModal,
  listOfEvents,
  setListOfEventsSecondChild,
  radioButtonChangeHandler,
  currentSelectedRadioButton,
  handleOnPressRecurringDeletionCallback,
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
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 15,
                  textAlign: 'center',
                  color: '#333',
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
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                  }}
                  onPress={onRequestEdit}
                >
                  <AntDesign name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onRequestDelete}>
                  <AntDesign name="delete" size={20} color="red" />
                  {current_event.isRecurring ? (
                    <DeleteRecurringEvents
                      visible={delete_event_modal_recurring}
                      setEventsLists={setEventListUseStateSetter}
                      setModalVisibillity={set_delete_event_modal_recurring}
                      onPressDeleteCancellation={handleOnPressDeleteCancellation}
                      buttonStyling={ButtonStyling}
                      recurrenceEventStyles={recurrenceEventStyling}
                      list_of_events={listOfEvents}
                      handleOnRequestModalClose={handleCloseRecurringDeleteModal}
                      selectedEvent={current_event}
                      handleRadioButtonOnChange={radioButtonChangeHandler}
                      handleRecurringEventDeletionCallback={undefined}
                      currentRadioButton={currentSelectedRadioButton}
                      setEventsList={setListOfEventsSecondChild}
                      handleOnPressEventDeletionCallback={handleOnPressRecurringDeletionCallback}
                    />
                  ) : (
                    <DeleteSingleEvent
                      visibillity={delete_event_modal}
                      onPressDeleteConfirmation={handleOnPressDeleteConfirmationSingleEvent}
                      onPressDeleteCancellation={handleOnPressDeleteCancellation}
                      buttonStyling={ButtonStyling}
                    />
                  )}
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
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 14,
                  backgroundColor: isEditable ? '#ffffff' : '#f5f5f5',
                  color: isEditable ? '#000000' : '#888888',
                  shadowOffset: { width: 10, height: 10 },
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
                  testID="dateTimePicker"
                  disabled={isEditable ? false : true}
                  value={start_time}
                  mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                  is24Hour={true}
                  onChange={handleOnChangeStart}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
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
                  value={end_time}
                  mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                  is24Hour={true}
                  onChange={handleOnChangeEnd}
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
                  style={[
                    checkboxStyling.checkbox,
                    current_event.isRecurring && checkboxStyling.checkboxChecked,
                  ]}
                  onPress={handleOnPressRecurring}
                >
                  {current_event.isRecurring && (
                    <Ionicon name="checkmark" size={16} color="white" />
                  )}
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
                  value={current_event.recurrence_frequency}
                  onChange={handleDropdownFunction}
                  renderLeftIcon={() => (
                    <AntDesign style={dropdownStyles.icon} color="black" name="Safety" size={20} />
                  )}
                  renderItem={renderDropdownItem}
                  dropdownPosition="top"
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
  const [currentRadioButton, setCurrentRadioButton] = useState('all-event');
  const [radioButtonSelected, setRadioButtonSelected] = useState(false);
  const deleteAllEvents = async (originalEvent: any[], eventToDelete: any) => {
    if (eventToDelete.id.includes('recurring')) {
      const parentEventID = eventToDelete.parentId;
      return await originalEvent.filter((currentEvent) => !currentEvent.id.includes(parentEventID));
    }
    return originalEvent.filter((currentEvent) => !currentEvent.id.includes(eventToDelete.id));
  };

  const deleteCurrentEvent = async (listOfEvents: any[], eventToDelete: any) => {
    return await listOfEvents.filter((event) => event.id !== eventToDelete.id);
  };
  const deleteSubsequentEvents = async (listOfEvents: any[], event: any) => {
    if (event.id.includes('recurring')) {
      const event_id_array = event.id.split('_');
      const recurrence_unit = parseInt(event_id_array[event_id_array.length - 1]);
      return listOfEvents.filter(
        (currentEvent) =>
          !(
            currentEvent.id.includes(event.parentEventId) &&
            parseInt(currentEvent.id.split('_')[currentEvent.id.split('_').length - 1]) >
              recurrence_unit
          )
      );
    } else {
      await deleteAllEvents(listOfEvents, event);
    }
  };
  const handleRecurringEventDeletion = async () => {
    switch (currentRadioButton) {
      case 'all-event':
        await deleteAllEvents(eventsList, selectedEvent);
        break;
      case 'subsequent':
        await deleteSubsequentEvents(eventsList, selectedEvent);
        break;
      case 'current':
        await deleteCurrentEvent(eventsList, selectedEvent);
        break;
      default:
        break;
    }
  };

  // reference to determine currently selected radio button
  const handleRadioButtonOnChange = (value: string) => {
    console.log(`Selected radio button : ${value}`);
    setCurrentRadioButton(value);
  };

  // determines if current radio button has been selected
  const radioButtonSelectorUpdate = () => {
    setRadioButtonSelected(true);
  };
  const route_params = useLocalSearchParams();
  const mutatedEventID = useRef('');
  const { email } = route_params;
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
    setIsLoading(true);
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
    if (!event.isRecurring || !event.recurrence_frequency) {
      return [event];
    }
    const originalEvent = { ...event };

    const additionalEvents = [];
    const startDate = new Date(event.start.dateTime);
    const endDate = new Date(event.end.dateTime);
    const duration = endDate.getTime() - startDate.getTime();
    console.log(
      `value of duration : ${duration}, value of start time : ${startDate}, value of end date : ${endDate}`
    );

    switch (event.recurrence_frequency) {
      case 'Daily':
        for (let i = 1; i <= 120; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);
          const newEnd = new Date(newStart.getTime() + duration);
          endDate.setDate(endDate.getDate() + duration);
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
        for (let i = 1; i <= 120; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);
          if (newStart.getDay() !== 0 && newStart.getDay() !== 6) {
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
        // eslint-disable-next-line no-case-declarations
        const customDays = event.customRecurrenceDays || [];
        if (customDays.length === 0) break; // if no custom days has been provided, nothing to repeat

        for (let i = 1; i <= 365; i++) {
          const newStart = new Date(startDate);
          newStart.setDate(startDate.getDate() + i);

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
  const [showExistingEventModal, setShowExistingEventModal] = useState(false);
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [isModalEditable, setIsModalEditable] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(true);
  const [showCustomRecurrenceModal, setShowCustomRecurrenceModal] = useState(false);
  const [customSelectedDays, setCustomSelectedDays] = useState([]);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date().toISOString());
  const [recurrenceDeleteModal, setRecurrenceDeleteModal] = useState(false);

  const handleCalendarDateChange = useCallback((newDate: string | any) => {
    setCurrentCalendarDate(newDate);
    calendarRef.current?.goToDate({
      date: newDate,
      animatedDate: true,
      hourScroll: true,
    });
  }, []);

  const _four_hours_delay = new Date().getHours() + 4;
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
    const currentDate = await selectedDate;
    const updatedDatetime = {
      dateTime: currentDate,
    };

    setStartDate(currentDate);
    setCurrentEventData((previousEventData) => ({
      ...previousEventData,
      start: updatedDatetime,
    }));
  };

  const onChangeEnd = async (event: any, selectedDate: any) => {
    const currentDate = await selectedDate;

    const updatedDatetime = {
      dateTime: currentDate,
    };

    setEndDate(currentDate);
    setCurrentEventData((previousEventData) => ({
      ...previousEventData,
      end: updatedDatetime,
    }));
  };

  const [currentEventData, setCurrentEventData] = useState({
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

  const [eventsList, setEventList] = useState<any>([]);
  const handleCreateSaveNewEvent = useCallback(async () => {
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
    const id_existence = eventsList.findIndex(
      (current_event: any) => current_event.id === uniqueId
    );

    const newEvent = {
      ...currentEventData,
      id: uniqueId,
    };

    let eventsToAdd = [];
    if (newEvent.isRecurring && newEvent.recurrence_frequency) {
      eventsToAdd = calculateRecurringEvents(newEvent);
    } else {
      eventsToAdd = [newEvent];
    }
    setEventList([...eventsList, ...eventsToAdd]);
    setNewEventModal(false);
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

    return await sendEventData({
      email: email,
      event_id: mutatedEventID,
      events_data: eventsList,
    });
  }, [currentEventData, eventsList, email, calculateRecurringEvents]);

  const handleCreateNewEvent = () => {
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

  // set regardless
  const handlePressEvent = useCallback(
    (event: CalendarEvent | any) => {
      setSelectedEvent(event);
      setShowExistingEventModal(true);
    },
    [eventsList]
  );

  const sendEventData = async (payload_data: any) => {
    try {
      const response_create_event = await fetch('http://127.0.0.1:5000/sendEventData', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload_data),
      }).then((res) => {
        console.log(`Response Status : ${JSON.stringify(res)}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(eventsList);
  }, [eventsList]);

  const handleCloseRecurrenceModal = () => {
    setShowExistingEventModal(false);
    setRecurrenceDeleteModal(false);
  };

  useEffect(() => {
    console.log(`Status of recurring modal : ${recurrenceDeleteModal}`);
  }, [recurrenceDeleteModal]);

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}
    >
      <CalendarModeSwitcher currentMode={calendarMode} onModeChange={handleModeChange} />

      <CalendarNavigation
        currentDate={currentCalendarDate}
        onDateChange={handleCalendarDateChange}
      />

      {isLoading && (
        <View style={calendarStyling.loadingOverlay}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: '#3498db',
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
        // TODO : this requires some additioanl modifications
        onPress={handleCreateNewEvent}
      >
        <Ionicon name="add-circle-sharp" size={32} color={'white'} />
      </TouchableOpacity>
      <CalendarContainer
        locale="en"
        allowPinchToZoom={true}
        initialLocales={initialLocales}
        timeZone="America/New_York"
        minDate="2025-01-01"
        maxDate="2026-12-31"
        initialDate={currentCalendarDate.split('T')[0]}
        numberOfDays={numberOfDays}
        scrollByDay={true}
        events={eventsList}
        overlapType="overlap"
        rightEdgeSpacing={1}
        minStartDifference={15}
        onPressEvent={handlePressEvent}
        ref={calendarRef}
      >
        {showExistingEventModal && (
          <ExistingEventModal
            handleOnPressRecurringDeletionCallback={handleCloseRecurrenceModal}
            handleOnPressDeleteCancellation={() => {
              selectedEvent.isRecurring
                ? setRecurrenceDeleteModal(false)
                : setDeleteEventModal(false);
            }}
            handleOnPressDeleteConfirmationSingleEvent={async () => {
              const updatedEvents = await eventsList.filter(
                (event: any) => event.id !== selectedEvent.id
              );
              setEventList(updatedEvents);
              setDeleteEventModal(false);
              setShowExistingEventModal(false);
            }}
            delete_event_modal={deleteEventModal}
            delete_event_modal_recurring={recurrenceDeleteModal}
            set_delete_event_modal_recurring={setRecurrenceDeleteModal}
            end_time={endDate}
            start_time={startDate}
            current_event={selectedEvent}
            setEventListUseStateSetter={setEventList}
            visibillity_state={showExistingEventModal}
            onRequestClose={() => setShowExistingEventModal(false)}
            isEditable={isModalEditable}
            onRequestEdit={() => setIsModalEditable(true)}
            handleOnChangeTitle={(newUserInputTitle: any) => {
              if (isModalEditable) {
                console.log(`Detected changes to user input : ${newUserInputTitle}`);
                setSelectedEvent((prev: CalendarEvent) => ({
                  ...prev,
                  title: newUserInputTitle,
                }));
              }
            }}
            handleOnChangeDescription={(newUserInputDescription: any) => {
              if (isModalEditable) {
                setSelectedEvent((prevData: CalendarEvent) => ({
                  ...prevData,
                  description: newUserInputDescription,
                }));
              }
            }}
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
            handleOnPressRecurring={() =>
              setSelectedEvent((previousData: CalendarEvent) => ({
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
            // slight variation based on whether event is recurring or not
            // due to the need for the modals that needs to be displayed being different from one another
            onRequestDelete={async () => {
              // need to conditionally handle which modal to set true
              if (await selectedEvent.isRecurring) {
                setRecurrenceDeleteModal(true);
              } else {
                setDeleteEventModal(true);
              }
            }}
            handleCloseRecurringDeleteModal={() => setRecurrenceDeleteModal(false)}
            listOfEvents={eventsList}
            setListOfEventsSecondChild={setEventList}
            // props for radio button selection
            currentSelectedRadioButton={currentRadioButton}
            radioButtonChangeHandler={handleRadioButtonOnChange}
            // radioButtonSelectorhandler={radioButtonSelectorUpdate as any}
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
                  marginBottom: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 15,
                    textAlign: 'center',
                    color: '#333',
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
