import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addContact, deleteContact, patchContact } from './operations.js';
import { filter } from '../filters/slice.js';
import { CONSTANTS } from '../../components/constants.js';
import { logoutUser } from '../auth/operations.js';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = true;
  state.error = action.payload;
};

export const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = state.items.filter(item => item.name !== action.payload.name);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(patchContact.fulfilled, (state, action) => {
        state.items = state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(logoutUser.fulfilled, state => {
        state.items = [];
      });
  },
  selectors: {
    loading: state => state.loading,
    contacts: state => state.items,
    error: state => state.error,
  },
});
export const { loading, error, contacts } = slice.selectors;
export const contactsReducer = slice.reducer;
export const selectFilteredContacts = createSelector(
  [contacts, filter],
  (contacts, filter) => {
    if (/^\d+$/.test(filter)) {
      return contacts.filter(contact => contact.number.includes(filter));
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
