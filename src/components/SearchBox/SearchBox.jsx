import { useId } from 'react';
import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice.js';
import { TextField } from '@mui/material';

const SearchBox = () => {
  const dispatch = useDispatch();
  const selectNameFilter = useSelector(state => state.filters.name);
  const inputId = useId();

  function handleChange(e) {
    e.preventDefault();
    dispatch(changeFilter(e.target.value));
  }

  return (
    <div>
      <label htmlFor={inputId}>Find a contact by name</label>
      <TextField
        sx={{
          display: 'block',
          marginBottom: '30px',
        }}
        className={css.filterInput}
        type="text"
        id={inputId}
        name="filter"
        value={selectNameFilter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
