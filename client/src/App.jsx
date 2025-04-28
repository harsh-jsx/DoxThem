import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {

    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

      useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
