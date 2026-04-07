import { useEffect, useState } from 'react';
import ContactListItem from '../components/shared/ContactListItem';
import SearchBar from '../components/shared/SearchBar';
import Footer from '../components/layout/Footer';
import EmptyState from '../components/shared/EmptyState';
import axios from 'axios';
import getValidAccessToken from '@/utils/getValidAccessToken';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@/features/auth/authSlice';
import CommonLayout from '@/components/layout/CommonLayout';
import Pagination from '@/components/shared/Pagination';
import ItemsPerPageSelect from '@/components/shared/ItemsPerPageSelect';


const ContactListPage = () => {

  const dispatch = useDispatch()
  const [contactsData, setContactsData] = useState({
    totalPages: 0,
    totalItems: 0,
    contacts: []
  })
  const [filteredContacts, setFilteredContacts] = useState([])
  const [query, setQuery] = useState({
    page: 1,
    limit: JSON.parse(localStorage.getItem('peoplePadSettings')).showItems ?? 10
  })
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const result = contactsData.contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredContacts(result)

  }, [searchTerm, contactsData])

  const onPageChange = (pageNumber) => {
    setQuery({ ...query, page: pageNumber })
  }

  useEffect(() => {
    const fetchInitialData = async () => {

      const accessToken = await getValidAccessToken()
      if (!accessToken) return
      try {
        const contactUrl = `${import.meta.env.VITE_SERVER_URL}/get-contacts?page=${query.page}&limit=${query.limit}`

        const response = await axios.get(contactUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if (response.data?.error) return toast.error(response.data.error)
        setContactsData({
          totalPages: response.data?.totalPage,
          contacts: response.data?.contacts,
          totalItems: response.data?.totalItems
        })

        const userResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/me`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        if (userResponse.data?.error) return toast.error(userResponse.data.error)

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
  }, [query])

  const handleItemsToShow = (e) => {
    const newLimit = e.target.value
    setQuery((prev) => ({ ...prev, limit: newLimit }))
    const peoplePadSettings = JSON.parse(localStorage.getItem('peoplePadSettings'))
    let newSettings = {
      ...peoplePadSettings,
      showItems: newLimit
    }
    localStorage.setItem('peoplePadSettings', JSON.stringify(newSettings))
  }

  const handleDelete = async (id) => {

    const accessToken = await getValidAccessToken()

    const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-contact/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (response.data?.error) return toast.error(response.data.error)
    toast.success(response.data.message)
    setContactsData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact._id !== id)
    }))
  }


  return (
    <CommonLayout>
      <div className='flex flex-col h-full'>

        {/* Search Bar */}
          <div className='flex gap-2 justify-between items-center p-2.5 lg:p-4'>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ItemsPerPageSelect limit={query.limit} onChange={handleItemsToShow}/>
          </div>

        {/* List Items */}
        <div className="divide-y divide-gray-700 overflow-auto">
          {filteredContacts.length <= 0 ?
            <EmptyState text='No Contact Found' />
            :
            <>
              {filteredContacts.map((contact) => (
                <ContactListItem key={contact._id} contact={contact} handleDelete={handleDelete} />
              ))}

              {
                contactsData.totalPages > 1 &&
                <Pagination currentPage={query.page} totalPages={contactsData.totalPages} onPageChange={onPageChange} />
              }
            </>
          }

        </div>

        {/* Footer */}
        {filteredContacts.length > 0 &&
          <Footer itemCount={contactsData.totalItems} />
        }
      </div>

    </CommonLayout>
  );
};

export default ContactListPage;