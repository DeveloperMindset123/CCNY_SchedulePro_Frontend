import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
// component wrapper around Ionicons (refer to the definition of the component itself)
import { Ionicon } from '../icon';
const CalendarNavigation = ({ currentDate, onDateChange }) => {
  // useState hook for DateTimePicker component enhancement
  // reused logic from start and end date time from Schedule component
  // determines whether datetimepicker component should be displayed or not
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date());

  // For IOS, conditionally render the datetimepicker
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [centerString, setCenterString] = useState('Today');

  // Function to handle date picker changes
  const handleDatePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePickerValue;
    setDatePickerValue(currentDate);
  };

  // functon to confirm date selection
  const confirmDateSelection = () => {
    onDateChange(datePickerValue.toISOString());
    setShowDatePickerModal(false);
    setCenterString('Jump To Today');
  };

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
    setCenterString('Jump To Today');
    onDateChange(date.toISOString()); // update currentDate
  };

  const goToNextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    setCenterString('Jump To Today');
    onDateChange(date.toISOString()); // update currentDate
  };

  const goToToday = () => {
    onDateChange(new Date().toISOString());
    setCenterString('Today');
  };

  // handle opening date picker
  const openDatePicker = () => {
    if (Platform.OS === 'ios') {
      setShowIOSDatePicker(true);
      setShowDatePickerModal(true);
    } else {
      // handle every other platform
      setShowDatePickerModal(true);
    }
  };
  useEffect(() => {
    console.log(
      `current date prop value : ${FormatDisplayDate(currentDate)}, \n actual current date (should be today's date) : ${new Date().toDateString()} `
    );
  }, [currentDate]);
  return (
    <>
      <View style={navigationStyles.container}>
        <View style={navigationStyles.dateControls}>
          <TouchableOpacity onPress={goToPrevMonth} style={navigationStyles.navButton}>
            <Ionicon name="chevron-back" size={18} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToToday} style={navigationStyles.todayButton}>
            <Text>{centerString}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextMonth} style={navigationStyles.navButton}>
            <Ionicon name="chevron-forward" size={18} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/*
         * fine-tune the navigation logic
         */}
        <TouchableOpacity
          onPress={() => setShowDatePickerModal(true)}
          style={navigationStyles.dateTextContainer}
        >
          <Text style={navigationStyles.dateText}>{FormatDisplayDate(currentDate)}</Text>
          <Ionicon
            name="calendar-outline"
            size={18}
            color="#3498db"
            style={navigationStyles.calendarIcon}
          />
        </TouchableOpacity>
      </View>

      {/** Date time picker modal to navigate within different portion of the calendar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePickerModal}
        onRequestClose={() => {
          setShowDatePickerModal(false);
          setShowIOSDatePicker(false);
        }}
      >
        {/**TouchableWithoutFeedback has the opposite behavior of TouchableOpacity and generally useful when something needs to be clicked but doesn't require any kind of animation present */}
        <TouchableWithoutFeedback
          onPress={() => {
            // not entirely sure why the state should be set to false here instead of true
            setShowDatePickerModal(false);
            setShowIOSDatePicker(false);
            // setShowDatePickerModal(true)
            // setShowIOSDatePicker(true)
          }}
        >
          <View style={dateTimePickerStyles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={dateTimePickerStyles.modalView}>
                <Text style={dateTimePickerStyles.title}>Select a Date</Text>
                {/**Conditionally render datetime pciker for IOS */}
                {(Platform.OS === 'android' || (Platform.OS === 'ios' && showIOSDatePicker)) && (
                  <DateTimePicker
                    testID="datePicker"
                    value={datePickerValue}
                    // platform specific? (see how it looks like and modify as needed)
                    mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={handleDatePickerChange}
                  />
                )}

                {/**on IOS, show an explicit button to render the datepicker */}
                {Platform.OS === 'ios' && !showIOSDatePicker && (
                  <TouchableOpacity
                    onPress={openDatePicker}
                    style={dateTimePickerStyles.showPickerButton}
                  >
                    <Text style={dateTimePickerStyles.showPickerText}>Show Date Picker</Text>
                  </TouchableOpacity>
                )}
                <View style={dateTimePickerStyles.buttonContainer}>
                  <TouchableOpacity
                    style={[dateTimePickerStyles.button, dateTimePickerStyles.buttonCancel]}
                    onPress={() => {
                      setShowDatePickerModal(false);
                      setShowIOSDatePicker(false);
                    }}
                  >
                    <Text style={dateTimePickerStyles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[dateTimePickerStyles.button, dateTimePickerStyles.buttonConfirm]}
                    onPress={confirmDateSelection}
                  >
                    <Text style={dateTimePickerStyles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
    borderRadius: 15,
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

  // the styling here really doesn't make much of a difference to the text
  // TODO : this styling might be unneccessary, so remove it
  dateTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: {
    marginLeft: 8,
  },
});

// define styles for the DateTimePicker modal for fine-tuned navigation
const dateTimePickerStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  // reused modal style code (refer to Schedule.tsx)
  modalView: {
    width: '80%', // adjust as needed
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonConfirm: {
    backgroundColor: '#3498db',
  },
  buttonCancel: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  showPickerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  showPickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CalendarNavigation;
