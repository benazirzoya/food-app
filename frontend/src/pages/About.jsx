import { motion } from "framer-motion";

function About() {
  const stats = [
    { label: "Partner Restaurants", value: "15,000+" },
    { label: "Active Riders", value: "50,000+" },
    { label: "Happy Customers", value: "5M+" },
    { label: "Cities Covered", value: "200+" },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20 px-8 pb-12">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          About Foodie
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          We bridge the gap between your favorite restaurants and your doorstep, delivering happiness one meal at a time with cutting-edge technology.
        </p>
      </motion.div>

      {/* STORY & IMAGE SECTION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
            alt="Chef preparing food"
            className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <span className="bg-red-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Our Mission
            </span>
            <h3 className="text-2xl font-bold">Uncompromising Taste & Speed</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-white text-left">
            Revolutionizing the Art of <span className="text-red-500">Food Delivery</span>
          </h2>
          <p className="text-gray-400 leading-relaxed text-left">
            Founded in 2026, Foodie is built on the principle that high-quality food should be accessible instantly. We curate the best local diners, gourmet kitchens, and traditional diners to offer you an unmatched selection of dishes.
          </p>
          <p className="text-gray-400 leading-relaxed text-left">
            Our state-of-the-art logistics engine ensures your meals are dispatched instantly and tracked in real-time, keeping them hot and fresh until the moment you take your first bite.
          </p>
          
          <div className="pt-4 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 border-l-4 border-l-red-500 text-left">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
