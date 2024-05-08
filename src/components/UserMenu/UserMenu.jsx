import { Logout } from '../index.js';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/slice.js';
import css from './UserMenu.module.css';

function UserMenu() {
  const userName = useSelector(selectUserName);
  return (
    <div className={css.UserMenuWrapper}>
      <p className={css.welcomeText}>Welcome, {userName}</p>
      <Logout />
    </div>
  );
}

export default UserMenu;
