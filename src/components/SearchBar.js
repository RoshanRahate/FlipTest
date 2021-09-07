/**
 * Search Component with Search bar and Sort by type.
 * Actions performed are passed to the parent compoents with props
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Constants from '../utility/constants';

const SearchBar = ({onChange, sortByType, onArrowClick}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Icon color={'#ccc'} size={30} name={'search'} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          onChange={onChange}
        />
      </View>
      <View style={[styles.sortTypeView]}>
        <Text style={styles.sortTypeLabel} numberOfLines={2}>
          {Constants.sortOptions[sortByType].title}
        </Text>
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
            onArrowClick(true);
          }}>
          <Icon name="chevron-down" size={35} color={'#FF6047'} />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
    width: '96%',
  },
  leftView: {
    flexDirection: 'row',
    width: '58%',
    alignItems: 'center',
  },
  sortTypeLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    maxWidth: 120,
    color: '#FF6047',
    paddingHorizontal: 4,
  },
  sortTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'flex-end',
  },
  textInput: {
    color: 'grey',
    fontSize: 17,
    padding: 8,
  },
});
