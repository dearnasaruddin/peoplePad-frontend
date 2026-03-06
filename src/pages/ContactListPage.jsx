import { useEffect, useState } from 'react';
import ListItem from '../components/shared/ListItem';
import SearchBar from '../components/shared/SearchBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EmptyState from '../components/shared/EmptyState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ContactListPage = () => {

  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/get-contacts`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).accessToken}`
      }
    }).then((data) => {
      setContacts(data.data)
    })
  }, [])

  return (
    <div className="h-[90vh] flex items-center justify-center p-4 font-sans">

      <div className="w-full max-w-md bg-base-200 border-gray-700 rounded-xl shadow-2xl overflow-hidden border ">
        {/* Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* List Items */}
        <div className="divide-y divide-gray-700 max-h-[52dvh] overflow-auto">
          {filteredContacts.length <= 0 ?
            <EmptyState text='No Contact Found' />
            :
            filteredContacts.map((contact, index) => (
              <ListItem key={index} imgSrc={contact.avatarUrl} name={contact.name} phone={contact.phone} />
            ))}
        </div>

        {/* Footer */}
        <Footer itemCount={filteredContacts.length} />

      </div>

    </div>
  );
};

export default ContactListPage;