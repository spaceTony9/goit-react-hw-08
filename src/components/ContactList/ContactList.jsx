import { Contact } from '../index.jsx';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contactsSlice.js';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactsList}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <Contact contactData={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
