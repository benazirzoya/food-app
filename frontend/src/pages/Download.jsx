// Download.jsx

import { useEffect, useState } from "react";

import {
  FaApple,
  FaGooglePlay,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Download() {

  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Fast Food Delivery",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Fresh & Delicious",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1170&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "Live Order Tracking",
      image:
        "https://images.unsplash.com/photo-1520201163981-8cc95007dd2e?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  const [current, setCurrent] = useState(0);

  /* ===================================
      AUTO SLIDER
  =================================== */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, [slides.length]);

  /* ===================================
      DOWNLOAD FUNCTION
  =================================== */

  const handleDownload = (platform) => {

    const links = {
      android: "https://play.google.com/",
      ios: "https://www.apple.com/app-store/",
    };

    alert(`Opening ${platform.toUpperCase()} Store 🚀`);

    window.open(links[platform], "_blank");

  };

  /* ===================================
      FEATURE CLICK
  =================================== */

  const handleFeatureClick = (feature) => {

    alert(`${feature} Activated 🎉`);

    navigate("/offers");

  };

  /* ===================================
      PHONE CLICK
  =================================== */

  const handlePhoneClick = () => {

    alert("Opening App Preview 📱");

    navigate("/orders");

  };

  /* ===================================
      QR CLICK
  =================================== */

  const handleQRClick = () => {

    alert("QR Code Scanned Successfully ✅");

    window.open(
      "https://foodie-app-download.com",
      "_blank"
    );

  };

  /* ===================================
      SOCIAL CLICK
  =================================== */

  const openSocial = (platform) => {

    const links = {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    };

    window.open(links[platform], "_blank");

  };

  return (

    <>
      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop')",
        }}
      >

        {/* ===================================
            GLOW EFFECTS
        =================================== */}

        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-orange-500/20 blur-[120px] rounded-full"></div>

        {/* ===================================
            MAIN SECTION
        =================================== */}

        <div
          className="
            relative z-10
            grid grid-cols-1 lg:grid-cols-2
            gap-16
            items-center
            px-6 md:px-14
            py-24
            max-w-7xl
            mx-auto
          "
        >

          {/* ===================================
              LEFT CONTENT
          =================================== */}

          <div>

            <span
              onClick={() => navigate("/offers")}
              className="
                cursor-pointer
                bg-red-500/20
                text-red-300
                border border-red-500/30
                px-5 py-2
                rounded-full
                text-sm
                tracking-widest
                uppercase
                hover:bg-red-500/30
                transition
              "
            >
              Best Food Delivery App
            </span>

            <h1
              className="
                text-5xl md:text-7xl
                font-black
                text-white
                leading-tight
                mt-8 mb-8
              "
            >

              Download The

              <span
                onClick={() => navigate("/download")}
                className="
                  block
                  cursor-pointer
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-red-400 to-orange-300
                  hover:scale-105
                  transition
                "
              >

                Foodie App

              </span>

            </h1>

            <p
              onClick={() => navigate("/hotels")}
              className="
                cursor-pointer
                text-gray-300
                text-lg md:text-xl
                leading-9
                mb-10
                max-w-2xl
                hover:text-white
                transition
              "
            >

              Order delicious meals instantly with live order tracking,
              lightning-fast delivery, exciting offers, and premium restaurants
              all in one powerful food delivery application.

            </p>

            {/* ===================================
                FEATURES
            =================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">

              <div
                onClick={() =>
                  handleFeatureClick("30-Minute Delivery")
                }
                className="
                  cursor-pointer
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  rounded-2xl
                  p-5
                  text-white
                  hover:scale-105
                  hover:border-red-500/40
                  transition duration-300
                "
              >
                🚀 30-Minute Delivery
              </div>

              <div
                onClick={() =>
                  handleFeatureClick("Real-Time Tracking")
                }
                className="
                  cursor-pointer
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  rounded-2xl
                  p-5
                  text-white
                  hover:scale-105
                  hover:border-red-500/40
                  transition duration-300
                "
              >
                📍 Real-Time Tracking
              </div>

              <div
                onClick={() =>
                  handleFeatureClick("Exclusive Offers")
                }
                className="
                  cursor-pointer
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  rounded-2xl
                  p-5
                  text-white
                  hover:scale-105
                  hover:border-red-500/40
                  transition duration-300
                "
              >
                🎁 Exclusive Offers
              </div>

              <div
                onClick={() =>
                  handleFeatureClick("24/7 Customer Support")
                }
                className="
                  cursor-pointer
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  rounded-2xl
                  p-5
                  text-white
                  hover:scale-105
                  hover:border-red-500/40
                  transition duration-300
                "
              >
                ☎ 24/7 Customer Support
              </div>

            </div>

            {/* ===================================
                DOWNLOAD BUTTONS
            =================================== */}

            <div className="flex flex-wrap gap-5 mb-10">

              <button
                onClick={() => handleDownload("ios")}
                className="
                  flex items-center gap-3
                  bg-white text-black
                  px-8 py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  active:scale-95
                  transition duration-300
                  shadow-lg
                "
              >

                <FaApple size={24} />

                App Store

              </button>

              <button
                onClick={() => handleDownload("android")}
                className="
                  flex items-center gap-3
                  bg-gradient-to-r
                  from-red-500 to-orange-400
                  text-white
                  px-8 py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  active:scale-95
                  transition duration-300
                  shadow-lg
                "
              >

                <FaGooglePlay size={22} />

                Google Play

              </button>

            </div>

            {/* ===================================
                QR CODE
            =================================== */}

            <div
              onClick={handleQRClick}
              className="
                cursor-pointer
                flex items-center gap-6
                bg-white/10
                border border-white/10
                backdrop-blur-lg
                p-5
                rounded-3xl
                w-fit
                hover:scale-105
                hover:border-red-500/40
                transition duration-300
              "
            >

              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://foodie-app-download.com"
                alt="QR Code"
                className="w-32 h-32 rounded-2xl bg-white p-2"
              />

              <div>

                <h3 className="text-white text-2xl font-bold mb-3">

                  Scan & Download

                </h3>

                <p className="text-gray-300 leading-7 max-w-xs">

                  Scan this QR code using your mobile camera to instantly
                  download the Foodie App.

                </p>

              </div>

            </div>

            {/* ===================================
                CONTACT & SOCIAL
            =================================== */}

            <div className="mt-10 flex flex-col gap-5">

              {/* CONTACT */}

              <div className="flex flex-wrap gap-6 text-gray-300">

                <div className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
                  <FaMapMarkerAlt />
                  Chennai, India
                </div>

                <div className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
                  <FaPhoneAlt />
                  +91 9993993210
                </div>

                <div className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
                  <FaEnvelope />
                  foodie@gmail.com
                </div>

              </div>

              {/* SOCIAL */}

              <div className="flex gap-4">

                <button
                  onClick={() => openSocial("facebook")}
                  className="
                    w-12 h-12
                    rounded-full
                    bg-white/10
                    border border-white/10
                    flex items-center justify-center
                    text-white
                    hover:bg-red-500
                    transition
                  "
                >
                  <FaFacebookF />
                </button>

                <button
                  onClick={() => openSocial("instagram")}
                  className="
                    w-12 h-12
                    rounded-full
                    bg-white/10
                    border border-white/10
                    flex items-center justify-center
                    text-white
                    hover:bg-red-500
                    transition
                  "
                >
                  <FaInstagram />
                </button>

                <button
                  onClick={() => openSocial("twitter")}
                  className="
                    w-12 h-12
                    rounded-full
                    bg-white/10
                    border border-white/10
                    flex items-center justify-center
                    text-white
                    hover:bg-red-500
                    transition
                  "
                >
                  <FaTwitter />
                </button>

              </div>

            </div>

          </div>

          {/* ===================================
              PHONE SECTION
          =================================== */}

          <div className="flex justify-center items-center">

            <div
              onClick={handlePhoneClick}
              className="
                relative
                w-[320px]
                h-[640px]
                cursor-pointer
              "
            >

              {slides.map((slide, index) => (

                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    current === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >

                  {/* PHONE FRAME */}

                  <div
                    className="
                      relative
                      h-full
                      bg-black
                      border-[12px]
                      border-zinc-800
                      rounded-[50px]
                      overflow-hidden
                      shadow-[0_0_60px_rgba(255,0,0,0.35)]
                      hover:scale-[1.02]
                      transition
                    "
                  >

                    {/* NOTCH */}

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl z-20"></div>

                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* TEXT */}

                    <div className="absolute bottom-10 left-0 right-0 text-center px-4">

                      <h2 className="text-white text-3xl font-bold mb-3">

                        {slide.title}

                      </h2>

                      <p className="text-gray-300 text-sm">

                        Experience premium food ordering with a modern interface.

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Download;