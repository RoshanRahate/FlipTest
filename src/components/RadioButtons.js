/**
 * Custom Radio button component
 */

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const RadioButtons = ({options, selectedOption, onSelect}) => (
  <View style={styles.container}>
    {Object.keys(options).map(sortKey => {
      return (
        <View key={sortKey} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => {
              onSelect(sortKey);
            }}>
            {selectedOption && selectedOption === sortKey && (
              <View style={styles.checkedCircle} />
            )}
          </TouchableOpacity>
          <Text style={styles.textLabel}>{options[sortKey].title}</Text>
        </View>
      );
    })}
  </View>
);

export default RadioButtons;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    padding: 8,
  },

  circle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FF6047',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6047',
  },
  textLabel: {
    fontSize: 18,
    paddingHorizontal: 12,
    fontWeight: '500',
  },
});
