import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    const [loading, setLoading] = useState(true);

      useEffect(() => {

        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
      }, []);

      if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
  
        
        <Route path="/cart" element={
        <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/checkout" element={
        <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
