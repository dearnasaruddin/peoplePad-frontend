import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassPage from './pages/ResetPassPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegistrationPage/>} /> 
        <Route path='/registration' element={<RegistrationPage/>} /> 
        <Route path='/login' element={<LoginPage/>} /> 
        <Route path={`/verify/:token`} element={<VerifyEmail/>} /> 
        <Route path={`/reset/:token`} element={<ResetPassPage/>} /> 
        <Route path={`/forgot-password`} element={<ResetPassPage/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
