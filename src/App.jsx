import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Alert from './components/Alert';
import { createContact, getContacts, deleteContact } from './services/api';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await getContacts();
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      showAlert('error', 'Failed to fetch contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const response = await createContact(contactData);
      
      if (response.data.success) {
        showAlert('success', response.data.message);
        // Add new contact to the list
        setContacts([response.data.contact, ...contacts]);
        return response.data.contact;
      }
    } catch (error) {
      showAlert('error', error.response?.data?.message || 'Failed to add contact');
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await deleteContact(id);
        
        if (response.data.success) {
          showAlert('success', response.data.message);
          // Remove deleted contact from the list
          setContacts(contacts.filter(contact => contact._id !== id));
        }
      } catch (error) {
        showAlert('error', 'Failed to delete contact');
      }
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-blue-100 mt-2">MERN Stack Demo Application</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {alert && (
          <div className="mb-6">
            <Alert 
              type={alert.type} 
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Contact Form */}
        <div className="mb-12">
          <ContactForm onContactAdded={handleAddContact} />
        </div>

        {/* Contact List */}
        <div className="mb-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Loading contacts...</p>
            </div>
          ) : (
            <ContactList 
              contacts={contacts} 
              onDeleteContact={handleDeleteContact}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Contact Management System • Built with MERN Stack</p>
          <p className="text-gray-500 text-sm mt-2">React, Express, Node.js, MongoDB</p>
        </div>
      </footer>
    </div>
  );
}

export default App;