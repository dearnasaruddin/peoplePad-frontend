import CommonLayout from "@/components/layout/CommonLayout"
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
        <CommonLayout heading='Create Contact'>
            <ContactForm />
        </CommonLayout>
    )
}

export default CreateContactPage