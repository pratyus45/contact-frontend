import axios from 'axios';

const API = axios.create({
   baseURL: 'https://contact-backend-z2ga.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createContact = (contactData) => API.post('/contacts', contactData);
export const getContacts = () => API.get('/contacts');
export const deleteContact = (id) => API.delete(`/contacts/${id}`);