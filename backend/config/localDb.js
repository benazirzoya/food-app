const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DB_FILE = path.join(__dirname, "../data_db.json");

// Initialize local database file
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], orders: [] }, null, 2));
}

const readData = () => {
  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    return { users: [], orders: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Local DB write error:", err);
  }
};

module.exports = {
  // Global flag set by server.js
  useLocalFallback: false,

  registerUser: async (name, email, password, profileImage) => {
    const data = readData();
    const existing = data.users.find((u) => u.email === email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: "local_usr_" + Date.now(),
      name,
      email,
      password: hashedPassword,
      profileImage: profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
    };

    data.users.push(newUser);
    writeData(data);
    return newUser;
  },

  loginUser: async (email, password) => {
    const data = readData();
    const user = data.users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    return user;
  },

  createOrder: (orderData) => {
    const data = readData();
    const newOrder = {
      _id: "local_ord_" + Date.now(),
      userId: orderData.userId || "guest",
      items: orderData.items || [],
      total: orderData.total || 0,
      status: "Preparing",
      createdAt: new Date().toISOString()
    };

    data.orders.push(newOrder);
    writeData(data);
    return newOrder;
  },

  getOrders: () => {
    const data = readData();
    return data.orders;
  },

  deleteOrder: (id) => {
    const data = readData();
    data.orders = data.orders.filter((o) => o._id !== id && o.id !== id);
    writeData(data);
    return true;
  }
};
