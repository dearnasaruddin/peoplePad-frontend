import { useSelector } from 'react-redux'
import Header from './Header'

const CommonLayout = ({children, heading}) => {
    
    const auth = useSelector(state => state.auth)


    return (
        <div className="h-[90vh] flex items-center justify-center p-4 font-sans">

            <div className="w-full max-w-md bg-base-200 border-gray-700 rounded-xl shadow-2xl overflow-hidden border ">
                {/* Header */}
                <Header heading={heading} auth={auth} />
                <div className='h-[45dvh]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CommonLayout