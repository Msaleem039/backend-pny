import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from URL parameters
  const navigate = useNavigate(); // Use to navigate back after editing
  const [formData, setFormData] = useState({
    postTitle: '',
    urlSlug: '',
    postCategory: '',
    postThumbnailImage: '',
    shortDescription: '',
    postDescription: '',
    isPublish: false,
    featured: false,
    metaTitle: '',
    metaDescription: '',
    inSitemap: false,
    pageIndex: false,
    customCanonicalUrl: ''
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://api.pnytrainings.com/api/blogpost/${id}`);
        const blog = response.data;
        setFormData({
          postTitle: blog.postTitle,
          urlSlug: blog.urlSlug,
          postCategory: blog.postCategory,
          postThumbnailImage: blog.postThumbnailImage,
          shortDescription: blog.shortDescription,
          postDescription: blog.postDescription,
          isPublish: blog.isPublish,
          featured: blog.featured,
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
          inSitemap: blog.inSitemap,
          pageIndex: blog.pageIndex,
          customCanonicalUrl: blog.customCanonicalUrl
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      postThumbnailImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBlogData = new FormData();

    Object.keys(formData).forEach((key) => {
      updatedBlogData.append(key, formData[key]);
    });

    try {
      await axios.put(`https://api.pnytrainings.com/api/blogpost/${id}`, updatedBlogData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      // Redirect after successful edit
      navigate('/blog-post');
       // Change this to your desired route
       toast.success("blog updated successfully")
    } catch (error) {
      toast.error('Error updating blog:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg w-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
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
          <label className="block text-sm font-medium text-white">URL Slug</label>
          <input
            type="text"
            name="urlSlug"
            className="w-full px-3 py-2 border text-black rounded-md"
            value={formData.urlSlug}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Category</label>
          <input
            type="text"
            name="postCategory"
            className="w-full px-3 py-2 border text-black rounded-md"
            value={formData.postCategory}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Short Description</label>
          <textarea
            name="shortDescription"
            className="w-full px-3 py-2 border rounded-md text-black"
            value={formData.shortDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Post Description</label>
          <textarea
            name="postDescription"
            className="w-full px-3 py-2 border rounded-md text-black"
            value={formData.postDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Publish Status</label>
          <input
            type="checkbox"
            name="isPublish"
            checked={formData.isPublish}
            onChange={(e) => setFormData({ ...formData, isPublish: e.target.checked })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Featured Status</label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            className="w-full px-3 py-2 border text-black rounded-md"
            value={formData.metaTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Meta Description</label>
          <textarea
            name="metaDescription"
            className="w-full px-3 py-2 border rounded-md text-black"
            value={formData.metaDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Canonical URL</label>
          <input
            type="text"
            name="customCanonicalUrl"
            className="w-full px-3 py-2 border text-black rounded-md"
            value={formData.customCanonicalUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Thumbnail Image</label>
          <input
            type="file"
            name="postThumbnailImage"
            className="w-full px-3 py-2 border text-black rounded-md"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
