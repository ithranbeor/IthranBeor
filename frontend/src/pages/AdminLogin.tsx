import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IthranLogo from "../assets/logo/IthranLogo.png";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = "admin123"; // Change this to your desired password

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminToken", "authenticated");
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#D6D6D6] font-poppins flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects, matching the rest of the site */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative z-10 w-full max-w-md overflow-hidden rounded-4xl bg-white/25 backdrop-blur-2xl backdrop-saturate-150 border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 sm:p-10"
      >
        {/* Glass highlight */}
        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 h-1/2 w-full bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/80 shadow-lg">
              <img
                src={IthranLogo}
                alt="Ithran Beor"
                className="h-9 w-9 object-cover"
              />
            </div>
          </div>

          <p className="uppercase tracking-[0.25em] text-xs text-gray-500 text-center mb-2">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Sign in to manage your site
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <LuLock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-300/50 bg-red-50/80 backdrop-blur-md px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full rounded-2xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-8">
            Protected admin area · Use a strong password in production
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;