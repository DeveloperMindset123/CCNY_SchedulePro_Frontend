/* eslint-disable @typescript-eslint/no-unused-vars */
// requires 2 seperate imports
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { CalendarEvent } from '@/app/(root)/(tabs)/(index)/Schedule';
import VisibleDateProvider from '@howljs/calendar-kit/lib/typescript/context/VisibleDateProvider';

// interface for deleting single event
interface DeleteSingleEventInterface {
  visibillity: boolean;
  onPressDeleteConfirmation: any;
  onPressDeleteCancellation: any;
  buttonStyling: any;
}
// basic delete modal to handle deletion of single events (that isn't recurring)
const DeleteSingleEvent = ({
  visibillity,
  onPressDeleteConfirmation,
  onPressDeleteCancellation,
  buttonStyling,
}: DeleteSingleEventInterface) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visibillity}>
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
            Are Your Sure you want to delete this Event?
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={[
                buttonStyling.button,
                buttonStyling.buttonSave,
                {
                  marginRight: 10,
                },
              ]}
              onPress={onPressDeleteConfirmation}
            >
              <Text style={buttonStyling.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyling.button, buttonStyling.buttonCancel]}
              onPress={onPressDeleteCancellation}
            >
              <Text style={buttonStyling.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteSingleEvent;

interface DeleteRecurringEventsType {
  visible: boolean;
  setModalVisibillity: any;
  setEventsLists: any;
  onPressDeleteConfirmation?: any;
  onPressDeleteCancellation?: any;
  buttonStyling: any;
  recurrenceEventStyles: any;
  list_of_events: CalendarEvent[] | any[];
  handleOnRequestModalClose: any;
  selectedEvent: CalendarEvent;
  handleRadioButtonOnChange: any;

  // TODO : prop drilling within ExistingEventModal needed
  handleRecurringEventDeletionCallback: any | undefined;
  currentRadioButton: string;
  setEventsList: any;
}

// TODO : implement this
export const DeleteRecurringEvents = ({
  visible,
  setModalVisibillity,
  setEventsLists,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPressDeleteConfirmation,
  onPressDeleteCancellation,
  buttonStyling,
  recurrenceEventStyles,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  list_of_events,
  handleOnRequestModalClose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedEvent,
  handleRadioButtonOnChange,
  currentRadioButton,
  handleRecurringEventDeletionCallback,
  setEventsList,
}: DeleteRecurringEventsType) => {
  const deleteAllEvents = () => {
    // TODO : the logic for this isn't entirely correct, needs to be fixed
    if (selectedEvent.id.includes('recurring')) {
      const parentEventID = selectedEvent.parentEventId;
      return list_of_events.filter((currentEvent) => !currentEvent.id.includes(parentEventID));
    }

    return list_of_events.filter((currentEvent) => !currentEvent.id.includes(selectedEvent.id));
  };

  const deleteCurrentEvent = async () => {
    return await list_of_events.filter((event) => event.id !== selectedEvent.id);
  };

  const deleteSubsequentEvents = async () => {
    console.log(`Selected Event : ${JSON.stringify(selectedEvent)}`);
    if (selectedEvent.id.includes('recurring')) {
      const event_id_array = selectedEvent.id.split('_');
      const recurrence_unit = parseInt(event_id_array[event_id_array.length - 1]);
      const filtered_events = list_of_events.filter(
        (currentEvent) =>
          !(
            currentEvent.id.includes(selectedEvent.parentEventId) &&
            parseInt(currentEvent.id.split('_')[currentEvent.id.split('_').length - 1]) >
              recurrence_unit
          )
      );
      console.log(`Data from filtered events : ${JSON.stringify(filtered_events)}`);
      return filtered_events;
    } else {
      return await deleteAllEvents();
    }
  };

  const handleRecurringEventDeletionInternal = async () => {
    let updated_event_list: any = [];
    try {
      switch (currentRadioButton) {
        case 'all-event':
          updated_event_list = await deleteAllEvents();
          console.log('all-event case function has been trieggered!');
          break;

        case 'subsequent':
          updated_event_list = await deleteSubsequentEvents();
          console.log('subsequent case function has been trieggered!');
          break;

        case 'current':
          updated_event_list = await deleteCurrentEvent();
          console.log('current case function has been trieggered!');
          break;
        default:
          break;
      }

      console.info(`Updated list of events : ${updated_event_list}`);
      setEventsList(updated_event_list);
      setModalVisibillity(!visible);
    } catch (error) {
      console.error('Error : ', error);
      return error;
    }
    return updated_event_list;
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleOnRequestModalClose}
    >
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
            width: '65%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
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
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Delete This Recurring Events?
          </Text>
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <RadioButtonGroup
              style={{
                width: 'auto',
                borderRadius: 5,
                // backgroundColor: '#0F9D58',
                alignItems: 'center',
                padding: 5,
                marginBottom: 6,
              }}
              containerStyle={{ marginBottom: 10 }}
              selected={currentRadioButton}
              onSelected={handleRadioButtonOnChange}
              containerOptionStyle={{ margin: 5 }}
              radioBackground="#3498db"
            >
              <RadioButtonItem value="all-event" label="All Events" />
              <RadioButtonItem
                value="subsequent"
                // onSelected={() => {
                //   setRadioButtonSelected(true);
                // }}
                // onSelected={handleOnSelectedRadioButtons}
                label={<Text style={{ color: 'black' }}>This and the following events</Text>}
              />
              <RadioButtonItem
                value="current"
                // onSelected={() => {
                //   setRadioButtonSelected(true);
                // }}
                // onSelected={handleOnSelectedRadioButtons}
                label={<Text style={{ color: 'black' }}>This Event Only</Text>}
              />
            </RadioButtonGroup>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={[
                  recurrenceEventStyles.modifiedButtonStyling,
                  buttonStyling.buttonCancel,
                  {
                    marginRight: 10,
                  },
                ]}
                onPress={onPressDeleteCancellation}
              >
                <Text style={recurrenceEventStyles.textStyles}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  recurrenceEventStyles.modifiedButtonStyling,
                  buttonStyling.buttonSave,
                  {
                    marginRight: 10,
                  },
                ]}
                // onPress={() => {
                //   // const mutated_event = handleRecurringEventDeletionInternal();
                //   // console.log('Retrieved mutated event is : ', JSON.stringify(mutated_event));
                //   // setEventsList(mutated_event);
                //   // console.log(`Toggling modal visibillity within child component.`);
                //   // setModalVisibillity(!visible);

                // }}
                onPress={handleRecurringEventDeletionInternal}
              >
                <Text style={recurrenceEventStyles.textStyles}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// NOTE : sample typescript code placed here for reference, this should be transferred over to Schedule.tsx:

