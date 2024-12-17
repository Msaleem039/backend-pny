import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";

const AddSpecialbp = () => {
  const navigate = useNavigate();

  // Single state to handle all form values
  const [formData, setFormData] = useState({
    postTitle: "",
    urlSlug: "",
    postCategory: "",
    shortDescription: "",
    postDescription: "",
    postThumbnailImage: null,
    postTags: "",
    metaTitle: "",
    metaDescription: "",
    isPublish: false,
    featured: false,
    inSitemap: false,
    pageIndex: false,
    customCanonicalUrl: ""
  });

  const [cityCategories, setCityCategories] = useState([]);

  // Fetch city categories when the component mounts
  useEffect(() => {
    const fetchCityCategories = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/citycategory");
        setCityCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching city categories:", error);
      }
    };

    fetchCityCategories();
  }, []);

  // Handle change for all form inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare data for submission
    const formSubmitData = new FormData();
    Object.keys(formData).forEach((key) => {
      formSubmitData.append(key, formData[key]);
    });
  
    try {
      const res = await axios.post("https://api.pnytrainings.com/api/specialcatblog", formSubmitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.status === 200 || res.status === 201) {
        console.log("Blog post added successfully", res.data);
        navigate("/sp-c-blog-post");  // Navigate after successful creation
      } else {
        console.error("Error adding blog post", res.data);
      }
  
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
          Add City Wise Blog Post
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Post Title */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Post Title*</label>
            <input
              type="text"
              name="postTitle"
              value={formData.postTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* URL Slug */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">URL Slug*</label>
            <input
              type="text"
              name="urlSlug"
              value={formData.urlSlug}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter URL slug"
              required
            />
          </div>

          {/* Assigned Post Category Cities */}
        {/* Assigned Post Category Cities */}
<div className="mb-4">
  <label className="block text-gray-400 mb-2">Assigned Post Category Cities*</label>
  <select
    name="postCategory" // Corrected name
    value={formData.postCategory}
    onChange={handleChange}
    className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select City Category</option>
    {cityCategories.map((category) => (
      <option key={category._id} value={category._id}> {/* Use category ID */}
        {category.cityCategoryName}
      </option>
    ))}
  </select>
</div>


          {/* Post Thumbnail Image */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Post Thumbnail Image*</label>
            <input
              type="file"
              name="postThumbnailImage"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              required
            />
          </div>

          {/* Short Description */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Short Description*</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter short description"
              required
            />
          </div>

          {/* Post Description */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Post Description*</label>
            <textarea
              name="postDescription"
              value={formData.postDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
              required
            />
          </div>

          {/* Post Tags */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Post Tags*</label>
            <input
              type="text"
              name="postTags"
              value={formData.postTags}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post tags"
              required
            />
          </div>

          {/* Meta Title */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Meta Title*</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meta title"
              required
            />
          </div>

          {/* Meta Description */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Meta Description*</label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meta description"
              required
            />
          </div>

          {/* Canonical URL */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Custom Canonical URL</label>
            <input
              type="text"
              name="customCanonicalUrl"
              value={formData.customCanonicalUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter canonical URL"
            />
          </div>

          {/* Checkbox Fields */}
          <div className="space-y-2">
            <div>
              <label className="flex items-center text-gray-400">
                <input
                  type="checkbox"
                  name="isPublish"
                  checked={formData.isPublish}
                  onChange={handleChange}
                  className="mr-2"
                />
                Publish
              </label>
            </div>
            <div>
              <label className="flex items-center text-gray-400">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                Featured
              </label>
            </div>
            <div>
              <label className="flex items-center text-gray-400">
                <input
                  type="checkbox"
                  name="inSitemap"
                  checked={formData.inSitemap}
                  onChange={handleChange}
                  className="mr-2"
                />
                Include in Sitemap
              </label>
            </div>
            <div>
              <label className="flex items-center text-gray-400">
                <input
                  type="checkbox"
                  name="pageIndex"
                  checked={formData.pageIndex}
                  onChange={handleChange}
                  className="mr-2"
                />
                Index this page
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Blog Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSpecialbp;
