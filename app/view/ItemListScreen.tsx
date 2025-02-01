import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem } from '../redux/store/itemsReducer';
import { RootState } from '../redux/store/store';
import { useNavigation } from '@react-navigation/native';

const ItemListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const listItem=(item: Item)=>{
   return(
    <View >
    <Text style={styles.textStyle}>{item.name}</Text>
    <Text style={styles.textStyle}>{item.description}</Text>


          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditItemScreen', { item })}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(deleteItem(item.id!))}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              </View>
  </View>
   )
  }

  return (
    <View >
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEditItemScreen')}>
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
              </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() || ''}
        contentContainerStyle={
           styles.marginList
        }
        renderItem={({ item }) => (
         listItem(item)
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marginList:{
paddingBottom:80
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },

  textStyle: {
    marginHorizontal:10,
    marginVertical:2
  },
});

export default ItemListScreen;