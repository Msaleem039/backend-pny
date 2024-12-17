import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
const {id}= useParams();
console.log(filteredBlogs)
  // Fetch blog posts from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/blogpost");
        setBlogs(response.data); // Assuming API returns an array of blog posts
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = blogs.filter(
      (blog) =>
        blog.postTitle && blog.postTitle.toLowerCase().includes(term)
    );
    setFilteredBlogs(filtered);
  };

  // Handle Delete
// Handle Delete
const handleDelete = async (id) => {
  try {
    await axios.delete(`https://api.pnytrainings.com/api/blogpost/${id}`);
    // After deleting, filter out the deleted blog from the local state
    setBlogs(blogs.filter(blog => blog._id !== id));
    setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== id));
  } catch (error) {
    console.error("Error deleting blog post:", error);
  }
};

  // Handle Edit
  const handleEdit = (id) => {
    // Navigate to the edit page with the blog ID
    navigate(`/editblog/${id}`);
  };

  const isAddBlogPage = location.pathname.includes("addblog");

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <motion.div
        className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {!isAddBlogPage && (
          <>
            <div className="items-center mb-6">
              <h2 className="text-2xl text-center my-3 mb-6 font-semibold md:flex-row text-gray-100 cursor-pointer">
                Blog Posts
              </h2>
              <hr className="w-full h-1 bg-slate-500 rounded-sm mb-4" />
              <div className="flex justify-center lg:justify-between space-x-4 mt-6 md:mt-0">
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    className="bg-gray-700 md:flex-row text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <Link to="/addblog">
                  <button className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                    Add Blog
                  </button>
                </Link>

                <div className="md:hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700 px-20">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Short Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Published Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredBlogs.map((blog) => (
                    <motion.tr
                      key={blog.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-100">{blog.postTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{blog.shortDescription.slice(0,30)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{blog.status}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{new Date(blog.updatedAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="text-indigo-400 hover:text-indigo-300 mr-2"
                          onClick={() => handleEdit(blog._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <Outlet /> {/* Nested routes will render here */}
      </motion.div>
    </div>
  );
};

export default Blog;
