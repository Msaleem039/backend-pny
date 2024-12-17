import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Header from "../common/Header";

const AddFaqquestion = () => {
  const [question, setQuestion] = useState("");
  const [faqCategory, setFaqCategory] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch FAQ categories from the API
    axios
      .get("https://api.pnytrainings.com/api/faqcat")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching FAQ categories:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      question,
      faqCategory,
      answer,
      status,
    };

    try {
      await axios.post("https://api.pnytrainings.com/api/faquestion", formData);
      navigate("/faquestion"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding FAQ question:", error);
    }
  };

  return (
 <div className="overflow-auto w-full">
  <Header/>
  <div className="bg-gray-800 bg-opacity-50  mx-auto backdrop-blur-md my-6 shadow-lg rounded-xl p-6 border border-gray-700 overflow-auto w-[50%]">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Add FAQ Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Question"
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <select
            className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
            value={faqCategory}
            onChange={(e) => setFaqCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select FAQ's Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <ReactQuill
            theme="snow"
            value={answer}
            onChange={setAnswer}
            placeholder="Write Answer"
            className="bg-white text-gray-800 rounded-lg"
          />

          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="mr-2"
            />
            Status (Yes or No)
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add FAQ Question
          </button>
        </div>
      </form>
    </div>
 </div>
  );
};

export default AddFaqquestion;
