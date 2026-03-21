import { useDispatch, useSelector } from "react-redux"
import { resetPass } from "../features/auth/authSlice"
import { useState } from "react"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { useParams } from "react-router-dom"

const ResetPassPage = () => {
  const dispatch = useDispatch()
  const { token } = useParams()
  const { message, error, loading
  } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ password: '' })

  const handleSubmit = async () => {

    dispatch(resetPass({token, formData}))

    setFormData({
      password: ''
    })
  }

  return (
    <div className="flex flex-col justify-center items-center h-[80dvh]">
      <fieldset className="fieldset bg-gray-800 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Reset Password</legend>

        <label className="label text-gray-300">New Password</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} required onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} className="input text-gray-300 focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="password" />
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
            <button onClick={handleSubmit} className="btn bg-blue-500/80 mt-4 rounded-md">Set Password</button>
        }
      </fieldset>
    </div>
  )
}

export default ResetPassPage