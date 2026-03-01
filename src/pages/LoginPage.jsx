import { useState } from "react";
import { Link } from 'react-router-dom'
import { GoEye, GoEyeClosed } from "react-icons/go";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";


const LoginPage = () => {

  const dispatch = useDispatch()
  const { message, error, loading
  } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    dispatch(login(formData))
    setFormData({
      email: '',
      password: '',
    })
  }


  return (
    <div className="flex flex-col justify-center items-center h-[80dvh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} className="input focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="email" />

        <label className="label">Password</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} className="input focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="password" />
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
            <button onClick={handleSubmit} className="btn btn-neutral mt-4 rounded-md">Login</button>
        }
        <p className="text-center mt-2">Haven't any account?<Link className="text-blue-400 ml-2" to={'/registration'}>Create Account</Link> </p>
      </fieldset>
    </div>
  )
}

export default LoginPage