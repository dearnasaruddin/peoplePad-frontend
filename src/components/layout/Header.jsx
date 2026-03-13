import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import ProfileDropdown from '../shared/ProfileDropdown';

const Header = ({auth}) => {
    return (
        <div className="bg-blue-500/80 p-2 lg:p-4 flex justify-between items-center text-white">

            {/* User */}
            <div className="size-8 lg:size-10 flex justify-center items-center border rounded-full cursor-pointer tooltip tooltip-bottom capitalize" data-tip={auth?.user?.username || 'profile'}>
                <ProfileDropdown auth={auth}/>
            </div>

            <h1 className="text-xl font-semibold tracking-wide">PeoplePad</h1>

            {/* Add Button */}
            <Link to={'/create'} className="bg-white/20 hover:bg-white/30 transition rounded-full p-1 lg:p-1.5 backdrop-blur-sm cursor-pointer">
                <IoMdAdd className="text-xl lg:text-2xl" />
            </Link>
        </div>
    )
}

export default Header