import { MdEdit, MdDelete } from "react-icons/md";
import { getAvatarColor, getInitial } from "../../utils/createAvatar";

const ListItem = ({ imgSrc, name, phone }) => {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-900 transition-colors duration-150">

            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
                {imgSrc ? (
                    <div className="size-12 rounded-full overflow-hidden">
                        <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className={`size-12 rounded-full flex items-center justify-center text-white text-xl font-medium ${getAvatarColor(name)}`}>
                        {getInitial(name)}
                    </div>
                )}

                <div className="flex flex-col cursor-default">
                    <span className="text-gray-200 font-semibold text-base">{name}</span>
                    <span className="text-gray-300 text-sm tracking-wide">{phone}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition cursor-pointer">
                    <MdEdit className='text-xl' />
                </button>
                <button className="bg-[#d9534f] hover:bg-red-600 text-white p-2 rounded-md transition cursor-pointer">
                    <MdDelete className='text-xl' />
                </button>
            </div>

        </div>
    )
}

export default ListItem