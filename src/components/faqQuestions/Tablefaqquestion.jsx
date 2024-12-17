import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Tablefaqquestion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [faqQuestions, setFaqQuestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(faqQuestions)
  useEffect(() => {
    // Fetch FAQ questions from the API
    axios
      .get("https://api.pnytrainings.com/api/faquestion")
      .then((response) => setFaqQuestions(response.data))
      .catch((error) => console.error("Error fetching FAQ questions:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.pnytrainings.com/api/faquestion/${id}`);
      setFaqQuestions(faqQuestions.filter((question) => question._id !== id));
    } catch (error) {
      console.error("Error deleting FAQ question:", error);
    }
  };

  const isAddFaqPage = location.pathname.includes("addfaq");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddFaqPage && (
        <>
          <div className="text-center items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer mb-5">
              FAQ Questions
            </h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm mb-5" />

            <div className="flex justify-center lg:justify-between items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <Link to="/addfaquestion">
                <button className="bg-blue-600 hidden sm:block hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add FAQ Question
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
                    FAQ Question
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
                {faqQuestions
                  .filter((question) =>
                    question.question.toLowerCase().includes(searchTerm)
                  )
                  .map((question, index) => (
                    <motion.tr
                      key={question._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{question.question}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {question.status ? "Active" : "Inactive"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <Link to={`/editfaquestion/${question._id}`}>
                          <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(question._id)}
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

export default Tablefaqquestion;
