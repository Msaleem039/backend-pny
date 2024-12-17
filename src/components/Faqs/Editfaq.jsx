import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [inSitemap, setInSitemap] = useState(false);
  const [indexPage, setIndexPage] = useState(false);
  const [customCanonicalUrl, setCustomCanonicalUrl] = useState("");
  
  const [existingImage, setExistingImage] = useState(""); // Store the existing image path

  useEffect(() => {
    axios
      .get(`https://api.pnytrainings.com/api/faqcat/${id}`)
      .then((response) => {
        setCategoryName(response.data.categoryName);
        setCategoryDescription(response.data.categoryDescription);
        setMetaTitle(response.data.metaTitle);
        setMetaDescription(response.data.metaDescription);
        setInSitemap(response.data.inSitemap);
        setIndexPage(response.data.indexPage);
        setCustomCanonicalUrl(response.data.customCanonicalUrl);
        setExistingImage(response.data.categoryImage); // Set existing image path
      })
      .catch((error) => console.error("Error fetching category:", error));
  }, [id]);

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]); // Set the selected file
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    // Append all form fields to FormData
    formData.append("categoryName", categoryName);
    formData.append("categoryDescription", categoryDescription);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("inSitemap", inSitemap);
    formData.append("indexPage", indexPage);
    formData.append("customCanonicalUrl", customCanonicalUrl);

    if (categoryImage) {
      formData.append("categoryImage", categoryImage); // Append selected image if present
    }

    try {
      await axios.put(`https://api.pnytrainings.com/api/faqcat/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is set for file uploads
        },
      });
      navigate("/faqs"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating FAQ category:", error);
    }
  };

  return (
    <div className="overflow-auto w-full">
      <Header />
      <div className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-[50%] mx-auto my-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-5">Edit FAQ Category</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Category Name</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Category Description</label>
          <textarea
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Category Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          {existingImage && (
            <div className="mt-2">
              <img
                src={`https://api.pnytrainings.com/${existingImage}`} // Display existing image
                alt="Category"
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Meta Title</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Meta Description</label>
          <textarea
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Canonical URL</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={customCanonicalUrl}
            onChange={(e) => setCustomCanonicalUrl(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-300 mr-2">In Sitemap</label>
          <input
            type="checkbox"
            checked={inSitemap}
            onChange={() => setInSitemap(!inSitemap)}
            className="text-gray-700"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-300 mr-2">Index Page</label>
          <input
            type="checkbox"
            checked={indexPage}
            onChange={() => setIndexPage(!indexPage)}
            className="text-gray-700"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditFaq;
