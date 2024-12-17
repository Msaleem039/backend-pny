import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";

const AddGallery = () => {
  const [galleryTitle, setGalleryTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isViewable, setIsViewable] = useState(false);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("galleryTitle", galleryTitle);
    formData.append("coverImage", coverImage);
    formData.append("isViewable", isViewable);
    formData.append("note", note);

    try {
      await axios.post("https://api.pnytrainings.com/api/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/gallery"); // Redirect to Gallery Table after adding a gallery item
    } catch (error) {
      console.error("Error adding gallery item:", error);
    }
  };

  return (
 <div className="overflow-auto w-full">
  <Header/>
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mx-auto w-[50%] my-6">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Add Gallery</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Gallery Title"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={galleryTitle}
            onChange={(e) => setGalleryTitle(e.target.value)}
            required
          />
          <input
            type="file"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            onChange={handleFileChange}
            required
          />
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={isViewable}
              onChange={(e) => setIsViewable(e.target.checked)}
              className="mr-2"
            />
            Viewable
          </label>
          <textarea
            placeholder="Note"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add Gallery
          </button>
        </div>
      </form>
    </div>
 </div>
  );
};

export default AddGallery;
