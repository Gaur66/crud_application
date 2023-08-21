// store.ts
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './components/redux/contactSlice';

const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export default store;
