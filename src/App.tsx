import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SeriesList from "./pages/SeriesList";
import SeriesDetail from "./pages/SeriesDetail";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex grow justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/series" element={<SeriesList />} />
              <Route path="/series/:id" element={<SeriesDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
