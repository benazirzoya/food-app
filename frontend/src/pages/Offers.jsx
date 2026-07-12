// Offers.jsx

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Offers() {

  const navigate = useNavigate();

  const offers = [
    {
      id: 1,
      title: "50% OFF",
      desc: "On Your First Order",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop",
      route: "/orders",
    },

    {
      id: 2,
      title: "Free Delivery",
      desc: "Above ₹499 Orders",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1400&auto=format&fit=crop",
      route: "/hotels",
    },

    {
      id: 3,
      title: "Buy 1 Get 1",
      desc: "On Burgers & Pizzas",
      image:
        "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1400&auto=format&fit=crop",
      route: "/download",
    },

    {
      id: 4,
      title: "Weekend Combo",
      desc: "Flat ₹300 OFF",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop",
      route: "/reviews",
    },
  ];

  /* =========================
     BUTTON CLICK
  ========================= */

  const handleOfferClick = (offer) => {

    alert(`${offer.title} Activated 🎉`);

    navigate(offer.route);

  };

  const handleExploreDeals = () => {

    alert("Opening Mega Food Festival Deals 🚀");

    navigate("/orders");

  };

  return (

    <div
      className="
        min-h-screen
        bg-zinc-950
        py-20
        px-6 md:px-14
        overflow-hidden
        relative
      "
    >

      {/* =========================
          BACKGROUND GLOW
      ========================= */}

      <div className="absolute top-10 left-10 w-64 h-64 bg-red-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/20 blur-[120px] rounded-full"></div>

      {/* =========================
          HEADING
      ========================= */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >

        <h1 className="text-3xl md:text-5xl font-black text-red-400 mb-4">

          Exclusive Offers

        </h1>

        <p className="text-gray-400 text-sm md:text-lg">

          Grab exciting deals and enjoy delicious food at best prices

        </p>

      </motion.div>

      {/* =========================
          OFFERS GRID
      ========================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
          relative z-10
        "
      >

        {offers.map((offer, index) => (

          <motion.div
            key={offer.id}

            initial={{
              opacity: 0,
              y: 60,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}

            whileHover={{
              scale: 1.02,
            }}

            onClick={() => handleOfferClick(offer)}

            className="
              relative
              group
              overflow-hidden
              rounded-3xl
              shadow-lg
              cursor-pointer
            "
          >

            {/* IMAGE */}
            <img
              src={offer.image}
              alt={offer.title}
              className="
                w-full
                h-[320px]
                object-cover
                group-hover:scale-110
                transition duration-700
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition"></div>

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center justify-center">

              <div
                className="
                  glass-card
                  rounded-2xl
                  p-6
                  shadow-lg
                  w-fit
                  max-w-[85%]
                  text-center
                  group-hover:scale-105
                  transition
                "
              >

                <h1
                  className="
                    text-2xl md:text-3xl
                    font-black
                    text-white
                    mb-3
                  "
                >
                  {offer.title}
                </h1>

                <p className="text-gray-200 text-sm md:text-base mb-5">

                  {offer.desc}

                </p>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOfferClick(offer);
                  }}
                  className="
                    bg-red-500
                    hover:bg-red-400
                    active:scale-95
                    text-white
                    px-6 py-3
                    rounded-full
                    text-sm
                    font-semibold
                    transition
                    shadow-lg
                  "
                >

                  Claim Offer

                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* =========================
          BANNER
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="mt-20 relative z-10"
      >

        <div
          className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-8 md:p-10
            flex flex-col md:flex-row
            items-center
            justify-between
            gap-8
            hover:border-red-500/30
            transition
          "
        >

          {/* LEFT */}
          <div>

            <h1
              className="
                text-2xl md:text-4xl
                font-black
                text-red-400
                mb-4
              "
            >

              Mega Food Festival 🎉

            </h1>

            <p
              className="
                text-gray-300
                text-sm md:text-base
                max-w-xl
              "
            >

              Enjoy discounts, cashback offers, and free delivery
              from top restaurants near you.

            </p>

          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={handleExploreDeals}
            className="
              bg-red-500
              hover:bg-red-400
              active:scale-95
              text-white
              px-8 py-4
              rounded-full
              text-sm font-bold
              transition
              shadow-lg
            "
          >

            Explore Deals

          </button>

        </div>

      </motion.div>

    </div>
  );
}

export default Offers;