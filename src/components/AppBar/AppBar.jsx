import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice.js';
import { AuthNav, Navigation, UserMenu } from '../index.js';
import css from './AppBar.module.css';

function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}

export default AppBar;
