// Navbar.jsx

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaShoppingCart,
  FaHome,
  FaImages,
  FaTags,
  FaStar,
  FaDownload,
  FaUtensils,
  FaShoppingBag,
  FaHeart,
  FaInfoCircle,
  FaEnvelope
} from "react-icons/fa";

import gsap from "gsap";
import { createPortal } from "react-dom";

import {
  MdRestaurantMenu,
  MdDeliveryDining,
} from "react-icons/md";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

import { CartContext } from "../context/CartContext";

import {
  Canvas,
} from "@react-three/fiber";

import {
  OrbitControls,
  useFBX,
} from "@react-three/drei";

/* =========================================
   3D CHEF MODEL
========================================= */

function ChefModel() {

  const chef = useFBX("/models/chef.fbx");

  return (
    <primitive
      object={chef}
      scale={0.018}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

/* =========================================
   WALKING CHEF
========================================= */

function WalkingChef({ top }) {

  return (

    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        left: "-65px",
        width: "70px",
        height: "70px",
      }}
      animate={{
        top,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
        }}
        className="w-full h-full"
      >

        <Canvas camera={{ position: [0, 0, 5] }}>

          <ambientLight intensity={2} />

          <directionalLight
            position={[2, 2, 2]}
            intensity={2}
          />

          <ChefModel />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={4}
          />

        </Canvas>

      </motion.div>

    </motion.div>

  );
}

/* =========================================
   NAVBAR
========================================= */

