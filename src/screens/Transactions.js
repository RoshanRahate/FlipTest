import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import SortModal from '../components/Modal';
import TransactionItem from '../components/TransactionItem';

import {getDate} from '../utility';
import Constants from '../utility/constants';

const TransactionsScreen = props => {
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(Constants.sortOptions[0]);
  const [updateList, setUpdateList] = useState(false);

  let searchKeyChangeTimerID;

  useEffect(() => {
    if (transactionsData.length > 0) {
      sortDataWith(transactionsData);
    }
  }, [transactionsData]);

  useEffect(() => {
    if (displayData.length > 0) {
      sortDataWith(displayData);
    }
  }, [sortBy]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const transactions = await fetch(Constants.API_URL);
        const rawTransactions = await transactions.json();
        let formattedTransactions = Object.keys(rawTransactions).map(
          key => rawTransactions[key],
        );
        setTransactionsData(formattedTransactions);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert(error);
      }
    };

    getTransactions();
  }, []);

  const filterResults = text => {
    let searchedtext = text.nativeEvent.text.trim().toLowerCase();

    let updatedData = transactionsData.filter(item => {
      return (
        item.beneficiary_name.toLowerCase().includes(searchedtext) ||
        item.amount.toString().includes(searchedtext) ||
        item.sender_bank.toLowerCase().includes(searchedtext) ||
        item.beneficiary_bank.toLowerCase().includes(searchedtext)
      );
    });
    sortDataWith(updatedData);
  };

  const sortDataWith = transactions => {
    let sortedTransactions = [];
    switch (sortBy.key) {
      case 'aToz':
        sortedTransactions = transactions.sort((a, b) =>
          a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()
            ? 1
            : -1,
        );
        break;
      case 'zToa':
        sortedTransactions = transactions.sort((a, b) =>
          a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()
            ? 1
            : -1,
        );
        break;
      case 'dateNewest':
        sortedTransactions = transactions.sort((a, b) =>
          getDate(a.created_at) < getDate(b.created_at) ? 1 : -1,
        );
        break;
      case 'dateOldest':
        sortedTransactions = transactions.sort((a, b) =>
          getDate(a.created_at) > getDate(b.created_at) ? 1 : -1,
        );
        break;
      default:
        break;
    }
    
    setDisplayData(sortedTransactions);
    setUpdateList(!updateList);
  };

  const onRowPressed = row => {
    props.navigation.push('TransactionDetails', row);
  };

  const onKeyChange = event => {
    clearTimeout(searchKeyChangeTimerID);
    event.persist();
    searchKeyChangeTimerID = setTimeout(() => {
      filterResults(event);
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onChange={onKeyChange}
        onArrowClick={() => setModalVisible(!modalVisible)}
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
                onRowPressed={row => onRowPressed(row)}
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
          setModalVisible(!modalVisible);

          // sortDataWith(displayData);
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
