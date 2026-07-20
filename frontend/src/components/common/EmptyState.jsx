import { FaClipboardList } from "react-icons/fa";

function EmptyState({
  title,
  description,
}) {
  return (
    <div className="text-center py-20">

      <FaClipboardList className="mx-auto text-6xl text-gray-300 mb-6" />

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;