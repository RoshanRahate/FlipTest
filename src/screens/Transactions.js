import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import SortModal from '../components/Modal';
import TransactionItem from '../components/transactionItem';

import {getDate} from '../utility';
import Constants from '../utility/constants';

const TransactionsScreen = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(Constants.sortOptions[0].text);
  const [sortBy, setSortBy] = useState(Constants.sortOptions[0].text);
  let timer;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch(Constants.API_URL);
        const json = await response.json();
        let result = Object.keys(json).map(key => json[key]);
        console.log('result--', result);
        setData(result);
        sortDataWith(sortBy, result);
        setLoading(false);
        // setDisplayData(result)
      } catch (error) {
        // console.error(error);
        setLoading(false);
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  const filterResults = text => {
    let searchedtext = text.nativeEvent.text.trim().toLowerCase();

    let updatedData = data.filter(item => {
      return (
        item.beneficiary_name.toLowerCase().includes(searchedtext) ||
        item.amount.toString().includes(searchedtext) ||
        item.sender_bank.toLowerCase().includes(searchedtext) ||
        item.beneficiary_bank.toLowerCase().includes(searchedtext)
      );
    });
    sortDataWith(sortBy, updatedData);
  };

  const sortDataWith = (type, array) => {
    let sortedArr = [];
    switch (type) {
      case 'Name A-Z':
        sortedArr = array.sort((a, b) =>
          a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()
            ? 1
            : -1,
        );
        break;
      case 'Name Z-A':
        sortedArr = array.sort((a, b) =>
          a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()
            ? 1
            : -1,
        );
        break;
      case 'Date Newest':
        sortedArr = array.sort((a, b) =>
          getDate(a.created_at) < getDate(b.created_at) ? 1 : -1,
        );
        break;
      case 'Date Oldest':
        sortedArr = array.sort((a, b) =>
          getDate(a.created_at) > getDate(b.created_at) ? 1 : -1,
        );
        break;
      default:
        break;
    }
    setDisplayData(sortedArr);
  };

  const onRowPressed = row => {
    props.navigation.push('TransactionDetails', row);
  };

  const onKeyChange = (event, delay) => {
    clearTimeout(timer);
    event.persist();
    timer = setTimeout(() => {
      filterResults(event);
    }, delay);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onChange={event => onKeyChange(event, 300)}
        onArrowClick={action => setModalVisible(action)}
        sortByType={sortBy}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6047" />
        ) : (
          <FlatList
            data={displayData}
            renderItem={item => (
              <TransactionItem
                transaction={item}
                onRowPressed={row => onRowPressed(row)}
              />
            )}
            keyExtractor={item => item.unique_code}
          />
        )}
      </View>
      <SortModal
        visible={modalVisible}
        checked={checked}
        setChecked={value => {
          setChecked(value);
          setSortBy(value);
          setModalVisible(!modalVisible);
          sortDataWith(value, displayData);
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
});
