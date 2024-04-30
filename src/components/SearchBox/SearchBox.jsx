import { useId } from 'react';
import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice.js';

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
      <label htmlFor={inputId}>Find contacts by name</label>
      <input
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
