import { useEffect, useState } from "react";
import { IPost } from "../../types/post.type";
import CardPost from "../../components/CardPost";
import { findAll } from "../../services/post.service";

const PostListPage = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postList, setPostList] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await findAll();
        console.log(data);
        setPostList(data.rows);
      } catch (error) {
        console.error("Erreur lors du chargement des posts", error);
        setMessage("Erreur lors du chargement des posts.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
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
  );
};

export default PostListPage;
