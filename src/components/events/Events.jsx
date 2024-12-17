import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.pnytrainings.com/api/eventpost")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term);
  };

  const filterData = (search) => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(search)
    );
    setFilteredEvents(filtered);
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://api.pnytrainings.com/api/eventpost/${eventId}`);
      const updatedEvents = events.filter((item) => item._id !== eventId);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
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
          Manage Events
        </h2>
        <div className="flex justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title"
              className="bg-gray-700 text-white rounded-lg py-2 px-4 mb-4"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Link to="/addevents">
            <button className="bg-blue-600 hover:bg-blue-500 text-white hidden sm:block font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Add Event
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredEvents.map((event) => (
              <motion.tr
                key={event._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{event.metaTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Check if event.image is not null or undefined before rendering */}
                  {event.image ? (
                    <img
                      src={`https://api.pnytrainings.com/${event.image.replace(/\\/g, '/')}`}
                      alt={event.title}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No Image</span> // Handle the case where no image is present
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/eventdetail/${event._id}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
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

export default Events;
