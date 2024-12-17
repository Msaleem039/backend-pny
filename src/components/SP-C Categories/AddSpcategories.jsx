import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";

const AddSpcategories = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        inSitemap: data.inSitemap === "Yes",  // Convert "Yes" to true and "No" to false
        indexPage: data.indexPage === "Yes"    // Convert "Yes" to true and "No" to false
      };
  
      let res = await axios.post('https://api.pnytrainings.com/api/citycategory', requestData);
      console.log('Special course category added:', res.data);
      navigate("/sp-c-categories");
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10'>
        <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
          Add City wise category
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* City Category Name */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>City Category Name*</label>
            <input
              type='text'
              {...register("cityCategoryName", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter city category name"
            />
            {errors.cityCategoryName && <span className="text-red-500">City Category Name is required</span>}
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

          {/* Meta Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Title*</label>
            <input
              type='text'
              {...register("metaTitle", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta title"
            />
            {errors.metaTitle && <span className="text-red-500">Meta Title is required</span>}
          </div>

          {/* Meta Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Description*</label>
            <textarea
              {...register("metaDescription", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta description"
            />
            {errors.metaDescription && <span className="text-red-500">Meta Description is required</span>}
          </div>

          {/* In Sitemap Option */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>In Sitemap*</label>
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

          {/* Index Page Option */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Index Page*</label>
            <select
              {...register("indexPage", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.indexPage && <span className="text-red-500">Index Page option is required</span>}
          </div>

          {/* Custom Canonical Url */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Custom Canonical Url</label>
            <input
              type='text'
              {...register("customCanonicalUrl")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter custom canonical URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'
          >
            Add City Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSpcategories;
