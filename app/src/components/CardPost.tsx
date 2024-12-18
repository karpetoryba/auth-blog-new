import { Link } from "react-router-dom";
import { IPost } from "../types/post.type";

type CardPostProps = {
  post: IPost;
};

const CardPost = ({ post }: CardPostProps) => {
  return (
    <Link
      to={`/${post.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-purple-50 hover:shadow-xl"
    >
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-purple-600 hover:text-purple-800 transition-colors">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="mt-3 text-gray-600 text-sm line-clamp-3">
          {post.content.substring(0, 100)}
          {post.content.length > 100 && "..."}
        </p>

        {/* Read More Button */}
        <div className="mt-4 text-right">
          <span className="text-purple-500 font-medium text-sm hover:text-purple-700">
            Lire plus →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardPost;
