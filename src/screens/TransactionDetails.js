import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getFormatedDate, currencyFormatter, toTitleCase } from '../utility';

const TransactionDetails = ({
    route: { params }} ) => {
    
    const { id, beneficiary_name, account_number, sender_bank, beneficiary_bank,
        unique_code, status, amount, remark, created_at } = params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.transactionIDView}>
                    <Text style={styles.transactionIdText}>{`ID TRANSAKSI: #${id}`}</Text>
                    <Icon
                        style={{ padding: 10 }}
                        color={"#FF6047"}
                        size={25}
                        name={"content-copy"}
                    />
                </View>
                <View style={styles.idSepratorView} />

                <View style={styles.transactionDetailView}>
                    <Text style={styles.detailTransactionText}>DETAIL TRANSAKSI</Text>
                    <Text style={[styles.statusText, { color: status == 'SUCCESS' ? '#58B583' : '#F06C3A' }]}> {toTitleCase(status.toLowerCase())} </Text>
                </View>
                <View style={styles.detailsSepratorView} />

                <View style={styles.banksView}>
                    <View style={styles.bankView}>
                        <Text style={styles.bankText}>{toTitleCase(sender_bank)}</Text>
                        <Icon name="arrow-right" size={30} />
                        <Text style={styles.bankText}>{toTitleCase(beneficiary_bank)}</Text>
                    </View>
                </View>

                <View style={styles.sectionView}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.titleText}>{beneficiary_name.toUpperCase()}</Text>
                        <Text style={styles.valueText}>{account_number}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.titleText}>NOMINAL</Text>
                        <Text style={styles.valueText}>{`Rp${currencyFormatter(amount)}`}</Text>
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
                        <Text style={[styles.valueText, { paddingBottom: 30, }]}>{getFormatedDate(created_at)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default TransactionDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bankView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
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
    idSepratorView: {
        borderBottomColor: '#f8f8f9',
        borderBottomWidth: 1,
    },
    detailsSepratorView: {
        borderBottomColor: '#f8f8f9',
        borderBottomWidth: 2,
    },
    detailTransactionText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    statusText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 20,
        alignSelf:'center'
    },
    transactionIDView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 20,
        alignItems: 'center'
    },
    transactionIdText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingVertical: 25
    },

    sectionView: {
        flexDirection: 'row',
        paddingTop: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,

    },
    valueText: {
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    leftColumn: {
        flexDirection: 'column',
        width: '60%',
    },
    rightColumn: {
        flexDirection: 'column',
        width: '40%',
    }
});
