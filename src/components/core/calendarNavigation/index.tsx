import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// component wrapper around Ionicons (refer to the definition of the component itself)
import { Ionicon } from '../icon';
const CalendarNavigation = ({ currentDate, onDateChange }) => {
  // Format the current date for display
  const FormatDisplayDate = (date) => {
    // @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // 3 void functions to decrement current month, increment current month, and navigate to current date
  // handle previous month navigation
  // all the final dates needs to be converted to ISOString() using the built in method from Date
  const goToPrevMonth = () => {
    // retrieves the current date that has been selected
    // backtrack by a single month
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    onDateChange(date.toISOString()); // update currentDate
  };

  const goToNextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    onDateChange(date.toISOString()); // update currentDate
  };

  const goToToday = () => {
    onDateChange(new Date().toISOString());
  };
  return (
    <View style={navigationStyles.container}>
      <View style={navigationStyles.dateControls}>
        <TouchableOpacity onPress={goToPrevMonth} style={navigationStyles.navButton}>
          <Ionicon name="chevron-back" size={18} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToToday} style={navigationStyles.todayButton}>
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextMonth} style={navigationStyles.navButton}>
          <Ionicon name="chevron-forward" size={18} color="#3498db" />
        </TouchableOpacity>
      </View>
      <Text style={navigationStyles.dateText}>{FormatDisplayDate(currentDate)}</Text>
    </View>
  );
};

// styles for navigation component
const navigationStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  navButton: {
    padding: 5,
  },
  todayButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#e6f2ff',
  },
  todayText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default CalendarNavigation;
