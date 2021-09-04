import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {getDate} from '../utility';
import Constants from '../utility/Constants';

/**
 * Created a custom hook to separate out the business logic
 * Custom hook to handle the data layer for Transition screen
 * @returns
 * @param {boolean} loading - to determine loading state
 * @param {boolean} modalVisible - to determine the sort model visible state
 * @param {string} sortBy - selected sorting option
 * @param {Array} displayData - filtered/sorted data to be rendered on screen
 * @param {function} searchKeyChangeHandler - callback function to handle search key change events
 * @param {function} setModalVisible - setter for update the modalVisible state
 * @param {function} setSortBy - setter for update the setSortBy state
 */
export const useTransactionData = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [sortBy, setSortBy] = useState(Constants.sortOptions.aToz.key);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  //Timer for search key change debouncing
  let searchKeyChangeTimerID;

  useEffect(() => {
    if (transactionsData.length > 0) {
      sortDataWith(transactionsData);
    }
  }, [transactionsData, sortDataWith]);

  useEffect(() => {
    if (displayData.length > 0) {
      sortDataWith(displayData);
    }
  }, [sortBy, sortDataWith, displayData]);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
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

  const sortDataWith = useCallback(
    transactions => {
      let sortedTransactions = [];

      switch (sortBy) {
        case Constants.sortOptions.aToz.key:
          sortedTransactions = transactions.sort((a, b) =>
            a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()
              ? 1
              : -1,
          );
          break;
        case Constants.sortOptions.zToa.key:
          sortedTransactions = transactions.sort((a, b) =>
            a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()
              ? 1
              : -1,
          );
          break;
        case Constants.sortOptions.dateNewest.key:
          sortedTransactions = transactions.sort((a, b) =>
            getDate(a.created_at) < getDate(b.created_at) ? 1 : -1,
          );
          break;
        case Constants.sortOptions.dateOldest.key:
          sortedTransactions = transactions.sort((a, b) =>
            getDate(a.created_at) > getDate(b.created_at) ? 1 : -1,
          );
          break;
        default:
          console.error('Invalid sort option!');
          break;
      }

      setDisplayData(sortedTransactions);
      setUpdateList(!updateList);
    },
    [sortBy, updateList],
  );

  const filterResults = text => {
    let searchedText = text.nativeEvent.text.trim().toLowerCase();

    let updatedData = transactionsData.filter(item => {
      return (
        item.beneficiary_name.toLowerCase().includes(searchedText) ||
        item.amount.toString().includes(searchedText) ||
        item.sender_bank.toLowerCase().includes(searchedText) ||
        item.beneficiary_bank.toLowerCase().includes(searchedText)
      );
    });
    setDisplayData(updatedData);
  };

  /**
   * Function to handle the key change events
   * To prevent the multiple calls using debouncing
   * @param {*} event - text change event
   */
  const searchKeyChangeHandler = event => {
    clearTimeout(searchKeyChangeTimerID);
    event.persist();
    searchKeyChangeTimerID = setTimeout(() => {
      filterResults(event);
    }, 300);
  };

  return {
    loading,
    modalVisible,
    sortBy,
    displayData,
    searchKeyChangeHandler,
    setModalVisible,
    setSortBy,
  };
};
