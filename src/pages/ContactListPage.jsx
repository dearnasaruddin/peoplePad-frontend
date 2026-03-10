import { useEffect, useState } from 'react';
import ListItem from '../components/shared/ListItem';
import SearchBar from '../components/shared/SearchBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EmptyState from '../components/shared/EmptyState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getValidAccessToken from '@/utils/getValidAccessToken';
import { toast } from 'sonner';


const ContactListPage = () => {

  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const result = contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredContacts(result)

  }, [searchTerm, contacts])

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('userInfo'))?.accessToken) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    const fetchContact = async () => {

      const accessToken = await getValidAccessToken()
      if (!accessToken) return

      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get-contacts`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (response.data?.error) return toast.error(response.data.error)
      setContacts(response.data)
    }

    fetchContact()
  }, [])


  const handleDelete = async (id) => {

    const accessToken = await getValidAccessToken()

    const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-contact/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    toast.success(response.data.message)
    setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id))
  }


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
            filteredContacts.map((contact) => (
              <ListItem key={contact._id} imgSrc={contact.avatarUrl} name={contact.name} phone={contact.phone} handleDelete={handleDelete} id={contact._id} />
            ))}
        </div>

        {/* Footer */}
        <Footer itemCount={filteredContacts.length} />

      </div>

    </div>
  );
};

export default ContactListPage;