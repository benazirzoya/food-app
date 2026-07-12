import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCommentDots, FaTimes, FaCircle, FaSync } from "react-icons/fa";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your Foodie Support Assistant. Ask me about menus, active order tracking, offers, or payment methods!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleClearChat = () => {
    if (window.confirm("Do you want to clear your chat history? 🗑️")) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hi! I'm your Foodie Support Assistant. Ask me about menus, active order tracking, offers, or payment methods!",
        },
      ]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    // Simulate intelligent bot responses
    setTimeout(() => {
  const query = userText.toLowerCase();

  const randomReply = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let botResponse = randomReply([
    "😊 I'm happy to help! What would you like to know today?",
    "Hi there! How can I make your food experience better today?",
    "I'm here for you. Feel free to ask me anything about orders, food, payments or delivery."
  ]);

  // Greetings
  if (
    query.includes("hi") ||
    query.includes("hello") ||
    query.includes("hey")
  ) {
    botResponse = randomReply([
      "👋 Hello! Welcome to Foodie. What delicious meal are you looking for today?",
      "😊 Hi! Hope you're having a wonderful day. How can I help?",
      "Hey there! Hungry already? 🍕"
    ]);
  }

  // How are you
  else if (
    query.includes("how are you")
  ) {
    botResponse = randomReply([
      "😊 I'm doing great and ready to help you find something tasty!",
      "I'm always happy when someone is looking for good food 😄",
      "Doing awesome! Thanks for asking. What can I help you with today?"
    ]);
  }

  // Name
  else if (
    query.includes("your name") ||
    query.includes("who are you")
  ) {
    botResponse =
      "🤖 I'm Foodie Assistant, your virtual restaurant companion. I can help with menus, orders, tracking, offers and payments.";
  }

  // Menu
  else if (
    query.includes("menu") ||
    query.includes("food") ||
    query.includes("dish") ||
    query.includes("eat")
  ) {
    botResponse = randomReply([
      "🍔 We have burgers, pizzas, biryanis, desserts, beverages and much more. Visit the Gallery page to explore everything.",
      "🍕 Looking for something spicy, cheesy or sweet? Our menu has something for everyone.",
      "🥗 You can browse our complete menu in the Gallery section. Every item includes price, image and ordering options."
    ]);
  }

  // Recommendation
  else if (
    query.includes("recommend") ||
    query.includes("best") ||
    query.includes("suggest")
  ) {
    botResponse = randomReply([
      "⭐ Our customers love the Chicken Burger, BBQ Pizza and Chocolate Lava Cake.",
      "🔥 Today's most ordered item is the Peri Peri Burger with French Fries.",
      "😍 If it's your first order, I'd definitely recommend our signature combo meal."
    ]);
  }

  // Vegetarian
  else if (
    query.includes("veg") ||
    query.includes("vegetarian")
  ) {
    botResponse =
      "🥗 Absolutely! We have plenty of vegetarian dishes including Paneer Pizza, Veg Burger, Pasta and fresh salads.";
  }

  // Offers
  else if (
    query.includes("offer") ||
    query.includes("discount") ||
    query.includes("coupon") ||
    query.includes("promo")
  ) {
    botResponse = randomReply([
      "🎉 Use coupon FIRST50 to get 50% OFF on your first order.",
      "🔥 Today's special offer: Buy 1 Pizza and get Garlic Bread FREE.",
      "💰 Don't forget to check the Offers page for limited-time deals."
    ]);
  }

  // Order
  else if (
    query.includes("order")
  ) {
    botResponse =
      "🛒 Ordering is easy! Open the Gallery page, choose your favorite food, add it to your cart and proceed to checkout.";
  }

  // Track
  else if (
    query.includes("track") ||
    query.includes("delivery") ||
    query.includes("where is my order") ||
    query.includes("scooter")
  ) {
    botResponse = randomReply([
      "🛵 You can track your order in real time using the animated scooter tracker in the sidebar.",
      "📍 Your delivery status is updated live on the Tracking page.",
      "🚴 Our delivery partner is on the way. You can monitor the route using the tracker."
    ]);
  }

  // Delivery Time
  else if (
    query.includes("delivery time") ||
    query.includes("how long")
  ) {
    botResponse =
      "⏱️ Most orders arrive within 25–40 minutes depending on your location and restaurant traffic.";
  }

  // Payment
  else if (
    query.includes("payment") ||
    query.includes("upi") ||
    query.includes("card") ||
    query.includes("cash") ||
    query.includes("cod") ||
    query.includes("razorpay")
  ) {
    botResponse = randomReply([
      "💳 We accept UPI, Debit Cards, Credit Cards, Net Banking and Cash on Delivery.",
      "💰 Razorpay securely processes all online payments.",
      "✅ You can choose either Online Payment or Cash on Delivery during checkout."
    ]);
  }

  // Refund
  else if (
    query.includes("refund")
  ) {
    botResponse =
      "💵 Refunds are usually processed within 5–7 business days after approval. Contact support if you need assistance.";
  }

  // Cancel
  else if (
    query.includes("cancel")
  ) {
    botResponse =
      "❌ Orders can be cancelled before the restaurant starts preparing them. Visit your Orders page to check eligibility.";
  }

  // Contact
  else if (
    query.includes("contact") ||
    query.includes("support") ||
    query.includes("help")
  ) {
    botResponse =
      "📞 Our support team is available 24/7. You can also use the Contact page to send us a message.";
  }

  // About
  else if (
    query.includes("about")
  ) {
    botResponse =
      "❤️ Foodie was created to deliver delicious meals quickly while providing a premium ordering experience.";
  }

  // Thanks
  else if (
    query.includes("thank")
  ) {
    botResponse = randomReply([
      "😊 You're very welcome!",
      "Happy to help! Enjoy your meal 🍕",
      "Anytime! Let me know if you need anything else."
    ]);
  }

  // Bye
  else if (
    query.includes("bye") ||
    query.includes("goodbye")
  ) {
    botResponse = randomReply([
      "👋 Have a wonderful day! See you again soon.",
      "Take care and enjoy your meal! 🍔",
      "Bye! I'll be here whenever you need me."
    ]);
  }

  // Hungry
  else if (
    query.includes("hungry")
  ) {
    botResponse =
      "😋 Then let's fix that! Would you like pizza, burgers, biryani, desserts or beverages?";
  }

  // Love
  else if (
    query.includes("love")
  ) {
    botResponse =
      "❤️ That's wonderful! Food tastes even better when shared with people you love.";
  }

  // Joke
  else if (
    query.includes("joke")
  ) {
    botResponse =
      "😂 Why did the pizza apply for a job? Because it wanted to make some dough!";
  }

  // Weather
  else if (
    query.includes("weather")
  ) {
    botResponse =
      "🌤️ I can't check live weather yet, but whatever the weather is, good food always makes it better!";
  }

  // Default
  else {
    botResponse = randomReply([
      "Could you tell me a little more so I can help you better? 😊",
      "I'm not completely sure I understood that. Could you rephrase it?",
      "I'd love to help! Can you give me a few more details?",
      "Interesting question! Could you explain a bit more?"
    ]);
  }

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: botResponse,
    },
  ]);

  setIsTyping(false);
}, 1200 + Math.random() * 1200);
  };
  return (
    <div className="fixed bottom-6 right-6 z-[120]">
      {/* FLOATING ACTION BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200&auto=format&fit=crop"
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <span className="absolute bottom-1 right-2 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[380px] h-[500px] glass-card rounded-[32px] overflow-hidden flex flex-col shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200&auto=format&fit=crop"
                    alt="Avatar"
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                  <FaCircle className="absolute bottom-0 right-0 text-green-500 text-[10px] border-2 border-neutral-950 rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-white text-sm">Foodie Assistant</h4>
                  <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                    ● Support Online
                  </span>
                </div>
              </div>

              {/* Clear Chat Button */}
              <button
                type="button"
                onClick={handleClearChat}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center text-xs text-gray-400 hover:text-white"
                title="Clear Chat"
              >
                <FaSync />
              </button>
            </div>

            {/* MESSAGES */}
            <div
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 bg-black/30 scrollbar-thin"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-left ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-tr-none"
                        : "bg-white/10 text-white/90 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/60 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* INPUT FORM */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-white/10 bg-black/60 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-sm text-white outline-none transition"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition shrink-0"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;
