import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from 'react';

const AddCategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [metaDescription, setMetaDescription] = useState(""); // State for meta description

  const onSubmit = (data) => {
    const transformedData = {
      ...data,
      meta_Description: metaDescription, // Include meta description from state
      in_Sitemap: data.in_Sitemap === "Yes",
      Index_Page_Option: data.Index_Page_Option === "Yes",
    };

    axios.post('https://api.pnytrainings.com/api/categories', transformedData)
      .then(response => {
        console.log(response);
        alert("Category added successfully!");
        navigate("/course-categories");
      })
      .catch(error => {
        console.error(error);
        alert("Error adding category!");
      });
  };

  return (
    <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto'>
      <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
        Add Category
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Name */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Category Name</label>
          <input
            type='text'
            {...register("Category_Name", { required: "Category Name is required" })}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter category name"
          />
          {errors.Category_Name && <span className="text-red-500">{errors.Category_Name.message}</span>}
        </div>

        {/* URL Slug */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>URL Slug</label>
          <input
            type='text'
            {...register("url_Slug", { required: "URL Slug is required" })}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter URL slug"
          />
          {errors.url_Slug && <span className="text-red-500">{errors.url_Slug.message}</span>}
        </div>

        {/* Short Description */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Short Description</label>
          <input
            type='text'
            {...register("short_Description")}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter short description"
          />
        </div>

        {/* Meta Title */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Meta Title</label>
          <input
            type='text'
            {...register("meta_Title")}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter meta title"
          />
        </div>

        {/* Meta Description */}
        {/* <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Meta Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={metaDescription}
            onChange={(event, editor) => {
              const data = editor.getData();
              setMetaDescription(data); // Update state with CKEditor data
            }}
            config={{
              toolbar: [
                'heading', '|', 'bold', 'italic', 'underline', 'link', '|',
                'bulletedList', 'numberedList', '|', 'blockQuote', 'undo', 'redo'
              ],
              // Set text color styles in the editor
              fontColor: {
                colors: [
                  {
                    color: '#FFFFFF',
                    label: 'White'
                  },
                  {
                    color: '#1a202c',
                    label: 'Dark Gray'
                  },
                  // Add more colors as needed
                ],
              }
            }}
            style={{ height: '200px', backgroundColor: '#1f2937' }} // Set background color
          />
          {errors.meta_Description && <span className="text-red-500">{errors.meta_Description.message}</span>}
        </div> */}
        <div className="mb-4">
  <label className="block text-gray-300 mb-2">Meta Description*</label>
  <ReactQuill
    value={metaDescription}
    onChange={setMetaDescription} // Update state with ReactQuill data
    theme="snow"
    className="bg-white text-black rounded-md"
  // Set height for the editor
  />
  {errors.meta_Description && (
    <span className="text-red-500">{errors.meta_Description.message}</span>
  )}
</div>

        {/* In Sitemap */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>In Sitemap</label>
          <div className='flex space-x-4'>
            <label className='text-gray-400'>
              <input
                 type='checkbox'
                value="Yes"
                {...register("in_Sitemap", { required: "Please select an option" })}
                className='mr-2'
              />
              Yes
            </label>
            <label className='text-gray-400'>
              <input
                type='checkbox'
                value="No"
                {...register("in_Sitemap", { required: "Please select an option" })}
                className='mr-2'
              />
              No
            </label>
          </div>
          {errors.in_Sitemap && <span className="text-red-500">{errors.in_Sitemap.message}</span>}
        </div>

        {/* Page Index */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Page Index</label>
          <div className='flex space-x-4'>
            <label className='text-gray-400'>
              <input
               type='checkbox'
                value="Yes"
                {...register("Index_Page_Option", { required: "Please select an option" })}
                className='mr-2'
              />
              Yes
            </label>
            <label className='text-gray-400'>
              <input
              type='checkbox'
                value="No"
                {...register("Index_Page_Option", { required: "Please select an option" })}
                className='mr-2'
              />
              No
            </label>
          </div>
          {errors.Index_Page_Option && <span className="text-red-500">{errors.Index_Page_Option.message}</span>}
        </div>

        {/* Custom Canonical URL */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Custom Canonical URL</label>
          <input
            type='url'
            {...register("Custom_Canonical_Url")}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter custom canonical URL"
          />
        </div>

        {/* Category Icons */}
        <div className='mb-4'>
          <label className='block text-gray-400 mb-2'>Category Icons</label>
          <input
            type='text'
            {...register("Category_Icons", { required: "Category Icon is required" })}
            className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Enter category icon"
          />
          {errors.Category_Icons && <span className="text-red-500">{errors.Category_Icons.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none transition duration-200 ease-in-out'
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
