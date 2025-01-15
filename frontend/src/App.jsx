import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//import { LoginFormPage } from './components/loginFormPage';
//import { SignupFormPage } from './components/SignupFormPage';
import { Navigation } from './components/Navigation';
import * as sessionActions from './store/session';
import HomePage from './components/HomePage/HomePage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      // {
      //  path: '/signup',
      //  element: <SignupFormPage /> 
      // },
      // {
      //  path: '/login',
      //  element: <LoginFormPage /> 
      // }, 
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;