import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const getValidAccessToken = async () => {

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) return null;

    try {
        const currentAccessToken = jwtDecode(userInfo.accessToken)
        if (currentAccessToken?.exp * 1000 < Date.now()) {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/refresh`, { withCredentials: true })

            userInfo.accessToken = res.data?.accessToken
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            return res.data.accessToken;

        } else {
            return userInfo?.accessToken;
        }
    } catch (error) {
        console.error("Token handling error:", error.message);
        return null
    }

};

export default getValidAccessToken