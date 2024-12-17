
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddModel = () => {
  const [course, setCourse] = useState(""); // Selected course ID
  const [courseModulePosition, setCourseModulePosition] = useState(""); // Position field
  const [textEditor, setTextEditor] = useState(""); // Text editor content
  const [status, setStatus] = useState("true"); // Status field, default "true" as string
  const [courses, setCourses] = useState([]); // List of courses from API
  const navigate = useNavigate();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/courses");
        setCourses(response.data); // Set courses from API response
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload to send as JSON
    const payload = {
      course, // Selected course ID
      courseModulePosition: Number(courseModulePosition), // Convert position to number
      textEditor, // Text editor content
      status: status === "true", // Convert "true"/"false" string to boolean
    };

    try {
      // Send POST request to backend
      await axios.post("https://api.pnytrainings.com/api/coursemodel", payload, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/coursemodel"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding Course Model:", error);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 overflow-auto w-full">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Add Course Model</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Dropdown to select course */}
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            required
          >
            <option value="" disabled>Select Course Module</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.course_Name} {/* Display course name */}
              </option>
            ))}
          </select>

          {/* Course Module Position */}
          <input
            type="number"
            placeholder="Position"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={courseModulePosition}
            onChange={(e) => setCourseModulePosition(e.target.value)}
            required
          />

          {/* Text Editor Content */}
          <textarea
            placeholder="Text Editor Content"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={textEditor}
            onChange={(e) => setTextEditor(e.target.value)}
            rows="4"
          />

          {/* Status Dropdown */}
          <label className="flex items-center text-gray-300">
            Active Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="ml-2 p-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add Model
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModel;
