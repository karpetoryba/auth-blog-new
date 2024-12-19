import { useEffect, useState } from "react";
import { IPost } from "../../types/post.type";
import { findAll } from "../../services/post.service";

const UserProfile = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserPosts = async () => {
      const data = await findAll({ userId });
      setPosts(data.rows);
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Votre profil</h1>
      <h2 className="text-xl mb-2">Votre article</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
