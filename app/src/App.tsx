import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import PostListPage from "./pages/Post/PostListPage";
import SinglePost from "./pages/Post/SinglePost";
import EditPost from "./pages/Post/EditPost";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
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
            Post List
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

      {/* Main Content */}
      <div className="container mx-auto mt-12 px-6 lg:px-12">
        <Routes>
          <Route path="/login" element={<SigninPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/postlist" element={<PostListPage />} />
          <Route path="/:id" element={<SinglePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-purple-600 text-white py-6 mt-12">
        <div className="container mx-auto text-center text-sm">
          &copy; 2024 MyBlog. All rights reserved.
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
