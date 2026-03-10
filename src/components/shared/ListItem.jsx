import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import { getAvatarColor, getInitial } from "../../utils/createAvatar";

const ListItem = ({ contact, handleDelete }) => {
    return (
        <div className="flex items-center justify-between p-2 lg:p-4 hover:bg-gray-900 transition-colors duration-150">

            {/* Avatar & Info */}
            <div className="flex items-center gap-2 lg:gap-4">
                {contact?.avatarUrl ? (
                    <div className="size-10 lg:size-12 rounded-full overflow-hidden">
                        <img src={contact?.avatarUrl} alt={contact?.name} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className={`size-10 lg:size-12 rounded-full flex items-center justify-center text-white text-xl font-medium ${getAvatarColor(contact?.name)}`}>
                        {getInitial(contact?.name)}
                    </div>
                )}

                <div className="flex flex-col cursor-default">
                    <span className="text-gray-200 font-semibold text-sm lg:text-base">{contact?.name}</span>
                    <span className="text-gray-300 text-xs lg:text-sm tracking-wide">{contact?.phone}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <Link to={'/edit'} state={contact} className="bg-blue-500 hover:bg-blue-600 text-white p-1 lg:p-2 rounded-md transition cursor-pointer">
                    <MdEdit className='text-xl' />
                </Link>
                <button onClick={() => handleDelete(contact?._id)} className="bg-[#d9534f] hover:bg-red-600 text-white p-1 lg:p-2 rounded-md transition cursor-pointer">
                    <MdDelete className='text-xl' />
                </button>
            </div>

        </div>
    )
}

export default ListItem