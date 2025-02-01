import { createStore, applyMiddleware, combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;