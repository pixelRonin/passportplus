import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Your Tailwind CSS file or any other global styles
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
