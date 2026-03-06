import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../features/auth/authSlice";
import { toast } from "sonner";


const RegistrationPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(registration(formData))

        toast.success(data.payload.message)

        setFormData({
            username: '',
            email: '',
            password: '',
        })

        setTimeout(() => {
            navigate("/login")
        }, 1500);
    }

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            navigate('/')
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-[80dvh]">
            <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Registration</legend>

                <label className="label text-gray-300">Username</label>
                <input type="text" required name="username" onChange={handleChange} value={formData.username} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="username" />

                <label className="label text-gray-300">Email</label>
                <input type="email" required name="email" onChange={handleChange} value={formData.email} className="input text-gray-300 border focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="email" />

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
                {
                    loading ?
                        <button className="btn btn-neutral mt-4 rounded-md">Loading ...</button>
                        :
                        <button type="submit" className="btn bg-blue-500/80 mt-4 rounded-md">Create account</button>
                }
                <p className="text-center mt-2 text-gray-300">Already have an account? <Link className="text-blue-400 ml-2" to={'/login'}>Login</Link> </p>
            </form>
        </div>
    )
}
export default RegistrationPage