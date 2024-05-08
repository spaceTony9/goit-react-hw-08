import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginUser } from '../../redux/auth/operations.js';
import { Button } from '@mui/material';
import css from './LoginForm.module.css/';

const FeedbackSchema = Yup.object().shape({
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

function LoginForm() {
  const dispatch = useDispatch();
  const userEmailFieldId = useId();
  const userPasswordFieldId = useId();

  function handleSubmit(values, actions) {
    dispatch(
      loginUser({
        email: values.userEmail,
        password: values.userPassword,
      })
    );
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        userEmail: '',
        userPassword: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
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
            size="large"
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
