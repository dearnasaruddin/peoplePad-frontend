import CommonLayout from '@/components/layout/CommonLayout'
import SettingsListItem from "@/components/shared/SettingsListItem";

const SettingsPage = () => {
    return (
        <CommonLayout heading='Settings'>
            <div className='divide-y divide-gray-700 overflow-auto p-2'>
                <SettingsListItem heading='Change password' />
                <SettingsListItem heading='Notifications' />
                <SettingsListItem heading='Account privacy' />
                <SettingsListItem heading='Language' />
                <SettingsListItem heading='Theme' />
                <button type="button" className="btn w-full grow bg-red-500/80 mt-4 py-5 rounded-lg">Delete Account</button>
            </div>
        </CommonLayout>
    )
}

export default SettingsPage