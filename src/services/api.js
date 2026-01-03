import axios from 'axios';

const API = axios.create({
  baseURL:  'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createContact = (contactData) => API.post('/contacts', contactData);
export const getContacts = () => API.get('/contacts');
export const deleteContact = (id) => API.delete(`/contacts/${id}`);