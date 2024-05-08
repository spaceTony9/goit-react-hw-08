import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { patchContact } from '../../redux/contacts/operations.js';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './EditContactForm.module.css';
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

const EditContactForm = ({
  closeModal,
  editedContact: { notifySuccess, id, name: initName, number: initNumber },
}) => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  function handleSubmit(values, actions) {
    dispatch(
      patchContact({
        id,
        name: values.contactName,
        number: values.contactPhone,
      })
    );
    closeModal();
    notifySuccess();
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        contactName: initName,
        contactPhone: initNumber,
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
        <Button className={css.formButton} type="submit">
          Edit Contact
        </Button>
      </Form>
    </Formik>
  );
};

export default EditContactForm;
