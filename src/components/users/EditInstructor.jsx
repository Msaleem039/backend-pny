import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditInstructor = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`https://api.pnytrainings.com/api/instructors/${userId}`);
        const data = response.data.data;
        setInstructor(data);
        setImagePreview(data.photo); // Set the current image as the initial preview
      } catch (error) {
        console.error("Error fetching instructor:", error.response ? error.response.data : error.message);
      }
    };
    fetchInstructor();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", instructor.name);
    formData.append("photo", selectedImage || instructor.photo); // Use new image if selected
    formData.append("other_info", instructor.other_info);
    formData.append("in_View", instructor.in_View === "Yes");

    try {
      await axios.put(`https://api.pnytrainings.com/api/instructors/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Instructor updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating instructor:", error.response ? error.response.data : error.message);
      alert("Failed to update instructor. Reason: " + (error.response?.data?.message || error.message));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Show preview of the selected image
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!instructor) {
    return <p>Loading...</p>;
  }

  return (
<div className="overflow-auto mx-auto w-full">
  <Header/>
  <div className="bg-gray-800 bg-opacity-50 my-6 backdrop-blur-md shadow-lg rounded-xl p-6 border mx-auto border-gray-700 w-[50%] ">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Edit Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Instructor Name</label>
          <input
            type="text"
            name="name"
            value={instructor.name || ""}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {imagePreview && (
            <div className="mt-4 w-20">
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-auto rounded-md border border-gray-600"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Instructor Profile</label>
          <textarea
            name="other_info"
            value={instructor.other_info || ""}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Write profile description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Is View on Web?</label>
          <select
            name="in_View"
            value={instructor.in_View || "No"}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
          Update Instructor
        </button>
      </form>
    </div>
</div>
  
  );
};

export default EditInstructor;
