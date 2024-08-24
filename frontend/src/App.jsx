// Libraries
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';

// Components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HomePage from './components/Homepage';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import UserDashboard from './components/dashboard/user/UserDashboard'; 



// Builds a router to route pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/user-dashboard',
    element: <UserDashboard />,
  },
  {
    path: '/admin-dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '*',
    element: <HomePage /> // Or a 404 component
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;