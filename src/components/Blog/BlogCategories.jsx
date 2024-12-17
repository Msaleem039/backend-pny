import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate, Outlet, Link } from "react-router-dom"; // Removed useParams since it's not used
import axios from "axios";

const BlogCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://api.pnytrainings.com/api/blogcate");
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(term)
    );
    setFilteredCategories(filtered);
  };

  // Navigate to the edit page for a category
  const handleEdit = (id) => {
    navigate(`/editblogcat/${id}`); // Ensure this route is defined in your router
  };

  // Delete a category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`https://api.pnytrainings.com/api/blogcate/${id}`);
        fetchCategories(); // Refresh categories after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <motion.div
      className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center items-center mb-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer mb-5">Blog Categories</h2>
        <hr className="w-full h-1 bg-slate-500 rounded-sm" />
        <div className="flex justify-center lg:justify-between items-center space-x-4 my-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <Link to="/addblogcate">
            <button className="bg-blue-600 hidden sm:block hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Add Blog Category
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredCategories.map((category, index) => (
              <motion.tr
                key={category._id} // Use category._id instead of category.id if that's your data structure
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">{category.categoryName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      category.status === "Active"
                        ? "bg-green-800 text-green-100"
                        : "bg-red-800 text-red-100"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEdit(category._id)} // Ensure this ID matches your data
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Outlet />
    </motion.div>
  );
};

export default BlogCategories;
