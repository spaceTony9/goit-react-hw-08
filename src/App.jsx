import { Layout, RestrictedRoute, PrivateRoute, Loader } from './components/index.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { ContactsPage, HomePage, LoginPage, RegisterPage } from './pages/index.js';
import { refreshUser } from './redux/auth/operations.js';
import { selectIsLoading } from './redux/auth/slice.js';
import { loading } from './redux/contacts/slice.js';
import Modal from 'react-modal';
import { CONSTANTS } from './components/constants.js';

const App = () => {
  const dispatch = useDispatch();

  const selectLoadingAuth = useSelector(selectIsLoading);
  const selectLoadingContacts = useSelector(loading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Routes forceRefresh={true}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />}
        />
      </Routes>
      <Modal
        style={CONSTANTS.modalStyles}
        isOpen={selectLoadingAuth || selectLoadingContacts}
      >
        <Loader />
      </Modal>
    </Layout>
  );
};

export default App;
