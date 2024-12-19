import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        navigate("/home");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-lavender-50 shadow-lg sm:rounded-lg flex flex-col p-10">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label className="block text-purple-500 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-purple-600 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-purple-500 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-purple-600 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login
          </button>
        </form>
        <p className="text-center text-purple-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
