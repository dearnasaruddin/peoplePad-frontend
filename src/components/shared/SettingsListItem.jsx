import { getAvatarColor } from "@/utils/createAvatar";
import { FaKey, FaBell, FaLock, FaCircleHalfStroke } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";

const SettingsListItem = ({heading}) => {
    return (
        <div className='flex items-center gap-3 p-2 lg:p-3 transition-colors duration-150 text-gray-200'>
            {/* icon */}
            <div className={`size-8 lg:size-10 flex justify-center items-center  text-xl rounded-md lg:rounded-lg ${getAvatarColor(heading)} `}>
            { heading.includes('password') &&  <FaKey />}
            { heading.includes('Notifications') && <FaBell />}
            { heading.includes('privacy') && <FaLock />}
            { heading.includes('Language') && <GrLanguage />}
            { heading.includes('Theme') && <FaCircleHalfStroke />}
            </div>

            {/* text */}
            <div className=" font-semibold text-sm lg:text-base">
                {heading}
            </div>
        </div>
    )
}

export default SettingsListItem