import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditEFlyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // State for eFlyer details
  const [eFlyer, setEFlyer] = useState({
    category: "",
    course: "",
    status: "Active",
  });
  const [flyerFile, setFlyerFile] = useState(null); // Separate state for flyer file
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch eFlyer, categories, and courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch eFlyer details
        const eflyerResponse = await axios.get(`https://api.pnytrainings.com/api/eflyer/${id}`);
        const eflyerData = eflyerResponse.data;

        setEFlyer({
          category: eflyerData.category._id,
          course: eflyerData.course._id,
          status: eflyerData.status ? "Active" : "Inactive",
        });

        // Fetch categories and courses
        const [categoriesResponse, coursesResponse] = await Promise.all([
          axios.get("https://api.pnytrainings.com/api/categories"),
          axios.get("https://api.pnytrainings.com/api/courses"),
        ]);

        setCategories(categoriesResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", eFlyer.category);
    formData.append("course", eFlyer.course);
    formData.append("status", eFlyer.status === "Active");
    if (flyerFile) formData.append("flyerFile", flyerFile);

    try {
      await axios.put(`https://api.pnytrainings.com/api/eflyer/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("eFlyer updated successfully!");
      navigate("/eflayer");
    } catch (error) {
      console.error("Error updating eFlyer:", error);
      alert("Failed to update eFlyer");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEFlyer((prevEFlyer) => ({
      ...prevEFlyer,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFlyerFile(e.target.files[0]); // Store the file object
  };

  return (
    <div className="w-full overflow-auto">
      <Header />
      <div className="flex justify-center items-center my-5 bg-gray-900 overflow-auto">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Edit eFlyer</h2>
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[500px]">
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-300">Category</label>
              <select
                name="category"
                value={eFlyer.category}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.Category_Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-300">Course</label>
              <select
                name="course"
                value={eFlyer.course}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Flyer File */}
            <div className="mb-4">
              <label className="block text-gray-300">Flyer File</label>
              <input
                type="file"
                name="flyerFile"
                onChange={handleFileChange}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-gray-300">Status</label>
              <select
                name="status"
                value={eFlyer.status}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Update eFlyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEFlyer;
