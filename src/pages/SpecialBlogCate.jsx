import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpecialBlogCate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Instructor Added:", { name, email, phone, profilePic });
    navigate("/users"); // Redirect to instructors page after successful form submission
  };

  return (
    <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto'>
      <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
        Add Instructor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2' htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter instructor's name"
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-400 mb-2' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter email address"
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-400 mb-2' htmlFor='phone'>
            Phone Number
          </label>
          <input
            type='tel'
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-400 mb-2' htmlFor='profilePic'>
            Profile Picture
          </label>
          <input
            type='file'
            id='profilePic'
            onChange={(e) => setProfilePic(e.target.files[0])}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            accept="image/*"
          />
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none'
        >
          Add Instructor
        </button>
      </form>
    </div>
  );
};

export default SpecialBlogCate;