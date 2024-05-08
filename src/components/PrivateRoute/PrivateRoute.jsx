import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice.js';
import { Navigate } from 'react-router';

function PrivateRoute({ redirectTo, component }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
