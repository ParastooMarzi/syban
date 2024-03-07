import axios from 'axios';

const API_BASE_URL = 'https://185.110.189.96:8000/api'; //back end base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login/', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//create a function for user registration
export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/register/', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
