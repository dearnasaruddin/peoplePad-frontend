import CommonLayout from '@/components/layout/CommonLayout'
import SettingsListItem from "@/components/shared/SettingsListItem";
import { FaAngleRight } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch"
import AlertBtn from '@/components/shared/AlertBtn';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner';
import getValidAccessToken from '@/utils/getValidAccessToken';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

const SettingsPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleDeleteAccount = async () => {

        const accessToken = await getValidAccessToken()
        if (!accessToken) return

        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-profile`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (response.data?.error) return toast.error(response.data.error)
            toast.success(response.data.message)
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    return (
        <CommonLayout heading='Settings'>
            <div className='divide-y divide-gray-700 overflow-auto p-2'>

                <Link to={'/change-password'} className='flex items-center justify-between cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Change password' />
                    <FaAngleRight className='text-gray-400' />
                </Link>

                <div className='flex items-center justify-between text-gray-200 hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Notifications' />
                    <Switch className={'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 data-[size=default]:h-6 data-[size=default]:w-11 cursor-pointer'} thumbClassName={'group-data-[size=default]/switch:size-5 data-[state=checked]:translate-x-[calc(105%)]'} />
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Account privacy' />
                    <div className='flex text-gray-400 items-center gap-1.5'>
                        <span className='text-sm'>Public</span>
                        <FaAngleRight />
                    </div>
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Language' />
                    <div className='flex text-gray-400 items-center gap-1.5'>
                        <span className='text-sm'>English</span>
                        <FaAngleRight />
                    </div>
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Theme' />
                    <div className='flex text-gray-400 items-center gap-1.5'>
                        <span className='text-sm'>Dark</span>
                        <FaAngleRight />
                    </div>
                </div>


                <AlertBtn mainBtnOnClick={handleDeleteAccount}>
                    <button type="button" className="btn w-full border-none bg-[#bb3b36] mt-4 py-5 rounded-lg">Delete Account</button>
                </AlertBtn>
            </div>
        </CommonLayout>
    )
}

export default SettingsPage