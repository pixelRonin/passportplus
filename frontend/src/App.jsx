import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import UserDashboard from '../src/components/dashboard/user/UserDashboard'
import MultiStepForm from '../src/components/MultistepForm';
import PassportForm from '../src/components/dashboard/user/PassportForm';

import Register from '../src/components/auth/Register';
import Login from '../src/components/auth/Login';
// Homepage Component Complete
// Homepage uses the header component, so no need to import itself.
import HomePage from './components/HomePage';  
const App = () => {
  return (
    <div className='App'>
      <Router>
      <Routes>
       {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>

      </Routes>
      
      </Router>
    </div>
  )
   
};

export default App;
