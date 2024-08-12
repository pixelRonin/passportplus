import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Ensure jwt-decode is installed
import React from 'react'; // Import React for hooks usage

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Function to handle user signin
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        
        // Check if the response contains a token
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Store token
        }
        
        return response.data;
    } catch (error) {
        // Check if error response and message are available
        const errorMessage = error.response?.data?.error || 'An error occurred during login';
        throw new Error(errorMessage);
    }
};

// Function to check authentication status and role
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [role, setRole] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const decoded = jwtDecode(token);
                
                // Assuming the role is part of the JWT payload
                setIsAuthenticated(true);
                setRole(decoded.role || 'user'); // Default role if not found in token
            } catch (error) {
                // Token decoding failed
                console.error('Token decoding failed', error);
                setIsAuthenticated(false);
                setRole(null);
            }
        } else {
            setIsAuthenticated(false);
            setRole(null);
        }
    }, []);

    return { isAuthenticated, role };
};
