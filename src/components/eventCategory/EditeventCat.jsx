import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEventCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ name: "", title: "", description: "" });

  useEffect(() => {
    axios
      .get(`https://api.pnytrainings.com/api/event/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://api.pnytrainings.com/api/event/${id}`, event);
      navigate("/eventcat"); // Redirect back to the EventCategory page
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Edit Event Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white">Name</label>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-white">Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-white">Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg">
          Update Event Category
        </button>
      </form>
    </div>
  );
};

export default EditEventCategory;
