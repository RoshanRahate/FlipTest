import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionsScreen from '../screens/Transactions';
import TransactionDetails from '../screens/TransactionDetails';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Transactions"
        component={TransactionsScreen}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetails}
        options={({navigation}) => ({
          title: 'Transaction Details',
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon
                color={'#FF6047'}
                size={30}
                style={styles.backArrow}
                name={'arrow-left'}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

RootNavigator.displayName = 'RootNavigator';

const styles = StyleSheet.create({
  backArrow: {
    marginRight: 10,
  },
});
