import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerUser } from '../../redux/auth/operations.js';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { Button } from '@mui/material';
import css from './RegistrationForm.module.css';

const FeedbackSchema = Yup.object().shape({
  userName: Yup.string().min(3, 'Too short!').max(50, 'Too Long!').required('Required'),
  userEmail: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too Long!')
    .email('Invalid email address')
    .required('Required'),
  userPassword: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

function RegistrationForm() {
  const dispatch = useDispatch();
  const userNameFieldId = useId();
  const userEmailFieldId = useId();
  const userPasswordFieldId = useId();

  function handleSubmit(values, actions) {
    dispatch(
      registerUser({
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
      })
    );
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        userName: '',
        userEmail: '',
        userPassword: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div>
          <label htmlFor={userNameFieldId}>Username</label>
          <Field
            className={css.inputField}
            type="text"
            name="userName"
            id={userNameFieldId}
          ></Field>
          <ErrorMessage name="userName" as="span" />
        </div>
        <div>
          <label htmlFor={userEmailFieldId}>Email</label>
          <Field
            className={css.inputField}
            type="email"
            name="userEmail"
            id={userEmailFieldId}
          ></Field>
          <ErrorMessage name="userEmail" as="span" />
        </div>
        <div>
          <label htmlFor={userPasswordFieldId}>Password</label>
          <Field
            className={css.inputField}
            type="password"
            name="userPassword"
            id={userPasswordFieldId}
          ></Field>
          <ErrorMessage name="userPassword" as="span" />
        </div>
        <div className={css.buttonContainer}>
          <Button
            sx={{ fontSize: '20px', ':hover': { color: 'red' } }}
            size="small"
            type="submit"
          >
            Register
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;
