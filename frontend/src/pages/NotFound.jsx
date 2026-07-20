import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <p className="text-gray-500 mt-4">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Back to Dashboard
      </Link>

    </div>
  );
}

export default NotFound;