import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const ModelCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);

  const API_URL = "https://api.pnytrainings.com/api/coursemodel";

  // Fetch Course Modules
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setModules(response.data);
        setFilteredModules(response.data);
      })
      .catch((error) => console.error("Error fetching course modules:", error));
  }, []);

  // Search Handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term);
  };

  const filterData = (search) => {
    const filtered = modules.filter((module) =>
      module.textEditor.toLowerCase().includes(search)
    );
    setFilteredModules(filtered);
  };

  // Delete Course Module
  const handleDelete = async (moduleId) => {
    try {
      await axios.delete(`${API_URL}/${moduleId}`);
      const updatedModules = modules.filter((item) => item._id !== moduleId);
      setModules(updatedModules);
      setFilteredModules(updatedModules);
    } catch (error) {
      console.error("Error deleting course module:", error);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">
          Manage Course Modules
        </h2>
        <Link to="/addcoursemodel">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
            Add New Module
          </button>
        </Link>
      </div>
      
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Search by Course Module Name"
          className="bg-gray-700 text-white rounded-lg py-2 px-4 mb-4"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                #SL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Course Module Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredModules.map((module, index) => (
              <motion.tr
                key={module._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{module.textEditor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {module.courseModulePosition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/editmodel/${module._id}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(module._id)}
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
    </motion.div>
  );
};

export default ModelCourse;
