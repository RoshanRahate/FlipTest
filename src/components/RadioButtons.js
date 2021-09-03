import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const RadioButtons = ({ options, selectedOption, onSelect }) => {
    return (
        <View style={{ alignContent: 'center' }}>
            {
                options.map((item) => {
                    return (
                        <View key={item.key} style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.circle}
                                onPress={() => {
                                    onSelect(item);
                                }}>
                                {
                                    selectedOption && selectedOption.key === item.key && (
                                        <View style={styles.checkedCircle} />
                                    )}
                            </TouchableOpacity>
                            <Text style={styles.textLabel}>{item.text}</Text>
                        </View>
                    );
                })}
        </View>
    );
}

export default RadioButtons;

const styles = StyleSheet.create({
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
        fontWeight: '500'
    }
});
