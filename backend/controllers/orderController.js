const Order = require('../models/Order');
const localDb = require('../config/localDb');

exports.placeOrder = async (req, res) => {
  try {
    if (localDb.useLocalFallback) {
      const order = localDb.createOrder(req.body);
      return res.status(201).json(order);
    }
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    if (localDb.useLocalFallback) {
      const orders = localDb.getOrders();
      return res.json(orders);
    }
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    if (localDb.useLocalFallback) {
      localDb.deleteOrder(req.params.id);
      return res.json({ message: "Order cancelled successfully" });
    }
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ error: err.message });
  }
};