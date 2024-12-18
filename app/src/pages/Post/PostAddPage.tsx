import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { create, findOneById } from "../../services/post.service";
import { IPost } from "../../types/post.type";

type FormPostsProps = {
  fetchPosts?: () => void;
};

const FormPost = ({ fetchPosts }: FormPostsProps) => {
  const [credentials, setCredentials] = useState<Partial<IPost>>({});
  const { id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setMessage("Vous devez être connecté pour créer un post.");
      return;
    }
    try {
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;
      setCredentials({ user_id: userId } as IPost);
    } catch (error) {
      setMessage("Token invalide ou expiré.");
    }
  }, [token]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const post = await findOneById(id as string);
      setCredentials(post);
    } catch (error) {
      console.log("Error to fetch posts", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (!credentials.title) newErrors.title = "Title is required.";
    if (!credentials.content) newErrors.content = "Content is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log("Submit create");
      await create(credentials as IPost);

      if (fetchPosts) fetchPosts();
      toast.success("Post saved successfully");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occurred while saving the post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-50 shadow-md rounded-lg p-6 space-y-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-purple-600">
        Create Post
      </h2>
      {message && (
        <div className="mb-4 text-center text-black-500">{message}</div>
      )}
      <div className="flex flex-col gap-4">
        {/* Title Field */}
        <div>
          <label
            className="block text-sm font-medium text-purple-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            value={credentials.title}
            onChange={handleChange}
            required
            className={`w-full p-3 bg-purple-50 text-purple-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              errors.title ? "border-red-500" : "border-purple-300"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">{errors.title}</span>
          )}
        </div>

        {/* Content Field */}
        <div>
          <label
            className="block text-sm font-medium text-purple-700 mb-1"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter the content"
            value={credentials.content}
            onChange={handleChange}
            rows={5}
            required
            className={`w-full p-3 bg-purple-50 text-purple-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              errors.content ? "border-red-500" : "border-purple-300"
            }`}
          ></textarea>
          {errors.content && (
            <span className="text-red-500 text-sm mt-1">{errors.content}</span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-purple-300 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Create Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormPost;
