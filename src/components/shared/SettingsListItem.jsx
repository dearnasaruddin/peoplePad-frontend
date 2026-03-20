import { getAvatarColor } from "@/utils/createAvatar";
import { FaKey, FaBell, FaLock, FaCircleHalfStroke } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";

const SettingsListItem = ({heading}) => {
    return (
        <div className='flex items-center gap-3 p-2 lg:p-3 hover:bg-gray-900 transition-colors duration-150 cursor-pointer'>
            {/* icon */}
            <div className={`size-8 lg:size-10 flex justify-center items-center text-gray-200 text-xl rounded-md lg:rounded-lg ${getAvatarColor(heading)} `}>
            { heading.includes('password') &&  <FaKey />}
            { heading.includes('Notifications') && <FaBell />}
            { heading.includes('privacy') && <FaLock />}
            { heading.includes('Language') && <GrLanguage />}
            { heading.includes('Theme') && <FaCircleHalfStroke />}
            </div>

            {/* text */}
            <div className="text-gray-200 font-semibold text-sm lg:text-base">
                {heading}
            </div>
        </div>
    )
}

export default SettingsListItem