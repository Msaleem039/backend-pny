import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";

const AddEventsCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [inSitemap, setInSitemap] = useState(false);
  const [indexPage, setIndexPage] = useState(false);
  const [customCanonicalUrl, setCustomCanonicalUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: categoryName,
      slug: urlSlug,
      metaTitle,
      metaDescription,
      inSitemap,
      pageIndex: indexPage,
      customCanonicalUrl,
 
    };

    try {
      await axios.post("https://api.pnytrainings.com/api/event", data, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/eventcat"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding event category:", error);
    }
  };

  return (
 <div className="w-full overflow-auto">
  <Header/>
  <div className="bg-gray-800 bg-opacity-50 w-[50%] my-6 mx-auto backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 overflow-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Add Event Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL Slug"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
            required
          />
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
            Add Event Category
          </button>
        </div>
      </form>
    </div>
 </div>
  );
};

export default AddEventsCategory;
