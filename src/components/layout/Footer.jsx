
const Footer = ({ itemCount }) => {
    return (
        <div className="bg-gray-800 p-2 lg:p-4 text-center border-t border-gray-700 cursor-default mt-auto">
            {itemCount > 0 &&
                <span className="text-gray-400 text-sm font-medium">
                    {itemCount} contacts
                </span>
            }
        </div>
    )
}

export default Footer