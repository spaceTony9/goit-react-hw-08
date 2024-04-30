import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addContact, deleteContact } from './contactsOps.js';
import { filter } from './filtersSlice.js';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = true;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
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
        state.items = state.items.filter(
          item => item.name !== action.payload.name
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
  selectors: {
    loading: state => state.loading,
    contacts: state => state.items,
    error: state => state.error,
  },
});
export const { loading, error, contacts } = contactsSlice.selectors;
export const contactsReducer = contactsSlice.reducer;
export const selectFilteredContacts = createSelector(
  [contacts, filter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
