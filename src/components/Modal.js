import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import RadioButtons from './RadioButtons';
import constants from '../utility/constants';

const SortModal = ({visible, setModalVisible, setSortType, selected}) => {
  const onSelect = item => {
    if (selected && selected !== item) {
      setSortType(item);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      shadowOpacity={0.25}
      visible={visible}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <View style={styles.modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RadioButtons
              selectedOption={selected}
              onSelect={onSelect}
              options={constants.sortOptions}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 30,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
    width: '80%',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
