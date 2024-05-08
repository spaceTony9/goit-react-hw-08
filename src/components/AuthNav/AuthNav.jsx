import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import clsx from 'clsx';

function AuthNav() {
  return (
    <div className={css.authWrapper}>
      <NavLink
        className={({ isActive }) => clsx(css.navLink, { [css.navLinkActive]: isActive })}
        to="/register"
      >
        Register
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(css.navLink, { [css.navLinkActive]: isActive })}
        to="/login"
      >
        Login
      </NavLink>
    </div>
  );
}

export default AuthNav;
