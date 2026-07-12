import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { createPortal } from "react-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowLeft,
  FaCheckCircle,
  FaCreditCard,
  FaLock
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const {
    cart = [],
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" or "checkout"
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "online"
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showMockPayment, setShowMockPayment] = useState(false);
  const [simulatedMethod, setSimulatedMethod] = useState("card"); // "card", "upi", "nb"
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  
  // OTP Verification Simulation State
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const [user] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // =========================================
  // TOTALS
  // =========================================

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cart]);

  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.floor(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  // =========================================
  // PLACE ORDER
  // =========================================

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("Please fill in your delivery address and phone number 📞");
      return;
    }

    setOrderPlaced(true);

    if (paymentMethod === "online") {
      // Open the custom high-fidelity Razorpay payment simulator directly
      // This bypasses external script blockers & key mismatch crashes
      setShowMockPayment(true);
      setShowOtpScreen(false);
      setOtpCode("");
    } else {
      // COD
      setTimeout(() => {
        alert("Order Placed Successfully via Cash on Delivery 🎉");
        finalizeOrder();
      }, 1000);
    }
  };

  const finalizeOrder = async () => {
    let currentUserId = "guest";
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        if (userObj) {
          currentUserId = userObj.id || userObj._id || "guest";
        }
      }
    } catch (e) {
      console.warn("Failed to parse user from localStorage:", e);
    }

    try {
      const API_BASE = process.env.REACT_APP_API_URL || ("http://" + window.location.hostname + ":5000");
      await axios.post(API_BASE + "/api/orders", {
        userId: currentUserId,
        items: cart,
        total: total,
        status: "Preparing"
      }, { timeout: 5000 });

      if (clearCart) {
        clearCart();
      }
      setOrderPlaced(false);
      navigate("/orders");
    } catch (err) {
      console.error("Error creating order in DB:", err);
      alert(`Checkout failed: ${err.response?.data?.error || err.message}. Please try again.`);
      setOrderPlaced(false);
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty 🛒");
      return;
    }
    if (checkoutStep === "cart") {
      setCheckoutStep("checkout");
    } else {
      handlePlaceOrder();
    }
  };

  // =========================================
  // EMPTY CART
  // =========================================

  if ((!cart || cart.length === 0) && !orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <div className="w-28 h-28 rounded-full bg-red-500/20 flex items-center justify-center mb-8">
          <FaShoppingCart className="text-5xl text-red-500" />
        </div>

        <h1 className="text-4xl font-black mb-4">Your Cart is Empty</h1>

        <p className="text-gray-400 text-center max-w-md mb-8">
          Looks like you haven't added anything yet. Explore delicious food and add items to cart.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
        >
          Explore Foods
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black">
            {checkoutStep === "checkout" ? "Checkout Details 📋" : "My Cart 🛒"}
          </h1>
          <p className="text-gray-400 mt-2">
            {checkoutStep === "checkout" ? "Fill delivery information" : `${cart.length} item(s) added`}
          </p>
        </div>

        <button
          onClick={() => {
            if (checkoutStep === "checkout") {
              setCheckoutStep("cart");
            } else {
              navigate("/");
            }
          }}
          className="flex items-center gap-3 bg-white/10 border border-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition"
        >
          <FaArrowLeft />
          {checkoutStep === "checkout" ? "Back to Cart" : "Back"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: CART ITEMS OR CHECKOUT FORM */}
        <div className="xl:col-span-2 space-y-6">
          {checkoutStep === "checkout" ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-7 space-y-6 text-left"
            >
              <h2 className="text-3xl font-black mb-4">Delivery & Payment</h2>
              {user && (
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl mb-6">
                  <div className="w-12 h-12 rounded-full border border-red-500/30 overflow-hidden shrink-0 shadow-md">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center font-bold text-white text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white">{user.name}</h3>
                    <p className="text-xs text-gray-400">Ordering as verified user ({user.email})</p>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 block font-semibold">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat No, Street Name, Landmark, City"
                    className="w-full bg-black/40 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-base text-white outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 block font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9999999999"
                    className="w-full bg-black/40 border border-white/10 focus:border-red-500/50 rounded-2xl px-4 py-3 text-base text-white outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 block font-semibold">Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`cursor-pointer p-5 rounded-2xl border transition text-center font-bold flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === "cod"
                          ? "border-red-500 bg-red-500/10 text-white"
                          : "border-white/10 bg-black/20 text-white/60 hover:text-white"
                      }`}
                    >
                      <span>💵</span>
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <div
                      onClick={() => setPaymentMethod("online")}
                      className={`cursor-pointer p-5 rounded-2xl border transition text-center font-bold flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === "online"
                          ? "border-red-500 bg-red-500/10 text-white"
                          : "border-white/10 bg-black/20 text-white/60 hover:text-white"
                      }`}
                    >
                      <FaCreditCard className="text-orange-400 text-lg" />
                      <span>Razorpay (Online Card/UPI)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DIRECT ORDER SUBMIT BUTTON */}
              <button
                onClick={handlePlaceOrder}
                disabled={orderPlaced}
                className="
                  w-full
                  bg-gradient-to-r
                  from-red-500
                  to-orange-500
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  transition
                  py-4
                  rounded-2xl
                  text-xl
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-3
                  mt-8
                  shadow-lg
                "
              >
                {orderPlaced ? (
                  <div className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span>Confirm & Place Order (₹{total})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCheckoutStep("cart")}
                className="text-sm text-red-400 hover:text-red-300 font-semibold flex items-center gap-2 mt-4 transition"
              >
                ← Edit Cart Items
              </button>
            </motion.div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-5 flex flex-col lg:flex-row gap-6 items-center justify-between"
              >
                {/* IMAGE + INFO */}
                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-36 h-36 rounded-3xl object-cover border border-white/10"
                  />
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
                    <p className="text-gray-400 mb-4">Delicious & freshly prepared food</p>
                    <div className="text-2xl font-bold text-red-500">₹{item.price}</div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col items-center gap-5">
                  {/* QUANTITY */}
                  <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-2xl px-4 py-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-red-500 transition flex items-center justify-center"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-green-500 transition flex items-center justify-center"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 bg-red-500/20 border border-red-500/20 hover:bg-red-500 px-5 py-3 rounded-2xl transition"
                  >
                    <FaTrash />
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: BILL SECTION */}
        <div>
          <div className="sticky top-10 glass-card rounded-3xl p-7 text-left">
            <h2 className="text-3xl font-black mb-8">Order Summary</h2>

            {/* BILL */}
            <div className="space-y-5 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">GST (5%)</span>
                <span>₹{tax}</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-red-500">₹{total}</span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={handleCheckoutClick}
              disabled={orderPlaced}
              className="mt-8 w-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition py-4 rounded-2xl text-xl font-bold flex items-center justify-center gap-3"
            >
              {orderPlaced ? (
                <div className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : checkoutStep === "checkout" ? (
                <>
                  <FaCheckCircle />
                  Place Order
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  Proceed to Checkout
                </>
              )}
            </button>

            {/* CLEAR CART (ONLY SHOWN IN CART STEP) */}
            {checkoutStep === "cart" && (
              <button
                onClick={() => {
                  if (clearCart) {
                    clearCart();
                  }
                }}
                className="mt-4 w-full bg-white/10 hover:bg-white/20 transition py-4 rounded-2xl font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

      </div>

      {/* RAZORPAY PAYMENT SIMULATOR PORTAL */}
      {showMockPayment && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          {/* Razorpay Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-[400px] bg-white text-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans my-8"
          >
            {/* Blue Header */}
            <div className="bg-[#0f172a] text-white p-6 text-left flex justify-between items-center relative shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold tracking-tight bg-blue-500 px-2.5 py-0.5 rounded text-white font-mono">R</span>
                  <span className="font-extrabold text-lg">Razorpay Checkout</span>
                </div>
                <p className="text-xs text-gray-400">Foodie App Merchant • Test Mode</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">Amount</span>
                <span className="text-2xl font-black text-blue-400">₹{total}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showOtpScreen ? (
                <motion.div
                  key="payment-selection"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* Content Body */}
                  <div className="p-6 space-y-5 text-left bg-gray-50 flex-1">
                    {user && (
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-2xl mb-4">
                        <div className="w-8 h-8 rounded-full border border-blue-500/20 overflow-hidden shrink-0 shadow-sm">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-left">
                          <p className="font-extrabold text-gray-800">{user.name}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{user.email}</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold mb-3">Preferred Payment Methods</span>
                      
                      <div className="space-y-3">
                        {/* Card option */}
                        <div
                          onClick={() => setSimulatedMethod("card")}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                            simulatedMethod === "card"
                              ? "border-blue-500 bg-blue-500/5 text-blue-900"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">💳</span>
                            <div className="text-left">
                              <span className="font-bold text-sm block">Card</span>
                              <span className="text-[10px] text-gray-400">Visa, MasterCard, RuPay</span>
                            </div>
                          </div>
                          {simulatedMethod === "card" && <span className="text-blue-500 text-sm">●</span>}
                        </div>

                        {/* UPI option */}
                        <div
                          onClick={() => setSimulatedMethod("upi")}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                            simulatedMethod === "upi"
                              ? "border-blue-500 bg-blue-500/5 text-blue-900"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">⚡</span>
                            <div className="text-left">
                              <span className="font-bold text-sm block">UPI / QR Code</span>
                              <span className="text-[10px] text-gray-400">Google Pay, PhonePe, Paytm</span>
                            </div>
                          </div>
                          {simulatedMethod === "upi" && <span className="text-blue-500 text-sm">●</span>}
                        </div>

                        {/* Netbanking option */}
                        <div
                          onClick={() => setSimulatedMethod("nb")}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                            simulatedMethod === "nb"
                              ? "border-blue-500 bg-blue-500/5 text-blue-900"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🏦</span>
                            <div className="text-left">
                              <span className="font-bold text-sm block">Netbanking</span>
                              <span className="text-[10px] text-gray-400">SBI, HDFC, ICICI, AXIS</span>
                            </div>
                          </div>
                          {simulatedMethod === "nb" && <span className="text-blue-500 text-sm">●</span>}
                        </div>
                      </div>
                    </div>

                    {/* Inputs with 16px font (text-base) to prevent iOS auto-zoom */}
                    {simulatedMethod === "card" && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200">
                        <input
                          type="text"
                          placeholder="Card Number (4111 1111 1111 1111)"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-base text-gray-800 outline-none focus:border-blue-500"
                          defaultValue="4111 1111 1111 1111"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Expiry (MM/YY)"
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-base text-gray-800 outline-none focus:border-blue-500"
                            defaultValue="12/30"
                          />
                          <input
                            type="password"
                            placeholder="CVV (***)"
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-base text-gray-800 outline-none focus:border-blue-500"
                            defaultValue="123"
                          />
                        </div>
                      </motion.div>
                    )}

                    {simulatedMethod === "upi" && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200 text-center">
                        <input
                          type="text"
                          placeholder="Enter UPI ID (e.g. success@razorpay)"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-base text-gray-800 outline-none focus:border-blue-500 text-center"
                          defaultValue="success@razorpay"
                        />
                        <span className="text-[10px] text-gray-400 block mt-1">or scan simulated QR code below</span>
                        <div className="w-24 h-24 bg-gray-200 mx-auto rounded-lg flex items-center justify-center text-3xl font-mono font-bold text-gray-400">QR</div>
                      </motion.div>
                    )}

                    {simulatedMethod === "nb" && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-2xl border border-gray-200">
                        <span className="text-xs text-gray-400 block mb-2 font-bold">Select Bank Partner</span>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 outline-none focus:border-blue-500 font-semibold">
                          <option>State Bank of India (SBI)</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                        </select>
                      </motion.div>
                    )}
                  </div>

                  {/* Footer Submit */}
                  <div className="p-6 bg-white border-t border-gray-100 space-y-3">
                    <button
                      onClick={() => {
                        setIsSimulatingPayment(true);
                        setTimeout(() => {
                          setIsSimulatingPayment(false);
                          setShowOtpScreen(true);
                        }, 1200);
                      }}
                      disabled={isSimulatingPayment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition text-center shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                    >
                      {isSimulatingPayment ? (
                        <div className="flex items-center gap-2 justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Connecting Bank...</span>
                        </div>
                      ) : (
                        <span>Pay ₹{total}</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowMockPayment(false);
                        setOrderPlaced(false);
                        alert("Payment Cancelled.");
                      }}
                      disabled={isSimulatingPayment}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl font-semibold transition text-center text-sm"
                    >
                      Cancel Payment
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-verification"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="p-6 space-y-6 text-left bg-gray-50 flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-600">
                      <FaLock className="text-xl" />
                      <span className="font-extrabold text-sm uppercase tracking-wider">Secure OTP Authentication</span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      We have sent a simulated 6-digit One Time Password (OTP) to your phone number <strong>{phone || "XXXXXXXXXX"}</strong>. Please enter it below to confirm your food payment.
                    </p>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 block font-bold">One-Time Password (OTP)</label>
                      <input
                        type="text"
                        maxLength="6"
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter 123456"
                        className="w-full bg-white border border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest outline-none text-gray-800 transition"
                      />
                      <span className="text-[10px] text-gray-400 block text-center">Type <strong>123456</strong> for testing success</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-200/60 shrink-0">
                    <button
                      onClick={async () => {
                        if (otpCode !== "123456") {
                          alert("Invalid OTP code. Please enter 123456 to approve payment.");
                          return;
                        }

                        setIsSimulatingPayment(true);
                        setTimeout(async () => {
                          setIsSimulatingPayment(false);
                          setShowMockPayment(false);
                          alert("Payment Successful! Transaction ID: pay_" + Math.random().toString(36).substr(2, 9) + " 🎉");
                          await finalizeOrder();
                        }, 1500);
                      }}
                      disabled={isSimulatingPayment || otpCode.length < 6}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-400 text-white py-4 rounded-2xl font-bold transition text-center flex items-center justify-center gap-2 shadow-lg shadow-green-500/10"
                    >
                      {isSimulatingPayment ? (
                        <div className="flex items-center gap-2 justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Confirming Transaction...</span>
                        </div>
                      ) : (
                        <span>Verify & Pay ₹{total}</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowOtpScreen(false);
                        setOtpCode("");
                      }}
                      disabled={isSimulatingPayment}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 py-3 rounded-2xl font-semibold transition text-center text-sm"
                    >
                      ← Back to Options
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>,
        document.body
      )}

    </div>
  );
}

export default Cart;
