import api from '../../api'

const registration = data => api.post('/registration', data)
const login = data => api.post('/login', data)
const verifyEmail = (token) => api.get(`/verify/${token}`)
const forgotPass = email => api.post('/forgot-password', email)
const resetPass = (token, data) => api.post(`/reset-password/${token}`, data)

export { registration, login, verifyEmail, forgotPass, resetPass }