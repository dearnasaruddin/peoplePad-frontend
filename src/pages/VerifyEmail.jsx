import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { verify } from "../features/auth/authSlice"
import { useEffect } from "react"

const VerifyEmail = () => {
  const dispatch = useDispatch()
  const { token } = useParams()
  const { message, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(verify(token))
  }, [])

  return (
    loading ?
      <div>Email verifying...</div>
      :
      <div>{message}</div>
  )
}

export default VerifyEmail