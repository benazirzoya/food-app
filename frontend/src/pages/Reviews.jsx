import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaCamera, FaPaperPlane, FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";

function Reviews() {
  const staticReviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      foodImage: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400",
      review: "Amazing food quality and super fast delivery. Loved the biryani and desserts!",
      rating: 5
    },
    {
      id: 2,
      name: "Ananya Singh",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      foodImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400",
      review: "Beautiful UI and smooth ordering experience. One of the best food apps.",
      rating: 5
    },
    {
      id: 3,
      name: "David John",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400",
      review: "The offers and discounts are really great. Food arrived hot and fresh.",
      rating: 4
    },
    {
      id: 4,
      name: "Sophia Carter",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      foodImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=400",
      review: "Excellent live tracking and customer support. Very professional drivers.",
      rating: 5
    },
    {
      id: 5,
      name: "Arjun Verma",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      foodImage: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=400",
      review: "Hot food delivery even in heavy rains. Recommended burger combos!",
      rating: 5
    }
  ];

  const imagePresets = [
    { name: "Biryani", url: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400" },
    { name: "Pizza", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400" },
    { name: "Burger", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400" },
    { name: "Pasta", url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=400" }
  ];

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("food_reviews");
    return saved ? JSON.parse(saved) : staticReviews;
  });

  // Form State
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [selectedImage, setSelectedImage] = useState(imagePresets[0].url);
  const [customImage, setCustomImage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 3));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto carousel effect
  useEffect(() => {
    if (reviews.length <= visibleCount) return;
    const maxIndex = reviews.length - visibleCount;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length, visibleCount]);

  useEffect(() => {
    // Prefill name if user is logged in
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        if (userObj) {
          setCurrentUser(userObj);
          if (userObj.name) setName(userObj.name);
        }
      } catch (e) {
        console.warn("Failed to parse user name:", e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) {
      alert("Please fill in your name and review message ✍️");
      return;
    }

    const avatarUrl = currentUser?.profileImage || `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 9)}.jpg`;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      avatar: avatarUrl,
      foodImage: customImage.trim() || selectedImage,
      review: reviewText.trim(),
      rating: rating
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("food_reviews", JSON.stringify(updated));

    // Reset Form
    setReviewText("");
    setCustomImage("");
    setCurrentIndex(0); // reset slide to show the newest review
    alert("Thank you! Your review has been registered successfully 🎉");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review? 🗑️")) {
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      localStorage.setItem("food_reviews", JSON.stringify(updated));
      setCurrentIndex(0); // safe reset slide index
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, reviews.length - visibleCount) : prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, reviews.length - visibleCount);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="bg-black py-24 px-6 md:px-14 min-h-screen text-white relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-red-500/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 blur-[130px] rounded-full" />

      {/* HEADING */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
          Customer Reviews
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Share your food experience or check what other verified foodies are saying about us!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10 max-w-7xl mx-auto items-start">
        
        {/* LEFT COLUMN: SUBMIT REVIEW FORM */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[32px] p-6 text-left border border-white/10"
          >
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2.5">
              <FaQuoteLeft className="text-red-400 text-lg" />
              Write a Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 block font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-black/40 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 outline-none text-base text-white transition"
                />
              </div>

              {/* STAR RATING */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 block font-bold">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl transition-all"
                    >
                      <FaStar className={star <= rating ? "text-yellow-400 scale-110" : "text-white/20"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* REVIEW TEXT */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 block font-bold">Your Message</label>
                <textarea
                  required
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="What did you love about the food?"
                  className="w-full bg-black/40 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 outline-none text-base text-white transition resize-none"
                />
              </div>

              {/* FOOD IMAGE SELECT PRESETS */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 block font-bold flex items-center gap-1.5">
                  <FaCamera className="text-red-400" />
                  Attach Food Image
                </label>
                
                {/* PRESET ITEMS GRID */}
                <div className="grid grid-cols-4 gap-2">
                  {imagePresets.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedImage(img.url);
                        setCustomImage("");
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                        selectedImage === img.url && !customImage
                          ? "border-red-500 scale-95"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center font-bold py-0.5">{img.name}</span>
                    </div>
                  ))}
                </div>

                {/* CUSTOM IMAGE URL */}
                <div className="pt-2">
                  <input
                    type="text"
                    value={customImage}
                    onChange={(e) => {
                      setCustomImage(e.target.value);
                      setSelectedImage("");
                    }}
                    placeholder="or paste custom image URL"
                    className="w-full bg-black/40 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-2.5 outline-none text-xs text-white transition"
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] active:scale-[0.98] py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2.5 shadow-lg transition"
              >
                <FaPaperPlane className="text-sm" />
                Register Review
              </button>
            </form>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AUTO CAROUSEL REVIEWS CONTAINER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-black">Reviews Timeline</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center text-sm"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center text-sm"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden relative py-2">
            <motion.div
              className="flex gap-6"
              style={{
                width: `${Math.max(100, (reviews.length / visibleCount) * 100)}%`
              }}
              animate={{
                x: `-${currentIndex * (100 / Math.max(1, reviews.length))}%`
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18
              }}
            >
              {reviews.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: `${100 / Math.max(1, reviews.length)}%`
                  }}
                  className="px-1 shrink-0"
                >
                  <div className="glass-card rounded-[32px] p-5 text-left border border-white/10 flex flex-col h-[400px] justify-between relative group overflow-hidden">
                    {/* Delete Option */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-xs text-red-400 hover:text-red-500 hover:bg-black transition"
                      title="Delete Review"
                    >
                      <FaTrash />
                    </button>

                    {/* FOOD IMAGE ATTACHED */}
                    <div className="h-44 w-full rounded-2xl overflow-hidden shrink-0 border border-white/10 relative">
                      <img
                        src={item.foodImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 flex flex-col justify-between pt-4">
                      {/* USER INFO */}
                      <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={item.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"}
                            alt={item.name}
                            className="w-8 h-8 rounded-full border border-red-500/30 object-cover shrink-0"
                          />
                          <div className="truncate">
                            <h4 className="font-bold text-white text-sm leading-tight truncate">{item.name}</h4>
                            <span className="text-[8px] text-green-400 font-bold uppercase tracking-wider block">Verified Customer</span>
                          </div>
                        </div>

                        {/* STARS */}
                        <div className="flex gap-0.5 text-yellow-400 text-[10px] shrink-0">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                      </div>

                      {/* MESSAGE */}
                      <p className="text-gray-300 text-xs leading-relaxed italic line-clamp-3 pt-3">
                        "{item.review}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reviews;
