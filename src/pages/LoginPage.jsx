import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { GoEye, GoEyeClosed } from "react-icons/go";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


const LoginPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, accessToken } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
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

    const response = await dispatch(login(formData))
    if (response.payload.error) return toast.error(response.payload.error)
    toast.success(response.payload.message)

    setFormData({
      email: '',
      password: '',
    })

    setTimeout(() => {
      navigate("/")
    }, 1500);
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

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
        <Link className="text-blue-400 ml-2" to={'/forgot-password'}>Forgot password?</Link>
        {
          loading ?
            <button className="btn btn-neutral mt-4 rounded-md">Loading ...</button>
            :
            <button type="submit" className="btn bg-blue-500/80 mt-4 rounded-md">Login</button>
        }
        <p className="text-center mt-2 text-gray-300">Haven't any account?<Link className="text-blue-400 ml-2" to={'/registration'}>Create Account</Link> </p>
      </form>
    </div>
  )
}

export default LoginPage