import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import UserDashboard from './components/dashboard/user/UserDashboard';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/home/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const App = () => {
  // Function to check if the user is authenticated and their role
  const isAuthenticated = () => {
    // Here you should implement the logic to check if the user is authenticated
    // For example, check if a token exists in local storage or a global state
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token;
  };

  const getRole = () => {
    // Get the user role from local storage or a global state
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.role : '';
  };

  return (
   
      
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard/*"
            element={
              isAuthenticated() && getRole() === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/user-dashboard/*"
            element={
              isAuthenticated() && getRole() === 'user' ? (
                <UserDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Redirect to homepage if no matching route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </div>
    
  );
};

export default App;
