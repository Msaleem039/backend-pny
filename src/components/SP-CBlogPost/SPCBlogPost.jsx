import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SPCBlogPost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);  
console.log(blogPosts)
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch blog post data from the API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/specialcatblog");
        setBlogPosts(response.data); // Assuming response contains an array of blog posts
        setFilteredPosts(response.data); // Set filtered posts initially to the full list
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchBlogPosts();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = blogPosts.filter(
      (post) =>
        post.postTitle.toLowerCase().includes(term) ||
        post.postCategory.cityCategoryName.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://api.pnytrainings.com/api/specialcatblog/${postId}`);
      setBlogPosts(blogPosts.filter((post) => post._id !== postId)); // Update the posts after deletion
      setFilteredPosts(filteredPosts.filter((post) => post._id !== postId)); // Update the filtered posts
      console.log(`Deleted post with ID: ${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (postId) => {
    // Logic to handle editing the post
    navigate(`/sp-c-blog-post/${postId}`);
    console.log("Edit post with ID:", postId);
  };

  const isAddInstructorPage = location.pathname.includes("adduser");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddInstructorPage && (
        <>
          <div className="text-center items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer mb-4">
              Special Blog Post
            </h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm mb-5" />

            <div className="flex justify-center lg:justify-between items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <Link to="/specialbp">
                <button className="bg-blue-600 hidden md:block hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add Special Blog Post
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Sr No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
  {filteredPosts.map((post, index) => (
    <motion.tr
      key={post._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-100">{index + 1}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-100">{post.postTitle}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          src={`https://api.pnytrainings.com/${post.postThumbnailImage}`}
          alt={post.postTitle}
          className="h-10 w-10 rounded-full"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">
          {post.postCategory?.cityCategoryName || "Unknown"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <button
          className="text-indigo-400 hover:text-indigo-300 mr-2"
          onClick={() => handleEdit(post._id)}
        >
          <Edit size={18} />
        </button>
        <button
          className="text-red-400 hover:text-red-300"
          onClick={() => handleDelete(post._id)}
        >
          <Trash size={18} />
        </button>
      </td>
    </motion.tr>
  ))}
</tbody>

            </table>
          </div>
        </>
      )}

      <Outlet />
    </motion.div>
  );
};

export default SPCBlogPost;
