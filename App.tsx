/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/redux/store/store';
import ItemListScreen from './app/view/ItemListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AddEditItemScreen from './app/view/AddEditItemScreen';


const Stack = createStackNavigator();

const App=()=> {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="ItemListScreen" component={ItemListScreen} options={{ title: 'Items' }} />
        <Stack.Screen name="AddEditItemScreen" component={AddEditItemScreen} options={{ title: 'Add / Edit Item' }} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
