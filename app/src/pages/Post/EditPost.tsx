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
      setMessage("Post updated successfully.");
      navigate(`/${post.id}`); // Redirect to the post details page
    } catch (error) {
      console.error("Error updating post:", error);
      setMessage("Error updating post.");
    }
  };

  if (!post) return <div className="text-center">Loading post...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {message && <p className="text-center text-red-500">{message}</p>}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              rows={5}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
