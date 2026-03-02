import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(form);
      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Register Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-300 text-sm mb-6">
          Join Excel Analytics Platform
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 text-sm mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 shadow-lg"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-sm mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-300 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { register } from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await register(form);
//       setSuccess("Account created successfully! Redirecting...");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">

//       {/* Decorative background circles */}
//       <div className="absolute w-72 h-72 bg-pink-400 opacity-30 rounded-full top-10 left-10 blur-3xl"></div>
//       <div className="absolute w-72 h-72 bg-yellow-400 opacity-30 rounded-full bottom-10 right-10 blur-3xl"></div>

//       <div className="relative w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">

//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
//           Create Account
//         </h2>

//         <p className="text-center text-gray-500 text-sm mb-6">
//           Join Excel Analytics Platform 🚀
//         </p>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg mb-4 text-sm">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Name */}
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               required
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//               placeholder="Enter your full name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               required
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//               placeholder="Create a password"
//             />
//           </div>

//           {/* Role
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">
//               Select Role
//             </label>
//             <select
//               name="role"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div> */}

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
//             }`}
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </button>

//         </form>

//         <p className="text-sm text-center mt-6 text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }