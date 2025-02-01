import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/store/itemsReducer';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddEditItemScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const existingItem = route.params?.item;

  const [name, setName] = useState(existingItem?.name || '');
  const [description, setDescription] = useState(existingItem?.description || '');

  const handleSave = () => {
    if (existingItem) {
      dispatch(updateItem({ id: existingItem.id, name, description }));
    } else {
      dispatch(addItem({ name, description }));
    }
    navigation.goBack();
  };

  return (
    <View>
      <TextInput style={styles.textInputStyle} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.textInputStyle} placeholder="Description" value={description} onChangeText={setDescription} />

                 <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  textInputStyle:{
    borderWidth:1,
    margin:10,
    borderColor:"#2121212121"
  },
  
  saveButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    alignContent:'center'
  },

});

export default AddEditItemScreen;