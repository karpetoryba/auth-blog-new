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
      setMessage("⚠️ Vous devez être connecté pour créer un post.");
      return;
    }
    try {
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;
      setCredentials({ user_id: userId } as IPost);
    } catch (error) {
      setMessage("🔑 Token invalide ou expiré.");
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
    if (!credentials.title) newErrors.title = "📝 Le titre est obligatoire.";
    if (!credentials.content)
      newErrors.content = "📄 Le contenu est obligatoire.";
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
      toast.success("✅ Post sauvegardé avec succès !");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("❌ Une erreur est survenue lors de la sauvegarde du post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          ✍️ Créer un Post
        </h2>
        {message && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              className="block text-sm font-medium text-purple-700 mb-1"
              htmlFor="title"
            >
              Titre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Entrez le titre"
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
              Contenu
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Entrez le contenu ici..."
              value={credentials.content}
              onChange={handleChange}
              rows={5}
              required
              className={`w-full p-3 bg-purple-50 text-purple-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors.content ? "border-red-500" : "border-purple-300"
              }`}
            ></textarea>
            {errors.content && (
              <span className="text-red-500 text-sm mt-1">
                {errors.content}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-purple-300 disabled:cursor-not-allowed"
            >
              {loading ? "⏳ En cours..." : "📤 Publier"}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-6 p-4 bg-purple-50 rounded-lg text-purple-800">
        <h3 className="text-lg font-semibold mb-2">
          Comment utiliser le blog :
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>🔒 Connectez-vous pour accéder à toutes les fonctionnalités.</li>
          <li>📝 Créez un post en remplissant les champs Titre et Contenu.</li>
          <li>📚 Consultez vos posts dans la liste des articles.</li>
          <li>✏️ Modifiez ou supprimez vos posts selon vos besoins.</li>
          <li>✅ Profitez de votre expérience de blogging !</li>
        </ul>
      </div>
    </div>
  );
};

export default FormPost;
