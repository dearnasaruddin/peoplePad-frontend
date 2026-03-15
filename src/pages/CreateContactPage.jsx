import ContactForm from "@/components/shared/ContactForm"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const CreateContactPage = () => {

    const navigate = useNavigate()


    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('userInfo'))?.accessToken) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <ContactForm heading='Create Contact'/>
        </div>
    )
}

export default CreateContactPage