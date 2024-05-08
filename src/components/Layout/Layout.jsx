import { Suspense } from 'react';
import { AppBar } from '../index.js';

function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}

export default Layout;
