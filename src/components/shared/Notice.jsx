import { Button } from '../ui/button'

const Notice = ({ handleNotice }) => {
    return (
        <div className="absolute top-0 z-50 h-screen w-full">
            <div className="absolute size-full inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center px-10">
                <div className='max-w-100 bg-gray-800 text-gray-300 p-4 mb-20 text-center rounded-xl shadow-2xl'>
                    <p className='text-left text-sm leading-relaxed'>⚠️ <strong className='mx-1'>Free server notice:</strong> Due to the use of a <strong>free server</strong>, some features may be unavailable. After the 1st request, you may need to <strong className='text-base'>wait about 1 minute</strong>. We appreciate your patience.</p>
                    <Button onClick={handleNotice} variant='outline' className='text-gray-800 mt-3 cursor-pointer'>Got it</Button>
                </div>
            </div>
        </div>
    )
}

export default Notice