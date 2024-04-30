import {
  ContactForm,
  ContactList,
  SearchBox,
  Loader,
  Error,
} from './components/index.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from './redux/contactsOps.js';
import { error, loading } from './redux/contactsSlice.js';

const App = () => {
  const dispatch = useDispatch();
  const selectError = useSelector(error);
  const selectLoading = useSelector(loading);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {selectLoading && <Loader />}
      {selectError && <Error />}
      <ContactList />
    </div>
  );
};

export default App;
