import { RegisterForm } from '../../components/index.js';
import css from './RegisterPage.module.css';

function RegisterPage() {
  return (
    <div className={css.wrapper}>
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