function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const [showTracking, setShowTracking] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const navListRef = useRef(null);

  const linkRefs = useRef([]);

  const [chefTop, setChefTop] = useState(null);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Gallery",
      path: "/gallery",
    },

    {
      name: "Offers",
      path: "/offers",
    },

    {
      name: "Reviews",
      path: "/reviews",
    },

    {
      name: "Download",
      path: "/download",
    },

    {
      name: "Hotels",
      path: "/hotels",
    },

    {
      name: "Orders",
      path: "/orders",
    },

    {
      name: "Wishlist",
      path: "/wishlist",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Contact",
      path: "/contact",
    },
  ];

  /* =========================================
     CHEF POSITION
  ========================================= */

  const getChefY = (el) => {

    if (!navListRef.current || !el) return 0;

    const navRect =
      navListRef.current.getBoundingClientRect();

    const linkRect =
      el.getBoundingClientRect();

    return (
      linkRect.top -
      navRect.top +
      linkRect.height / 2 -
      30
    );
  };

  const moveChef = useCallback((el) => {

    setChefTop(getChefY(el));

  }, []);

  const returnToActive = useCallback(() => {

    const activeIdx = navItems.findIndex(
      (item) => item.path === location.pathname
    );

    const activeEl =
      linkRefs.current[
        activeIdx >= 0 ? activeIdx : 0
      ];

    if (activeEl) {

      moveChef(activeEl);

    }

  }, [location.pathname, moveChef]);

  useEffect(() => {

    const t = setTimeout(() => {

      returnToActive();

    }, 100);

    return () => clearTimeout(t);

  }, [returnToActive]);

  useEffect(() => {

    window.addEventListener(
      "resize",
      returnToActive
    );

    return () =>
      window.removeEventListener(
        "resize",
        returnToActive
      );

  }, [returnToActive]);

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  const getIcon = (name) => {
    switch (name) {
      case "Home": return <FaHome className="text-orange-500 text-base" />;
      case "Gallery": return <FaImages className="text-purple-400 text-base" />;
      case "Offers": return <FaTags className="text-red-500 text-base" />;
      case "Reviews": return <FaStar className="text-yellow-400 text-base" />;
      case "Download": return <FaDownload className="text-sky-400 text-base" />;
      case "Hotels": return <FaUtensils className="text-green-400 text-base" />;
      case "Orders": return <FaShoppingBag className="text-pink-500 text-base" />;
      case "Wishlist": return <FaHeart className="text-rose-500 text-base animate-pulse" />;
      case "About": return <FaInfoCircle className="text-cyan-400 text-base" />;
      case "Contact": return <FaEnvelope className="text-emerald-400 text-base" />;
      default: return <FaInfoCircle className="text-white/60 text-base" />;
    }
  };

  return (

    <aside
      className="
        h-screen
        w-[180px]
        fixed
        top-0
        left-0
        z-50
        bg-white/5
        backdrop-blur-2xl
        border-r border-white/10
        shadow-[0_0_30px_rgba(255,255,255,0.05)]
        flex
        flex-col
        py-5
        overflow-y-auto
      "
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}
    >

      {/* GLOW */}

      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-red-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-orange-500/10 blur-[120px] rounded-full" />

      {/* =========================================
          LOGO
      ========================================= */}

      <div className="flex items-center gap-3 px-4 mb-10 relative z-10">

        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.1,
          }}
          className="
            w-12 h-12
            rounded-2xl
            bg-gradient-to-br
            from-red-500
            to-orange-500
            flex
            items-center
            justify-center
            shadow-lg
          "
        >

          <MdRestaurantMenu className="text-white text-2xl" />

        </motion.div>

        <div>

          <h1
            className="
              text-2xl
              font-black
              bg-gradient-to-r
              from-red-400
              to-orange-400
              bg-clip-text
              text-transparent
            "
          >
            Foodie
          </h1>

          <p className="text-white/40 text-[10px]">
            Food Delivery
          </p>

        </div>

      </div>

      {/* USER PROFILE */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-6 p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 relative z-10"
        >
          <div className="w-10 h-10 rounded-full border border-red-500/20 overflow-hidden flex-shrink-0 shadow-md">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-col text-left truncate min-w-0">
            <span className="text-[10px] text-white/40 block">Logged in as</span>
            <span className="text-sm font-bold text-white truncate block">{user.name}</span>
          </div>
        </motion.div>
      )}

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <nav
        ref={navListRef}
        className="
          flex
          flex-col
          gap-2
          relative
          px-5
          z-10
        "
      >

        {chefTop !== null && (

          <WalkingChef top={chefTop} />

        )}

        {navItems.map((item, index) => {

          const isActive =
            location.pathname === item.path;

          return (

            <Link
              key={index}
              ref={(el) =>
                (linkRefs.current[index] = el)
              }
              to={item.path}
              onMouseEnter={() =>
                moveChef(linkRefs.current[index])
              }
              onMouseLeave={returnToActive}
              className="relative"
            >

              {/* ACTIVE TAB */}

              <AnimatePresence>

                {isActive && (

                  <motion.div
                    layoutId="activeNav"
                    className="
                      absolute
                      inset-0
                      rounded-2xl
                      bg-gradient-to-r
                      from-red-500/20
                      to-orange-500/10
                      border
                      border-red-500/20
                    "
                  />

                )}

              </AnimatePresence>

              {/* TEXT */}

              <div
                className={`
                  relative z-10
                  px-4 py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  flex items-center gap-3
                  ${
                    isActive
                      ? "text-red-400"
                      : "text-white/70 hover:text-orange-300"
                  }
                `}
              >
                <span className="text-base shrink-0">{getIcon(item.name)}</span>
                <span>{item.name}</span>
              </div>

            </Link>

          );
        })}

      </nav>

      {/* FLEX SPACE */}

      <div className="flex-1" />

      {/* =========================================
          CART
      ========================================= */}

      <div className="px-4 space-y-4 relative z-10">

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() => navigate("/cart")}
          className="
            relative
            cursor-pointer
            flex
            items-center
            gap-3
            bg-white/10
            border border-white/10
            backdrop-blur-xl
            rounded-2xl
            px-4 py-3
            hover:bg-red-500/20
            transition
          "
        >

          <div
            className="
              relative
              w-10 h-10
              rounded-full
              bg-gradient-to-br
              from-red-500
              to-orange-500
              flex
              items-center
              justify-center
            "
          >

            <FaShoppingCart className="text-white text-sm" />

            <div
              className="
                absolute
                -top-1
                -right-1
                w-5 h-5
                rounded-full
                bg-white
                text-red-500
                text-[10px]
                font-bold
                flex
                items-center
                justify-center
              "
            >

              {cart.length}

            </div>

          </div>

          <span className="text-sm text-white/80 font-semibold">
            My Cart
          </span>

        </motion.div>

        {/* DELIVERY */}

        <motion.div
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0px 10px 20px rgba(239, 68, 68, 0.15)",
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => setShowTracking(true)}
          className="
            flex
            items-center
            gap-3
            px-4 py-3
            bg-white/5
            border border-white/5
            hover:border-red-500/30
            rounded-2xl
            cursor-pointer
            transition-all
            duration-300
          "
        >
          <motion.div
            animate={{
              x: [0, 5, 0],
              y: [0, -1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut"
            }}
          >
            <MdDeliveryDining className="text-orange-400 text-3xl" />
          </motion.div>

          <div className="flex flex-col text-left">
            <span className="text-white text-sm font-bold">
              Live Delivery
            </span>
            <span className="text-green-400 text-[10px] font-semibold animate-pulse">
              ● Active Tracker
            </span>
          </div>

        </motion.div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
            w-full
            bg-gradient-to-r
            from-red-500
            to-orange-500
            hover:opacity-90
            py-3
            rounded-2xl
            font-semibold
            transition
          "
        >

          Logout

        </button>

      </div>

      <TrackingModal isOpen={showTracking} onClose={() => setShowTracking(false)} />

    </aside>

  );
}

