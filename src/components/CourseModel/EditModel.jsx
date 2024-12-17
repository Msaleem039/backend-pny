import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditModel = () => {
  const { id } = useParams(); // Fetching the ID from route params
  const navigate = useNavigate();

  // State for course model details
  const [courseModel, setCourseModel] = useState({
    course: "",
    courseModulePosition: "",
    textEditor: "",
    status: "true",
  });

  // Fetch the list of courses (to allow mapping name to ID)
  const [courseList, setCourseList] = useState([]);

  // Fetch course model details when the page loads
  useEffect(() => {
    const fetchCourseModel = async () => {
      try {
        const response = await axios.get(`https://api.pnytrainings.com/api/coursemodel/${id}`);
        const { course, courseModulePosition, textEditor, status } = response.data;

        setCourseModel({
          course: course?.course_Name || "", // Adjust this to map the course name
          courseModulePosition: courseModulePosition || "",
          textEditor: textEditor || "",
          status: status ? "true" : "false", // Convert to string for dropdown
        });
      } catch (error) {
        console.error("Error fetching course model:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://api.pnytrainings.com/api/courses");
        setCourseList(response.data); // Assuming the API returns a list of courses
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    };

    fetchCourseModel();
    fetchCourses();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resolve course name to ID
    const selectedCourse = courseList.find((course) => course.course_Name === courseModel.course);

    if (!selectedCourse) {
      alert("Invalid course selected.");
      return;
    }

    try {
      const updatedModel = {
        ...courseModel,
        course: selectedCourse._id, // Map course name to ID
        courseModulePosition: Number(courseModel.courseModulePosition), // Ensure it's a number
        status: courseModel.status === "true", // Convert string to boolean
      };

      console.log("Updated Model to be sent:", updatedModel);

      await axios.put(`https://api.pnytrainings.com/api/coursemodel/${id}`, updatedModel, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Course model updated successfully!");
      navigate("/coursemodel"); // Redirect to main page after update
    } catch (error) {
      console.error("Error updating course model:", error);
      alert("Failed to update course model.");
    }
  };

  return (
    <div className="flex justify-center items-center my-5 bg-gray-900 overflow-auto w-full">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Edit Course Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[500px]">
          {/* Course Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-300">Course</label>
            <select
              name="course"
              value={courseModel.course}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
            >
              <option value="" disabled>
                Select a Course
              </option>
              {courseList.map((course) => (
                <option key={course._id} value={course.course_Name}>
                  {course.course_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Module Position */}
          <div className="mb-4">
            <label className="block text-gray-300">Module Position</label>
            <input
              type="number"
              name="courseModulePosition"
              value={courseModel.courseModulePosition}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Text Editor */}
          <div className="mb-4">
            <label className="block text-gray-300">Text Editor Content</label>
            <textarea
              name="textEditor"
              value={courseModel.textEditor}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-300">Status</label>
            <select
              name="status"
              value={courseModel.status}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
