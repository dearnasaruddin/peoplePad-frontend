import CommonLayout from '@/components/layout/CommonLayout'
import getValidAccessToken from '@/utils/getValidAccessToken'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
                    userData ?
                        (
                            <>
                                {
                                    userData?.avatarUrl &&
                                    <div className="mx-auto">
                                        <img src={userData?.avatarUrl} alt="Preview" className="size-14 lg:size-24 rounded-full object-cover mx-auto border border-gray-600" />
                                        <h5 className='capitalize text-xl mt-1 text-gray-200'>{userData?.username}</h5>
                                    </div>
                                }

                                <div className='space-y-1 mt-2'>
                                    <label className="label text-gray-300 text-sm ml-1">Username</label>
                                    <input type="text" disabled name="username" value={userData.username} className='input w-full text-gray-300 bg-[#1d232a] border border-gray-700 rounded-md focus:border-none focus:outline-1 focus:outline-gray-400' placeholder="username" />

                                    <label className="label text-gray-300 text-sm ml-1">Email</label>
                                    <input type="email" disabled name="email" value={userData.email} className='input w-full text-gray-300 bg-[#1d232a] border border-gray-700 rounded-md focus:border-none focus:outline-1 focus:outline-gray-400' placeholder="email" />

                                    <label className="label text-gray-300 text-sm ml-1">Phone</label>
                                    <input type="text" disabled name="email" value={userData.phone ? userData.phone : 'N/A'} className='input w-full text-gray-300 bg-[#1d232a] border border-gray-700 rounded-md focus:border-none focus:outline-1 focus:outline-gray-400' placeholder="Phone" />

                                    <Link to={'/edit-profile'} className="btn border-none shadow w-full bg-blue-500/80 rounded-md mt-4">Edit Profile</Link>
                                </div>
                            </>
                        )

                        :
                        <div className='text-gray-400'>No user Found</div>
                }


            </div>
        </CommonLayout>
    )
}

export default MyProfilePage