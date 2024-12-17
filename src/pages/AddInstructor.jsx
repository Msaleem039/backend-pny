import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddInstructor = () => {
  const [instructorName, setInstructorName] = useState("");
  const [instructorImage, setInstructorImage] = useState(null);
  const [profileDescription, setProfileDescription] = useState("");
  const [viewOnWeb, setViewOnWeb] = useState("No");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", instructorName);
    formData.append("photo", instructorImage);
    formData.append("other_info", profileDescription);
    formData.append("in_View", viewOnWeb === "Yes"); // Convert to boolean

    try {
      const response = await axios.post("https://api.pnytrainings.com/api/instructors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Instructor Added:", response.data);
      navigate("/users");
    } catch (error) {
      console.error("Error adding instructor:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
        Add Instructor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="instructorName">
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter instructor name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="instructorImage">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="instructorImage"
            onChange={(e) => setInstructorImage(e.target.files[0])}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="profileDescription">
            Instructor Profile
          </label>
          <textarea
            id="profileDescription"
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            placeholder="Write profile description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="viewOnWeb">
            Is View on Web?
          </label>
          <select
            id="viewOnWeb"
            value={viewOnWeb}
            onChange={(e) => setViewOnWeb(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Instructor
        </button>
      </form>
    </div>
  );
};

export default AddInstructor;
