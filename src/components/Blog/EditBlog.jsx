import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from URL parameters
  const navigate = useNavigate(); // Use to navigate back after editing
  const [formData, setFormData] = useState({
    postTitle: '',
    shortDescription: '',
    status: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://api.pnytrainings.com/api/blogpost/${id}`);
        setFormData({
          postTitle: response.data.postTitle,
          shortDescription: response.data.shortDescription,
          status: response.data.status,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://api.pnytrainings.com/api/blogpost/${id}`, formData);
      // Redirect after successful edit
      navigate('/blog-post'); // Change this to your desired route
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg w-full ">
      <h2 className="text-2xl font-bold mb-4 ">Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Title</label>
          <input
            type="text"
            name="postTitle"
            className="w-full px-3 py-2 border text-black rounded-md"
            value={formData.postTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium ">Short Description</label>
          <textarea
            name="shortDescription"
            className="w-full px-3 py-2 border rounded-md text-black"
            value={formData.shortDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium ">Status</label>
          <input
            type="text"
            name="status"
            className="w-full px-3 py-2 border  rounded-md text-black"
            value={formData.status}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;

