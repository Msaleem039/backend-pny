import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
   console.log(courses)
  // Fetch courses from the API
  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://api.pnytrainings.com/api/courses", {
        withCredentials: true,
      });
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [location.pathname]);

  // Delete a course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.pnytrainings.com/api/courses/${id}`, { withCredentials: true });
      const updatedCourses = filteredCourses.filter((course) => course._id !== id);
      setFilteredCourses(updatedCourses);
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete course.");
    }
  };

  // Toggle the status of a course
  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await axios.put(
        `https://api.pnytrainings.com/api/courses/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      const updatedCourses = filteredCourses.map((course) =>
        course._id === id ? { ...course, status: newStatus } : course
      );
      setFilteredCourses(updatedCourses);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error.response ? error.response.data : error.message);
      toast.error("Failed to update status.");
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = courses.filter(
      (course) =>
        (course.course_Name && course.course_Name.toLowerCase().includes(term)) ||
        (course.email && course.email.toLowerCase().includes(term))
    );
    setFilteredCourses(filtered);
  };

  // Navigate to edit course page
  const handleEdit = (courseId) => {
    navigate(`/editcourse/${courseId}`);
  };

  const isAddCoursePage = location.pathname.includes("addcourse");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddCoursePage && (
        <>
          <div className="text-center items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 mb-5 cursor-pointer">Courses</h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm" />
            <div className="my-5 flex justify-center lg:justify-between items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <Link to="/addcourse">
                <button className="bg-blue-600 hover:bg-blue-500 text-white hidden sm:block font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add Courses
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Monthly Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Admission Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <motion.tr
                      key={course._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-100">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-100">{course.course_Name.slice(0,20) || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {course.Short_Description.slice(0, 20) || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={`https://api.pnytrainings.com/${course.course_Image.replace(/\\/g, "/")}`}
                          alt="Course"
                          className="h-14 w-14"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{course.Monthly_Fee || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{course.Admission_Fee || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => updateStatus(course._id, course.status)}
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            course.status === "Active"
                              ? "bg-green-800 text-green-100"
                              : "bg-red-800 text-red-100"
                          }`}
                        >
                          {course.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="text-indigo-400 hover:text-indigo-300 mr-2"
                          onClick={() => handleEdit(course._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-gray-400">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Outlet />
    </motion.div>
  );
};

export default Courses;
