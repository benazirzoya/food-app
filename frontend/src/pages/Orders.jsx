import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
  FaClock,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";

function Orders() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOAD ORDERS FROM DB
  // =========================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const userObj = savedUser ? JSON.parse(savedUser) : null;
        const currentUserId = userObj ? (userObj.id || userObj._id) : "guest";

        const API_BASE = "http://" + window.location.hostname + ":5000";
        const res = await axios.get(API_BASE + "/api/orders", { timeout: 5000 });
        
        // Filter and format orders for current user
        const dbOrders = res.data
          .filter((o) => o.userId === currentUserId)
          .map((o) => {
            return {
              id: o._id || o.id,
              items: o.items || [],
              price: o.total,
              status: o.status || "Preparing",
              location: "Your Address",
              time: o.status === "Delivered" ? "Delivered" : "20 mins",
              hotel: "Foodie Kitchen Partner",
            };
          });

        // Fallback default sample orders if no database orders exist
        const staticOrders = [
          {
            id: "static-1",
            items: [
              {
                id: 101,
                name: "Chicken Biryani",
                price: 299,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1170&auto=format&fit=crop"
              }
            ],
            hotel: "Taj Restaurant",
            price: 299,
            status: "Preparing",
            location: "Chennai",
            time: "25 mins",
          },
          {
            id: "static-2",
            items: [
              {
                id: 102,
                name: "Cheese Burger",
                price: 99,
                quantity: 2,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1170&auto=format&fit=crop"
              }
            ],
            hotel: "Burger Hub",
            price: 198,
            status: "On The Way",
            location: "Coimbatore",
            time: "15 mins",
          }
        ];

        setOrders(dbOrders.length > 0 ? dbOrders : staticOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =========================================
  // CANCEL ORDER
  // =========================================

  const deleteOrder = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order? 😢");
    if (!confirmCancel) return;

    try {
      if (id.startsWith("static-")) {
        // Handle static orders locally
        setOrders(orders.filter((o) => o.id !== id));
        alert("Static Order Cancelled Successfully");
        return;
      }

      const API_BASE = "http://" + window.location.hostname + ":5000";
      await axios.delete(API_BASE + `/api/orders/${id}`);
      setOrders(orders.filter((o) => o.id !== id));
      alert("Order Cancelled Successfully");
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order. Try again.");
    }
  };

  // =========================================
  // TRACK
  // =========================================

  const trackOrder = (order) => {
    const statuses = {
      Preparing: "👨‍🍳 Your food is being prepared",
      "On The Way": "🛵 Rider is on the way",
      Delivered: "✅ Order delivered successfully",
    };

    const itemsStr = order.items && order.items.length > 0
      ? order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")
      : "Custom Meal";

    alert(`
📦 Order ID: ${order.id}
🍽️ Items: ${itemsStr}
🏨 Partner: ${order.hotel}
📍 Location: ${order.location}
⏰ ETA: ${order.time}
🚚 Status:
${statuses[order.status] || "👨‍🍳 Your food is being prepared"}
    `);
  };

  // =========================================
  // REORDER
  // =========================================

  const reorderFood = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        addToCart({
          id: item.id || Date.now() + Math.random(),
          name: item.name,
          price: item.price,
          image: item.image
        });
      });
    } else {
      addToCart({
        id: Date.now(),
        name: "Custom Meal",
        price: order.price,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop"
      });
    }
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-bold animate-pulse">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[75vh] bg-black text-white overflow-hidden py-12 px-5 md:px-10">
      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-red-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-orange-500/20 blur-[120px] rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-14 text-left border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">My Orders 📦</h1>
          <p className="text-gray-400">Track and manage your delicious active order meals</p>
        </div>
        {(() => {
          try {
            const savedUser = localStorage.getItem("user");
            const user = savedUser ? JSON.parse(savedUser) : null;
            if (user) {
              return (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-full border border-red-500/20 overflow-hidden shrink-0 shadow-md">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm leading-tight">{user.name}</h4>
                    <span className="text-[10px] text-gray-400 block font-semibold">{user.email}</span>
                  </div>
                </div>
              );
            }
          } catch(e) {}
          return null;
        })()}
      </div>

      {/* BODY */}
      {orders.length === 0 ? (
        <div className="relative z-10 min-h-[40vh] flex flex-col items-center justify-center">
          <FaShoppingBag className="text-6xl text-red-500 mb-5" />
          <h2 className="text-2xl font-bold mb-2">No Orders Found</h2>
          <p className="text-gray-400">Start ordering delicious food 🍕</p>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-7">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-[28px] overflow-hidden hover:scale-[1.01] transition duration-300 flex flex-col justify-between"
            >
              {/* HEADER */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Order ID</span>
                  <span className="font-mono text-sm text-white/80 font-bold">#{order.id.toString().substring(0, 10)}</span>
                </div>
                <div>
                  <div
                    className={`px-4 py-2 rounded-full text-xs font-bold ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : order.status === "On The Way"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>

              {/* ITEMS TABLE */}
              <div className="px-6 py-4 flex-1 text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold mb-3">Order Details</span>
                <div className="overflow-x-auto bg-black/30 rounded-2xl border border-white/5 p-4">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-semibold">
                        <th className="pb-3 text-left">Item</th>
                        <th className="pb-3 text-center">Qty</th>
                        <th className="pb-3 text-right">Price</th>
                        <th className="pb-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items && order.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 last:border-0 text-white/90">
                          <td className="py-3 flex items-center gap-3">
                            <img
                              src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                            />
                            <span className="font-bold truncate max-w-[120px] sm:max-w-[160px]">{item.name}</span>
                          </td>
                          <td className="py-3 text-center font-semibold">x{item.quantity}</td>
                          <td className="py-3 text-right">₹{item.price}</td>
                          <td className="py-3 text-right font-bold text-red-400">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FOOTER SUMMARY */}
              <div className="p-6 border-t border-white/5 text-left">
                <div className="flex justify-between items-center mb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Delivery Info</span>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <FaMapMarkerAlt className="text-red-400" />
                      <span>{order.location}</span>
                      <span className="text-gray-500">•</span>
                      <FaClock className="text-orange-400" />
                      <span>{order.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Total Paid</span>
                    <span className="text-2xl font-black text-red-400">₹{order.price}</span>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Order Placed</span>
                    <span>Out For Delivery</span>
                    <span>Delivered</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        order.status === "Delivered"
                          ? "w-full bg-green-500"
                          : order.status === "On The Way"
                          ? "w-2/3 bg-orange-500"
                          : "w-1/3 bg-red-500"
                      }`}
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => trackOrder(order)}
                    className="bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-xs font-semibold transition"
                  >
                    Track
                  </button>
                  <button
                    onClick={() => reorderFood(order)}
                    className="bg-gradient-to-r from-red-500 to-orange-500 py-3 rounded-2xl text-xs font-bold transition"
                  >
                    Reorder
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                  >
                    <FaTrash />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
