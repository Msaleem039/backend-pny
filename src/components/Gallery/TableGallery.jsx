import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TableGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [galleryItems, setGalleryItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch gallery items from the API
    axios
      .get("https://api.pnytrainings.com/api/gallery")
      .then((response) => setGalleryItems(response.data))
      .catch((error) => console.error("Error fetching gallery items:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`https://api.pnytrainings.com/api/gallery/${itemId}`);
      setGalleryItems(galleryItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting gallery item:", error);
    }
  };

  const handleAddGalleryItem = async (newItem) => {
    try {
      const response = await axios.post("https://api.pnytrainings.com/api/gallery", newItem);
      setGalleryItems([...galleryItems, response.data]);
    } catch (error) {
      console.error("Error adding new gallery item:", error);
    }
  };

  const isAddGalleryPage = location.pathname.includes("addgallery");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddGalleryPage && (
        <>
          <div className="text-center items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer mb-5">
              Gallery Details
            </h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm mb-5" />

            <div className="flex justify-center lg:justify-between items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gallery items..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <Link to="/addgallery">
                <button className="bg-blue-600 hidden sm:block hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add Gallery Item
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Sr No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Gallery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Cover Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Viewable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {galleryItems
                  .filter((item) =>
                    item.galleryTitle && item.galleryTitle.toLowerCase().includes(searchTerm)
                  )
                  .map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.galleryTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={`https://api.pnytrainings.com/${item.coverImage.replace(/\\/g, '/')}`} alt="Cover" className="h-12 w-12 rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.isViewable ? "Yes" : "No"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.note}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <Link to={`/editgallery/${item._id}`}>
                          <button className="text-indigo-400 hover:text-indigo-300 mr-2">Edit</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-400 hover:text-red-300"
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
    </motion.div>
  );
};

export default TableGallery;
