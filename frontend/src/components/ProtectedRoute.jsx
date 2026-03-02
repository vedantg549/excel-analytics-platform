import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("excel_token");
  const userRole = localStorage.getItem("excel_role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem("excel_token");
//   const userRole = localStorage.getItem("excel_role");

//   if (!token) return <Navigate to="/login" />;

//   if (role && userRole !== role)
//     return <Navigate to="/login" />;

//   return children;
// };

// export default ProtectedRoute;