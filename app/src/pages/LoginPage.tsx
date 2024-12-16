// LoginPage.jsx
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-lg p-10 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-pink-500 mb-8">
          Login
        </h1>
        <form>
          <div className="mb-6">
            <label className="block text-pink-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-black text-pink-500 border border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-pink-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-black text-pink-500 border border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-black font-bold rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-pink-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