/* =========================================
   TRACKING MODAL WITH GSAP NEON MAP
========================================= */

const getPointOnPath = (path, p) => {
  const numSegments = path.length - 1;
  const targetSegment = Math.min(Math.floor(p * numSegments), numSegments - 1);
  const segmentProgress = (p * numSegments) - targetSegment;
  const start = path[targetSegment];
  const end = path[targetSegment + 1];
  return {
    x: start.x + (end.x - start.x) * segmentProgress,
    y: start.y + (end.y - start.y) * segmentProgress
  };
};

function TrackingModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const progressRef = useRef({ val: 0 });
  const [eta, setEta] = useState(720); // 12 minutes

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setEta(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    const canvas = canvasRef.current;
    if (!canvas) return () => clearInterval(timer);
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const path = [
      { x: 40, y: 220 },
      { x: 120, y: 220 },
      { x: 120, y: 100 },
      { x: 240, y: 100 },
      { x: 240, y: 180 },
      { x: 340, y: 180 },
      { x: 340, y: 50 }
    ];

    progressRef.current.val = 0;

    const tween = gsap.to(progressRef.current, {
      val: 1,
      duration: 15,
      repeat: -1,
      ease: "none"
    });

    const draw = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(239, 68, 68, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Roads
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      path.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      // Neon route path
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 4;
      ctx.shadowColor = "rgba(249, 115, 22, 0.5)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      path.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Start Node
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(path[0].x, path[0].y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText("Burger Joint 🍔", path[0].x - 15, path[0].y - 12);

      // End Node
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(path[path.length - 1].x, path[path.length - 1].y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText("Home 🏠", path[path.length - 1].x - 10, path[path.length - 1].y - 12);

      // Rider marker
      const p = progressRef.current.val;
      const currentPt = getPointOnPath(path, p);

      ctx.shadowColor = "#f97316";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.arc(currentPt.x, currentPt.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🛵", currentPt.x, currentPt.y);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animationFrameId);
      tween.kill();
    };
  }, [isOpen]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-4xl h-[450px] bg-neutral-950 border border-white/10 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(239,68,68,0.15)]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-red-500/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition border border-white/10 font-bold"
            >
              ✕
            </button>

            <div className="w-full md:w-3/5 h-[200px] md:h-full bg-neutral-900/50 border-b md:border-b-0 md:border-r border-white/10 relative">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="absolute bottom-6 left-6 bg-black/60 border border-white/10 backdrop-blur-md px-4 py-2 rounded-2xl">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block font-bold">Route Status</span>
                <span className="text-orange-400 text-xs font-semibold font-sans">En Route to Destination</span>
              </div>
            </div>

            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between overflow-y-auto bg-black/40">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Live Tracking</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-6 font-semibold">Order #203492</p>

                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                  <span className="text-xs text-white/50 block mb-1">Estimated Arrival</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                    {formatTime(eta)}
                  </span>
                </div>

                <div className="space-y-4 relative pl-6 border-l border-white/10 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-neutral-950 flex items-center justify-center text-[8px] text-white">✓</div>
                    <span className="text-sm font-semibold text-white/60 block">Order Confirmed</span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-neutral-950 flex items-center justify-center text-[8px] text-white">✓</div>
                    <span className="text-sm font-semibold text-white/60 block">Meal Prepared</span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-neutral-950 animate-pulse" />
                    <span className="text-sm font-bold text-orange-400 block">Out for Delivery</span>
                    <span className="text-[10px] text-orange-400/80 font-medium">Rider is near your sector</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Rider"
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div className="text-left">
                    <div className="font-bold text-sm text-white">Alex Rider</div>
                    <div className="text-[10px] text-white/50">Toyota Prius • CA-4X92</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="tel:12345678"
                    className="bg-white/10 hover:bg-red-500/20 border border-white/10 px-3 py-2 rounded-xl text-xs font-semibold transition text-white"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Navbar;