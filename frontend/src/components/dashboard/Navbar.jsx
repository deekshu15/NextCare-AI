import { FaUserCircle } from "react-icons/fa";
import LanguageSelector from "../common/LanguageSelector";
function Navbar() {
  const date = new Date();

  const greeting = () => {
    const hour = date.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="bg-white shadow-sm px-10 py-6 flex justify-between items-center">

      <div>
        <h2 className="text-3xl font-bold">
          {greeting()} 👋
        </h2>

        <p className="text-gray-500">
          {date.toDateString()}
        </p>
      </div>

     <div className="flex items-center gap-6">

    <LanguageSelector />

    <FaUserCircle className="text-5xl text-blue-600"/>

    <div>

        <h3 className="font-semibold">

            Welcome

        </h3>

        <p className="text-gray-500 text-sm">

            NextCare AI

        </p>

    </div>

</div>

    </header>
  );
}

export default Navbar;