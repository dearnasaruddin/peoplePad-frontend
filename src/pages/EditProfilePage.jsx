import UserForm from '@/components/shared/UserForm'
import { useSelector } from 'react-redux'

const EditProfilePage = () => {

  const userToEdit = useSelector(state => state.auth.user)

  return (
   <div className="flex flex-col justify-center items-center h-[80dvh]">
     <UserForm heading='Edit Profile' userToEdit={userToEdit}/>
   </div>
  )
}

export default EditProfilePage