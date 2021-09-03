import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
// import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { getFormatedDate, currencyFormatter, toTitleCase } from '../utility';

const TransactionItem = (props) => {
    const { sender_bank, beneficiary_bank, beneficiary_name, amount, created_at, status } = props.transaction.item;

    return (
        <TouchableOpacity
            onPress={() => props.onRowPressed(props.transaction.item)}
        >
            <View style={styles.container}>

                <View style={[styles.leftSeprator, { backgroundColor: props.transaction.item.status == "SUCCESS" ? '#58B583' : '#F06C3A' }]} />
                <View style={styles.leftView}>
                    <View style={styles.bankView}>
                        <Text style={styles.bankText}>{toTitleCase(sender_bank)}</Text>
                        <Icon name="arrow-right" size={22} style={{ paddingHorizontal: 8 }} />
                        <Text style={styles.bankText}>{toTitleCase(beneficiary_bank)}</Text>
                    </View>
                    <Text style={styles.benificeryName}>{beneficiary_name.toUpperCase()}</Text>
                    <View style={styles.amountView}>
                        <Text style={styles.amount}>{`Rp${currencyFormatter(amount)}`}</Text>
                        <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: '#000', marginHorizontal: 4 }} />
                        <Text style={styles.amount}>{getFormatedDate(created_at)}</Text>
                    </View>
                </View>
                <View style={{ margin: 10, justifyContent: 'center' }}>
                    <TouchableOpacity
                        mode={props.transaction.item.status == "SUCCESS" ? "contained" : "outlined"}
                        style={{
                            textColor: '#fff',
                            paddingVertical: 4,
                            paddingHorizontal: 8,
                            borderWidth: 2,
                            borderRadius: 4,
                            // margin: 8,
                            backgroundColor: props.transaction.item.status == "SUCCESS" ? '#58B583' : '#fff',
                            borderColor: props.transaction.item.status == "SUCCESS" ? '#58B583' : '#F06C3A'
                        }}>
                        <Text style={{ color: props.transaction.item.status == "SUCCESS" ? '#fff' : '#F06C3A', fontSize: 15, fontWeight: 'bold' }}>{toTitleCase(status.toLowerCase())}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    )
};

export default TransactionItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 4
    },
    leftSeprator: {
        width: 10,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
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
    leftView: {
        width: '65%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        margin: 8
    },
    amountView: {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

})