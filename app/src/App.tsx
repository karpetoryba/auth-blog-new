import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-pink-400">
        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-pink-300">
            Login
          </Link>
          <Link to="/" className="hover:text-pink-300">
            Home
          </Link>
          <Link to="/signup" className="hover:text-pink-300">
            Signup
          </Link>
        </div>
      </nav>
      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
