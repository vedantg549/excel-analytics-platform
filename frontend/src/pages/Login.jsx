import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);

      localStorage.setItem("excel_token", data.token);
      localStorage.setItem("excel_role", data.role);
      localStorage.setItem("excel_email", form.email);

      navigate(data.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
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

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-lg">
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { login } from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await login(form);
//       localStorage.setItem("excel_token", data.token);
//       localStorage.setItem("excel_role", data.role);
//       localStorage.setItem("excel_email", form.email);

//       navigate(data.role === "admin" ? "/admin" : "/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//           Excel Analytics Platform
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-3">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />
//           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
//             Login
//           </button>
//         </form>

//         <p className="text-sm mt-4 text-center">
//           No account?{" "}
//           <Link to="/register" className="text-blue-600 font-semibold">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

