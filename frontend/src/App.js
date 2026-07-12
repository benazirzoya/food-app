import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Offers from "./pages/Offers";
import Reviews from "./pages/Reviews";
import Download from "./pages/Download";
import Hotels from "./pages/Hotels";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Wishlist from "./pages/Wishlist";
import Chatbot from "./components/Chatbot";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      setIsAuth(true);

    }

  }, []);

  return (

    <BrowserRouter>

      {!isAuth ? (

        <Login setIsAuth={setIsAuth} />

      ) : (

        <div className="flex bg-black text-white min-h-screen">

          {/* SIDEBAR */}

          <div className="fixed left-0 top-0 h-screen w-[180px] z-50">

            <Navbar />

          </div>

          {/* MAIN CONTENT */}

          <main
            className="
              ml-[180px]
              flex-1
              min-h-screen
              overflow-x-hidden
              bg-black
            "
          >

            <Routes>

              <Route path="/" element={<Home />} />

              <Route path="/offers" element={<Offers />} />

              <Route path="/reviews" element={<Reviews />} />

              <Route path="/download" element={<Download />} />

              <Route path="/hotels" element={<Hotels />} />

              <Route path="/orders" element={<Orders />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/register" element={<Register />} />

              <Route path="/about" element={<About />} />

              <Route path="/contact" element={<Contact />} />

              <Route path="/gallery" element={<Gallery />} />

              <Route path="/wishlist" element={<Wishlist />} />

              <Route path="*" element={<Navigate to="/" />} />

            </Routes>

          </main>

          <Chatbot />

        </div>

      )}

    </BrowserRouter>

  );
}

export default App;