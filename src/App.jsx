import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassPage from './pages/ResetPassPage'
import ForgotPassPage from './pages/ForgotPassPage'
import ContactListPage from './pages/ContactListPage'
import CreateContactPage from './pages/CreateContactPage'
import { Toaster } from './components/ui/sonner'
import EditContactPage from './pages/EditContactPage'
import EditProfilePage from './pages/EditProfilePage'
import SettingsPage from './pages/SettingsPage'
import ChangePassPage from './pages/ChangePassPage'
import MyProfilePage from './pages/MyProfilePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ContactListPage />} />
          <Route path='/my-profile' element={<MyProfilePage />} />
          <Route path='/edit-profile' element={<EditProfilePage />} />
          <Route path='/create-contact' element={<CreateContactPage />} />
          <Route path='/edit-contact' element={<EditContactPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path={`/verify/:token`} element={<VerifyEmail />} />
          <Route path={`/reset-password/:token`} element={<ResetPassPage />} />
          <Route path={'/forgot-password'} element={<ForgotPassPage />} />
          <Route path={'/settings'} element={<SettingsPage />} />
          <Route path={'/change-password'} element={<ChangePassPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
