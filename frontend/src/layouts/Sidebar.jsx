import {
  FaChartPie,
  FaClipboardList,
  FaHistory,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { logout } from "../../services/authService";

function Sidebar() {

  const menu = [

    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/dashboard",
    },

    {
      name: "Assessment",
      icon: <FaClipboardList />,
      path: "/assessment",
    },

    {
      name: "History",
      icon: <FaHistory />,
      path: "/history",
    },

    {
      name: "AI Chat",
      icon: <FaRobot />,
      path: "/chat",
    },

  ];

  const handleLogout = () => {

    logout();

    window.location.href = "/";

  };

  return (

    <div className="w-72 bg-gradient-to-b from-blue-700 to-indigo-900 text-white flex flex-col">

      <div className="p-8 border-b border-blue-500">

        <h1 className="text-3xl font-bold">

          NextCare AI

        </h1>

        <p className="text-blue-100 mt-2">

          Smart Healthcare Assistant

        </p>

      </div>

      <nav className="flex-1 p-6">

        {menu.map((item) => (

          <NavLink

            key={item.path}

            to={item.path}

            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl mb-3 transition
              ${
                isActive
                  ? "bg-white text-blue-700 shadow-lg"
                  : "hover:bg-blue-600"
              }`
            }

          >

            <span className="text-xl">

              {item.icon}

            </span>

            {item.name}

          </NavLink>

        ))}

      </nav>

      <div className="p-6">

        <button

          onClick={handleLogout}

          className="w-full bg-red-500 hover:bg-red-600 p-4 rounded-xl flex items-center justify-center gap-3"

        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Sidebar;