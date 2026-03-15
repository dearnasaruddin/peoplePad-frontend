import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "@/components/shared/UserForm";


const RegistrationPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            navigate('/')
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-[80dvh]">
            <UserForm heading='Registration'/>
        </div>
    )
}
export default RegistrationPage