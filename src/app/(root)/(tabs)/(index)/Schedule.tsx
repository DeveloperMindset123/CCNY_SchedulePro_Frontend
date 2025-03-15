// TODO : implement a small button on the right hand side of the screen
// upon clicking on the button, a modal should pop-up that will allow users to modify and change as needed as part of their event creation.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Text } from 'react-native';
// import { Agenda } from 'react-native-calendars';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PackedEvent,
  DraggingEvent,
  DraggingEventProps,
} from '@howljs/calendar-kit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
// component to intialize calendar
export default function Schedule() {
  // TODO : determine appropriate useState hooks to store data regarding events for a particular user
  const { email } = useLocalSearchParams();
  // console.log(email);

  // set the current start and end event as an object
  // this hook will store the immediate event changes
  const [currentEvent, setCurrentEvent] = useState({
    start: '',
    end: '',
  });

  // this hook will store all the events related data that has been created by the particular user wtihin the screen so far.
  const [eventsData, setEventsData] = useState([{}]);
  const [eventCreationComplete, setEventCreationComplete] = useState(false);

  // const addNewEvents = (current_event: any) => {

  // }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const events_data = [
    {
      id: '1',
      title: 'Meeting with Team',
      start: { dateTime: '2025-03-8T10:00:00Z' },
      end: { dateTime: '2025-03-8T11:00:00Z' },
      color: '#4285F4',
    },
  ];

  // const [setEvent, ]

  // experiment with current time and an hour later
  // dynamic implementation
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  const eventStartTime = now.toISOString();
  const eventEndTime = oneHourLater.toISOString();

  const handleDragCreateStart = (start_time: any) => {
    // method to update the current start time
    // utilizing spread opeartor logic
    setCurrentEvent((prevState) => ({
      ...prevState,
      start: start_time,
    }));

    setEventCreationComplete(false);
    // console.log('Started creating event at:', start_time);
  };

  const handleDragCreateEnd = (end_time: any) => {
    setCurrentEvent((prevState) => ({
      ...prevState,
      end: end_time,
    }));

    setEventCreationComplete(true);
    // console.log('New event:', end_time);
  };

  // this could potentially be causing excessive component re-rendering
  // if (eventCreationComplete === true) {
  //   // replace the state
  //   // with a brand new array
  //   setEventsData([...eventsData, currentEvent]);
  // }

  useEffect(() => {
    if (eventCreationComplete === true) {
      setEventsData([...eventsData, currentEvent]);

      // TODO : remove after
      console.log(eventsData);
      setEventCreationComplete(false);
    }
  }, [eventCreationComplete, eventsData, currentEvent]);

  // TODO : remove later, mainly to check if changes to the currentEvent is being detected or not
  useEffect(() => {
    console.log('changes detected for current event : ', currentEvent);
  }, [currentEvent]);

  // TODO : remove this useEffect hook as well
  // this is also to experiment to see if the list of events are being updated or not
  useEffect(() => {
    console.log('current events data : ', JSON.stringify(eventsData));
  }, [eventsData]);

  // console.log(currentEvent);

  // old event rendering logic
  // const renderCalendarEvent = useCallback(
  //   (event: PackedEvent) => (
  //     <View
  //       // define the styling for the view
  //       style={{
  //         width: '100%',
  //         height: '100%',
  //         padding: 4,
  //       }}
  //     >
  //       <Ionicons name="calendar" size={10} color="white" />
  //       <Text style={{ color: 'white', fontSize: 10 }}>{event.title}</Text>
  //     </View>
  //   ),
  //   []
  // );

  const renderDraggingEvent = useCallback((props: DraggingEventProps) => {
    return (
      <DraggingEvent
        {...props}
        TopEdgeComponent={
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: 'red',
              position: 'absolute',
            }}
          />
        }
        BottomEdgeComponent={
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: 'red',
              bottom: 0,
              position: 'absolute',
            }}
          />
        }
      />
    );
  }, []);
  return (
    // TODO : modify prop to allow for draggable event and dynamic event creation logic.

    <CalendarContainer
      numberOfDays={3}
      scrollByDay={true} // When false, it will scroll by the number of days set in numberOfDays (allows users to scroll by intervals of 1)
      // scrollToNow={true} // for user experience, the day they are on should be the current day
      // minDate="1900-01-01"
      // maxDate="2600-01-01"
      // prop that handles adding events
      allowDragToCreate={true}
      dragStep={15}
      onDragCreateEventStart={handleDragCreateStart}
      onDragCreateEventEnd={handleDragCreateEnd}
      minDate="2025-01-01"
      maxDate="2025-12-31"
      initialDate="2025-03-13"
      // working event zone (from example with minor modification)
      // events={[
      //   {
      //     id: '1',
      //     title: 'Meeting with Team',
      //     start: { dateTime: '2025-03-15T10:00:00Z' },
      //     end: { dateTime: '2025-03-15T11:00:00Z' },
      //     color: '#4285F4',
      //   },
      // ]}

      // experimental event implementation

      events={[
        {
          id: '1',
          title: 'Sample Event',
          start: { dateTime: eventStartTime },
          end: { dateTime: eventEndTime },
          color: 'red',
        },
      ]}
      // experimental to check if event being pressed works
      onPressEvent={(event) => {
        // print out information about a particular event
        console.log('Event pressed', event);
      }}
    >
      <CalendarHeader />

      {/**Determine how events ought to be rendered */}
      <CalendarBody renderDraggingEvent={renderDraggingEvent} />
    </CalendarContainer>
  );
}

