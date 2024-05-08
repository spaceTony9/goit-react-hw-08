import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice.js';
import { Navigate } from 'react-router';

function RestricredRoute({ redirectTo, component }) {
  const isLogged = useSelector(selectIsLoggedIn);
  return isLogged ? <Navigate to={redirectTo} /> : component;
}

export default RestricredRoute;
