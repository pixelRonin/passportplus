import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, { email, password });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export { login };