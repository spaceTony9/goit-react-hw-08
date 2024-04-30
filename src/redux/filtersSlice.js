import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: { name: '' },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
  selectors: { filter: state => state.name },
});

export const { filter } = filterSlice.selectors;
export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
