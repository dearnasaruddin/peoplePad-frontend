import { FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Header = () => {
    return (
        <div className="bg-[#3b71ca] p-4 flex justify-between items-center text-white">

            {/* User */}
            <div className="size-10 flex justify-center items-center border rounded-full">
                <FaUser className="text-2xl m-1" />
            </div>

            <h1 className="text-xl font-semibold tracking-wide">PeoplePad</h1>

            {/* Add Button */}
            <button className="bg-white/20 hover:bg-white/30 transition rounded-full p-1.5 backdrop-blur-sm cursor-pointer">
                <IoMdAdd className="text-2xl" />
            </button>
        </div>
    )
}

export default Header