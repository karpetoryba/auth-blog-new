import { Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/auth/SignupPage";
import PostListPage from "../pages/Post/PostListPage";
import SinglePost from "../pages/Post/SinglePost";
import EditPost from "../pages/Post/EditPost";
import WelcomePage from "../pages/WelcomePage";

const RoutesWrapper = () => {
  return (
    <div className="container mx-auto mt-12 px-6 lg:px-12">
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/postlist" element={<PostListPage />} />
        <Route path="/:id" element={<SinglePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
