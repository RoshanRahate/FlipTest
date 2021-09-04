import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {getFormatedDate, currencyFormatter, toTitleCase} from '../utility';

const TransactionItem = props => {
  const {
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    amount,
    created_at,
    status,
  } = props.transaction.item;

  return (
    <TouchableOpacity
      onPress={() => props.onRowPressed(props.transaction.item)}>
      <View style={styles.container}>
        <View
          style={[
            styles.leftSeprator,
            containerStyles(
              props.transaction.item.status.toLowerCase() === 'success',
            ).background,
          ]}
        />
        <View style={styles.leftView}>
          <View style={styles.bankView}>
            <Text style={styles.bankText}>{toTitleCase(sender_bank)}</Text>
            <Icon name="arrow-right" size={22} style={styles.arrowIcon} />
            <Text style={styles.bankText}>{toTitleCase(beneficiary_bank)}</Text>
          </View>
          <Text style={styles.benificeryName}>
            {beneficiary_name.toUpperCase()}
          </Text>
          <View style={styles.amountView}>
            <Text style={styles.amount}>{`Rp${currencyFormatter(
              amount,
            )}`}</Text>
            <View style={styles.dateView} />
            <Text style={styles.amount}>{getFormatedDate(created_at)}</Text>
          </View>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity
            mode={
              props.transaction.item.status.toLowerCase() === 'success'
                ? 'contained'
                : 'outlined'
            }
            style={
              buttonStyles(
                props.transaction.item.status.toLowerCase() === 'success',
              ).buttonColor
            }>
            <Text
              style={
                buttonText(
                  props.transaction.item.status.toLowerCase() === 'success',
                ).buttonText
              }>
              {toTitleCase(status.toLowerCase())}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const containerStyles = isSuccess =>
  StyleSheet.create({
    background: {backgroundColor: isSuccess ? '#58B583' : '#F06C3A'},
  });

const buttonStyles = isSucces =>
  StyleSheet.create({
    buttonColor: {
      color: '#fff',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderWidth: 2,
      borderRadius: 4,
      backgroundColor: isSucces ? '#58B583' : '#fff',
      borderColor: isSucces ? '#58B583' : '#F06C3A',
    },
  });

const buttonText = isSucces =>
  StyleSheet.create({
    buttonText: {
      color: isSucces ? '#fff' : '#F06C3A',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  arrowIcon: {
    paddingHorizontal: 8,
  },
  leftSeprator: {
    width: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  bankView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bankText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  benificeryName: {
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 8,
  },
  amount: {
    fontSize: 18,
  },
  dateView: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
  leftView: {
    width: '65%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 8,
  },
  amountView: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rightView: {
    margin: 10,
    justifyContent: 'center',
  },
});
