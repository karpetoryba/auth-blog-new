import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
      <div className="flex items-center space-x-6 text-lg font-semibold">
        <Link
          to="/home"
          className="hover:text-purple-300 transition duration-200"
        >
          <span className="text-xl font-bold">MyBlog</span>
        </Link>
        <Link
          to="/postlist"
          className="hover:text-purple-300 transition duration-200"
        >
          My bests posts
        </Link>
      </div>
      <div className="flex items-center space-x-6 text-lg">
        <Link
          to="/login"
          className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow-md hover:bg-purple-300 hover:text-white transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-purple-700 px-4 py-2 rounded-lg shadow-md hover:bg-purple-800 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
