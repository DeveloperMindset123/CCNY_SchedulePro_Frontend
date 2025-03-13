// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Text } from 'react-native';
// import { Agenda } from 'react-native-calendars';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  PackedEvent,
  DraggingEvent,
  DraggingEventProps,
} from '@howljs/calendar-kit';
import { Ionicons } from '@expo/vector-icons';

// component to intialize calendar
export default function Schedule() {
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

  const handleDragCreateStart = (start: any) => {
    console.log('Started creating event at:', start);
  };

  const handleDragCreateEnd = (event: any) => {
    console.log('New event:', event);
  };

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
      // events={[
      //   {
      //     id: '1',
      //     title: 'Sample Event 1',
      //     start: { dateTime: '2025-03-9T10:00:00Z' },
      //     end: { dateTime: '2025-03-9T11:00:00Z' },
      //     color: '#4285F4',
      //   },
      //   {
      //     id: '2',
      //     title: 'Sample Event 2',
      //     start: { dateTime: '2025-03-13T9:00:00Z' },
      //     end: { dateTime: '2025-03-13T11:00:00Z' },
      //     color: 'red',
      //   },
      // ]}

      // events={[
      //   {
      //     id: '1',
      //     title: 'Meeting with Team',

      //     // the timing convention follows ISO format
      //     start: { dateTime: '2025-03-13T10:00:00Z' },
      //     end: { dateTime: '2025-03-13T11:00:00Z' },
      //     color: 'cyan',
      //   },
      // ]}

      events={[
        {
          id: '1',
          title: 'Meeting with Team',
          start: { dateTime: '2025-03-15T10:00:00Z' },
          end: { dateTime: '2025-03-15T11:00:00Z' },
          color: '#4285F4',
        },
      ]}
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
