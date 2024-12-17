import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";

const AddFlyers = () => {
  const [flyerFile, setProfilePic] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      console.log(
        flyerFile,
        categories,
        courses,
        selectedCategory,
        selectedCourse,
        status
      )
      try {
        const response = await fetch("https://api.pnytrainings.com/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch("https://api.pnytrainings.com/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCategories();
    fetchCourses();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("flyerFile", flyerFile);
    formData.append("category", selectedCategory);
    formData.append("course", selectedCourse);
    formData.append("status", status);
  
    // Log form data to check its contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      console.log(formData)
      const response = await fetch("https://api.pnytrainings.com/api/eflyer", {
        method: "POST",
        body: formData,
      });
       console.log(response)
      if (!response.ok) {
        const errorText = await response.text(); // Get the error response body
        console.log('Error: ' + errorText)
      }
  
      navigate("/eflayer");
    } catch (error) {
      console.error("Error adding Eflyer:", error);
    }
  };
  

  const handleCancel = () => {
    navigate("/eflayer");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header />
      <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto my-10">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
          Add Eflayer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.Category_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="course">
              Course
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.course_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="profilePic">
              Profile Picture
            </label>
            <input
    type="file"
    onChange={(e) => setProfilePic(e.target.files[0])} // Set the first selected file
    className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    accept="image/*"
    required // Optional, make it required if necessary
/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
            >
              Add Eflayer
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlyers;
