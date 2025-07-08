import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaSun,
  FaMicrophoneAlt,
  FaHeadphones,
  FaLanguage,
} from "react-icons/fa";
import { motion, MotionConfig } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post("/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        const { token } = res.data;
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        await axios.post("/api/auth/register", form);
        toast.success("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || "Error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 ${
        isDark ? "bg-[#0e0e15] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Left Info Panel */}
        <div className="md:w-1/2 w-full space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-blue-400 text-3xl font-bold">
            <FaLanguage />
            <span>Learnify</span>
          </div>

          <h1 className="text-4xl font-extrabold">
            Master Languages with Learnify
          </h1>

          <p className="text-lg text-gray-400 max-w-md mx-auto md:mx-0">
            Practice speaking, listening, grammar and more – all in one place.
          </p>

          <div className="space-y-3 text-sm text-gray-400 mt-6">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaMicrophoneAlt className="text-blue-400" />
              <span>Speaking & pronunciation tools</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaHeadphones className="text-blue-400" />
              <span>Listening practice & quizzes</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaLanguage className="text-blue-400" />
              <span>Vocabulary & grammar building</span>
            </div>
          </div>
        </div>

        {/* Right Auth Form */}
        <div
          className={`md:w-1/2 w-full max-w-md p-6 rounded-xl shadow-lg ${
            isDark ? "bg-[#1c1c29]" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isLogin ? "Login to Learnify" : "Register on Learnify"}
            </h2>
            <button onClick={() => setIsDark(!isDark)}>
              <FaSun className="text-xl text-blue-400" />
            </button>
          </div>

          <MotionConfig reducedMotion="user">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-100 dark:bg-[#2a2a3b] placeholder-gray-400"
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-100 dark:bg-[#2a2a3b] placeholder-gray-400"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-100 dark:bg-[#2a2a3b] placeholder-gray-400"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                </button>
              </form>

              <button
                disabled
                className="w-full bg-white text-black mt-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-md cursor-not-allowed opacity-50"
              >
                <FaGoogle /> Continue with Google (Coming soon)
              </button>

              <div className="text-sm text-gray-400 mt-4 text-center">
                <button className="text-blue-400 hover:underline">
                  Forgot password?
                </button>
              </div>

              <p className="text-center text-sm text-gray-400 mt-4">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </motion.div>
          </MotionConfig>
        </div>
      </div>
    </div>
  );
}
