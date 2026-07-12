import { useState } from "react";

import axios from "axios";

import {
  FaEnvelope,
  FaLock,
  FaUserAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  const API_BASE = process.env.REACT_APP_API_URL || ("http://" + window.location.hostname + ":5000");

  const navigate = useNavigate();

  // =========================================
  // STATES
  // =========================================

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        API_BASE + "/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // AUTH TRUE

      setIsAuth(true);

      alert("Login Successful 🎉");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Invalid Credentials"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================================
  // REGISTER
  // =========================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await axios.post(
        API_BASE + "/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profileImage: formData.profileImage,
        }
      );

      alert(
        "Registration Successful 🎉 Please Login"
      );

      setIsLogin(true);

      setFormData({
        name: "",
        email: "",
        password: "",
        profileImage: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        relative
        min-h-screen
        flex items-center justify-center
        overflow-hidden
        px-5
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* =========================================
          DARK OVERLAY
      ========================================= */}

      <div className="absolute inset-0 bg-black/75" />

      {/* GLOW */}

      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-red-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/20 blur-[120px] rounded-full" />

      {/* =========================================
          LOGIN BOX
      ========================================= */}

      <div
        className="
          relative z-10
          w-full max-w-md
          glass-card
          rounded-[35px]
          p-8 md:p-10
        "
      >

        {/* LOGO */}

        <div className="text-center mb-8">

          <div
            className="
              w-20 h-20
              rounded-full
              bg-gradient-to-r
              from-red-500
              to-orange-500
              flex items-center justify-center
              text-4xl
              mx-auto
              mb-5
              shadow-lg
            "
          >
            🍔
          </div>

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              text-white
              mb-3
            "
          >

            {isLogin ? "Welcome Back" : "Create Account"}

          </h1>

          <p className="text-gray-300 text-sm">

            {isLogin
              ? "Login to continue ordering delicious food"
              : "Register and start your food journey"}

          </p>

        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <form
          onSubmit={
            isLogin
              ? handleLogin
              : handleRegister
          }
          className="space-y-5"
        >

          {/* NAME */}

          {!isLogin && (
            <>
              <div className="relative">

                <FaUserAlt
                  className="
                    absolute
                    top-1/2
                    left-5
                    -translate-y-1/2
                    text-red-400
                  "
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="
                    w-full
                    bg-black/40
                    border border-white/10
                    text-white
                    pl-14 pr-5 py-4
                    rounded-2xl
                    outline-none
                    focus:border-red-500
                    transition
                  "
                />

              </div>

              <div className="space-y-2">
                <div className="relative">
                  <FaUserAlt
                    className="
                      absolute
                      top-1/2
                      left-5
                      -translate-y-1/2
                      text-red-400
                    "
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="
                      w-full
                      bg-black/40
                      border border-white/10
                      text-white
                      pl-14 pr-5 py-3
                      rounded-2xl
                      outline-none
                      focus:border-red-500
                      transition
                      file:mr-4 file:py-1.5 file:px-3
                      file:rounded-xl file:border-0
                      file:text-xs file:font-bold
                      file:bg-red-500/20 file:text-red-400
                      hover:file:bg-red-500/30
                    "
                  />
                </div>
                {formData.profileImage && (
                  <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl">
                    <img
                      src={formData.profileImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-full object-cover border border-red-500/30 shrink-0"
                    />
                    <span className="text-[11px] text-gray-400">Profile image selected successfully</span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* EMAIL */}

          <div className="relative">

            <FaEnvelope
              className="
                absolute
                top-1/2
                left-5
                -translate-y-1/2
                text-red-400
              "
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="
                w-full
                bg-black/40
                border border-white/10
                text-white
                pl-14 pr-5 py-4
                rounded-2xl
                outline-none
                focus:border-red-500
                transition
              "
            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <FaLock
              className="
                absolute
                top-1/2
                left-5
                -translate-y-1/2
                text-red-400
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="
                w-full
                bg-black/40
                border border-white/10
                text-white
                pl-14 pr-14 py-4
                rounded-2xl
                outline-none
                focus:border-red-500
                transition
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                top-1/2
                right-5
                -translate-y-1/2
                text-gray-400
              "
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </button>

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-red-500
              to-orange-500
              hover:scale-[1.02]
              py-4
              rounded-2xl
              text-lg
              font-bold
              transition
              disabled:opacity-50
            "
          >

            {loading
              ? "Please Wait..."
              : isLogin
              ? "Login"
              : "Register"}

          </button>

        </form>

        {/* =========================================
            TOGGLE
        ========================================= */}

        <div className="text-center mt-8">

          <p className="text-gray-300">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

          </p>

          <button
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="
              text-red-400
              font-bold
              mt-2
              hover:text-orange-300
              transition
            "
          >

            {isLogin
              ? "Create New Account"
              : "Login Instead"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;