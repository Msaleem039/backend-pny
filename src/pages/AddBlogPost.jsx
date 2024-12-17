import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddBlogPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postThumbImage, setPostThumbImage] = useState(null);
  const [shortDescription, setShortDescription] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [isPublished, setIsPublished] = useState("");
  const [featured, setFeatured] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [inSitemap, setInSitemap] = useState("");
  const [indexPage, setIndexPage] = useState("");
  const [customCanonicalUrl, setCustomCanonicalUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Blog Post Added:", {
      postTitle,
      urlSlug,
      postCategory,
      postThumbImage,
      shortDescription,
      postDescription,
      isPublished,
      featured,
      metaTitle,
      metaDescription,
      inSitemap,
      indexPage,
      customCanonicalUrl,
    });
    navigate("/blog-post"); // Redirect to blog posts page after successful form submission
  };

  return (
 
      <div className=" bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-16"> {/* Added margin top for content below the header */}
        <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
          Add Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='postTitle'>
              Post Title*
            </label>
            <input
              type='text'
              id='postTitle'
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post title"
              required
            />
          </div>

          {/* URL Slug */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='urlSlug'>
              URL Slug
            </label>
            <input
              type='text'
              id='urlSlug'
              value={urlSlug}
              onChange={(e) => setUrlSlug(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter URL slug"
            />
          </div>
          {/* Post Category */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='postCategory'>
              Post Category*
            </label>
            <input
              type='text'
              id='postCategory'
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post category"
              required
            />
          </div>

          {/* Post Thumb Image */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='postThumbImage'>
              Post Thumb Image: Upload
            </label>
            <input
              type='file'
              id='postThumbImage'
              onChange={(e) => setPostThumbImage(e.target.files[0])}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              accept="image/*"
            />
          </div>

          {/* Short Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='shortDescription'>
              Short Description
            </label>
            <textarea
              id='shortDescription'
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter short description"
            />
          </div>

          {/* Post Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='postDescription'>
              Post Description
            </label>
            <textarea
              id='postDescription'
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post description"
              rows={5}
            />
          </div>

          {/* Is Publish? */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='isPublished'>
              Is Publish? *
            </label>
            <select
              id='isPublished'
              value={isPublished}
              onChange={(e) => setIsPublished(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              <option value="">Select Publish/Unpublish</option>
              <option value="Publish">Publish</option>
              <option value="Unpublish">Unpublish</option>
            </select>
          </div>

          {/* Featured */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='featured'>
              Featured
            </label>
            <select
              id='featured'
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Meta Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='metaTitle'>
              Meta Title
            </label>
            <input
              type='text'
              id='metaTitle'
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta title"
            />
          </div>

          {/* Meta Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='metaDescription'>
              Meta Description
            </label>
            <textarea
              id='metaDescription'
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta description"
            />
          </div>

          {/* In Sitemap */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='inSitemap'>
              In Sitemap
            </label>
            <select
              id='inSitemap'
              value={inSitemap}
              onChange={(e) => setInSitemap(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Index Page */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='indexPage'>
              Index Page
            </label>
            <select
              id='indexPage'
              value={indexPage}
              onChange={(e) => setIndexPage(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Custom Canonical URL */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2' htmlFor='customCanonicalUrl'>
              Custom Canonical URL
            </label>
            <input
              type='text'
              id='customCanonicalUrl'
              value={customCanonicalUrl}
              onChange={(e) => setCustomCanonicalUrl(e.target.value)}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter custom canonical URL"
            />
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none'
          >
            Add Blog Post
          </button>
        </form>
      </div>

  );
};

export default AddBlogPost;
