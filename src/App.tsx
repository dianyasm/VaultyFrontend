import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SeriesList from "./pages/SeriesList";
import SeriesDetail from "./pages/SeriesDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import UserList from "./pages/UserList";
import SeriesForm from "./pages/SeriesForm";
import GenreManager from "./pages/GenreManager";
import QuejasForm from "./pages/QuejasForm";
import QuejasList from "./pages/QuejasList";

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
              <Route path="/userList" element={<UserList />} />
              <Route path="/series" element={<SeriesList />} />
              <Route path="/series/:id" element={<SeriesDetail />} />
              <Route path="/series/new" element={<SeriesForm />} />
              <Route path="/series/edit/:id" element={<SeriesForm />} />
              <Route path="/genre" element={<GenreManager />} />
              <Route path="/quejas" element={<QuejasList />} />
              <Route path="/quejas/:id" element={<QuejasList />} />
              <Route path="/quejas/new" element={<QuejasForm />} />
              <Route path="/quejas/edit/:id" element={<QuejasForm/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
