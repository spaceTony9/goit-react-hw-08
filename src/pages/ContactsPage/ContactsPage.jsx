import {
  ContactForm,
  ContactList,
  DeleteContactForm,
  EditContactForm,
  SearchBox,
} from '../../components/index.js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchItems } from '../../redux/contacts/operations.js';
import Modal from 'react-modal';
import { CONSTANTS } from '../../components/constants.js';
import { Toaster } from 'react-hot-toast';

function ContactsPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  function handleEditClicked({ name, number, id }) {
    setSelectedContact({ name, number, id });
    setIsEdit(true);
  }

  function handleDeleteClicked({ name, number, id }) {
    setSelectedContact({ name, number, id });
    setIsDelete(true);
  }

  function modalClose() {
    setIsDelete(false);
    setIsEdit(false);
  }

  function notifySuccess() {
    CONSTANTS.notifySuccess();
  }

  return (
    <>
      <ContactForm notifySuccess={notifySuccess} />
      <SearchBox />
      <ContactList handleEdit={handleEditClicked} handleDelete={handleDeleteClicked} />
      <Modal
        style={CONSTANTS.modalStyles}
        onRequestClose={modalClose}
        isOpen={isEdit || isDelete}
      >
        {isEdit && (
          <EditContactForm
            notifySuccess={notifySuccess}
            closeModal={modalClose}
            editedContact={selectedContact}
          />
        )}
        {isDelete && (
          <DeleteContactForm
            notifySuccess={notifySuccess}
            id={selectedContact.id}
            closeModal={modalClose}
          />
        )}
      </Modal>
      <Toaster />
    </>
  );
}

export default ContactsPage;
