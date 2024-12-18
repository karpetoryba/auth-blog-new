const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">
          Bienvenue sur MyBlog ! 🌟
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Découvrez des articles inspirants, partagez vos pensées et explorez de
          nouveaux horizons chaque jour. 📝✨
        </p>
        <p className="text-gray-800 text-md">
          Si vous voulez commencer à explorer, connectez-vous rapidement ! 🔑
        </p>
        <p className="text-gray-800 text-md mt-4">
          Pas encore de compte ? Inscrivez-vous dès maintenant et rejoignez
          notre communauté ! 🚀
        </p>
      </div>
    </div>
  );
};

export default Welcome;
