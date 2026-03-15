import {Link} from 'react-router-dom'

const EmptyState = ({ text }) => {
  return (
    <div className='h-[30dvh] text-center flex justify-center items-center'>
      <div>
        <p className='text-gray-300 mb-3'>{text}</p>
        <Link to={'/create-contact'} className='btn btn-primary'>Create Contact</Link>
      </div>
    </div>
  )
}

export default EmptyState