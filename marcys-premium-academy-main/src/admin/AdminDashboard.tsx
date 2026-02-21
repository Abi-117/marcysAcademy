import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <Outlet /> {/* Render selected page */}
      </div>
    </div>
  );
};

export default AdminDashboard;
