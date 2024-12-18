import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findOneById, update } from "../../services/post.service";
import { IPost } from "../../types/post.type";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const fetchedPost = await findOneById(id!);
      if (!fetchedPost) throw new Error("Post not found");

      const adaptedPost: IPost = {
        id: fetchedPost.id,
        user_id: fetchedPost.user_id,
        title: fetchedPost.title || "",
        content: fetchedPost.content || "",
        creates_at: fetchedPost.creates_at || "",
      };
      setPost(adaptedPost);
    } catch (error) {
      console.error("Error fetching post:", error);
      setMessage("Error loading post.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!post) return;
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      await update(post.id, {
        title: post.title,
        content: post.content,
      });
      setMessage("✅ Post updated successfully.");
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
      setTimeout(() => navigate(`/${post.id}`), 1500); // Redirect to the post details page
    } catch (error) {
      console.error("Error updating post:", error);
      setMessage("❌ Error updating post.");
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
    }
  };

  if (!post)
    return (
      <div className="text-center text-xl text-gray-700">Loading post...</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-300 flex items-center justify-center p-6 relative">
      {message && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white shadow-md border px-4 py-2 rounded-lg animate-slide-down z-50">
          <p
            className={`text-sm ${
              message.includes("successfully")
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {message}
          </p>
        </div>
      )}
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 relative">
        <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
          ✏️ Edit Your Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="Enter your post title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              rows={6}
              placeholder="Write your post content here..."
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
