import { useEffect, useState } from 'react';
import ContactListItem from '../components/shared/ContactListItem';
import SearchBar from '../components/shared/SearchBar';
import Footer from '../components/layout/Footer';
import EmptyState from '../components/shared/EmptyState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getValidAccessToken from '@/utils/getValidAccessToken';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '@/features/auth/authSlice';
import CommonLayout from '@/components/layout/CommonLayout';


const ContactListPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
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
    if (!auth?.accessToken) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {

      const accessToken = await getValidAccessToken()
      if (!accessToken) return

      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get-contacts`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if (response.data?.error) return toast.error(response.data.error)
        setContacts(response.data)

        const userResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/me`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        if (userResponse.data?.error) return toast.error(response.data.error)

        dispatch(updateUserProfile({
          username: userResponse.data.username,
          email: userResponse.data.email,
          avatarUrl: userResponse.data.avatarUrl || null
        }))


      } catch (error) {
        console.log("Error fetching initial data", error)
      }
    }

    fetchInitialData()
  }, [])


  const handleDelete = async (id) => {

    const accessToken = await getValidAccessToken()

    const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-contact/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (response.data?.error) return toast.error(response.data.error)
    toast.success(response.data.message)
    setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id))
  }
  // lg:h-[calc(100% - 72px)]

  return (
    <CommonLayout>
      <div className='flex flex-col h-full'>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* List Items */}
        <div className="divide-y divide-gray-700 overflow-auto">
          {filteredContacts.length <= 0 ?
            <EmptyState text='No Contact Found' />
            :
            filteredContacts.map((contact) => (
              <ContactListItem key={contact._id} contact={contact} handleDelete={handleDelete} />
            ))}
        </div>

        {/* Footer */}
        <Footer itemCount={filteredContacts.length} />
      </div>

    </CommonLayout>
  );
};

export default ContactListPage;