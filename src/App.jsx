import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassPage from './pages/ResetPassPage'
import ForgotPassPage from './pages/ForgotPassPage'
import ContactListPage from './pages/ContactListPage'
import CreateContactPage from './pages/CreateContactPage'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ContactListPage />} />
          <Route path='/create' element={<CreateContactPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path={`/verify/:token`} element={<VerifyEmail />} />
          <Route path={`/reset-password/:token`} element={<ResetPassPage />} />
          <Route path={`/forgot-password`} element={<ForgotPassPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
