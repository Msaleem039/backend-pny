import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";

const AddBlogCate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Convert the "Yes" and "No" string values to boolean
    const categoryData = {
      ...data,
      inSitemap: data.inSitemap === "Yes",
      indexPage: data.indexPage === "Yes"
    };

    try {
      const res = await axios.post('https://api.pnytrainings.com/api/blogcate', categoryData);
      if (res.status === 201) {
        console.log('Category added successfully', res.data);
        navigate("/blog-categories");
      } else {
        console.error('Error adding category', res.data);
      }
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10'>
        <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
          Add Blog Category
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Category Name */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Category Name*</label>
            <input
              type='text'
              {...register("categoryName", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter category name"
            />
            {errors.categoryName && <span className="text-red-500">Category Name is required</span>}
          </div>

          {/* URL Slug */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>URL Slug</label>
            <input
              type='text'
              {...register("urlSlug")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter URL slug"
            />
          </div>

          {/* Short Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Short Description</label>
            <textarea
              {...register("shortDescription")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter short description"
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

          {/* In Sitemap */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>In Sitemap</label>
            <select
              {...register("inSitemap", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.inSitemap && <span className="text-red-500">In Sitemap option is required</span>}
          </div>

          {/* Index Page */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Index Page</label>
            <select
              {...register("indexPage", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.indexPage && <span className="text-red-500">Index Page option is required</span>}
          </div>

          {/* Canonical URL */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Canonical URL</label>
            <input
              type='url'
              {...register("canonicalUrl")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter canonical URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none'
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCate;
