import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

function FoodCard({ food }) {
  const { addToCart, wishlist = [], toggleWishlist } = useContext(CartContext);
  const isWishlisted = wishlist.some((item) => item.id === food.id);

  return (
    <div className="glass-card rounded-[32px] overflow-hidden flex flex-col group relative text-left">
      {/* Wishlist Heart Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(food);
        }}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-lg hover:bg-black transition text-white"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 scale-110" />
        ) : (
          <FaRegHeart className="text-white/85 hover:text-red-500 transition" />
        )}
      </button>

      {/* Image */}
      <div className="h-52 w-full overflow-hidden relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <div className="flex justify-between items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white truncate">{food.name}</h3>
            <span className="text-lg font-bold text-red-500">₹{food.price}</span>
          </div>
          <p className="text-xs text-gray-400">Fresh ingredients, premium quality partner dish.</p>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(food);
            }}
            className={`py-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition ${
              isWishlisted
                ? "bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <FaHeart className={isWishlisted ? "text-red-500" : ""} />
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(food);
            }}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-95 text-white py-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;