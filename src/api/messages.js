import axios from 'axios';

const API_URL = 'https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/';

axios.defaults.withCredentials = true; 

export const getMessage = (id) => axios.get(`${API_URL}${id}/`);
export const getMessages = (userId) => axios.get(`${API_URL}${userId}/`);
export const sendMessage = (data) => axios.post(`${API_URL}create/`, data);
export const markAsRead = (id) => axios.patch(`${API_URL}read/${id}/`);
