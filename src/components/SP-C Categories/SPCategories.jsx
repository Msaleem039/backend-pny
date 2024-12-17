import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SPCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityCategories, setCityCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCityCategories = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/citycategory");
        setCityCategories(response.data);
        setFilteredCategories(response.data); // Set both states initially
      } catch (error) {
        console.error("Error fetching city categories:", error);
      }
    };
    fetchCityCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://api.pnytrainings.com/api/citycategory/${id}`);
      const updatedCategories = cityCategories.filter((category) => category._id !== id);
      setCityCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      console.log(response);
    } catch (error) {
      console.error("Error deleting city category:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editspc/${id}`);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = cityCategories.filter(
      (category) =>
        category.cityCategoryName.toLowerCase().includes(term) ||
        category.shortDescription.toLowerCase().includes(term)
    );
    setFilteredCategories(filtered);
  };

  const isAddInstructorPage = location.pathname.includes("addspc");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 w-full backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddInstructorPage && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl text-center font-semibold text-gray-100 cursor-pointer mb-6">
              Special Blog Categories
            </h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm mb-5" />

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <Link to="/addspc">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add Special Blog Categories
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Short Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {filteredCategories.map((category, index) => (
                  <motion.tr
                    key={category._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-100">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-100">{category.cityCategoryName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{category.shortDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => handleEdit(category._id)}
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
        </>
      )}

      <Outlet />
    </motion.div>
  );
};

export default SPCategories;
