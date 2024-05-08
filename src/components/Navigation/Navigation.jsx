import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserName } from '../../redux/auth/slice.js';
import css from './Navigation.module.css';
import clsx from 'clsx';

function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.navWrapper}>
      <NavLink
        className={({ isActive }) => clsx(css.navLink, { [css.navLinkActive]: isActive })}
        to="/"
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <div>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, { [css.navLinkActive]: isActive })
            }
            to="/contacts"
          >
            Contacts
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navigation;
