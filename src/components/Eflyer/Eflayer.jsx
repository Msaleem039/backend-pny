import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Eflayer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eflyers, setEflyers] = useState([]);
  const [filteredEflyers, setFilteredEflyers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchEflyers = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/eflyer");
        setEflyers(response.data); // Set fetched data
        setFilteredEflyers(response.data); // Initialize filtered data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEflyers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = eflyers.filter(
      (eflyer) =>
        eflyer.name?.toLowerCase().includes(term) ||
        eflyer.email?.toLowerCase().includes(term)
    );
    setFilteredEflyers(filtered);
  };

  // Navigate to the edit page for the selected eflyer
  const handleUpdate = (id) => {
    navigate(`/editeflyer/${id}`);
  };

  // Delete the selected eflyer
  const handleDelete = async (id) => {
    try {
      // Log the ID to confirm it's correct
      console.log("Deleting eFlyer with ID:", id);
  
      // Send the DELETE request
      const response = await axios.delete(`https://api.pnytrainings.com/api/eflyer/${id}`);
  
      // Log the response for debugging
      console.log("Delete response:", response);
  
      if (response.status === 200 || response.status === 204) {
        // Update state to remove the deleted eFlyer
        const updatedEflyers = eflyers.filter((eflyer) => eflyer._id !== id);
        setEflyers(updatedEflyers);
        setFilteredEflyers(updatedEflyers);
        toast.success("E-flyer deleted successfully");
      } else {
        // Log unexpected status codes
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to delete the e-flyer. Please try again.");
      }
    } catch (error) {
      // Log the error response for debugging
      console.error("Error deleting eFlyer:", error.response?.data || error.message);
      toast.error("Failed to delete the e-flyer. Please try again.");
    }
  };
  
  
  

  const isAddInstructorPage = location.pathname.includes("adduser");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-full p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddInstructorPage && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer">
              E-Flyers
            </h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm my-3" />
            <div className="items-center flex lg:justify-between space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search e-flyers..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <Link to="/addeflayer">
                <button className="bg-blue-600 hover:bg-blue-500 text-white hidden sm:block font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add E-Flyer
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Course
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
                {filteredEflyers.map((eflyer, index) => (
                  <motion.tr
                    key={eflyer._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {eflyer.category?.Category_Name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {eflyer.course?.course_Name || "N/A"}
                    </td>
                  
                    <td className="px-6 py-4 whitespace-nowrap">
  <span
    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
      eflyer.status
        ? "bg-green-800 text-green-100" // For `true`
        : "bg-red-800 text-red-100"    // For `false`
    }`}
  >
    {eflyer.status ? "Active" : "Inactive"}
  </span>
</td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => handleUpdate(eflyer._id)}
                      >
                        Edit
                      </button>
                      <button
                  
                        onClick={() => handleDelete(eflyer._id)}

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

export default Eflayer;
