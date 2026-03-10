import getValidAccessToken from "@/utils/getValidAccessToken"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"


const CreateContactPage = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        avatar: null
    })

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

        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/create-contact`, {
            ...formData
        },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

        )

        setFormData({
            name: '',
            phone: '',
            avatar: null
        })

        setLoading(false)
        if(response.data?.error) return toast.error(response.data.error)
        toast.success(response.data.message)
        navigate('/')
    }

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('userInfo'))?.accessToken) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Create Contact</legend>

                <label className="label text-gray-300">Full Name</label>
                <input type="text" name="name" value={formData.name} required onChange={handleChange} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="full name" />

                <label className="label text-gray-300">Phone</label>
                <input type="tel" name="phone" value={formData.phone} required inputMode="numeric" onChange={handleChange} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="phone" />

                <label className="label text-gray-300">Profile Image</label>
                <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="file-input file-input-neutral text-gray-400 border border-gray-700 focus:border-none focus:outline-1 focus:outline-gray-400" />

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
        </div>
    )
}

export default CreateContactPage