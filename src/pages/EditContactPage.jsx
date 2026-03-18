import { useLocation } from 'react-router-dom';
import ContactForm from "@/components/shared/ContactForm"
import CommonLayout from '@/components/layout/CommonLayout';


const EditContactPage = () => {
    const location = useLocation()
    return (
        <CommonLayout heading='Edit Contact'>
            <ContactForm contactToEdit={location.state} />
        </CommonLayout>
    )
}

export default EditContactPage