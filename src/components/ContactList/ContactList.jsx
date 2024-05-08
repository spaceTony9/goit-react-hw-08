import { Contact } from '../index.js';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/slice.js';
import { useSelector } from 'react-redux';

const ContactList = ({ handleEdit, handleDelete }) => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactsList}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <Contact
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            contactData={contact}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
