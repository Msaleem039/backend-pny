import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';

const Editspecialbp = () => {
  const { id } = useParams(); // Get post ID from route params
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState({
    postTitle: '',
    postCategory: '',
    postThumbnailImage: '',
    shortDescription: '',
    postDescription: '',
    metaTitle: '',
    metaDescription: '',
    isPublish: false,
    featured: false,
    customCanonicalUrl: ''
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [image, setImage] = useState(null); // State for image file

  // Fetch blog post data for editing
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://api.pnytrainings.com/api/specialcatblog/${id}`);
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.pnytrainings.com/api/citycategory');
        setCategories(response.data); // Set the categories data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchPostData();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPostData({
      ...postData,
      [name]: checked
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store the selected file in the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append regular form fields to formData
    for (const key in postData) {
      formData.append(key, postData[key]);
    }

    // Append the image file to formData
    if (image) {
      formData.append('postThumbnailImage', image);
    }

    try {
      await axios.put(`https://api.pnytrainings.com/api/specialcatblog/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/sp-c-blog-post'); // Redirect back to the list after successful edit
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
  <div className='overflow-auto w-full'>
    <Header/>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-[50%]  mx-auto my-6">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Edit Special Blog Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-100">Post Title</label>
          <input
            type="text"
            name="postTitle"
            value={postData.postTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Post Category</label>
          <select
            name="postCategory"
            value={postData.postCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.cityCategoryName}>
                {category.cityCategoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Thumbnail Image</label>
          <input
            type="file"
            name="postThumbnailImage"
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Short Description</label>
          <textarea
            name="shortDescription"
            value={postData.shortDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Post Description</label>
          <textarea
            name="postDescription"
            value={postData.postDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            rows="6"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={postData.metaTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Meta Description</label>
          <textarea
            name="metaDescription"
            value={postData.metaDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Canonical URL</label>
          <input
            type="text"
            name="customCanonicalUrl"
            value={postData.customCanonicalUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Publish</label>
          <input
            type="checkbox"
            name="isPublish"
            checked={postData.isPublish}
            onChange={handleCheckboxChange}
            className="text-gray-700"
          />{' '}
          <span className="text-gray-300">Yes</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-100">Featured</label>
          <input
            type="checkbox"
            name="featured"
            checked={postData.featured}
            onChange={handleCheckboxChange}
            className="text-gray-700"
          />{' '}
          <span className="text-gray-300">Yes</span>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
          Update Post
        </button>
      </form>
    </div>
  </div>
  );
};

export default Editspecialbp;
