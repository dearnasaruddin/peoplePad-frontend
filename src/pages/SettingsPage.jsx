import CommonLayout from '@/components/layout/CommonLayout'
import SettingsListItem from "@/components/shared/SettingsListItem";
import { FaAngleRight } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch"
import AlertBtn from '@/components/shared/AlertBtn';

const SettingsPage = () => {
    return (
        <CommonLayout heading='Settings'>
            <div className='divide-y divide-gray-700 overflow-auto p-2'>

                <div className='flex items-center justify-between cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Change password' />
                    <FaAngleRight className='text-gray-400' />
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Notifications' />
                    <Switch className={'data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-green-500 data-[size=default]:h-6 data-[size=default]:w-11'} thumbClassName={'group-data-[size=default]/switch:size-5 data-[state=checked]:translate-x-[calc(105%)]'} />
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Account privacy' />
                    <div className='flex text-gray-400 items-center gap-1.5'>
                        <span>Public</span>
                        <FaAngleRight />
                    </div>
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Language' />
                    <div className='flex text-gray-400 items-center gap-1.5'>
                        <span>English</span>
                        <FaAngleRight />
                    </div>
                </div>

                <div className='flex items-center justify-between text-gray-200 cursor-pointer hover:bg-gray-900 pr-2'>
                    <SettingsListItem heading='Theme' />
                    <div className='flex text-gray-400 items-center gap-1.5'>
                        <span>Dark</span>
                        <FaAngleRight />
                    </div>
                </div>


                <AlertBtn>
                    <button type="button" className="btn w-full border-none bg-[#bb3b36] mt-4 py-5 rounded-lg">Delete Account</button>
                </AlertBtn>
            </div>
        </CommonLayout>
    )
}

export default SettingsPage