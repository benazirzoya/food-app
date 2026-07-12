import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Message Sent successfully!");
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          Contact Us
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Have questions, feedback, or need help with your order? Our team is available 24/7.
        </p>
      </motion.div>

      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch mb-12">
        
        {/* CONTACT INFO & IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between space-y-8 glass-panel p-8 md:p-10 rounded-3xl"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">Get in Touch</h2>
            <p className="text-gray-400">
              We look forward to hearing from you. Drop us a line, or visit our head office.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center text-lg">
                  <FaPhoneAlt />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone Support</div>
                  <div className="font-semibold">+1 (555) 234-5678</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center text-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email Support</div>
                  <div className="font-semibold">support@foodie.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center text-lg">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Headquarters</div>
                  <div className="font-semibold">123 Culinary Ave, Suite 100, San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-[200px] border border-white/10 relative">
            <img
              src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=800&auto=format&fit=crop"
              alt="Customer support team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col justify-center"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold">Send a Message</h3>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-white outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-white outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Order Inquiries / Business Partnership"
                className="w-full bg-white/5 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-white outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Message</label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full bg-white/5 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-white outline-none transition resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitted}
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition"
            >
              {submitted ? "Sending..." : <>Send Message <FaPaperPlane className="text-sm" /></>}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}

export default Contact;
