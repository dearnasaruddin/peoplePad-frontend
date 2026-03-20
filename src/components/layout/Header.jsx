import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import ProfileDropdown from '../shared/ProfileDropdown';
import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';

const Header = ({ auth, heading = 'PeoplePad' }) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [isHomeRoute, setIsHomeRoute] = useState(pathname == '/')

    return (
        <div className={`bg-blue-500/80 text-white flex items-center ${isHomeRoute ? 'justify-between p-2 lg:p-4' : 'py-2 lg:py-4 pl-2 lg:pl-4 pr-6 lg:pr-10'}`}>

            {isHomeRoute ?
                <>
                    {/* User */}
                    <div className="size-8 lg:size-10 flex justify-center items-center border border-blue-300 rounded-full cursor-pointer tooltip tooltip-bottom capitalize" data-tip='profile'>
                        <ProfileDropdown auth={auth} />
                    </div>
                </>
                :
                <>
                    <span onClick={()=>navigate(-1)} className='flex justify-center items-center bg-white/35 rounded-full p-1.5'><GoArrowLeft className='text-xl lg:text-2xl'/></span>
                </>
            }

            <h1 className="text-xl mx-auto font-semibold tracking-wide">{heading}</h1>

            {isHomeRoute &&
                <>
                    {/* Add Button */}
                    <Link to={'/create-contact'} className="bg-white/20 hover:bg-white/30 transition rounded-full p-1 lg:p-1.5 backdrop-blur-sm cursor-pointer">
                        <IoMdAdd className="text-xl lg:text-2xl" />
                    </Link>
                </>
            }
        </div >
    )
}

export default Header