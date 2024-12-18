import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findOneById, remove } from "../../services/post.service";
import { IPost } from "../../types/post.type";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("");
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
        title: fetchedPost.title || "Untitled",
        content: fetchedPost.content || "No content available",
        creates_at: fetchedPost.creates_at || "",
      };
      setPost(adaptedPost);
    } catch (error) {
      console.error("Error fetching post:", error);
      setMessage("Error loading post.");
      setMessageType("error");
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await remove(id);
      setMessage("Post deleted successfully.");
      setMessageType("success");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      setMessage("Error deleting post.");
      setMessageType("error");
    }
  };

  if (!post && !message)
    return <div className="text-center">Loading post...</div>;

  const messageClass =
    messageType === "error" ? "text-red-500" : "text-green-500";

  return (
    <div className="min-h-screen bg-purple-100 p-6">
      {message && <p className={`text-center ${messageClass}`}>{message}</p>}
      {post && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-purple-300">
          <h1 className="text-3xl font-bold text-purple-800">{post.title}</h1>
          <p className="mt-4 text-purple-700">{post.content}</p>

          <div className="mt-4 flex justify-between">
            <Link
              to={`/edit/${id}`}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Edit
            </Link>
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
