import { useSelector } from 'react-redux'
import Header from './Header'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CommonLayout = ({ children, heading }) => {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (!auth.accessToken) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="h-[90vh] flex items-center justify-center p-4 font-sans">

            <div className="w-full max-w-md bg-gray-800 border-gray-700 rounded-xl shadow-2xl overflow-hidden border ">
                {/* Header */}
                <Header heading={heading} auth={auth} />
                <div className='h-[52dvh]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CommonLayout