const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");
const localDb = require("../config/localDb");

// REGISTER

router.post("/register", async (req, res) => {

  try {

    const { name, email, password, profileImage } = req.body;

    if (localDb.useLocalFallback) {
      try {
        const newUser = await localDb.registerUser(name, email, password, profileImage);
        return res.json({ message: "User Registered (Local DB)" });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    }

    const existing = await User.findOne({ email });

    if (existing) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImage || undefined
    });

    await user.save();

    res.json({
      message: "User Registered",
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});

// LOGIN

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (localDb.useLocalFallback) {
      try {
        const user = await localDb.loginUser(email, password);
        const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "7d" });
        return res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
          }
        });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.json({

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;