import { useEffect, useState } from "react";
import { IPost } from "../../types/post.type";
import CardPost from "../../components/CardPost";
import { findAll } from "../../services/post.service";

const PostListPage = () => {
  const [message, setMessage] = useState<string>(""); // Message d'erreur ou de succès
  const [isLoading, setIsLoading] = useState<boolean>(true); // Indique si les données sont en cours de chargement
  const [postList, setPostList] = useState<IPost[]>([]); // Liste des posts récupérés

  useEffect(() => {
    // Fonction pour récupérer les posts depuis le service
    const fetchPosts = async () => {
      try {
        const data = await findAll(); // Appel du service pour récupérer les posts
        console.log(data);
        setPostList(data.rows); // Mise à jour de la liste des posts
      } catch (error) {
        console.error("Erreur lors du chargement des posts", error);
        setMessage("Erreur lors du chargement des posts."); // Message en cas d'erreur
      } finally {
        setIsLoading(false); // Indique que le chargement est terminé
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative bg-white py-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-16 z-10 whitespace-nowrap animate-marquee text-purple-600 text-4xl font-extrabold uppercase">
        Bienvenue sur My Blog! Explorez, apprenez et partagez ! 🌟
      </div>

      <div className="mt-20 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Chargement...</span>
            </div>
          </div>
        )}

        {message && !isLoading && (
          <p className="text-center text-red-500">{message}</p>
        )}

        {postList.map((post) => (
          <CardPost post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default PostListPage;
