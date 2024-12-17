import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditCourseCategory = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the category ID from URL params

  useEffect(() => {
    // Fetch the category data based on the ID
    axios
      .get(`https://api.pnytrainings.com/api/categories/${id}`, { withCredentials: true })
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        setError("Failed to load category data");
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCategory({ ...category, [name]: checked });
  };

  const handleStatusChange = (e) => {
    setCategory({ ...category, status: e.target.value === "active" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://api.pnytrainings.com/api/categories/${id}`, category, { withCredentials: true })
      .then(() => {
        navigate("/course-categories"); // Redirect to the categories list after updating
      })
      .catch((error) => {
        console.error("Error updating category:", error.response ? error.response.data : error.message);
        setError("Failed to update category");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-auto w-full">
      <Header />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mx-auto mt-8 w-[50%] ">
        <h2 className="text-2xl text-white font-semibold mb-6">Edit Course Category</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-400">Category Name</label>
            <input
              type="text"
              name="Category_Name"
              value={category.Category_Name || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-400">Short Description</label>
            <textarea
              name="short_Description"
              value={category.short_Description || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 w-full"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-gray-400">Meta Title</label>
            <input
              type="text"
              name="meta_Title"
              value={category.meta_Title || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-400">Meta Description</label>
            <textarea
              name="meta_Description"
              value={category.meta_Description || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 w-full"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-gray-400">URL Slug</label>
            <input
              type="text"
              name="url_Slug"
              value={category.url_Slug || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-400">In Sitemap</label>
            <input
              type="checkbox"
              name="in_Sitemap"
              checked={category.in_Sitemap || false}
              onChange={handleCheckboxChange}
              className="bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-400">Index Page Option</label>
            <input
              type="checkbox"
              name="index_Page_Option"
              checked={category.index_Page_Option || false}
              onChange={handleCheckboxChange}
              className="bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-400">Status</label>
            <select
              name="status"
              value={category.status ? "active" : "inactive"}
              onChange={handleStatusChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Update Category
            </button>
            <button
              type="button"
              onClick={() => navigate("/course-categories")} // Go back to categories list
              className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseCategory;
