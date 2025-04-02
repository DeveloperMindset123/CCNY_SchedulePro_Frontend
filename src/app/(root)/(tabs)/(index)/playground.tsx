// reference for how to create seperate modals and pass down props for the modal component.
const NewEventModal = ({
  visible,
  onClose,
  onSave,
  currentData,
  setCurrentData,
  ...otherProps
}) => {
  return <Modal visible={visible}>{/* Your modal content */}</Modal>;
};

const ExistingEventModal = ({ visible, onClose, selectedEvent, onEdit, onDelete }) => {
  return <Modal visible={visible}>{/* Your modal content */}</Modal>;
};

// In your main component
export default function Schedule() {
  // State and functions

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* Calendar component */}

      <NewEventModal
        visible={newEventModal}
        onClose={() => setNewEventModal(false)}
        onSave={handleCreateSaveNewEvent}
        currentData={currentEventData}
        setCurrentData={setCurrentEventData}
        // ...other necessary props
      />

      <ExistingEventModal
        visible={existingEventModal}
        onClose={() => setExistingEventModal(false)}
        selectedEvent={selectedEvent}
        onEdit={handleEditExistingEvent}
        onDelete={handleDeleteEvent}
      />
    </View>
  );
}
