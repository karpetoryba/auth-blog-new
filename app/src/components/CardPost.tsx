import { Link } from "react-router-dom";
import { IPost } from "../types/post.type";

type CardPostProps = {
  post: IPost;
};

const CardPost = ({ post }: CardPostProps) => {
  return (
    <div className="shadow-md">
      <div className="p-6">
        <Link to={`/${post.id}`}>
          <h2 className="text-xl text-zinc-500 font-bold mt-2">{post.title}</h2>
        </Link>
        <p className="mt-2 text-sm text-gray-700">
          {post.content.substring(0, 50)}
          {post.content.length > 50 && "..."}
        </p>
      </div>
    </div>
  );
};

export default CardPost;
