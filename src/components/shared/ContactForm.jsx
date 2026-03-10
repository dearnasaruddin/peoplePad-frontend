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

    useEffect(() => {
        if (contactToEdit) {
            setFormData({
                name: contactToEdit.name || '',
                phone: contactToEdit.phone || '',
                avatar: contactToEdit.avatarUrl || null
            });
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

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };


    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const accessToken = await getValidAccessToken()
        if (!accessToken) return

        const response = await axios({
            method: contactToEdit ? 'put' : 'post',
            url: `${import.meta.env.VITE_SERVER_URL}${contactToEdit ? `/update-contact/${contactToEdit._id}` : '/create-contact'}`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        setFormData({
            name: '',
            phone: '',
            avatar: null
        })

        setLoading(false)
        if (response.data?.error) return toast.error(response.data.error)
        toast.success(response.data.message)
        navigate('/')
    }

    return (

        <form onSubmit={(e) => handleSubmit(e)} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Create Contact</legend>

            <label className="label text-gray-300">Full Name</label>
            <input type="text" name="name" value={formData?.name} required onChange={(e) => handleChange(e)} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="full name" />

            <label className="label text-gray-300">Phone</label>
            <input type="tel" name="phone" value={formData?.phone} required inputMode="numeric" onChange={(e) => handleChange(e)} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="phone" />

            <label className="label text-gray-300">Profile Image</label>
            
            {formData.avatar ? (
                <div className="mx-auto space-y-2">
                    <img src={formData.avatar} alt="Current" className="size-14 rounded-full object-cover border border-gray-600" />
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: null })}
                        className="btn btn-xs btn-error ml-auto"
                    >
                        Change
                    </button>
                </div>
            ) : (
   
                <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="file-input w-full file-input-neutral text-gray-400 border border-gray-700 focus:border-none focus:outline-1 focus:outline-gray-400" />
            )}

            {
                loading ?
                    <button className="btn">Loading...</button>

                    :
                    <div className="flex gap-2.5 items-center mt-4">
                        <Link to={'/'} className="btn grow btn-neutral rounded-md">Cancel</Link>
                        <button type="submit" className="btn grow bg-blue-500/80 rounded-md">Save</button>
                    </div>
            }
        </form>

    )
}

export default ContactForm