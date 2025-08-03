import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://blogsite-fxsk.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("✅ Login response:", data);  // 👈 Debugging log

      if (res.ok) {
        // ✅ Save token if present
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // ✅ Save user only if it's an object
        if (data.user && typeof data.user === "object") {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          console.warn("⚠️ No valid user object returned from backend");
          localStorage.removeItem("user"); // just to be safe
        }

        alert("✅ Logged in successfully!");
        navigate("/");
      } else {
        alert(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("🚨 Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">🔐 Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Login;
