import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifiez si l'utilisateur est autorisé
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // Définit l'état si le jeton existe
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Supprime le token
    setIsAuthenticated(false); // // Réinitialise l'état d'autorisation
  };

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
          Meilleurs articles
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-lg">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow-md hover:bg-purple-300 hover:text-white transition duration-300"
            >
              Connection
            </Link>
            <Link
              to="/signup"
              className="bg-purple-700 px-4 py-2 rounded-lg shadow-md hover:bg-purple-800 transition duration-300"
            >
              Сréer un compte
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Déconnecter
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
