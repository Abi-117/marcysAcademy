import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "index" },
    { name: "About", path: "about" },
    { name: "Services", path: "services" },
    { name: "Gallery", path: "gallery" },
    { name: "Overview", path: "overview" },
    { name: "Contact", path: "contact" },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-6">Admin Dashboard</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(`/admin/${item.path}`)}
                className="w-full text-left px-6 py-3 hover:bg-gray-700 transition"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
