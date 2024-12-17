import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const Editfaquestion = () => {
  const { id } = useParams(); // Get the ID from URL params
  const navigate = useNavigate();

  // State variables for the form fields
  const [question, setQuestion] = useState("");
  const [faqCategory, setFaqCategory] = useState(""); // Store selected FAQ category ID
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(true);
  const [customCanonicalUrl, setCustomCanonicalUrl] = useState("");
  const [categories, setCategories] = useState([]); // Store the list of FAQ categories

  // Fetch the FAQ categories from the API
  useEffect(() => {
    axios
      .get("https://api.pnytrainings.com/api/faqcat") // Fetch FAQ categories
      .then((response) => {
        setCategories(response.data); // Set the categories in state
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch the FAQ question details
    axios
      .get(`https://api.pnytrainings.com/api/faquestion/${id}`) // Fetch the specific FAQ question
      .then((response) => {
        const { question, faqCategory, answer, status, customCanonicalUrl } = response.data;
        setQuestion(question);
        setFaqCategory(faqCategory ? faqCategory._id : ""); // Set category ID if exists
        setAnswer(answer);
        setStatus(status);
        setCustomCanonicalUrl(customCanonicalUrl);
      })
      .catch((error) => console.error("Error fetching FAQ question:", error));
  }, [id]);

  // Handle form submission and update the FAQ question
  const handleUpdate = async () => {
    try {
      await axios.put(`https://api.pnytrainings.com/api/faquestion/${id}`, {
        question,
        faqCategory,
        answer,
        status,
        customCanonicalUrl,
      });
      navigate("/faquestion"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating FAQ question:", error);
    }
  };

  return (
  <div className="w-full overflow-auto">
    <Header/>
    <div className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-[50%] mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Edit FAQ Question</h2>

      {/* Question input */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Question</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      {/* FAQ Category dropdown */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">FAQ Category</label>
        <select
          value={faqCategory}
          onChange={(e) => setFaqCategory(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Answer input */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Answer</label>
        <textarea
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      {/* Status checkbox */}
      <div className="mb-4 flex items-center">
        <label className="block text-gray-300 mr-2">Status</label>
        <input
          type="checkbox"
          checked={status}
          onChange={() => setStatus(!status)}
          className="text-gray-700"
        />
        <span className="text-gray-300">{status ? "Active" : "Inactive"}</span>
      </div>

      {/* Custom Canonical URL input */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Custom Canonical URL</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          value={customCanonicalUrl}
          onChange={(e) => setCustomCanonicalUrl(e.target.value)}
        />
      </div>

      {/* Save Changes button */}
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

export default Editfaquestion;
