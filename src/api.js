import axios from 'axios'
import {jwtDecode} from 'jwt-decode'


const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

let accessToken = localStorage.getItem('userInfo') ?  JSON.parse(localStorage.getItem('userInfo')).accessToken : null
export const setToken = token => accessToken = token

api.interceptors.request.use(async (config) => {
    
    if (accessToken) {
        const decoded = jwtDecode(accessToken)

        // ======== req for new accessToken if existing token expired ========
        if (decoded.exp * 1000 < Date.now()) {
            const rest = await api.post('/refresh')
            accessToken = rest.data.accessToken
        }

        config.headers.Authorization = `Bearer ${accessToken}`

    }
    return config
})

export default api