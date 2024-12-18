import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import PostListPage from "./pages/Post/PostListPage";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6 bg-purple-600 text-white shadow-md">
        <div className="flex items-center space-x-6 text-lg font-medium">
          <Link
            to="/login"
            className="hover:text-purple-300 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/home"
            className="hover:text-purple-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="hover:text-purple-300 transition duration-200"
          >
            Signup
          </Link>
          <Link
            to="/postlist"
            className="hover:text-purple-300 transition duration-200"
          >
            post list
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
