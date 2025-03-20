import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-gray-100 dark:bg-yellow-800">
      {/* Hero Section */}
      <header className="bg-yellow-400 dark:bg-amber-600 text-amber-100 text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold">Bienvenido a Vaulty</h1>
        <p className="mt-4 text-lg">
          Gestiona, organiza y califica tus series favoritas de manera fácil y rápida.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-6 inline-block bg-red-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
          >
            Regístrate ahora
          </Link>
        )}
      </header>

      {/* Beneficios de Vaulty */}
      <section className="max-w-6xl mx-auto py-4 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-amber-100">
          ¿Por qué elegir Vaulty?
        </h2>
        <p className="text-amber-100 dark:text-amber-100 mt-4">
          Descubre todas las ventajas de tener tu colección de series organizada.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {/* Beneficio 1 */}
          <div className="bg-white dark:bg-orange-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-amber-100">📊 Califica tus series</h3>
            <p className="text-gray-600 dark:text-amber-100 mt-2">
              Puntúa tus series para llevar un registro de lo que te gusta ver.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white dark:bg-orange-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-amber-100">📅 Organiza tu lista</h3>
            <p className="text-gray-600 dark:text-amber-100 mt-2">
              Crea listas personalizadas con tus series favoritas o por género.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white dark:bg-orange-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-amber-100">🔔 Notificaciones de nuevos episodios</h3>
            <p className="text-gray-600 dark:text-amber-100 mt-2">
              No te pierdas ningún episodio. Recibe notificaciones cuando haya nuevos lanzamientos.
            </p>
          </div>
        </div>

        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-10 inline-block bg-red-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
          >
            ¡Regístrate y comienza a organizar tus series!
          </Link>
        )}
      </section>
    </div>
  );
}

export default Home;
