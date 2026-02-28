import api from '../../api'

const registration = data => api.post('/registration', data)
const login = data => api.post('/login', data)
const verifyEmail = (token, data) => api.post(`/verify/${token}`, data)
const forgotPass = data => api.post('/forgot-password', data)
const resetPass = (token, data) => api.post(`/reset-password/${token}`, data)

export { registration, login, verifyEmail, forgotPass, resetPass }