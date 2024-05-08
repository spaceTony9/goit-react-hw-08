import { LoginForm } from '../../components/index.js';
import css from './LoginPage.module.css/';

function LoginPage() {
  return (
    <div className={css.wrapper}>
      <h2>Log in</h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
