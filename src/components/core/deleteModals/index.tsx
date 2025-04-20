// requires 2 seperate imports
import { Modal, View, Text, TouchableOpacity } from 'react-native';

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
            Delete Recurring Events?
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
export const DeleteRecurringEvents = ({ visibile }) => {};
