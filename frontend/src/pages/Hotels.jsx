import { useEffect, useState } from "react";

function Hotels() {

  const hotels = [
    {
      id: 1,
      name: "Taj Restaurant",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop",
      desc: "Luxury dining with premium taste",
      menu: ["Biryani", "Tandoori", "Paneer Butter Masala"],
      location: "Chennai",
    },

    {
      id: 2,
      name: "Burger Hub",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1400&auto=format&fit=crop",
      desc: "Best juicy burgers in town",
      menu: ["Cheese Burger", "French Fries", "Cold Coffee"],
      location: "Coimbatore",
    },

    {
      id: 3,
      name: "Spicy Villa",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop",
      desc: "Spicy Indian & Chinese fusion",
      menu: ["Noodles", "Fried Rice", "Chicken 65"],
      location: "Bangalore",
    },

    {
      id: 4,
      name: "Italian Kitchen",
      image:
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1400&auto=format&fit=crop",
      desc: "Authentic Italian pizzas & pasta",
      menu: ["Pizza", "White Pasta", "Garlic Bread"],
      location: "Hyderabad",
    },

    {
      id: 5,
      name: "Food Palace",
      image:
        "https://images.unsplash.com/photo-1541542684-4a6a8b3c7d23?q=80&w=1400&auto=format&fit=crop",
      desc: "Royal dining experience",
      menu: ["Meals", "Chicken Grill", "Desserts"],
      location: "Mumbai",
    },
  ];

  const [index, setIndex] = useState(0);

  const [selectedHotel, setSelectedHotel] = useState(null);

  // =========================================
  // AUTO SLIDER
  // =========================================

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) =>
        prev === hotels.length - 1 ? 0 : prev + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, [hotels.length]);

  // =========================================
  // FUNCTIONS
  // =========================================

  const nextHotel = () => {

    setIndex((prev) =>
      prev === hotels.length - 1 ? 0 : prev + 1
    );

  };

  const prevHotel = () => {

    setIndex((prev) =>
      prev === 0 ? hotels.length - 1 : prev - 1
    );

  };

  const openMenu = (hotel) => {

    setSelectedHotel(hotel);

  };

  const closeMenu = () => {

    setSelectedHotel(null);

  };

  const bookTable = (hotel) => {

    alert(`Table booked at ${hotel.name} 🍽️`);

  };

  return (

    <div className="relative min-h-[90vh] text-white overflow-hidden bg-black">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div
        className="
          absolute inset-0
          bg-cover bg-center
          scale-105
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-red-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/20 blur-[120px] rounded-full" />

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="relative z-10 px-6 md:px-10 py-14">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            🏨 Hotels Near You
          </h1>

          <p className="text-gray-300 text-sm md:text-base">
            Discover premium restaurants & trending dining spots
          </p>

        </div>

        {/* =========================================
            SLIDER
        ========================================= */}

        <div className="flex justify-center items-center">

          {/* PREV BUTTON */}
          <button
            onClick={prevHotel}
            className="
              hidden md:flex
              w-12 h-12
              rounded-full
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              items-center justify-center
              hover:bg-red-500/40
              transition
              mr-5
            "
          >
            ←
          </button>

          {/* CARD */}
          <div className="relative w-full max-w-[700px] h-[460px]">

            {hotels.map((hotel, i) => (

              <div
                key={hotel.id}
                className={`
                  absolute inset-0
                  transition-all duration-700
                  ${
                    index === i
                      ? "opacity-100 scale-100 z-20"
                      : "opacity-0 scale-95 z-0"
                  }
                `}
              >

                <div
                  className="
                    h-full
                    rounded-[30px]
                    overflow-hidden
                    glass-card
                    group
                  "
                >

                  {/* IMAGE */}
                  <div className="relative h-[58%] overflow-hidden">

                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="
                        w-full h-full
                        object-cover
                        group-hover:scale-105
                        transition duration-700
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* LOCATION */}
                    <div
                      className="
                        absolute top-4 left-4
                        bg-red-500/80
                        px-4 py-2
                        rounded-full
                        text-xs font-semibold
                        backdrop-blur-md
                      "
                    >
                      📍 {hotel.location}
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col justify-between h-[42%]">

                    <div>

                      <h2 className="text-3xl font-bold mb-3">
                        {hotel.name}
                      </h2>

                      <p className="text-gray-300 leading-7">
                        {hotel.desc}
                      </p>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-4 mt-5">

                      <button
                        onClick={() => openMenu(hotel)}
                        className="
                          bg-red-500
                          hover:bg-red-400
                          px-6 py-3
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >
                        View Menu
                      </button>

                      <button
                        onClick={() => bookTable(hotel)}
                        className="
                          bg-white/10
                          border border-white/20
                          hover:bg-white/20
                          px-6 py-3
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >
                        Book Table
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* NEXT BUTTON */}
          <button
            onClick={nextHotel}
            className="
              hidden md:flex
              w-12 h-12
              rounded-full
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              items-center justify-center
              hover:bg-red-500/40
              transition
              ml-5
            "
          >
            →
          </button>

        </div>

        {/* =========================================
            DOTS
        ========================================= */}

        <div className="flex justify-center gap-3 mt-8">

          {hotels.map((_, i) => (

            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                transition-all duration-300
                rounded-full
                ${
                  index === i
                    ? "w-10 h-3 bg-red-500"
                    : "w-3 h-3 bg-gray-500 hover:bg-gray-300"
                }
              `}
            />

          ))}

        </div>

      </div>

      {/* =========================================
          MENU MODAL
      ========================================= */}

      {selectedHotel && (

        <div
          className="
            fixed inset-0
            bg-black/70
            backdrop-blur-md
            flex items-center justify-center
            z-50
            p-4
          "
        >

          <div
            className="
              w-full max-w-md
              bg-zinc-900
              border border-white/10
              rounded-3xl
              overflow-hidden
              shadow-2xl
            "
          >

            {/* IMAGE */}
            <img
              src={selectedHotel.image}
              alt={selectedHotel.name}
              className="w-full h-52 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6">

              <h2 className="text-3xl font-bold mb-4">
                {selectedHotel.name}
              </h2>

              <p className="text-gray-400 mb-5">
                Popular Dishes
              </p>

              {/* MENU LIST */}
              <div className="space-y-3">

                {selectedHotel.menu.map((item, i) => (

                  <div
                    key={i}
                    className="
                      flex items-center justify-between
                      bg-white/5
                      border border-white/10
                      rounded-xl
                      px-4 py-3
                    "
                  >

                    <span>{item}</span>

                    <button
                      onClick={() =>
                        alert(`${item} added to cart 🛒`)
                      }
                      className="
                        bg-red-500
                        hover:bg-red-400
                        px-4 py-2
                        rounded-lg
                        text-sm
                        transition
                      "
                    >
                      Add
                    </button>

                  </div>

                ))}

              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-6">

                <button
                  onClick={closeMenu}
                  className="
                    flex-1
                    bg-white/10
                    hover:bg-white/20
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  Close
                </button>

                <button
                  onClick={() =>
                    alert(`Ordering from ${selectedHotel.name} 🍕`)
                  }
                  className="
                    flex-1
                    bg-gradient-to-r
                    from-red-500
                    to-orange-500
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  Order Now
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Hotels;