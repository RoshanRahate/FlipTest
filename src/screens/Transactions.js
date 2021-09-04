import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import SortModal from '../components/Modal';
import TransactionItem from '../components/TransactionItem';

import {useTransactionData} from '../hooks/useTransactionData';

const TransactionsScreen = ({navigation}) => {
  const {
    loading,
    modalVisible,
    sortBy,
    displayData,
    searchKeyChangeHandler,
    setModalVisible,
    setSortBy,
  } = useTransactionData();

  const onRowPressedHandler = row => {
    navigation.push('TransactionDetails', row);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onChange={searchKeyChangeHandler}
        onArrowClick={() => setModalVisible(prevState => !prevState)}
        sortByType={sortBy}
      />
      <View style={styles.loaderView}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6047" />
        ) : (
          <FlatList
            keyboardDismissMode="on-drag"
            data={displayData}
            renderItem={item => (
              <TransactionItem
                transaction={item}
                onRowPressed={onRowPressedHandler}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No results found.</Text>
            }
            keyExtractor={item => item.unique_code}
          />
        )}
      </View>
      <SortModal
        visible={modalVisible}
        selected={sortBy}
        setSortType={value => {
          setSortBy(value);
          setModalVisible(prevState => !prevState);
        }}
      />
    </SafeAreaView>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'grey',
    padding: 20,
  },
});
