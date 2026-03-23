import { useState } from "react"
import { GoEye, GoEyeClosed } from "react-icons/go"
import CommonLayout from '@/components/layout/CommonLayout'
import axios from "axios";
import getValidAccessToken from "@/utils/getValidAccessToken";
import { toast } from "sonner";

const ChangePassPage = () => {

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false
    });
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const accessToken = await getValidAccessToken()
            if (!accessToken) return

            const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/change-password`, {
                ...formData
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setLoading(false)
            if (response.data?.error) return toast.error(response.data.error)
            toast.success(response.data.message)
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            })
            
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong!")
        }
    }

    return (
        <CommonLayout heading='Change Password'>

            <form onSubmit={handleSubmit} className="fieldset bg-gray-800 border-none rounded-box w-full border p-4">

                <label className="label text-gray-300">Current Password</label>
                <div className="relative">
                    <input type={showPassword.currentPassword ? 'text' : 'password'} required name="currentPassword" onChange={handleChange} value={formData.currentPassword} className="input w-full text-gray-300 focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="Current password" />
                    {formData.currentPassword &&
                        (showPassword.currentPassword ?
                            <span onClick={() => setShowPassword({ ...showPassword, currentPassword: false })} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEye /></span>
                            :
                            <span onClick={() => setShowPassword({ ...showPassword, currentPassword: true })} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEyeClosed /></span>)
                    }
                </div>

                <label className="label text-gray-300">New Password</label>
                <div className="relative">
                    <input type={showPassword.newPassword ? 'text' : 'password'} required name="newPassword" onChange={handleChange} value={formData.newPassword} className="input w-full text-gray-300 focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="New password" />
                    {formData.newPassword &&
                        (showPassword.newPassword ?
                            <span onClick={() => setShowPassword({ ...showPassword, newPassword: false })} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEye /></span>
                            :
                            <span onClick={() => setShowPassword({ ...showPassword, newPassword: true })} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEyeClosed /></span>)
                    }
                </div>

                <label className="label text-gray-300">Confirm New Password</label>
                <div className="relative">
                    <input type={showPassword.confirmNewPassword ? 'text' : 'password'} required name="confirmNewPassword" onChange={handleChange} value={formData.confirmNewPassword} className="input w-full text-gray-300 focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="confirm new password" />
                    {formData.confirmNewPassword &&
                        (showPassword.confirmNewPassword ?
                            <span onClick={() => setShowPassword({ ...showPassword, confirmNewPassword: false })} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEye /></span>
                            :
                            <span onClick={() => setShowPassword({ ...showPassword, confirmNewPassword: true })} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEyeClosed /></span>)
                    }
                </div>

                {
                    loading ?
                        <button className="btn border-none btn-neutral mt-4 rounded-md">Loading ...</button>
                        :
                        <button type="submit" className="btn border-none bg-blue-500/80 mt-4 rounded-md">Set Password</button>
                }
            </form>

        </CommonLayout>
    )
}

export default ChangePassPage