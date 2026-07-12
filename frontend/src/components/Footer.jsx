import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";

function Footer() {

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10 px-6 md:px-14 border-t border-white/10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>

          <h2 className="text-3xl font-bold text-white mb-5">
            Foodie<span className="text-red-400">.</span>
          </h2>

          <p className="leading-8 text-gray-400">
            Delicious food delivered quickly to your doorstep with premium
            restaurant partnerships and real-time order tracking.
          </p>

        </div>

        {/* LINKS */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li className="hover:text-red-400 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-red-400 cursor-pointer transition">
              Restaurants
            </li>

            <li className="hover:text-red-400 cursor-pointer transition">
              Offers
            </li>

            <li className="hover:text-red-400 cursor-pointer transition">
              Download App
            </li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-400" />
              <span>Banglore, Karnataka</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-400" />
              <span>+91 9993993210</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-400" />
              <span>foodie@gmail.com</span>
            </div>

          </div>

        </div>

        {/* SOCIAL */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition cursor-pointer">
              <FaInstagram />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition cursor-pointer">
              <FaTwitter />
            </div>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 mt-14 pt-8 text-center text-gray-500 text-sm">
        © 2026 Foodie App. All Rights Reserved | crafted with ❤️ by Benazir Zoya
      </div>

    </footer>
  );
}

export default Footer;