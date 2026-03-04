import { useDispatch, useSelector } from "react-redux"
import { forgotPass } from "../features/auth/authSlice"
import { useState } from "react"

const ForgotPassPage = () => {

  const dispatch = useDispatch()
  const { message, error, loading
  } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: ''
  })

  const handleSubmit = async () => {
    dispatch(forgotPass(formData))
    setFormData({
      email: ''
    })
  }

  return (
    <div className="flex flex-col justify-center items-center h-[80dvh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Forgot Password</legend>

        <label className="label">Email</label>
        <input type="email" required onChange={(e) => setFormData({ email: e.target.value })} value={formData.email} className="input focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="email" />

        {
          loading ?
            <button className="btn btn-neutral mt-4 rounded-md">Loading ...</button>
            :
            <button onClick={handleSubmit} className="btn bg-blue-500/80 mt-4 rounded-md">Reset Password</button>
        }
      </fieldset>
    </div>
  )
}

export default ForgotPassPage