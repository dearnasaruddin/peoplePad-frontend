import { IoSearch } from 'react-icons/io5'

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="p-4 bg-gray-800 border-b border-gray-700">
            <div className="relative text-gray-800">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoSearch className='text-xl' />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-200  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar