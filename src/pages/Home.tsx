import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold">Bienvenido a Vaulty</h1>
        <p className="mt-4 text-lg">
          Gestiona, organiza y califica tus series favoritas de manera fácil y rápida.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Regístrate ahora
          </Link>
        )}
      </header>

      {/* Beneficios de Vaulty */}
      <section className="max-w-6xl mx-auto py-4 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          ¿Por qué elegir Vaulty?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Descubre todas las ventajas de tener tu colección de series organizada.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {/* Beneficio 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">📊 Califica tus series</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Puntúa tus series para llevar un registro de lo que te gusta ver.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">📅 Organiza tu lista</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Crea listas personalizadas con tus series favoritas o por género.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🔔 Notificaciones de nuevos episodios</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              No te pierdas ningún episodio. Recibe notificaciones cuando haya nuevos lanzamientos.
            </p>
          </div>
        </div>

        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-10 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            ¡Regístrate y comienza a organizar tus series!
          </Link>
        )}
      </section>
    </div>
  );
}

export default Home;
