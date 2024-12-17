import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditSpecialcat = () => {
  const { id } = useParams(); // Get the category ID from the URL params
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    cityCategoryName: "",
    shortDescription: "",
    inSitemap: false,
    metaDescription: "",
    metaTitle: "",
    urlSlug: "",
  });

  console.log(categoryData);

  // Fetch the existing category details for editing
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`https://api.pnytrainings.com/api/citycategory/${id}`);
        console.log("API Response:", response.data); // Debugging: check the response
        setCategoryData({
          cityCategoryName: response.data.cityCategoryName, // Update these fields based on your API response
          shortDescription: response.data.shortDescription,
          inSitemap: response.data.inSitemap, // Update the boolean value here
          metaDescription: response.data.metaDescription,
          metaTitle: response.data.metaTitle,
          urlSlug: response.data.urlSlug,
        });
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryDetails();
  }, [id]); // Add 'id' to the dependency array

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission for updating category details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://api.pnytrainings.com/api/citycategory/${id}`, categoryData);
      navigate("/sp-c-categories"); // Redirect to categories page after successful edit
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="overflow-auto w-full">
      <Header />
      <div className="bg-gray-800 bg-opacity-50 w-[50%] my-6 mx-auto backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl text-center font-semibold text-gray-100 mb-6">
          Edit Special Blog Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="cityCategoryName"
              value={categoryData.cityCategoryName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={categoryData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              In Sitemap
            </label>
            <input
              type="checkbox"
              name="inSitemap"
              checked={categoryData.inSitemap}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={categoryData.metaDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Meta Title
            </label>
            <textarea
              name="metaTitle"
              value={categoryData.metaTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              URL Slug
            </label>
            <textarea
              name="urlSlug"
              value={categoryData.urlSlug}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSpecialcat;
