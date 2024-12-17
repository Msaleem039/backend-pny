import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); // event state initialized to null
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    date: "",
    address: "",
    image: "",
    link: "",
    metaTitle: "",
    metaDescription: "",
    inSitemap: false,
    pageIndex: false,
    customCanonicalUrl: "",
  });

  useEffect(() => {
    axios
      .get(`https://api.pnytrainings.com/api/eventpost/${id}`)
      .then((response) => {
        setEvent(response.data);
        setUpdatedEvent(response.data); // Set fetched event data for editing
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://api.pnytrainings.com/api/eventpost/${id}`, updatedEvent, {
        headers: { "Content-Type": "application/json" },
      });
      navigate(`/event-post/${id}`); // Redirect after successful update
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>; // Add loading state until event data is fetched
  }

  return (
    <div className="w-full overflow-auto">
      <Header />
      <div className="container mx-auto p-6 w-[50%] bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Event Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.slug}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.category}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.description}
              onChange={handleChange}
              rows="4"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="link"
              placeholder="Link"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.link}
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              name="date"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="metaTitle"
              placeholder="Meta Title"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.metaTitle}
              onChange={handleChange}
            />
            <input
              type="text"
              name="metaDescription"
              placeholder="Meta Description"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.metaDescription}
              onChange={handleChange}
            />
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="inSitemap"
                checked={updatedEvent.inSitemap}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Include in Sitemap
            </label>
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="pageIndex"
                checked={updatedEvent.pageIndex}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Index Page
            </label>
            <input
              type="text"
              name="customCanonicalUrl"
              placeholder="Custom Canonical URL"
              className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
              value={updatedEvent.customCanonicalUrl}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Update Event
            </button>
          </div>
        </form>

        {/* Display event details */}
        <table className="min-w-full table-auto text-left text-gray-300 mt-6">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Field</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Display event details as before */}
            <tr>
              <td className="px-4 py-2 font-semibold">Title</td>
              <td className="px-4 py-2">{event.title}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Category</td>
              <td className="px-4 py-2">{event.category?.name || "N/A"}</td>
            </tr>
            {/* Add other fields as necessary */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventDetail;
