import { useState } from 'react';
import ListItem from '../components/shared/ListItem';
import SearchBar from '../components/shared/SearchBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import contactList from '../Data/contactList';
import EmptyState from '../components/shared/EmptyState';


const ContactListPage = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <ListItem key={contact.id} imgSrc={contact.src} name={contact.name} phone={contact.phone} />
            ))}
        </div>

        {/* Footer */}
        <Footer itemCount={filteredContacts.length} />

      </div>

    </div>
  );
};

export default ContactListPage;