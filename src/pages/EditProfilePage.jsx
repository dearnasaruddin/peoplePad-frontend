import CommonLayout from '@/components/layout/CommonLayout'
import UserForm from '@/components/shared/UserForm'
import { useSelector } from 'react-redux'

const EditProfilePage = () => {

  const userToEdit = useSelector(state => state.auth.user)

  return (
    <CommonLayout heading='Edit Profile'>
      <div className="flex flex-col justify-center items-center">
        <UserForm userToEdit={userToEdit} />
      </div>
    </CommonLayout>
  )
}

export default EditProfilePage