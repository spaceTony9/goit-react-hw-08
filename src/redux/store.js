import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filtersSlice.js';
import { contactsReducer } from './contactsSlice.js';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filterReducer,
  },
});
