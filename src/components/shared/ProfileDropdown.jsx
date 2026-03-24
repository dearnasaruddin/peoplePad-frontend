import { useDispatch } from "react-redux"
import { LogOut, Settings, User, Pencil } from "lucide-react"
import { logout } from "@/features/auth/authSlice"
import { getAvatarColor, getInitial } from "@/utils/createAvatar"
import { useNavigate, Link } from 'react-router-dom'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const ProfileDropdown = ({ auth }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <DropdownMenu>

            {/* Avatar Trigger */}
            <DropdownMenuTrigger asChild>
                {auth?.user?.avatarUrl ? (
                    <div className="size-full rounded-full overflow-hidden">
                        <img src={auth?.user.avatarUrl} alt={auth?.username} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className={`size-full rounded-full flex items-center justify-center text-white text-xl font-medium select-none ${getAvatarColor(auth?.user?.username)}`}>
                        {getInitial(auth?.user?.username)}
                    </div>
                )}
            </DropdownMenuTrigger>

            {/* Dropdown */}
            <DropdownMenuContent
                align="start"
                className="w-full bg-gray-900 text-gray-200 border-gray-700 shadow-2xl"
            >

                {/* User Info */}
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="font-medium capitalize">{auth.user?.username}</span>
                        <span className="text-xs text-gray-400">
                            {auth.user?.email}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className={'bg-gray-500'} />
                <DropdownMenuItem className="p-0 gap-2 cursor-pointer">
                    <Link to={'/edit-profile'} className="flex gap-2 items-center py-1.5 px-2 w-full">
                        <Pencil />
                        Edit Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-0 gap-2 cursor-pointer">
                    <Link to={'/my-profile'} className="flex gap-2 items-center py-1.5 px-2 w-full">
                        <User />
                        My Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-0 gap-2 cursor-pointer">
                    <Link to={'/settings'} className="flex gap-2 items-center py-1.5 px-2 w-full">
                        <Settings />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="gap-2 text-red-400 cursor-pointer"
                >
                    <LogOut />
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}

export default ProfileDropdown