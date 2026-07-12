const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  profileImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
  }

});

module.exports = mongoose.model("User", userSchema);