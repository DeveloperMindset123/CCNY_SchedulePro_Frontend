// requires 2 seperate imports
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
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

// TODO : implement this
export const DeleteRecurringEvents = ({
  visibile,
  onPressDeleteConfirmation,
  onPressDeleteCancellation,
  buttonStyling,
  recurrenceEventStyles,
}) => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <Modal animationType="slide" transparent={true} visible={visibile}>
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
            // height: '80%',
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
              // ma,
            }}
          >
            {/* <TouchableOpacity
              // style={[
              //   buttonStyling.button,
              //   buttonStyling.buttonSave,
              //   {
              //     marginRight: 10,
              //   },
              // ]}
              // style={recurrenceEventStyles.eventsOptionStyle}
              // style={{
              //   padding: 0,
              //   borderRadius: 5,
              //   width: '100%',
              //   marginBottom: 20,
              //   alignItems: 'center',
              // }}
              style={recurrenceEventStyles.textStyles}
              // onPress={onPressDeleteConfirmation}
            >
              <Text style={buttonStyling.buttonText}>All Events</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              // style={[
              //   buttonStyling.button,
              //   buttonStyling.buttonSave,
              //   {
              //     marginRight: 10,
              //   },
              // ]}
              // onPress={onPressDeleteConfirmation}
              style={{
                width: 'auto',
                borderRadius: 5,
                backgroundColor: '#3498db',
                alignItems: 'center',
                padding: 5,
                marginBottom: 6,
              }}
              onPress={(textInput) => {
                console.log('selected all events : ', textInput);
              }}
            >
              <Text style={recurrenceEventStyles.textStyles}>All Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // style={[buttonStyling.button, buttonStyling.buttonCancel]}
              // onPress={onPressDeleteCancellation}
              style={{
                width: 'auto',
                borderRadius: 5,
                backgroundColor: '#0F9D58',
                alignItems: 'center',
                padding: 5,
                marginBottom: 6,
              }}
              onPress={(textInput) => {
                console.log('selected subsequent events: ', textInput);
              }}
            >
              <Text style={recurrenceEventStyles.textStyles}>Subsequent Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // style={[buttonStyling.button, buttonStyling.buttonCancel]}
              // onPress={onPressDeleteCancellation}
              style={{
                width: 'auto',
                borderRadius: 5,
                backgroundColor: '#e74c3c',
                alignItems: 'center',
                padding: 5,
                marginBottom: 6,
              }}
              onPress={(textInput) => {
                console.log('selected this event only : ', textInput);
              }}
            >
              <Text style={recurrenceEventStyles.textStyles}>This Event Only</Text>
            </TouchableOpacity>
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

/**
 * @originalEventsData : the array of objects containing information about the events themselves.
 * @event : the event to be deleted, which will be passed in as a parameter
 */
const deleteSubsequentEvents = (originalEventsData: any[], event: any) => {
  const event_id = event.id;
  console.log('Provided Event ID : ', event_id);

  const event_id_array = event_id.split('_');
  console.log('Constructed array of event id : ', event_id_array);

  // construct the ID of the original event, since we also need to check if the event matches
  // the 2nd and 3rd values wtihin the array will contain this information
  const original_event_id = event_id_array[0] + '_' + event_id_array[1] + '_' + event_id_array[2];

  // alternatively, the original event id can also be retrieved in the following method
  if (event.id.includes('recurring')) {
    const original_event_id = event.parentEventId;
    console.log('retrieved parent event id : ', original_event_id);
  }
  console.log(`Retrieved original event id : ${original_event_id}`);

  // we want to check if the current event happens to be recurring
  if (event_id.includes('recurring')) {
    // NOTE : indexing by -1 doesn't seem to work in typescript arrays
    // const currentRecurrenceUnit = event_id_array[-1];   // contains information about the particular recurrence number of the event

    // alternative
    const currentRecurrenceUnit = parseInt(event_id_array[event_id_array.length - 1]);
    console.log(`Current Requccurence Unit : ${currentRecurrenceUnit}`);

    // filter logic
    // not entirely sure if this logic will work
    // const filtered_events = originalEventsData.filter((currentEvent) => !(currentEvent.id.includes(original_event_id) && parseInt(currentEvent.id.split('_')[-1]) > currentRecurrenceUnit));

    // first remove the subsequent events (feel free to mess around with it)
    // NOTE : it should be "greater than", not "greater than or equal to"
    const filtered_events = originalEventsData.filter(
      (currentEvent) =>
        !(
          parseInt(currentEvent.id.split('_')[currentEvent.id.split('_').length - 1]) >
          currentRecurrenceUnit
        )
    );

    // experimental check to remove the original event
    // const filtered_events_2 = filtered_events.filter((currentEvent) => currentEvent.id !== original_event_id);
    console.log(filtered_events);
  } else {
    // assuming user chose the original event (which is the same as deleting all instances of the event)

    // otherwise, we simply delete all the events
    console.log(deleteAllEvents(originalEventsData, event));
  }
};

// this function should execute if user wants to delete all instances of the original event and subsequent recurring events
// first we need the parent id corresponding to the event
const deleteAllEvents = (originalEvent: any[], eventToDelete: any) => {
  // const parentEventID = eventToDelete.id;
  // NOTE the negation operator within the filter predicate
  return originalEvent.filter((currentEvent) => !currentEvent.id.includes(eventToDelete.id));
};
// deleteRecurringEvents(sample_data);

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
deleteSubsequentEvents(sample_data, sample_original_event);
