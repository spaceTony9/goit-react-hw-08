import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { useId } from 'react';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations.js';
import { Button } from '@mui/material';

const FeedbackSchema = Yup.object().shape({
  contactName: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too Long!')
    .required('Required'),
  contactPhone: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ContactForm = ({ notifySuccess }) => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  function handleSubmit(values, actions) {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.contactName,
        number: values.contactPhone,
      })
    );
    notifySuccess();
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        contactName: '',
        contactPhone: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.inputField}
            type="text"
            name="contactName"
            id={nameFieldId}
          ></Field>
          <ErrorMessage name="contactName" as="span" />
        </div>
        <div>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.inputField}
            type="text"
            name="contactPhone"
            id={numberFieldId}
          ></Field>
          <ErrorMessage name="contactPhone" as="span" />
        </div>
        <Button
          sx={{
            color: 'black',
            display: 'block',
            margin: '0 auto',
            fontSize: 18,
          }}
          type="submit"
        >
          Add contact
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
