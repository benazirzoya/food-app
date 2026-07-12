import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
function Gallery() {
  const { addToCart, wishlist = [], toggleWishlist } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const foods = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 299,
      category: "Desi",
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1170&auto=format&fit=crop",
      desc: "Richly flavored aromatic rice cooked with marinated chicken and traditional spices.",
    },
    {
      id: 2,
      name: "Cheese Burger",
      price: 199,
      category: "Fast Food",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1170&auto=format&fit=crop",
      desc: "Juicy beef patty grilled to perfection, topped with melted cheddar, lettuce, and house sauce.",
    },
    {
      id: 3,
      name: "Italian Pizza",
      price: 399,
      category: "Italian",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop",
      desc: "Stone-baked thin crust pizza topped with fresh marinara, mozzarella, and basil leaves.",
    },
    {
      id: 4,
      name: "Grilled Sandwich",
      price: 149,
      category: "Fast Food",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1170&auto=format&fit=crop",
      desc: "Golden toasted sourdough loaded with roasted chicken breast, mozzarella, and basil pesto.",
    },
    {
      id: 5,
      name: "White Pasta",
      price: 249,
      category: "Italian",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1170&auto=format&fit=crop",
      desc: "Penne pasta tossed in a rich, creamy white parmesan alfredo sauce with garlic mushrooms.",
    },
    {
      id: 6,
      name: "French Fries",
      price: 129,
      category: "Fast Food",
      image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1170&auto=format&fit=crop",
      desc: "Crispy double-fried golden potato wedges seasoned with sea salt and garlic paprika.",
    },
  ];

  const categories = ["All", "Fast Food", "Desi", "Italian"];

  // Filter logic
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || food.category === activeCategory;
    return matchesSearch && matchesCategory;
  });



  return (
    <div className="bg-black text-white min-h-screen pt-20 px-4 md:px-8 pb-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Food Gallery
          </h1>
          <p className="text-gray-400 mt-2">Explore our available delicacies and order instantly</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dish name..."
            className="w-full bg-white/5 border border-white/10 focus:border-red-500/50 rounded-2xl pl-10 pr-4 py-3 text-sm text-white outline-none transition"
          />
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition border ${
              activeCategory === cat
                ? "bg-red-500 border-red-500 text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ITEMS GRID */}
      <div className="max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredFoods.map((food) => {
              const isWishlisted = wishlist.some((item) => item.id === food.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={food.id}
                  className="glass-card rounded-[32px] overflow-hidden flex flex-col group relative"
                >


                  {/* IMAGE */}
                  <div className="h-56 w-full overflow-hidden relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-6 bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                      {food.category}
                    </span>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="text-2xl font-black text-white truncate">{food.name}</h3>
                        <span className="text-xl font-bold text-red-500 shrink-0">₹{food.price}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{food.desc}</p>
                    </div>

                    {/* CARD FOOTER BUTTONS */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                      <button
                        onClick={() => toggleWishlist(food)}
                        className={`py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                          isWishlisted
                            ? "bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        <FaHeart className={isWishlisted ? "text-red-500" : ""} />
                        {isWishlisted ? "Wishlisted" : "Wishlist"}
                      </button>
                      <button
                        onClick={() => addToCart(food)}
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-95 text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg font-semibold">No food items found matching your filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
