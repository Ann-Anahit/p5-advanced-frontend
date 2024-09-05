// src/api/messages.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/messages/';

// Function to get a single message
export const getMessage = (id) => axios.get(`${API_URL}${id}/`);

export const getMessages = (userId) => axios.get(`${API_URL}${userId}/`);
export const sendMessage = (data) => axios.post(`${API_URL}create/`, data);
export const markAsRead = (id) => axios.patch(`${API_URL}read/${id}/`);
