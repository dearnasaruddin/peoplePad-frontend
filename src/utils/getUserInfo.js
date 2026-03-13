const getUserInfoFromStorage = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : { user: null, accessToken: null };
    } catch (error) {
        return { user: null, accessToken: null };
    }
};

export default getUserInfoFromStorage