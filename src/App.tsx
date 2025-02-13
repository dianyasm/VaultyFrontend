import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserList from './pages/UserList'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import OffertList from './pages/OfferList'
import OffertForm from './pages/OfferForm'
import OfferDetail from './pages/OfferDetail'
import { Toaster } from 'react-hot-toast'
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <BrowserRouter>
        <div className=''>
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className=' flex grow justify-center items-center'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/userList' element={<UserList />} />
              <Route path="/offers" element={<OffertList />} />
              <Route path="/offers/:id" element={<OfferDetail />} />
              <Route path="/offers/new" element={<OffertForm />} />
              <Route path="/offers/edit/:id" element={<OffertForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
