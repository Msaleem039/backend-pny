import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const AddBlog = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.pnytrainings.com/api/blogcate');
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []); 

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setValue("postThumbImage", file); // Update form state
  };

  const onSubmit = async (data) => {
    try {
      // Check if a file is selected
      if (!data.postThumbImage) {
        console.error("No file selected for thumbnail image.");
        return;
      }

      const formData = new FormData();
      formData.append("postTitle", data.postTitle);
      formData.append("urlSlug", data.urlSlug);
      formData.append("postCategory", data.postCategory);
      formData.append("postThumbImage", data.postThumbImage); // Add the file here
      formData.append("shortDescription", data.shortDescription);
      formData.append("postDescription", data.postDescription);
      formData.append("isPublish", data.isPublish || false);
      formData.append("featured", data.featured || false);
      formData.append("metaTitle", data.metaTitle);
      formData.append("metaDescription", data.metaDescription);
      formData.append("inSitemap", data.inSitemap || false);
      formData.append("pageIndex", data.pageIndex || false);
      formData.append("customCanonicalUrl", data.customCanonicalUrl);

      const res = await axios.post('https://api.pnytrainings.com/api/blogpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Important for file upload
        }
      });

      if (res.status === 200) {
        navigate("/blogs"); // Redirect on success
      } else {
        console.error('Error adding blog:', res.data);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10'>
        <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>Add Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Post Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Title*</label>
            <input
              type='text'
              {...register("postTitle", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post title"
            />
            {errors.postTitle && <span className="text-red-500">Post Title is required</span>}
          </div>

          {/* URL Slug */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>URL Slug*</label>
            <input
              type='text'
              {...register("urlSlug", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter URL slug"
            />
            {errors.urlSlug && <span className="text-red-500">URL Slug is required</span>}
          </div>

          {/* Post Category */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Category*</label>
            <select
              {...register("postCategory", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.categoryName}</option>
              ))}
            </select>
            {errors.postCategory && <span className="text-red-500">Post Category is required</span>}
          </div>

          {/* Post Thumbnail Image */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Thumbnail Image*</label>
            <input
              type='file'
              {...register("postThumbImage", { required: true })}
              accept="image/*"
              onChange={handleFileChange} // Update file when selected
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.postThumbImage && <span className="text-red-500">Post Thumbnail Image is required</span>}
          </div>

          {/* Short Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Short Description*</label>
            <textarea
              {...register("shortDescription", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter short description"
            />
            {errors.shortDescription && <span className="text-red-500">Short Description is required</span>}
          </div>

          {/* Post Description */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Post Description*</label>
            <ReactQuill
              value={watch('postDescription') || ''} // Setting the initial value
              onChange={(content) => setValue('postDescription', content)} // Update form state with ReactQuill data
              theme="snow"
              className="text-gray-700 bg-white rounded-md"
            />
            {errors.postDescription && (
              <span className="text-red-500">Post Description is required</span>
            )}
          </div>

          {/* Publish Status */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Publish</label>
            <input
              type="checkbox"
              {...register("isPublish")}
              className='mr-2'
            />
          </div>

          {/* Featured Status */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Featured</label>
            <input
              type="checkbox"
              {...register("featured")}
              className='mr-2'
            />
          </div>

          {/* Meta Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Title</label>
            <input
              type='text'
              {...register("metaTitle")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta title"
            />
          </div>

          {/* Meta Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Description</label>
            <textarea
              {...register("metaDescription")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta description"
            />
          </div>

          {/* Custom Canonical URL */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Canonical URL</label>
            <input
              type='text'
              {...register("customCanonicalUrl")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter canonical URL"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
