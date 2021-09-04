import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getFormattedDate, currencyFormatter, toTitleCase} from '../utility';
/**
 * Transactions details screen to view
 * @param {object} route - navigation route object
 * @returns
 * TODO: Need to move hardcoded strings to constants or translation files
 */
const TransactionDetails = ({route: {params}}) => {
  const {
    id,
    beneficiary_name,
    account_number,
    sender_bank,
    beneficiary_bank,
    unique_code,
    status,
    amount,
    remark,
    created_at,
  } = params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.transactionIDView}>
          <Text style={styles.transactionIdText}>{`ID TRANSAKSI: #${id}`}</Text>
          <Icon
            style={styles.copyIcon}
            color={'#FF6047'}
            size={25}
            name={'content-copy'}
          />
        </View>
        <View style={styles.idSeparatorView} />

        <View style={styles.transactionDetailView}>
          <Text style={styles.detailTransactionText}>DETAIL TRANSAKSI</Text>
          <Text
            style={
              status &&
              statusStyles(status.toLowerCase() === 'success').statusText
            }>
            {toTitleCase(status.toLowerCase())}
          </Text>
        </View>
        <View style={styles.detailsSeparatorView} />

        <View style={styles.banksView}>
          <View style={styles.bankView}>
            <Text style={styles.bankText}>
              {sender_bank && toTitleCase(sender_bank)}
            </Text>
            <Icon name="arrow-right" size={30} />
            <Text style={styles.bankText}>
              {beneficiary_bank && toTitleCase(beneficiary_bank)}
            </Text>
          </View>
        </View>

        <View style={styles.sectionView}>
          <View style={styles.leftColumn}>
            <Text style={styles.titleText}>
              {beneficiary_name && beneficiary_name.toUpperCase()}
            </Text>
            <Text style={styles.valueText}>{account_number}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.titleText}>NOMINAL</Text>
            <Text style={styles.valueText}>
              {amount && `Rp${currencyFormatter(amount)}`}
            </Text>
          </View>
        </View>

        <View style={styles.sectionView}>
          <View style={styles.leftColumn}>
            <Text style={styles.titleText}>BERITA TRANSFER</Text>
            <Text style={styles.valueText}>{remark}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.titleText}>KODE UNIK</Text>
            <Text style={styles.valueText}>{unique_code}</Text>
          </View>
        </View>

        <View style={styles.sectionView}>
          <View>
            <Text style={styles.titleText}>WAKTU DIBUAT</Text>
            <Text style={[styles.valueText, styles.dateText]}>
              {created_at && getFormattedDate(created_at)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const statusStyles = isSuccess =>
  StyleSheet.create({
    statusText: {
      fontSize: 17,
      fontWeight: '500',
      paddingRight: 30,
      alignSelf: 'center',
      color: isSuccess ? '#58B583' : '#F06C3A',
    },
  });

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  copyIcon: {
    padding: 10,
  },
  bankView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  bankText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  banksView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  transactionDetailView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  idSeparatorView: {
    borderBottomColor: '#f8f8f9',
    borderBottomWidth: 1,
  },
  detailsSeparatorView: {
    borderBottomColor: '#f8f8f9',
    borderBottomWidth: 2,
  },
  detailTransactionText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  transactionIDView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
  },
  transactionIdText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingVertical: 25,
  },

  sectionView: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  valueText: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  leftColumn: {
    flexDirection: 'column',
    width: '60%',
  },
  rightColumn: {
    flexDirection: 'column',
    width: '40%',
  },
  dateText: {
    paddingBottom: 30,
  },
});
