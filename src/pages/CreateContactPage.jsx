import ContactForm from "@/components/shared/ContactForm"
import getValidAccessToken from "@/utils/getValidAccessToken"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
        if (response.data?.error) return toast.error(response.data.error)
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
            <ContactForm />
            {/* <ContactForm handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} formData={formData} loading={loading} /> */}
        </div>
    )
}

export default CreateContactPage