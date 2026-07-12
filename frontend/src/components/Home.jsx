// Home.jsx

import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaClock } from "react-icons/fa";

import FoodCard from "../components/FoodCard";

import Offers from "../pages/Offers";
import Reviews from "../pages/Reviews";
import Download from "../pages/Download";
import Hotels from "../pages/Hotels";

import Footer from "../components/Footer";

function Home() {

  const navigate = useNavigate();
  const { addToCart, wishlist = [], toggleWishlist } = useContext(CartContext);

  const [search, setSearch] = useState("");

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  const trendingFoods = [
    {
      id: 11,
      name: "Tandoori Sizzler Pizza",
      price: 449,
      rating: "⭐ 4.9",
      time: "25 mins",
      tag: "🔥 Hot & Spicy",
      hotel: "Italian Crust Hub",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop",
      desc: "Fresh cottage cheese tandoori chunks topped with red paprika, capsicum, and stringy mozzarella."
    },
    {
      id: 12,
      name: "Hyderabadi Dum Biryani",
      price: 349,
      rating: "⭐ 4.8",
      time: "30 mins",
      tag: "👑 Royal Taste",
      hotel: "Taj Dum Darbar",
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1170&auto=format&fit=crop",
      desc: "Slow-cooked aromatic basmati rice layered with marinated chicken and saffron spices."
    },
    {
      id: 13,
      name: "Truffle Mushroom Pasta",
      price: 299,
      rating: "⭐ 4.7",
      time: "20 mins",
      tag: "✨ Gourmet Spec",
      hotel: "Aroma Bistro Cafe",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1170&auto=format&fit=crop",
      desc: "Fettuccine pasta in alfredo sauce infused with organic white truffle oil and mushrooms."
    },
    {
      id: 14,
      name: "Peri Peri Chicken Wings",
      price: 249,
      rating: "⭐ 4.8",
      time: "18 mins",
      tag: "🔥 Hot & Spicy",
      hotel: "Peri Peri Junction",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1170&auto=format&fit=crop",
      desc: "Crispy fried chicken wings glazed with peri-peri hot sauce and served with ranch dip."
    },
    {
      id: 15,
      name: "Fruit Waffle Combo",
      price: 189,
      rating: "⭐ 4.7",
      time: "15 mins",
      tag: "🥞 Sweet Treats",
      hotel: "Waffle Kingdom",
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1170&auto=format&fit=crop",
      desc: "Belgian waffles topped with fresh strawberries, bananas, maple syrup, and whipped cream."
    },
    {
      id: 16,
      name: "Classic Mint Mojito",
      price: 119,
      rating: "⭐ 4.6",
      time: "8 mins",
      tag: "🍹 Refreshing",
      hotel: "Beverage Hub",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1170&auto=format&fit=crop",
      desc: "A refreshing blend of fresh mint leaves, lime juice, cane sugar, and crushed ice."
    }
  ];

  const popularFoods = [
    {
      id: 21,
      name: "Double Cheese Whooper",
      price: 199,
      rating: "⭐ 4.7",
      time: "15 mins",
      tag: "🍔 Bestseller",
      hotel: "Burger Castle",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1170&auto=format&fit=crop",
      desc: "Double beef patties stacked with cheddar cheese slices, gherkins, and house sauce."
    },
    {
      id: 22,
      name: "Peri Peri Loaded Fries",
      price: 139,
      rating: "⭐ 4.6",
      time: "12 mins",
      tag: "🍟 Crispy Bites",
      hotel: "Fries Factory",
      image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1170&auto=format&fit=crop",
      desc: "Potato wedges seasoned with peri-peri mix and loaded with liquid cheese sauce."
    },
    {
      id: 23,
      name: "Grilled Club Sandwich",
      price: 149,
      rating: "⭐ 4.5",
      time: "15 mins",
      tag: "🥪 Fresh Choice",
      hotel: "Sandwich Parlor",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1170&auto=format&fit=crop",
      desc: "Triple-decker sandwich layered with crisp lettuce, tomatoes, chicken, and egg mayo."
    }
  ];

  /* ===================================
      SEARCH FUNCTION
  =================================== */

  const handleSearch = () => {

    const value = search.toLowerCase();

    if (
      value.includes("hotel") ||
      value.includes("restaurant")
    ) {

      navigate("/hotels");

    }

    else if (
      value.includes("offer")
    ) {

      navigate("/offers");

    }

    else if (
      value.includes("review")
    ) {

      navigate("/reviews");

    }

    else if (
      value.includes("download") ||
      value.includes("app")
    ) {

      navigate("/download");

    }

    else if (
      value.includes("order") ||
      value.includes("food")
    ) {

      navigate("/orders");

    }

    else if (
      value.includes("login")
    ) {

      navigate("/login");

    }

    else {

      navigate("/hotels");

    }

  };



  return (

    <div className="bg-black text-white overflow-hidden">

      {/* ===================================
          HERO SECTION
      =================================== */}

      <section className="relative h-screen w-full overflow-hidden bg-black">

        {/* LANDSCAPE VIEW VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="
            absolute inset-0
            w-full h-full
            object-fill
            pointer-events-none
          "
        >
          <source src="/videos/food.mp4" type="video/mp4" />

        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10 pointer-events-none" />

        {/* CONTENT */}
        <div
          className="
            relative z-20
            flex flex-col
            justify-center items-center
            text-center
            h-full
            px-8
          "
        >

          <h1
            className="
              text-5xl md:text-7xl
              font-black
              leading-tight
              mb-6
            "
          >
            Delicious Food <br />

            <span className="text-red-500">
              Delivered Fast
            </span>

          </h1>

          <p
            className="
              text-gray-300
              text-lg md:text-2xl
              max-w-3xl
              mb-10
            "
          >
            Discover top restaurants, trending dishes,
            and order your favorite meals instantly.
          </p>

          {/* SEARCH */}
          <div
            className="
              w-full max-w-2xl
              flex items-center
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              rounded-full
              overflow-hidden
              shadow-2xl
            "
          >

            <input

              type="text"

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleSearch();

                }

              }}

              placeholder="Search food, restaurants..."

              className="
                flex-1
                bg-transparent
                outline-none
                text-white
                placeholder-gray-300
                px-6 py-5
              "
            />

            <button

              onClick={handleSearch}

              className="
                bg-red-500
                hover:bg-red-400
                px-8 py-5
                font-semibold
                transition
              "
            >

              Search

            </button>

          </div>

          {/* SCROLL TEXT */}
          <div

            onClick={() => {

              document
                .getElementById("trending")
                .scrollIntoView({
                  behavior: "smooth",
                });

            }}

            className="
              absolute bottom-10
              animate-bounce
              text-gray-300
              text-sm
              cursor-pointer
              hover:text-red-400
              transition
            "
          >

            Scroll Down ↓

          </div>

        </div>

      </section>

      {/* ===================================
          TRENDING FOODS
      =================================== */}

      <section
        id="trending"
        className="px-8 py-24"
      >

        <h1
          className="
            text-5xl font-bold
            text-center
            mb-16
          "
        >
          Trending Foods
        </h1>

        <div
          className="
            flex gap-8
            overflow-x-auto
            pb-5
            scroll-smooth
          "
        >

          {trendingFoods.map((food) => {
            const isWishlisted = wishlist.some((item) => item.id === food.id);
            return (
              <motion.div
                key={food.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="min-w-[340px] max-w-[340px] glass-card rounded-[32px] overflow-hidden flex flex-col group relative text-left"
              >
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
                <div className="h-52 w-full overflow-hidden relative shrink-0">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <span className="absolute bottom-3 left-4 bg-red-500/90 text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full">
                    {food.tag}
                  </span>
                  
                  <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 text-[10px] font-bold">
                    <FaStar className="text-yellow-400" />
                    <span>{food.rating}</span>
                  </div>

                  <div className="absolute top-3 right-16 bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1 text-[10px] font-bold">
                    <FaClock className="text-orange-400" />
                    <span>{food.time}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-5 space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-lg font-black text-white truncate">{food.name}</h3>
                      <span className="text-lg font-black text-red-500 shrink-0">₹{food.price}</span>
                    </div>
                    <p className="text-xs text-red-400 font-bold">{food.hotel}</p>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{food.desc}</p>
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
              </motion.div>
            );
          })}

        </div>

      </section>

      {/* ===================================
          POPULAR DISHES
      =================================== */}

      <section className="px-8 py-24">

        <h1
          className="
            text-5xl font-bold
            mb-16
            text-center
          "
        >
          Popular Dishes
        </h1>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-10
          "
        >

          {popularFoods.map((food) => (
            <div key={food.id}>
              <FoodCard food={food} />
            </div>
          ))}

        </div>

      </section>

      {/* ===================================
          OTHER COMPONENTS
      =================================== */}

      <Offers />

      <Download />

      <Hotels />

      <Reviews />

      {/* ===================================
          FOOTER
      =================================== */}

      <Footer />

    </div>
  );
}

export default Home;