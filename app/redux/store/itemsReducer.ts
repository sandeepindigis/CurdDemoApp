import { AnyAction } from 'redux';
import SQLite from 'react-native-sqlite-storage';
import { AppDispatch } from './store';

interface Item {
  id?: number;
  name: string;
  description: string;
}

const db = SQLite.openDatabase(
  { name: 'items.db', location: 'default' },
  () => {},
  (  error: any) => console.log(error)
);

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);',
    [],
    () => console.log('Table created successfully'),
    error => console.log(error)
  );
});

const initialState: Item[] = [];

const itemsReducer = (state = initialState, action: AnyAction): Item[] => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    case 'ADD_ITEM':
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO items (name, description) VALUES (?, ?);',
          [action.payload.name, action.payload.description],
          (_, result) => {
            action.payload.id = result.insertId;
          },
          error => console.log(error)
        );
      });
      return [...state, action.payload];
    case 'UPDATE_ITEM':
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE items SET name = ?, description = ? WHERE id = ?;',
          [action.payload.name, action.payload.description, action.payload.id]
        );
      });
      return state.map(item => (item.id === action.payload.id ? action.payload : item));
    case 'DELETE_ITEM':
      db.transaction(tx => {
        tx.executeSql('DELETE FROM items WHERE id = ?;', [action.payload]);
      });
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default itemsReducer;

export const addItem = (item: Item) => ({ type: 'ADD_ITEM', payload: item });
export const updateItem = (item: Item) => ({ type: 'UPDATE_ITEM', payload: item });
export const deleteItem = (id: number) => ({ type: 'DELETE_ITEM', payload: id });
export const setItems = (items: Item[]) => ({ type: 'SET_ITEMS', payload: items });

export const fetchItems = () => (dispatch: AppDispatch) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
      const items: Item[] = rows.raw();
      dispatch(setItems(items));
    });
  });
};