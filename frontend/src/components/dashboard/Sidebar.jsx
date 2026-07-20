import { Link } from "react-router-dom";

import { logout } from "../../services/authService";

function Sidebar() {

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (

    <div className="w-64 bg-blue-700 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-10">

        NextCare AI

      </h2>

      <nav className="space-y-5">

        <Link
          to="/dashboard"
          className="block rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/assessment"
          className="block rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          New Assessment
        </Link>

        <Link
          to="/history"
          className="block rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
        >
          History
        </Link>

        <button
          onClick={handleLogout}
          className="mt-10 rounded bg-red-600 px-4 py-2 transition-colors duration-200 hover:bg-red-700"
        >
          Logout
        </button>

      </nav>

    </div>

  );
}

export default Sidebar;