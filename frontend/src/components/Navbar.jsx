import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("excel_email");
    setEmail(storedEmail);
  }, []);

  const logout = () => {
    localStorage.removeItem("excel_email");
    setEmail(null);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white flex justify-between items-center px-8 py-4 z-50">

      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover border border-white"
        />
        <h1 className="font-semibold text-lg">Excel Analytics</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {email ? (
          <>
            <span className="text-purple-300 font-semibold">
              👤 {email}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const email = localStorage.getItem("excel_email");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
//       <h1 className="text-lg font-semibold text-indigo-600">
//         Dashboard
//       </h1>

//       <div className="flex items-center gap-4">
//         <span className="text-sm text-gray-600">
//           {email}
//         </span>

//         <button
//           onClick={logout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

