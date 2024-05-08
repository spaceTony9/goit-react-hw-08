import { lazy } from 'react';

export const HomePage = lazy(() => import('./HomePage/HomePage.jsx'));
export const RegisterPage = lazy(() => import('./RegisterPage/RegisterPage.jsx'));
export const LoginPage = lazy(() => import('./LoginPage/LoginPage.jsx'));
export const ContactsPage = lazy(() => import('./ContactsPage/ContactsPage.jsx'));