const sample_id_original = 'event_1744902168035_736';
const sample_id_recurring = 'event_1744902168035_736_recurring_1';

// test to check resulting output converting string into array
const sample_id_original_array = sample_id_original.split('_');
const sample_id_original_recurring_array = sample_id_recurring.split('_');

// Output : ["event", "1744902168035", "736"]
// console.log(sample_id_original_array);

// Output : ["event", "1744902168035", "736", "recurring", "1"]
// console.log(sample_id_original_recurring_array);

// then we can simply check if the original ID contains the particular val
// console.log(sample_id_original.includes(sample_id_original_array[1] + "_" + sample_id_original_array[2]));  // output : true
// console.log(sample_id_recurring.includes(sample_id_original_array[1] + "_" + sample_id_original_array[2]));  // output : true
// console.log(`ID match? : ${sample_id_original === sample_id_original_array[0] + "_" + sample_id_original_array[1] + "_" + sample_id_original_array[2]}`);

const sample_data = [
  {
    // this object should not be deleted when deleteAllEvents is called (since this is a different original event)
    id: 'event_1744902168038_736',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-04-18T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-04-18T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
  },
  {
    id: 'event_1744902168035_736',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-04-18T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-04-18T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
  },
  {
    id: 'event_1744902168035_736_recurring_1',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-04-19T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-04-19T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_2',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-04-20T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-04-20T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_8',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-04-26T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-04-26T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_9',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-04-27T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-04-27T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_15',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-03T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-05-03T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_16',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-04T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-05-04T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_22',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-10T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-05-10T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_23',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-11T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-05-11T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_29',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-17T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-05-17T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_30',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-18T13:01:00.000Z',
    },
    end: {
      dateTime: '2025-05-18T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
  {
    id: 'event_1744902168035_736_recurring_36',
    title: 'Repeat During Wekeend',
    description: 'This Event Will Repeat Every Weekend',
    start: {
      dateTime: '2025-05-24T13:01:00.000Z',
    },

    end: {
      dateTime: '2025-05-24T15:01:00.000Z',
    },
    color: '#DB4437',
    location: 'Not Specified',
    isRecurring: true,
    recurrence_frequency: 'Every Weekend',
    isRecurringInstance: true,
    parentEventId: 'event_1744902168035_736',
  },
];
// we want to remove all indicators of recurring events
// NOTE : this is experimental as the intention is to build out additional data based on this

// another way of deleting this would be to first determine all id of the particular events that needs to be deleted (which will be stored as an array of strings)
// which will then be iterated over
// this function assumes that we only want the original event to be retained
const deleteRecurringEvents = (originalEventsData: any[]) => {
  // try removing the original event and retian all the recurring ones for now
  // suppose we only want the original id

  // this will ensure that the original event is retained and recurring events are deleted.
  const filtered_data = originalEventsData.filter(
    (currentEvent) => !currentEvent.id.includes(sample_id_original + '_recurring')
  );
  console.log(JSON.stringify(filtered_data));
};

// /**
//  * @originalEventsData : the array of objects containing information about the events themselves.
//  * @event : the event to be deleted, which will be passed in as a parameter
//  */
// const deleteSubsequentEvents = (listOfEvents: any[], event: any) => {
//   // check if current event happens to be the recurring event
//   // otherwise, it's an original event (in which case we can go ahead and delete all events)
//   if (event.id.includes("recurring")) {
//     const event_id_array = event.id.split("_");
//     const recurrence_unit = parseInt(event_id_array[event_id_array.length - 1]);
//     return listOfEvents.filter((currentEvent) => !(currentEvent.id.includes(event.parentEventId) && parseInt(currentEvent.id.split('_')[-1]) > recurrence_unit));
//   } else {
//     deleteAllEvents(listOfEvents, event);
//   }
// };

// this function should execute if user wants to delete all instances of the original event and subsequent recurring events
// first we need the parent id corresponding to the event
const deleteAllEvents = (originalEvent: any[], eventToDelete: any) => {
  // const parentEventID = eventToDelete.id;
  // NOTE the negation operator within the filter predicate
  return originalEvent.filter((currentEvent) => !currentEvent.id.includes(eventToDelete.id));
};

const subsequent_event_to_delete = {
  id: 'event_1744902168035_736_recurring_9',
  title: 'Repeat During Wekeend',
  description: 'This Event Will Repeat Every Weekend',
  start: {
    dateTime: '2025-04-27T13:01:00.000Z',
  },
  end: {
    dateTime: '2025-04-27T15:01:00.000Z',
  },
  color: '#DB4437',
  location: 'Not Specified',
  isRecurring: true,
  recurrence_frequency: 'Every Weekend',
  isRecurringInstance: true,
  parentEventId: 'event_1744902168035_736',
};

const sample_original_event = {
  id: 'event_1744902168035_736',
  title: 'Repeat During Wekeend',
  description: 'This Event Will Repeat Every Weekend',
  start: {
    dateTime: '2025-04-18T13:01:00.000Z',
  },
  end: {
    dateTime: '2025-04-18T15:01:00.000Z',
  },
  color: '#DB4437',
  location: 'Not Specified',
  isRecurring: true,
  recurrence_frequency: 'Every Weekend',
};
// deleteSubsequentEvents(sample_data, sample_original_event);
