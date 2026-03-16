import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registration, updateUserProfile } from "../../features/auth/authSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import getValidAccessToken from "@/utils/getValidAccessToken";
import axios from "axios";

const UserForm = ({ heading, userToEdit }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: null
    })
    const [showPassword, setShowPassword] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                username: userToEdit.username || '',
                email: userToEdit.email || '',
                avatar: userToEdit.avatarUrl || null
            })
            if (userToEdit?.avatarUrl) setImagePreviewUrl(userToEdit.avatarUrl)
        }
    }, [userToEdit])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, avatar: null });
        setImagePreviewUrl(null);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, avatar: file });
            const tempUrl = URL.createObjectURL(file)
            setImagePreviewUrl(tempUrl);
        } else {
            handleRemoveImage()
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingState(true)
        if (userToEdit) {
            const accessToken = await getValidAccessToken()
            if (!accessToken) return

            const dataToSend = new FormData();
            dataToSend.append('username', formData.username);
            dataToSend.append('email', formData.email);

            if (formData.avatar && typeof formData.avatar !== 'string') {
                dataToSend.append('avatar', formData.avatar);
            }

            try {
                const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/edit-profile`, dataToSend, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                if (response.data?.error) return toast.error(response.data.error)

                dispatch(updateUserProfile({
                    username: response.data.user.username,
                    email: response.data.user.email,
                    avatarUrl: response.data.user.avatarUrl || null
                }))

                toast.success(response.data.message)
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    avatar: null
                })

                setTimeout(() => {
                    navigate('/')
                }, 1500);
                
                setLoadingState(false)
            } catch (error) {
                toast.error("Something went wrong!")
            }



        } else {
            try {
                const data = await dispatch(registration(formData))
                if (data.payload.error) return toast.error(data.payload.error)
                toast.success(data.payload.message)
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    avatar: null
                })

                setTimeout(() => {
                    navigate('/login')
                }, 1500);

                setLoadingState(false)
            } catch (error) {
                toast.error("Something went wrong!")
            }
        }

    }


    return (
        <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">{heading}</legend>

            <label className="label text-gray-300">Username</label>
            <input type="text" required name="username" onChange={handleChange} value={formData.username} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="username" />

            <label className="label text-gray-300">Email</label>
            <input type="email" required name="email" onChange={handleChange} value={formData.email} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="email" />

            {userToEdit ?
                <>
                    <label className="label text-gray-300">Profile Image</label>
                    {imagePreviewUrl ?
                        (
                            <div className="mx-auto space-y-2">
                                <img src={imagePreviewUrl} alt="Preview" className="size-14 rounded-full object-cover border border-gray-600" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="btn btn-xs btn-error ml-auto"
                                >
                                    {userToEdit ? 'Remove' : 'Change'}
                                </button>
                            </div>
                        ) : (

                            <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="file-input w-full file-input-neutral text-gray-400 border border-gray-700 focus:border-none focus:outline-1 focus:outline-gray-400" />
                        )}
                </>
                :
                <>
                    <label className="label text-gray-300">Password</label>
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} required name="password" onChange={handleChange} value={formData.password} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="password" />
                        {formData.password &&
                            (showPassword ?
                                <span onClick={() => setShowPassword(false)} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEye /></span>
                                :
                                <span onClick={() => setShowPassword(true)} className="absolute top-1/2 -translate-y-1/2 text-lg text-gray-300 right-3 cursor-pointer"><GoEyeClosed /></span>)
                        }
                    </div>
                </>
            }

            {
                loadingState ?
                    <button className="btn btn-neutral mt-4 rounded-md">Loading ...</button>
                    :

                    userToEdit ?
                        <div className="flex gap-2.5 items-center mt-4">
                            <Link to={'/'} className="btn grow btn-neutral rounded-md">Cancel</Link>
                            <button type="submit" className="btn grow bg-blue-500/80 rounded-md">Save</button>
                        </div>
                        :
                        <button type="submit" className="btn bg-blue-500/80 mt-4 rounded-md">Create account</button>
            }

            {!userToEdit &&
                <p className="text-center mt-2 text-gray-300">Already have an account? <Link className="text-blue-400 ml-2" to={'/login'}>Login</Link> </p>
            }
        </form>
    )
}

export default UserForm