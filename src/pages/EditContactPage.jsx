import { useLocation } from 'react-router-dom';
import ContactForm from "@/components/shared/ContactForm"


const EditContactPage = () => {
    const location = useLocation()
    return (
        <div className='flex flex-col justify-center items-center h-[80vh]'>
            <ContactForm contactToEdit={location.state} heading='Edit Contact' />
        </div>
    )
}

export default EditContactPage