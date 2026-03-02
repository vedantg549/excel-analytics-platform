import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const role = localStorage.getItem("excel_role");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}




