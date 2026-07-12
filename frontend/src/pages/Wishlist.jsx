import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaHeart, FaCreditCard } from "react-icons/fa";

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist = [], toggleWishlist, addToCart } = useContext(CartContext);

  const handleBuyNow = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  const handleBuyAll = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      addToCart(item);
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10 text-left">
        <div>
          <h1 className="text-4xl md:text-5xl font-black">My Wishlist ❤️</h1>
          <p className="text-gray-400 mt-2">
            You have {wishlist.length} item(s) in your wishlist
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 bg-white/10 border border-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition"
        >
          <FaArrowLeft />
          Back to Home
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-6">
          <div className="w-28 h-28 rounded-full bg-red-500/20 flex items-center justify-center mb-8">
            <FaHeart className="text-5xl text-red-500 animate-pulse" />
          </div>

          <h2 className="text-3xl font-black mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-400 text-center max-w-sm mb-8">
            Explore our menu categories and add your favorite dishes to your wishlist!
          </p>
          <button
            onClick={() => navigate("/gallery")}
            className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Browse Food Gallery
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Action Bar */}
          <div className="flex justify-end relative z-10">
            <button
              onClick={handleBuyAll}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition px-6 py-4 rounded-2xl font-bold flex items-center gap-2"
            >
              <FaCreditCard />
              Buy & Checkout All Items
            </button>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card rounded-[32px] overflow-hidden flex flex-col group relative text-left"
                >
                  {/* Image */}
                  <div className="h-52 w-full overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="mb-6">
                      <div className="flex justify-between items-center gap-2 mb-2">
                        <h3 className="text-2xl font-black text-white truncate">{item.name}</h3>
                        <span className="text-xl font-bold text-red-500 shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">Fresh ingredients and freshly cooked to order.</p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition"
                      >
                        <FaTrash />
                        Remove
                      </button>

                      <button
                        onClick={() => handleBuyNow(item)}
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-95 text-white py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition"
                      >
                        <FaCreditCard />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
