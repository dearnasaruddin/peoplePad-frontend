import CommonLayout from '@/components/layout/CommonLayout'
import getValidAccessToken from '@/utils/getValidAccessToken'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'sonner'

const MyProfilePage = () => {
    const [userData, setUserData] = useState()

    useEffect(() => {
        const fetchProfileData = async () => {
            const accessToken = await getValidAccessToken()
            if (!accessToken) return
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (response.data?.error) return toast.error(response.data.error)
            setUserData(response.data)
        }
        fetchProfileData()
    }, [])

    return (
        <CommonLayout heading='My Profile'>
            <div className="flex flex-col justify-center items-center p-4">
                {
                    userData?.avatarUrl &&

                    <div className="mx-auto">
                        <img src={userData?.avatarUrl} alt="Preview" className="size-14 lg:size-24 rounded-full object-cover mx-auto border border-gray-600" />
                    </div>
                }

                {userData && <span>{userData.username}</span>}
                hello
            </div>
        </CommonLayout>
    )
}

export default MyProfilePage