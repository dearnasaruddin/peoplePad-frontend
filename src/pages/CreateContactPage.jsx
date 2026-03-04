import { useState } from "react"
import { Link } from "react-router-dom"


const CreateContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        file: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };
    

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    return (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Create Contact</legend>

                <label className="label">Full Name</label>
                <input type="text" name="name" value={formData.name} required onChange={handleChange} className="input focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="full name" />

                <label className="label">Phone</label>
                <input type="number" name="phone" value={formData.phone} required onChange={handleChange} className="input focus:border-none focus:outline-1 focus:outline-gray-400" placeholder="phone" />

                <label className="label">Profile Image</label>
                <input type="file" onChange={handleFileChange} className="file-input focus:border-none focus:outline-1 focus:outline-gray-400" />

                <div className="flex gap-2.5 items-center mt-4">
                    <Link to={'/'} className="btn grow btn-neutral rounded-md">Cancel</Link>
                    <button type="submit" className="btn grow bg-blue-500/80 rounded-md">Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateContactPage