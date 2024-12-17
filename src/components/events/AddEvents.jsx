import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEvents = () => {
  const [categoryName, setCategoryName] = useState("");  // Holds the selected category
  const [urlSlug, setUrlSlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [image, setCategoryImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [inSitemap, setInSitemap] = useState(false);
  const [indexPage, setIndexPage] = useState(false);
  const [customCanonicalUrl, setCustomCanonicalUrl] = useState("");
  const [categories, setCategories] = useState([]);  // To hold the category data fetched from API
  const navigate = useNavigate();

  // Fetch categories from the API on component mount
  useEffect(() => {
    axios
      .get("https://api.pnytrainings.com/api/event")  // API to get categories
      .then((response) => {
        setCategories(response.data);  // Assuming the categories are in response.data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file type (e.g., image files only)
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      setCategoryImage(null);
      return;
    }

    // Validate file size (max 5MB for example)
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the 5MB limit.");
      setCategoryImage(null);
      return;
    }

    setCategoryImage(file);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", categoryName);  // Send category name or ID
    formData.append("urlSlug", urlSlug);
    formData.append("categoryDescription", categoryDescription);
    formData.append("image", image); // Append the image file
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("inSitemap", inSitemap);
    formData.append("indexPage", indexPage);
    formData.append("customCanonicalUrl", customCanonicalUrl);

    try {
      // Find category ID by name from the fetched categories
      const selectedCategory = categories.find(
        (category) => category.name === categoryName
      );

      if (!selectedCategory) {
        throw new Error("Category not found");
      }

      formData.append("category", selectedCategory._id);  // Append category ID

      // Send POST request to create event
      const response = await axios.post("https://api.pnytrainings.com/api/eventpost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response); // Debugging: Log response
      toast.success("Event posted successfully!");
      navigate("/event-post"); // Redirect to event category page
    } catch (error) {
      console.error("Error while adding event:", error.response || error);
      toast.error("There was an error adding the event.");
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 overflow-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Add Events</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Category Dropdown */}
          <select
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Other fields */}
          <input
            type="text"
            placeholder="URL Slug"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
            required
          />
          <textarea
            placeholder="Category Description"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            rows="4"
          />
          <input
            type="file"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            onChange={handleFileChange}
            accept="image/*"  // Only allow image files
          />
          
          {/* Image Preview */}
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Meta Title"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Meta Description"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={inSitemap}
              onChange={(e) => setInSitemap(e.target.checked)}
              className="mr-2"
            />
            Include in Sitemap
          </label>
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={indexPage}
              onChange={(e) => setIndexPage(e.target.checked)}
              className="mr-2"
            />
            Index Page
          </label>
          <input
            type="text"
            placeholder="Custom Canonical URL"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={customCanonicalUrl}
            onChange={(e) => setCustomCanonicalUrl(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
