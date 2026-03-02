import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Home() {
  return (
    <div className="scroll-smooth">

      {/* ===== HERO SECTION ===== */}
      <div
        className="relative min-h-screen flex items-center justify-center text-white px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Logo */}
        <div className="absolute top-6 left-6 z-20">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
          />
        </div>

        {/* Navigation Links (Top Right) */}
        <div className="absolute top-6 right-10 z-20 flex gap-6 text-white font-medium">
          <a href="#about" className="hover:text-purple-300">About</a>
          <a href="#contact" className="hover:text-purple-300">Contact</a>
        </div>

        {/* Decorative Image */}
        <div className="hidden md:block absolute right-10 bottom-10 z-10">
          <img
            src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80"
            alt="Analytics"
            className="w-72 rounded-2xl shadow-2xl opacity-80 hover:scale-105 transition duration-500"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-3xl text-center">
          <h2 className="text-xl md:text-2xl font-medium text-purple-300 mb-3">
            Welcome to
          </h2>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Excel Analytics Platform
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-200">
            Upload your Excel files, generate dynamic charts,
            analyze data visually, and manage reports
            in a secure full-stack analytics system.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/login"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-110 hover:shadow-purple-500/50 transition duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <div
        id="about"
        className="py-20 px-6 bg-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">
          About Our Platform
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          Excel Analytics Platform is a full-stack web application built using 
          React and modern backend technologies. It allows users to upload Excel 
          files, generate interactive charts, and visualize insights securely. 
          The platform focuses on simplicity, performance, and data-driven decision making.
        </p>
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <div
        id="contact"
        className="py-20 px-6 bg-gray-100 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">
          Contact Us
        </h2>

        <p className="text-gray-700 text-lg mb-3">
          📧 support@excelanalytics.com
        </p>

        <p className="text-gray-700 text-lg">
          📞 +91 7666935065
        </p>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="bg-black text-white text-center py-4">
        © 2026 Excel Analytics Platform. All rights reserved.
      </div>

    </div>
  );
}

// import { Link } from "react-router-dom";
// import logo from "../assets/logo.jpeg"; 
// export default function Home() {
//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center text-white px-6 bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/70"></div>

//       {/* Top Left Circular Logo */}
//       <div className="absolute top-6 left-6 z-20">
//         <img
//           src={logo}
//           alt="Logo"
//           className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
//         />
//       </div>

//       {/* Decorative Side Image */}
//       <div className="hidden md:block absolute right-10 bottom-10 z-10">
//         <img
//           src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80"
//           alt="Analytics"
//           className="w-72 rounded-2xl shadow-2xl opacity-80 hover:scale-105 transition duration-500"
//         />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-3xl text-center">
        
//         <h2 className="text-xl md:text-2xl font-medium text-purple-300 mb-3">
//           Welcome to
//         </h2>

//         <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
//           Excel Analytics Platform 
//         </h1>

//         <p className="text-lg md:text-xl mb-10 text-gray-200">
//           Upload your Excel files, generate dynamic charts,
//           analyze data visually, and manage reports
//           in a secure full-stack analytics system.
//         </p>

//         <div className="flex justify-center gap-6">
          
//           <Link
//             to="/login"
//             className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-110 hover:shadow-purple-500/50 transition duration-300"
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition duration-300"
//           >
//             Register
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// }