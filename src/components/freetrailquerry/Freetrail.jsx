import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Freetrail = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [freeTrials, setFreeTrials] = useState([]);
  const [filteredTrials, setFilteredTrials] = useState([]);
  const [type, setType] = useState("Free Trial");
  const [startDate, setStartDate] = useState("2024-10-01");
  const [endDate, setEndDate] = useState("2024-10-07");
  const location = useLocation();
  const navigate = useNavigate();
   console.log(freeTrials)
  useEffect(() => {
    axios
      .get("https://api.pnytrainings.com/api/freetrial")
      .then((response) => {
        setFreeTrials(response.data);
        setFilteredTrials(response.data); // Initially show all data
      })
      .catch((error) => console.error("Error fetching free trials:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term, type, startDate, endDate);
  };

  const filterData = (search, selectedType, start, end) => {
    const filtered = freeTrials.filter((trial) => {
      const trialDate = new Date(trial.dateTime);
      return (
        trial.name.toLowerCase().includes(search) &&
        trial.type === selectedType &&
        trialDate >= new Date(start) &&
        trialDate <= new Date(end)
      );
    });
    setFilteredTrials(filtered);
  };

  const handleDelete = async (trialId) => {
    try {
      await axios.delete(`https://api.pnytrainings.com/api/freetrial/${trialId}`);
      const updatedTrials = freeTrials.filter((item) => item._id !== trialId);
      setFreeTrials(updatedTrials);
      setFilteredTrials(updatedTrials);
    } catch (error) {
      console.error("Error deleting free trial:", error);
    }
  };

  const handleFilterChange = () => {
    filterData(searchTerm, type, startDate, endDate);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-5">
          Manage Free Trial
        </h2>
        <hr className="w-full h-1 bg-slate-500 rounded-sm mb-5" />

        <div className="flex justify-center items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="bg-gray-700 text-white rounded-lg py-2 px-4"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="bg-gray-700 text-white rounded-lg py-2 px-4"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="Free Trial">Free Trial</option>
            {[...new Set(freeTrials.map((trial) => trial.type))].map(
              (trialType) => (
                <option key={trialType} value={trialType}>
                  {trialType}
                </option>
              )
            )}
          </select>
          <input
            type="date"
            className="bg-gray-700 text-white rounded-lg py-2 px-4"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              handleFilterChange();
            }}
          />
          <input
            type="date"
            className="bg-gray-700 text-white rounded-lg py-2 px-4"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              handleFilterChange();
            }}
          />
          <button
            onClick={handleFilterChange}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Find
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date / Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredTrials.map((trial) => (
              <motion.tr
                key={trial._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{trial.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trial.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trial.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trial.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trial.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trial.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(trial.dateTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/viewfreetrial/${trial._id}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(trial._id)}
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

export default Freetrail;
