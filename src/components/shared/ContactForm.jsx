import getValidAccessToken from '@/utils/getValidAccessToken'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const ContactForm = ({ contactToEdit }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        avatar: null
    })
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        if (contactToEdit) {
            setFormData({
                name: contactToEdit.name || '',
                phone: contactToEdit.phone || '',
                avatar: contactToEdit.avatarUrl || null
            });
            if (contactToEdit?.avatarUrl) setImagePreviewUrl(contactToEdit.avatarUrl);
        }
    }, [contactToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "phone") {
            if (/\D/g.test(value)) alert('Please enter valid number')
            const onlyNumbers = value.replace(/\D/g, "")
            setFormData({ ...formData, [name]: onlyNumbers })
        } else {
            setFormData({ ...formData, [name]: value })
        }
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
        setLoading(true)
        e.preventDefault()

        const accessToken = await getValidAccessToken()
        if (!accessToken) return

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('phone', formData.phone);

        if (formData.avatar && typeof formData.avatar !== 'string') {
            dataToSend.append('avatar', formData.avatar);
        }

        try {
            const response = await axios({
                method: contactToEdit ? 'put' : 'post',
                url: `${import.meta.env.VITE_SERVER_URL}${contactToEdit ? `/update-contact/${contactToEdit._id}` : '/create-contact'}`,
                data: dataToSend,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    // 'Content-Type': 'multipart/form-data'
                }
            })

            setLoading(false)
            if (response.data?.error) return toast.error(response.data.error)
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong!")
        }
    }

    return (

        <form onSubmit={(e) => handleSubmit(e)} className="fieldset bg-gray-800 border-none rounded-box w-full border p-4">

            <label className="label text-gray-300">Full Name</label>
            <input type="text" name="name" value={formData?.name} required onChange={(e) => handleChange(e)} className='input text-gray-300 bg-[#1d232a] border focus:border-none focus:outline-1 focus:outline-gray-400 w-full' placeholder="full name" />

            <label className="label text-gray-300">Phone</label>
            <input type="tel" name="phone" value={formData?.phone} required inputMode="numeric" onChange={(e) => handleChange(e)} className='input text-gray-300 bg-[#1d232a] border focus:border-none focus:outline-1 focus:outline-gray-400 w-full' placeholder="phone" />

            <label className="label text-gray-300">Profile Image</label>

            {imagePreviewUrl ? (
                <div className="mx-auto space-y-2">
                    <img src={imagePreviewUrl} alt="Preview" className="size-14 lg:size-24 rounded-full object-cover mx-auto border border-gray-600" />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn border-none btn-error text-xs lg:text-sm h-7 px-2 lg:px-6"
                    >
                        {contactToEdit ? 'Remove' : 'Change'}
                    </button>
                </div>
            ) : (

                <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="file-input w-full file-input-neutral text-gray-400 bg-[#1d232a] shadow border border-gray-700 focus:border-none focus:outline-1 focus:outline-gray-400" />
            )}

            {
                loading ?
                    <button className="btn border-none mt-4">Loading...</button>

                    :
                    <button type="submit" className="btn border-none shadow grow text-gray-200 bg-blue-500/80 rounded-md mt-4">Save</button>
            }
        </form>

    )
}

export default ContactForm