// export default function Schedule() {
//   /* start of old default code
//   // const [items, setItems] = useState({});

//   // const today = new Date().toISOString().split('T')[0];

//   // const tuesdayThursdayClasses = [
//   //   { name: 'Programming Language Paradigms', time: '3:30 PM - 4:45 PM' },
//   //   { name: 'Software Engineering', time: '2:00 PM - 3:15 PM' },
//   //   { name: 'Senior Project II', time: '9:30 AM - 10:45 AM' },
//   //   { name: 'Numerical Issues in Scientific Programming', time: '11:00 AM - 12:15 PM' }
//   // ];

//   // const loadItems = (day) => {
//   //   const newItems = { ...items };

//   //   setTimeout(() => {
//   //     for (let i = -15; i < 85; i++) {
//   //       const date = new Date(day.timestamp + i * 24 * 60 * 60 * 1000);
//   //       const strDate = date.toISOString().split('T')[0];
//   //       const dayOfWeek = date.getDay();

//   //       if (dayOfWeek === 2 || dayOfWeek === 4) {
//   //         newItems[strDate] = tuesdayThursdayClasses;
//   //       } else {
//   //         newItems[strDate] = [{ name: 'No classes', time: '' }];
//   //       }
//   //     }
//   //     setItems(newItems);
//   //   }, 1000);
//   // };

//   // const renderItem = (item) => {
//   //   return (
//   //     <View
//   //       style={{
//   //         backgroundColor: '#fff',
//   //         borderRadius: 10,
//   //         padding: 20,
//   //         marginBottom: 10,
//   //         marginHorizontal: 10,
//   //         shadowColor: '#000',
//   //         shadowOpacity: 0.1,
//   //         shadowOffset: { width: 0, height: 2 },
//   //         elevation: 3,
//   //       }}
//   //     >
//   //       <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
//   //       {item.time ? (
//   //         <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>{item.time}</Text>
//   //       ) : null}
//   //     </View>
//   //   );
//   // };

//   // return (
//   //   <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
//   //     <Agenda
//   //       items={items}
//   //       loadItemsForMonth={loadItems}
//   //       selected={today}
//   //       renderItem={renderItem}
//   //       renderEmptyDate={() => (
//   //         <View style={{ height: 50, flex: 1, paddingTop: 20, paddingLeft: 10 }}>
//   //           <Text>No classes today.</Text>
//   //         </View>
//   //       )}
//   //       theme={{
//   //         selectedDayBackgroundColor: '#00adf5',
//   //         todayTextColor: '#00adf5',
//   //         arrowColor: '#00adf5',
//   //       }}
//   //     />
//   //   </View>
//   // );
//   * end of old default code.
//   */

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#f2f2f2',
//       }}
//     >
//       <Calendar />
//     </View>
//   );
// }
